import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconCalendar,
  IconMail,
  IconFiles,
  IconUserCircle,
  IconMessage2,
  IconRotate,
  IconChartPie,
  IconPhotoScan,
  IconPhotoAi,
  IconFileImport,
  IconFileExport,
  IconFileTextAi,
  IconRouteScan,
  IconBrandMessenger,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "HOME",
  },
  {
    id: uniqueId(),
    title: "대시보드",
    icon: IconChartPie,
    chip: "New",
    variant: "outlined",
    chipColor: "primary",
    color: "textWhite",
    href: "/",
  },
  {
    id: uniqueId(),
    title: "커뮤니티",
    icon: IconMessage2,
    chip: "준비중",
    href: "/chats",
  },
  {
    id: uniqueId(),
    title: "채팅",
    icon: IconBrandMessenger,
    chip: "준비중",
    href: "/chats",
  },

  {
    navlabel: true,
    subheader: "MANAGE",
  },
  {
    id: uniqueId(),
    title: "사용자 관리",
    icon: IconUserCircle,
    href: "/manage/users",
  },
  {
    id: uniqueId(),
    title: "업무 관리",
    icon: IconFiles,
    href: "/manage/works",
  },

  {
    navlabel: true,
    subheader: "WORK",
  },
  {
    id: uniqueId(),
    title: "정보 입력",
    icon: IconPhotoScan,
    chip: "2",
    chipColor: "primary",
    variant: "outlined",
    href: "/work/qa",
  },
  {
    id: uniqueId(),
    title: "EDI",
    icon: IconRouteScan,
    href: "/work/edi",
  },

  {
    navlabel: true,
    subheader: "OTHER",
  },
  {
    id: uniqueId(),
    title: "캘린더",
    icon: IconCalendar,
    href: "/calendar",
  },
  {
    id: uniqueId(),
    title: "이메일",
    icon: IconMail,
    href: "/email",
  },

  {
    navlabel: true,
    subheader: "DEVELOPER",
  },
  {
    id: uniqueId(),
    title: "Image",
    icon: IconPhotoAi,
    href: "/image",
    children: [
      {
        id: uniqueId(),
        title: "OCR",
        icon: IconPhotoScan,
        href: "/image/ocr",
      },
      {
        id: uniqueId(),
        title: "Rotation",
        icon: IconRotate,
        href: "/image/rotation",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Specialty",
    icon: IconFileTextAi,
    href: "/specialty",
    children: [
      {
        id: uniqueId(),
        title: "Request",
        icon: IconFileExport,
        href: "/specialty/request",
      },
      {
        id: uniqueId(),
        title: "Response",
        icon: IconFileImport,
        href: "/specialty/response",
      },
    ],
  },
];

export default Menuitems;
