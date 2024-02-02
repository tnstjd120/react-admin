import { create } from "zustand";

export type ActiveModeType = "light" | "dark";

type ActionStateType = {
  hoverSidebar: (arg: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveMode: (mode: ActiveModeType) => void;
};

interface StateType {
  activeDir?: string | any;
  activeMode?: ActiveModeType;
  activeTheme?: string;
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
}

const initialState: StateType = {
  activeDir: "ltr",
  activeMode: "light",
  activeTheme: "BLUE_THEME",
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: "boxed",
  isCollapse: false,
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: "ko",
  isCardShadow: true,
  borderRadius: 7,
};

export const useStylesState = create<StateType & ActionStateType>((set) => ({
  ...initialState,
  hoverSidebar: (arg: boolean) => set({ isSidebarHover: arg }),
  toggleSidebar: () =>
    set(({ isCollapse }) => {
      console.log("useStylesState isCollapse => ", isCollapse);
      return { isCollapse: !isCollapse };
    }),
  toggleMobileSidebar: () =>
    set(({ isMobileSidebar }) => {
      console.log("useStylesState isMobileSidebar => ", isMobileSidebar);
      return { isMobileSidebar: !isMobileSidebar };
    }),
  setActiveMode: (arg: ActiveModeType) => set({ activeMode: arg }),
}));
