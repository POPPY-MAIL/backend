import React from 'react';
import poppyImg from '../../image/poppy.png'
import poppyArrowImg from '../../image/poppy-arrow.png'
import BirdArrowImg from '../../image/bird-arrow.png'
// import * as S from './styles';

function Poppy() {

  return (
    <>
      <div className="poppy">
        <img src={poppyImg}></img>
      </div>
      <div className="poppy-tag">파피</div>
      <img className="poppy-tag-img" src={poppyArrowImg}></img>
      <div className="bird-tag">펠릭스</div>
      <img className="bird-tag-img" src={BirdArrowImg}></img>

    </>
  );
}

export default Poppy;
