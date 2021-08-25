import { React, useState } from "react";
import poppyImg from "../../image/poppy.png";
import cancelImg from "../../image/cancel.png";
// import * as S from './styles';

function LetsWriteMailMent() {
  //   var _article = null;
  const [_article, setArticle] = useState(null);
  const [popupwhatispoppymail, setPopupwhatispoppymail] = useState(false);

  const PopupPoppyMail = () => {
    setArticle(
      <div>
        <div className="whatispoppymail-box">
          <div className="whatispoppymail-title">파피메일이란?</div>
          <img className="popuppoppy" src={poppyImg}></img>
          <div className="whatispoppymail-desc">
            편지를 쓰면 나, 파피의 발명품<br></br>
            "타임메일머신"을 통해 편지가 전해진단<br></br> 다! 재밌는 건, 언제
            도착할지는 아무도 <br></br> 모른다는 점이야!<br></br>
            그래도 걱정은 마, 도착하지 않은 적은 <br></br> 아직 한 번도
            없으니까!
          </div>
        </div>
        <img
          className="cancelimg"
          src={cancelImg}
          onClick={PopdownPoppyMail}
        ></img>
      </div>
    );
  };

  const PopdownPoppyMail = () => {
    setArticle(null);
  };

  return (
    <>
      {_article}
      <div className="lets-write-mail-ment-big">
        ㅇㅇㅇ님의 우편함이 도착했습니다! <br></br> ㅇㅇㅇ님에게 언제 도착할 지
        모르는 <br></br> 편지를 써주세요.
      </div>
      <div className="lets-write-mail-ment-small" onClick={PopupPoppyMail}>
        파피메일이 뭔가요?
      </div>
    </>
  );
}

export default LetsWriteMailMent;
