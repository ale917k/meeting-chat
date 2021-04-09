import styled from "styled-components";
import { theme } from "globalStyles";

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.palette.common.black};

  ${theme.breakpoints.phone} {
    height: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${theme.spacing(100)};
  max-width: 90%;
  height: 60%;
  background: ${theme.palette.common.white};
  border-radius: ${theme.shape.borderRadius};

  ${theme.breakpoints.phone} {
    max-width: 100%;
    height: 100%;
  }
`;
