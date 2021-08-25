import React from "react";
// import * as S from './styles';

function Colorbar() {
  return (
    <>
      <div className="colorbar-box">
        <div className="colorbar-element" id="red"></div>
        <div className="colorbar-element" id="yellow"></div>
        <div className="colorbar-element" id="green"></div>
        <div className="colorbar-element" id="navy"></div>
        <div className="colorbar-element" id="gray"></div>
        <div className="colorbar-element" id="lightgray"></div>
      </div>
    </>
  );
}

export default Colorbar;
