import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import type { NextAuthConfig } from 'next-auth';
import { CreateOAuthUserReq } from './interfaces';

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png'
  },
  debug: true,
  providers: [
    Facebook,
    GitHub,
    Google,
    CredentialsProvider({
      name: 'fs-blog',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'test1@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          return null;
        }

        const payload = {
          login: credentials.email,
          password: credentials.password
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/local/login`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          throw new Error('UnAuthorized');
        }

        const tokenObj = await res.json();
        // Return null if user data could not be retrieved
        if (!tokenObj) {
          throw new Error('UnAuthorized');
        }

        // If no error and we have user data, return it
        const token = tokenObj.data.token;
        const resm = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!resm.ok) {
          throw new Error('UnAuthorized');
        }

        const userObj = await resm.json();
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/content/profile/?select=name,nickname,image&filter={"user_id":{"$eq":${userObj.data.id}}}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (!resp.ok) {
          return {
            ...userObj.data,
            accessToken: token,
            expires: tokenObj.data.expires
          };
        }

        // profile information
        const profileObj = await resp.json();
        if (profileObj.data.total === 0) {
          return {
            user: { ...userObj.data } as any,
            accessToken: token,
            expires: tokenObj.data.expires
          };
        }

        const profile = profileObj.data.items[0];
        let user = {
          ...userObj.data,
          name: profile.name,
          image: profile.image,
          profile: profile
        };

        return {
          ...user,
          accessToken: token,
          expires: tokenObj.data.expires
        };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session, isNewUser }) {
      // Initial sign in
      if (account && account?.provider === 'github' && user) {
        let userExisted;
        try {
          const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/github/me`, {
            method: 'POST',
            body: JSON.stringify({
              username: token.name,
              email: token.email,
              token: 'saved-github-accessToken'
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!resp.ok) {
            throw resp;
          }

          const meObj = await resp.json();
          if (meObj) {
            userExisted = true;

            return meObj.data;
          }
        } catch (e) {
          console.log(e.message);
          return {
            ...token,
            error: 'failed to load'
          };
        }

        if (!userExisted) {
          // or create oauth user account
          const payload: CreateOAuthUserReq = {
            provider: account.provider,
            provider_id: user.id,
            provider_username: profile?.login as string,
            email: user.email,
            username: profile?.login as string
          };

          try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/github/register`, {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (!resp.ok) {
              throw resp;
            }

            let tokenObj = await resp.json();
            let newuser = {
              ...user,
              id: tokenObj.data.id
            };
            return {
              ...token,
              user: newuser,
              oauthAccessToken: account.access_token,
              oauthExpires: token.expires,
              accessToken: tokenObj.data.accessToken,
              expires: tokenObj.data.expires
            };
          } catch (e) {
            console.log(e.message);
            return {
              ...token
            };
          }
        }
      }

      if (trigger === 'signIn' && account && account?.provider === 'credentials' && user) {
        user.nickname = user.profile?.nickname;
        token.accessToken = user.accessToken;
        token.expires = user.expires;
        let { accessToken, expires, ...newuser } = user;
        token.user = newuser;
      }

      if (trigger === 'update' && session) {
        (token.user as any).nickname = session.nickname;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
      }
      session.accessToken = token.accessToken as string;
      console.log('auth session', session);
      return session;
    }
  },
  pages: {
    signIn: '/enter',
    error: '/enter'
  }
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);

declare module 'next-auth' {
  interface User {
    username?: string;
    nickname?: string;
    profile?: {
      name: string;
      nickname: string;
    };
    accessToken: string | undefined;
    expires?: Date;
  }

  interface Session {
    oauthAccessToken: string;
    oauthExpires: Date;
    accessToken: string | undefined;
    user: {
      id: string;
      nickname: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      username?: string;
    };
  }
}
