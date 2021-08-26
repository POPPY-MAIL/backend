import React from "react";
import MyPostboxImg from "../image/mypostboxitemimg.png";
import OpenPostboxBtn from "./Btn/OpenPostboxBtn";
// import * as S from './styles';

function MyPostboxItem() {
  return (
    <>
      <div className="copy-my-post-box-link-ment">내 우체통 링크 복사하기</div>

      <img src={MyPostboxImg} className="MyPostboxImg"></img>

      <div className="my-post-box-item-ment1">
        &lt;얘도랑 나 이거 써주면 나도 써줄게&gt;
      </div>
      <div className="my-post-box-item-ment2">편지 13개 도착</div>
      <div className="my-post-box-item-ment3">
        편지 열람이 가능할 때 알림이 가요!
      </div>
      <OpenPostboxBtn></OpenPostboxBtn>
    </>
  );
}

export default MyPostboxItem;
