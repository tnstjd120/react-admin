interface IUser {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
  profileImage: string;
  roleId: number;
  roleLabel: string;
  isFirstLogin: boolean;
  isUse: boolean;
  success: boolean;
  code: number;
  message: string | null;
  createdAt: string;
}

export type UserLoginResponse = Omit<
  IUser,
  "createdAt" | "roleId" | "roleLabel" | "isUse"
>;

export type UserInfoResponse = Omit<IUser, "accessToken" | "refreshToken">;

export type UserSilentRefreshResponse = Pick<
  IUser,
  "accessToken" | "refreshToken" | "success" | "code" | "message"
>;
