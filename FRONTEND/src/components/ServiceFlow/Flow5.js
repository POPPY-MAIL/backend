import React from 'react';
import flow5 from '../../image/service-flow5.png'
// import * as S from './styles';

function Flow5() {

  return (
    <>
     <div className="FlowImg">
            <img src={flow5}></img>
    </div>
    <div className="flow5-txt">
        "사실 이 기계의 가장 설레는 점은 <br></br> 언제 도착할지 모른다는거지! <br></br> 타임머신인데 랜덤이라니 오류 아니냐고? <br></br> 아하하..."
    </div>
    <div className="flow5-deco1"></div>

    </>
  );
}

export default Flow5;
