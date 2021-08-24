import React from 'react';
import ExclamationImg from '../../image/exclamation.png'
// import * as S from './styles';

function AlertNickname() {

  return (
    <>
      <div className="alert-nick-name">
        <img src={ExclamationImg} />
        <div>닉네임은 생성 후 수정이 불가능합니다. 완료하시겠습니까?</div>
      </div>

    </>
  );
}

export default AlertNickname;
