import React from 'react';
// import * as S from './styles';
import { Link, useHistory } from 'react-router-dom';
import backbtnImg from '../../image/back-btn.png'

function BackBtn({History}) {

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="back-btn"><img onClick={goBack} src={backbtnImg}></img></div>
    </>
  );
}

export default BackBtn;
