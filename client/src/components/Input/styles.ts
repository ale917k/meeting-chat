import styled from "styled-components";
import { theme } from "globalStyles";

export const Form = styled.form`
  display: flex;
`;

export const StyledInput = styled.input`
  width: 80%;
  border: none;
  border-top: 2px solid ${theme.palette.grey[50]};
  border-radius: 0;
  padding: 5%;
  font-size: 1.2rem;
`;

export const SendButton = styled.button`
  display: inline-block;
  width: 20%;
  border: none;
  background: ${theme.palette.primary};
  padding: ${theme.spacing(3)};
  color: ${theme.palette.common.white};
  text-decoration: none;
`;
