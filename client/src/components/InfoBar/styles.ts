import styled from "styled-components";
import { theme } from "globalStyles";

export const InfoBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${theme.spacing(8)};
  background: ${theme.palette.primary};
  border-radius: ${`${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`};
`;

export const LeftInnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0.5;
  margin-left: 5%;
  color: ${theme.palette.common.white};
`;

export const RightInnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0.5;
  margin-right: 5%;
`;

export const OnlineIcon = styled.img`
  width: auto;
  margin-right: 5%;
`;
