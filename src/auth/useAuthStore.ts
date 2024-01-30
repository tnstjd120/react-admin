import { UserLoginResponse } from "@/types/User";
import { create } from "zustand";

interface IUseAuthStore {
  isAuth: boolean;
  user: UserLoginResponse | null;
  login: (user: UserLoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<IUseAuthStore>((set) => ({
  isAuth: false,
  user: null,
  login: (user) => set(() => ({ isAuth: true, user: user })),
  logout: () => set(() => ({ isAuth: false, user: null })),
}));
