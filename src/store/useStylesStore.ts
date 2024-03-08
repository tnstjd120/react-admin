import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TActiveMode = "light" | "dark";

type TActionStore = {
  hoverSidebar: (arg: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveMode: (mode: TActiveMode) => void;
};

interface IUseStylesStore {
  activeDir?: string | any;
  activeMode?: TActiveMode;
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

const initialStore: IUseStylesStore = {
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

export const useStylesStore = create(
  persist<IUseStylesStore & TActionStore>(
    (set) => ({
      ...initialStore,
      hoverSidebar: (arg: boolean) => set({ isSidebarHover: arg }),
      toggleSidebar: () =>
        set(({ isCollapse }) => ({ isCollapse: !isCollapse })),
      toggleMobileSidebar: () =>
        set(({ isMobileSidebar }) => ({ isMobileSidebar: !isMobileSidebar })),
      setActiveMode: (arg: TActiveMode) => set({ activeMode: arg }),
    }),
    { name: "stylesByUserStore", getStorage: () => localStorage }
  )
);
