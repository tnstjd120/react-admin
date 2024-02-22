import { UserInfoResponse } from "@/types/User";
import { create } from "zustand";

interface IUseUserStore {
  user: UserInfoResponse | null;
  setUserInfo: (user: UserInfoResponse) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  user: null,
  setUserInfo: (user) => set({ user }),
  clearUserInfo: () => set({ user: null }),
}));
