import styled from "styled-components";

export const MessageWrapper = styled.div<{ justify?: string }>`
  display: flex;
  justify-content: ${(props) => props.justify};
  margin-top: 3px;
  padding: 0 5%;
`;

export const MessageBox = styled.div<{ bg?: string }>`
  display: inline-block;
  max-width: 80%;
  padding: 5px 20px;
  background: ${(props) => props.bg};
  border-radius: 20px;
  color: white;
`;

export const MessageText = styled.p`
  width: 100%;
  float: left;
  color: ${(props) => props.color};
  font-size: 1.1rem;
  letter-spacing: 0;
  word-wrap: break-word;

  img: {
    vertical-align: middle;
  }
`;

export const SentText = styled.p<{ padding?: string }>`
  display: flex;
  align-items: center;
  color: #828282;
  font-family: Helvetica;
  letter-spacing: 0.3px;
  padding: ${(props) => props.padding};
`;
