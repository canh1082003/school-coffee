export interface RegisterData {
  data: { email: string };
  message: string;
}

export type UserInfo = {
  fullName: string;
  role: string;
  userId: string;
  email: string;
};
export type LoginData = {
  data: UserInfo;
};
