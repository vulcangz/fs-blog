// queries
export const PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 9999;
export const BaseURL = process.env.NEXT_PUBLIC_API_BASE;
export const PostBaseURL = `/content/post/`;
export const PostDetailURL = `/?select=id,cover_image,title,content,view_count,comments_count,share_count,likes,readings,created_at,user.username,user.created_at,user.likes,user.following,user.followedBy,user.profile,tags`;
export const TopicURL = `/content/post/?select=id,cover_image,title,created_at,user.username,tags`;

export type Color = string;

export interface Colors {
  Primary: { value: Color };
  Secondary: {
    T15: { value: Color };
    T75: { value: Color };
    Light: { value: Color };
  };
  TextDark: {
    T3: { value: Color };
    T25: { value: Color };
  };
  White: { value: Color };
}

const COLORS: Colors = {
  Primary: { value: '#2DD7AE' },
  Secondary: {
    T15: { value: '#201850' },
    T75: { value: '#1f1750' },
    Light: { value: '#302956' }
  },
  TextDark: {
    T3: { value: '#C2BCE4' },
    T25: { value: 'rgba(31, 23, 80,0.35)' }
  },
  White: { value: '#FFFFFF' }
};

export default COLORS;
