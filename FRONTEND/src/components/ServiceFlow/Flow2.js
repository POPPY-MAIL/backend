import React from 'react';
import flow2 from '../../image/service-flow2.png'
// import * as S from './styles';

function Flow2() {

  return (
    <>
     <div className="FlowImg">
            <img src={flow2}></img>
    </div>
    <div className="flow2-txt">
        "요즘 지구인들의 행복 지수가 <br></br> 너무 낮은 것 같아. <br></br> 그래서 내가 뭔가를 하나 발명했어!"
    </div>
    <div className="flow2-deco1"></div>
    <div className="flow2-deco2"></div>

    </>
  );
}

export default Flow2;
