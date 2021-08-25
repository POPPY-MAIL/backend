import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import * as S from "./styles";
import MetooBtn from "../../components/Btn/MetooBtn";
import GoHomeBtn from "../../components/Btn/GoHomeBtnWhite";
import LogoName from "../../components/Txt/LogoName";
import BackBtn from "../../components/Btn/BackBtn";
import CompleteWriteMailMent from "../../components/Txt/CompleteWriteMailMent";
import Poppyimg from "../../image/completewritemailpoppy.png";

function CompleteWriteMail() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.CompleteWriteMailScene>
        <div className="fullbox">
          <LogoName></LogoName>
          <BackBtn></BackBtn>

          <CompleteWriteMailMent></CompleteWriteMailMent>

          <img src={Poppyimg} className="completewritemail-poppy-img" />

          <Link to="/">
            <MetooBtn></MetooBtn>
          </Link>

          <Link to="/">
            <GoHomeBtn></GoHomeBtn>
          </Link>
        </div>
      </S.CompleteWriteMailScene>
    </>
  );
}

export default CompleteWriteMail;
