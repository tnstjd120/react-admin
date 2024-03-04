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
    IS_POSS_ASSIGN_PUT: {
      METHOD: { method: "POST" },
      PATH: "/api/users/possAssign",
    },
    IS_USE_PUT: {
      METHOD: { method: "POST" },
      PATH: "/api/users/editUserIsUse",
    },
  },
  QA: {
    RECEIPTS_INCOMPLETE_GET: {
      // 배정된 미완료 접수번호 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/inCompleteReceiptLists",
    },
    RECEIPTS_COMPLETE_GET: {
      // 배정된 완료 접수번호 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/completeReceiptLists",
    },
    IMAGES_GET: {
      // 접수번호 별 이미지 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/imageListsByReceiptId",
    },
    QA_DATA_GET: {
      // 이미지 별 QA 데이터 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/qaDataListsByImageId",
    },
    QA_DATA_POST: {
      // QA 데이터 생성/수정 (qaDataId ? 수정 : 생성)
      METHOD: { method: "GET" },
      PATH: "/api/qa/qaData",
    },
    MDCS_GET: {
      // 접수번호 별 사고정보순번 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/mdcsListsByReceiptId",
    },
    MDCS_POST: {
      // 사고정보순번 매핑
      METHOD: { method: "POST" },
      PATH: "/api/qa/mdcsMapping",
    },
    FLG_SUM_GET: {
      // 사고정보순번 합산 리스트 (in Lotte, mapping)
      METHOD: { method: "GET" },
      PATH: "/api/qa/flgSumLists",
    },
    IMAGE_DELETE: {
      // 이미지 삭제
      METHOD: { method: "DELETE" },
      PATH: "/api/qa/deleteImage",
    },
    IMAGES_TRASH_GET: {
      // 이미지 휴지통 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/trashImageLists",
    },
    IMAGE_RESTORE_POST: {
      // 이미지 복구
      METHOD: { method: "POST" },
      PATH: "/api/qa/restoreImage",
    },
    EDI_BY_CODE_GET: {
      // EDI 코드로 EDI 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/ediSearchCode",
    },
    EDI_BY_NAME_GET: {
      // EDI 명칭으로 EDI 리스트 조회
      METHOD: { method: "GET" },
      PATH: "/api/qa/ediSearchName",
    },
  },
} as const;
