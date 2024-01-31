import styled from "@emotion/styled";

type LogoSize = "small" | "large";

type Props = { size?: LogoSize };

export const Logo = ({ size = "large" }: Props) => {
  return (
    <LogoContainer size={size}>
      <img src="/logo.svg" alt="Quantum ai 로고" />
    </LogoContainer>
  );
};

const LogoContainer = styled.div<{ size: LogoSize }>`
  height: 70px;
  width: ${({ size }) => (size === "small" ? "40px" : "174px")};
  overflow: hidden;

  img {
    width: 100%;
  }
`;
