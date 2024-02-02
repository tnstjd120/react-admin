export const API_PATH = {
  USERS: {
    SIGNUP: {
      // 회원 가입
      METHOD: { method: "POST" },
      PATH: "/api/users/user",
    },
    LOGIN: {
      // 로그인
      METHOD: { method: "POST" },
      PATH: "/api/users/login",
    },
    REFRESH_TOKEN_RETRY: {
      // accessToken 재발급
      METHOD: { method: "POST" },
      PATH: "/api/users/refresh_token",
    },
    ROLES_GET: {
      // 사용자 역할 조회
      METHOD: { method: "GET" },
      PATH: "/api/users/roles",
    },
    ROLE_PATCH: {
      // 사용자 역할 변경
      METHOD: { method: "POST" },
      PATH: "/api/users/editRole",
    },
    PASSWORD_PUT: {
      // 나의 비밀번호 변경
      METHOD: { method: "PUT" },
      PATH: "/api/users/password",
    },
    PASSWORD_INIT: {
      // 사용자 비밀번호 초기화
      METHOD: { method: "POST" },
      PATH: "/api/users/initPassword",
    },
    USERS_INFO_GET: {
      // 사용자 정보 조회
      METHOD: { method: "GET" },
      PATH: "/api/users/usersInfo",
    },
    USER_INFO_GET: {
      // 나의 정보 조회
      METHOD: { method: "GET" },
      PATH: "/api/users/personalInfo",
    },
    USER_INFO_PATCH: {
      // 나의 정보 수정
      METHOD: { method: "POST" },
      PATH: "/api/users/usersInfo",
    },
    PROFILE_IMAGES_GET: {
      // 선택 가능한 프로필 이미지 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/users/profileImages",
    },
  },
} as const;
