import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <div className="left"></div>

      <div className="right">
        <div className="header"></div>
        <main>
          <Outlet />
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;

  .left {
    width: 200px;
    height: 100vh;
    border-right: 1px solid #ddd;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  }

  .right {
    flex: 1;
    min-height: 100vh;
  }
`;
