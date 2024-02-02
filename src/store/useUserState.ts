import { UserInfoResponse } from "@/types/User";
import { create } from "zustand";

interface UserState {
  user: UserInfoResponse | null;
  setUserInfo: (user: UserInfoResponse) => void;
  clearUserInfo: () => void;
}

export const useUserState = create<UserState>((set) => ({
  user: null,
  setUserInfo: (user) => set({ user }),
  clearUserInfo: () => set({ user: null }),
}));
