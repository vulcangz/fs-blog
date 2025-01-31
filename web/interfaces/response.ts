export type Response<T> = {
  status: number;
  code: number;
  message: string;
  data: T;
};

export interface ApiResponse {
  status: string
  status_code: number
  message: string
}

export interface OAuthData {
  id: number;
  token: string;
  expires: Date;
}
