import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import LetsWriteMailMent from "../../components/Txt/LetsWriteMailMent";
import LetsWriteMailImg from "../../components/Img/LetsWriteMailImg";
import LogoNamePoppyMail from "../../components/Txt/LogoNamePoppyMail";
import PostLinkTitle from "../../components/PostLinkTitle";
import WriteMailBtn from "../../components/Btn/WriteMailBtn";

function LetsWriteMail() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.LetsWriteMailScene>
        <div className="fullbox">
          <LogoNamePoppyMail></LogoNamePoppyMail>

          <PostLinkTitle></PostLinkTitle>

          <LetsWriteMailMent></LetsWriteMailMent>

          <LetsWriteMailImg></LetsWriteMailImg>

          <Link to="/writemail">
            <WriteMailBtn></WriteMailBtn>
          </Link>
        </div>
      </S.LetsWriteMailScene>
    </>
  );
}

export default LetsWriteMail;
