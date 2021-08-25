import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import BackBtn from "../../components/Btn/BackBtn";
import LogoNamePoppyMail from "../../components/Txt/LogoNamePoppyMail";
import CheckWriteMailMent from "../../components/Txt/CheckWriteMailMent";
import CheckLetter from "../../components/CheckLetter";

function CheckWriteMail() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.WriteMailScene>
        <div className="fullbox">
          <BackBtn></BackBtn>
          <LogoNamePoppyMail></LogoNamePoppyMail>
          <CheckWriteMailMent></CheckWriteMailMent>

          <CheckLetter></CheckLetter>
          <Link to="completewritemail">
            <div className="create-post-box-btn">우편함에 편지 넣기</div>
          </Link>
        </div>
      </S.WriteMailScene>
    </>
  );
}

export default CheckWriteMail;
