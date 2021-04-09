import React from "react";
import onlineIcon from "icons/onlineIcon.png";
import closeIcon from "icons/closeIcon.png";
import { InfoBarWrapper, LeftInnerContainer, RightInnerContainer, OnlineIcon } from "./styles";

type PropsType = {
  room: string;
};

const InfoBar: React.FC<PropsType> = ({ room }: PropsType) => (
  <InfoBarWrapper>
    <LeftInnerContainer>
      <OnlineIcon src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </LeftInnerContainer>
    <RightInnerContainer>
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </RightInnerContainer>
  </InfoBarWrapper>
);

export default InfoBar;
