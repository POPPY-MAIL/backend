import React from 'react';
import flow4 from '../../image/service-flow4.png'
// import * as S from './styles';

function Flow4() {

  return (
    <>
     <div className="FlowImg">
            <img src={flow4}></img>
    </div>
    <div className="flow4-txt">
        "이 링크를 친구들에게 전달하면, <br></br> 친구들이 네게 편지를 쓸 수 있어!"
    </div>
    <div className="flow4-deco1"></div>

    </>
  );
}

export default Flow4;
