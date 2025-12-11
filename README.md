
# FS-Blog - A Modern Fullstack Dev.to Style Multi-user blog

Built with Go FastSchema, Next.js App Router + NextAuth.js v5 and Chakra UI.

## Why

FastSchema is a No-Code Headless CMS, with built-in features: Admin Control Panel, File manger, OAS, RBAC, and more. But so far, I haven't found a good enough web front end to showcase its rich functionality. Because "Next.js has everything you need to build great products on the web.", so let me try...

Thanks to the dev.to clone repository on GitHub for giving me the courage to try it.

> **Note:** Please note that this is only an experimental demo system. The backend is basically stable, and the frontend is still iterating... 

The code was written for this articles : [(1)](https://www.worldlink.com.cn/post/build-a-devto-style-multi-user-blog-with-fastschema-nextjs-nextauth-v5-and-chakra-ui.html), [(2)](https://www.worldlink.com.cn/post/build-a-devto-style-multi-user-blog-with-fastschema-nextjs-nextauth-v5-and-chakra-ui-2-design%20and%20realization).

## Tech Stack:

> Frontend

-   React
-   Next.js App Router
-   NextAuth.js v5
-   Chakra UI v2
-   SWR
-   Axios

> Backend

-   Go
-   FastSchema
-   SQLite (with demo data)
-   seeder

## Getting started

To get started with this project, run

### Backend

#### Start the services

```bash
  git clone https://github.com/vulcangz/fs-blog.git
  cd fs-blog
  go mod tidy
  go run .
```

Admin Dashboard(FastSchema built-in): visiting http://localhost:8000/dash 

#### Test accounts

```
ADMIN: admin/123456
User: test1~test5/123456
```

After logging in, administrators can access the documents: http://localhost:8000/docs 


### Frontend

#### Set up environment variables

copy the `.env.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash  
  cd web
  cp .env.example .env.local
```

#### Run Next.js in development mode

```bash
  pnpm i
  pnpm dev
```

visiting http://localhost:3000

and that's all you need to get started!

#### Test accounts

```
User: test1~test5@example.com/123456
```

## Acknowledgements

- [FastSchema](https://github.com/fastschema/fastschema) - for making this possible
- [Next.js](https://github.com/vercel/next.js) - for making this possible
- [Auth.js](https://github.com/nextauthjs/next-auth) - for Credentials & OAuth authentication
- [Chakra UI](https://github.com/chakra-ui/chakra-ui) - For me, this is probably the best react component library to use
- [SWR](https://github.com/vercel/swr) - "使用 SWR，组件将会不断地、自动获得最新数据流。UI 也会一直保持快速响应。"这毋庸置疑!
- [DEV Community](https://dev.to/) - The source of this creativity
- [MA-Ahmad/dev.to-clone](https://github.com/MA-Ahmad/dev.to-clone)
- [Dev Community Clone](https://github.com/zwelhtetyan/dev.to-clone)
- [spicy-tomato/tech-blog](https://github.com/spicy-tomato/tech-blog)
- [Countries Autocomplete Component](https://github.com/jovanes-work/jtk-chakraui-autocomplete) - for search input autocomplete feature
- [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) - for "Code of Conduct" generated
- [terms-and-conditions-generator.github.io](https://github.com/terms-and-conditions-generator/terms-and-conditions-generator.github.io) - for "Terms and conditions" generated 
- more...

## License

The libraries and components used are copyrighted by their authors,

Others by me: [MIT](https://choosealicense.com/licenses/mit/)