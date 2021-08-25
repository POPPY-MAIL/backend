import React from "react";
// import * as S from './styles';

function Letter() {
  return (
    <>
      <div className="letter-box">
        <div className="letter-element" id="to-box">
          <div className="to-txt">To.</div>
          <div className="to-underline"></div>
          <input className="to-contents"></input>
        </div>
        <div className="letter-element" id="contents-box">
          <textarea className="contents-contents"></textarea>
        </div>
        <div className="letter-element" id="from-box">
          <div className="from-txt">From.</div>
          <div className="from-underline"></div>
          <input
            className="from-contents"
            placeholder="*친구가 알아볼 수 있도록 써주세요"
          ></input>
        </div>
      </div>
    </>
  );
}

export default Letter;
