import React from "react";
// import * as S from './styles';

function CheckArrivedLetter() {
  return (
    <>
      <div className="check-arrived-letter-box">
        <div className="letter-element" id="to-box">
          <div className="to-txt">To.</div>
          <div className="to-underline"></div>
          <div className="to-contents"></div>
        </div>
        <div className="letter-element" id="contents-box">
          <div className="contents-contents"></div>
        </div>
        <div className="letter-element" id="from-box">
          <div className="from-txt">From.</div>
          <div className="from-underline"></div>
          <div
            className="from-contents"
            placeholder="*친구가 알아볼 수 있도록 써주세요"
          ></div>
        </div>
      </div>
    </>
  );
}

export default CheckArrivedLetter;
