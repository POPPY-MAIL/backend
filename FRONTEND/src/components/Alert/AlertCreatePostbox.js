import React from 'react';
import PartyFaceImg from '../../image/party-face.png'
// import * as S from './styles';

function AlertCretePostbox() {

  return (
    <>
      <div className="alert-create-post-box">
        <img src={PartyFaceImg} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;우체통이 생성되었습니다!
      </div>

    </>
  );
}

export default AlertCretePostbox;
