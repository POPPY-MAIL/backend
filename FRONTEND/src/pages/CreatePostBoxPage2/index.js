import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import Navbar from "../../components/Navbar";
import LogoNameCreatePostBox from "../../components/Txt/LogoNameCreatePostBox";
import BackBtn from "../../components/Btn/BackBtn";
import CreatePostBoxMent from "../../components/Txt/CreatePostBoxMent";
import LinkName from "../../components/Txt/LinkName";
import PostboxBefore from "../../components/Img/PostboxBefore";
import AlertCretePostbox from "../../components/Alert/AlertCreatePostbox";

function CreatePostBoxPage2() {
  const [_alert, setAlert] = useState(<AlertCretePostbox></AlertCretePostbox>);
  setTimeout(() => {
    setAlert(null);
  }, 2000);

  const Copy = () => {
    copyToClipboard("dndsidsidisdi");
    console.log("Copied!");
  };

  const copyToClipboard = val => {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  };

  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.CreatePostBoxScene>
        <div className="fullbox">
          <BackBtn></BackBtn>
          <Navbar></Navbar>

          <LogoNameCreatePostBox></LogoNameCreatePostBox>

          {/* <AlertCretePostbox></AlertCretePostbox> */}
          {_alert}

          <CreatePostBoxMent></CreatePostBoxMent>

          {/* <CopyToClipboard text="우체통주소">
            <Link to="/createpostboxstepthree">
              <PostboxBefore></PostboxBefore>
            </Link>
          </CopyToClipboard> */}

          <div onClick={Copy}>
            <Link to="/createpostboxstepthree">
              <PostboxBefore></PostboxBefore>
            </Link>
          </div>

          <LinkName></LinkName>
        </div>
      </S.CreatePostBoxScene>
    </>
  );
}

export default CreatePostBoxPage2;
