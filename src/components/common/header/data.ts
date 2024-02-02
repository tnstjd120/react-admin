// Notifications dropdown

interface notificationType {
  avatar?: string;
  name?: string;
  title: string;
  subtitle: string;
}
const notifications: notificationType[] = [
  {
    avatar: "/images/profile/user-1.jpg",
    name: "하재민",
    title: "담배피러 가실?",
    subtitle: "1 분 전",
  },
  {
    avatar: "/images/profile/user-2.jpg",
    name: "강형관",
    title: "강형관님이 내 게시글에 댓글을 달았습니다.",
    subtitle: "2 시간 전",
  },
  {
    avatar: "/images/profile/user-1.jpg",
    name: "하재민",
    title: "존경합니다 순성님..",
    subtitle: "6 시간 전",
  },
  {
    avatar: "/images/profile/user-2.jpg",
    name: "강형관",
    title: "순성님 NextJS 좀 알려주세요 ㅠ",
    subtitle: "11 시간 전",
  },
  {
    avatar: "",
    name: "오원교",
    title: "순성님 저희 회사로 제발 와주세요 ㅠ 프론트 헬프 ㅠ",
    subtitle: "1 일 전",
  },
];

interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: any;
}
const profile: ProfileType[] = [
  {
    href: "/apps/user-profile/profile",
    title: "My Profile",
    subtitle: "내 정보를 수정할 수 있어요",
    icon: "/images/svgs/icon-account.svg",
  },
  // {
  //   href: "/apps/email",
  //   title: "My Inbox",
  //   subtitle: "Messages & Emails",
  //   icon: "/images/svgs/icon-inbox.svg",
  // },
  // {
  //   href: "/apps/notes",
  //   title: "My Tasks",
  //   subtitle: "To-do and Daily Tasks",
  //   icon: "/images/svgs/icon-tasks.svg",
  // },
];

// apps dropdown

interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  avatar: string;
}

const appsLink: appsLinkType[] = [
  {
    href: "/apps/chats",
    title: "Chat Application",
    subtext: "New messages arrived",
    avatar: "/images/svgs/icon-dd-chat.svg",
  },
  {
    href: "/apps/ecommerce/shop",
    title: "eCommerce App",
    subtext: "New stock available",
    avatar: "/images/svgs/icon-dd-cart.svg",
  },
  {
    href: "/apps/notes",
    title: "Notes App",
    subtext: "To-do and Daily tasks",
    avatar: "/images/svgs/icon-dd-invoice.svg",
  },
  {
    href: "/apps/calendar",
    title: "Calendar App",
    subtext: "Get dates",
    avatar: "/images/svgs/icon-dd-date.svg",
  },
  {
    href: "/apps/contacts",
    title: "Contact Application",
    subtext: "2 Unsaved Contacts",
    avatar: "/images/svgs/icon-dd-mobile.svg",
  },
  {
    href: "/apps/tickets",
    title: "Tickets App",
    subtext: "Submit tickets",
    avatar: "/images/svgs/icon-dd-lifebuoy.svg",
  },
  {
    href: "/apps/email",
    title: "Email App",
    subtext: "Get new emails",
    avatar: "/images/svgs/icon-dd-message-box.svg",
  },
  {
    href: "/apps/blog/post",
    title: "Blog App",
    subtext: "added new blog",
    avatar: "/images/svgs/icon-dd-application.svg",
  },
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [
  {
    href: "/theme-pages/pricing",
    title: "Pricing Page",
  },
  {
    href: "/auth/auth1/login",
    title: "Authentication Design",
  },
  {
    href: "/auth/auth1/register",
    title: "Register Now",
  },
  {
    href: "/404",
    title: "404 Error Page",
  },
  {
    href: "/apps/note",
    title: "Notes App",
  },
  {
    href: "/apps/user-profile/profile",
    title: "User Application",
  },
  {
    href: "/apps/blog/post",
    title: "Blog Design",
  },
  {
    href: "/apps/ecommerce/checkout",
    title: "Shopping Cart",
  },
];

export { notifications, profile, pageLinks, appsLink };
