import { useStylesState } from "@/store/useStylesStore";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Logo = () => {
  const { TopbarHeight, isCollapse, activeMode } = useStylesState(
    (state) => state
  );
  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  return (
    <LinkStyled to="/">
      {activeMode === "dark" ? (
        <img src="/logo_w.svg" alt="logo" height={TopbarHeight} width={174} />
      ) : (
        <img src="/logo.svg" alt="logo" height={TopbarHeight} width={174} />
      )}
    </LinkStyled>
  );
};

export default Logo;
