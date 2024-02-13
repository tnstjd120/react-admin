import { Role } from "@/types/Role";
import { create } from "zustand";

interface IUseRoleState {
  roles: Role[] | null;
  setRoles: (roles: Role[]) => void;
}

export const useRoleState = create<IUseRoleState>((set) => ({
  roles: null,
  setRoles: (roles) => set({ roles }),
}));
