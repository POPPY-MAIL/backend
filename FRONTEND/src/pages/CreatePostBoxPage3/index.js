import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import Navbar from "../../components/Navbar";
import LogoNameCreatePostBox from "../../components/Txt/LogoNameCreatePostBox";
import BackBtn from "../../components/Btn/BackBtn";
import LinkName from "../../components/Txt/LinkName";
import AlertCopy from "../../components/Alert/AlertCopy";
import PostboxAfter from "../../components/Img/PostboxAfter";
import CompleteBtn from "../../components/Btn/CompleteBtn";

function CreatePostBoxPage3() {
  const [_alert, setAlert] = useState(<AlertCopy></AlertCopy>);
  setTimeout(() => {
    setAlert(null);
  }, 2000);

  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.CreatePostBoxScene>
        <div className="fullbox">
          <BackBtn></BackBtn>
          <Navbar></Navbar>

          <LogoNameCreatePostBox></LogoNameCreatePostBox>

          {_alert}

          <PostboxAfter></PostboxAfter>

          <LinkName></LinkName>

          <Link to="/kakaoplus">
            <CompleteBtn></CompleteBtn>
          </Link>
        </div>
      </S.CreatePostBoxScene>
    </>
  );
}

export default CreatePostBoxPage3;
