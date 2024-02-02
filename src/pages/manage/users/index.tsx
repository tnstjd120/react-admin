import Breadcrumb from "@/components/common/Breadcrumb";
import BlankCard from "./BlankCard";
import CustomTable from "@/components/table/CustomTable";

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
        <CustomTable />
      </BlankCard>
    </>
  );
};

export default UsersPage;
