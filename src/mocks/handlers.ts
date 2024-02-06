import { API_PATH } from "@/api/API_PATH";
import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(API_PATH.USERS.USERS_INFO_GET.PATH, ({ request }) => {
    console.log("get users");
    console.log("request => ", request);
    return HttpResponse.json({
      userLists: [{ userId: "kyle" }, { userId: "kwon" }],
    });
  }),
];

// import { http } from "msw";

// export const handlers = [
//   http.get("/api/users/usersInfo", ({ request, params }) => {
//     console.log("mocks handlers request => ", request);
//     console.log("mocks handlers params => ", params);
//   }),
// ];
