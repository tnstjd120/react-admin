import Breadcrumb from "@/components/common/Breadcrumb";
import BlankCard from "@/components/common/BlankCard";

import UsersTable from "./UsersTable";

const BCrumb = [
  {
    title: "Manage",
  },
  {
    title: "사용자 관리",
  },
];

const UsersPage = () => {
  return (
    <>
      <Breadcrumb title="사용자 관리" items={BCrumb} />

      <BlankCard>
        <UsersTable />
      </BlankCard>
    </>
  );
};

export default UsersPage;
