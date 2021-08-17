import React from 'react';
// import * as S from './styles';

function InputName() {

    return (
        <>
            <div className="name-or-nickname">
                이름 혹은 닉네임
            </div>
            <textarea placeholder="친구들이 알아볼 수 있게 닉네임을 써주세요." className="name-or-nickname-input">
            </textarea>
            <div className="name-or-nickname-line"></div>

        </>
    );
}

export default InputName;
