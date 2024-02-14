import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import UsersPage from "@/pages/manage/users";
import WorksPage from "@/pages/manage/works";
import ProfilePage from "@/pages/profile";
import SignupPage from "@/pages/signup";
import QaWorkPage from "@/pages/work/qa";
import { ReactNode } from "react";

// TODO:
// element props로 PATH 값 자체를 내려줘서
// 해당 페이지에서는 props로 내려준 해당 페이지의 api path 값들을 활용하게 처리

interface IRoute {
  label: string;
  path: string;
  element: ReactNode;
}

type TRoutes = {
  [key: string]: IRoute;
};

type TProtected = "protected" | "unprotected";
// type TRootRoutes = {
//   [key in TProtected]: TRoutes;
// };

const ObjectRoute: Record<TProtected, TRoutes> = {
  protected: {
    HOME: {
      label: "홈",
      path: "/",
      element: <HomePage />,
    },
    USERS: {
      label: "사용자 관리",
      path: "/manage/users",
      element: <UsersPage />,
    },
    WORKS: {
      label: "업무 관리",
      path: "/manage/works",
      element: <WorksPage />,
    },
    PROFILE: {
      label: "프로필",
      path: "/profile",
      element: <ProfilePage />,
    },
    QA_WORK: {
      label: "정보 입력",
      path: "/work/qa",
      element: <QaWorkPage />,
    },
  },
  unprotected: {
    LOGIN: {
      label: "로그인",
      path: "/login",
      element: <LoginPage />,
    },
    SIGNUP: {
      label: "회원가입",
      path: "/signup",
      element: <SignupPage />,
    },
  },
} as const;

export default ObjectRoute;
