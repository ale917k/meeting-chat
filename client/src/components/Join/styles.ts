import styled from "styled-components";
import { theme } from "globalStyles";

export const JoinOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${theme.palette.common.black};
`;

export const JoinInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  width: ${theme.spacing(50)};
  padding: ${theme.spacing(1)};
`;

export const JoinInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  padding: ${`${theme.spacing(2)} ${theme.spacing(3)}`};
`;

export const Heading = styled.h1`
  border-bottom: 2px solid ${theme.palette.common.white};
  padding-bottom: ${theme.spacing(1)};
  color: ${theme.palette.common.white};
  font-size: 2.5rem;
`;

export const Button = styled.button`
  display: inline-block;
  width: 100%;
  background: ${theme.palette.primary};
  border: none;
  border-radius: ${theme.shape.borderRadius};
  padding: ${theme.spacing(3)};
  color: ${theme.palette.common.white} !important;
  text-transform: uppercase;
  text-decoration: none;
`;
