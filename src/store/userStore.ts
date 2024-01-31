import { UserLoginResponse } from "@/types/User";
import { create } from "zustand";

interface UserState {
  user: UserLoginResponse | null;
  setUserInfo: (user: UserLoginResponse) => void;
  clearUserInfo: () => void;
}

export const useUserState = create<UserState>((set) => ({
  user: null,
  setUserInfo: (user) => set({ user }),
  clearUserInfo: () => set({ user: null }),
}));
