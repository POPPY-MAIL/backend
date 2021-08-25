import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import BackBtn from "../../components/Btn/BackBtn";
import LogoNamePoppyMail from "../../components/Txt/LogoNamePoppyMail";
import Colorbar from "../../components/Colorbar";
import Letter from "../../components/Letter";
import SmallCompleteBtn from "../../components/Btn/SmallCompleteBtn";

function WriteMail() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.WriteMailScene>
        <div className="fullbox">
          <BackBtn></BackBtn>
          <SmallCompleteBtn></SmallCompleteBtn>
          <LogoNamePoppyMail></LogoNamePoppyMail>
          <Colorbar></Colorbar>
          <Letter></Letter>
        </div>
      </S.WriteMailScene>
    </>
  );
}

export default WriteMail;
