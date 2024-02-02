interface IUser {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
  profileImage?: string;
  isFirstLogin: boolean;
  activeStatus?: number;
  success?: boolean;
  code?: number;
  isUse?: boolean;
  message?: string | null;
  roleId?: number;
  roleLabel?: string;
  isPossAssign?: boolean;
  createdAt?: string;
}

export type UserLoginResponse = Omit<
  IUser,
  "createdAt" | "roleId" | "roleLabel" | "isUse" | "isPossAssign"
>;

export type UserInfoResponse = Omit<IUser, "accessToken" | "refreshToken">;

export type UserSilentRefreshResponse = Pick<
  IUser,
  "accessToken" | "refreshToken" | "success" | "code" | "message"
>;
