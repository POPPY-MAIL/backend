import React, { useContext, useState } from 'react';
import { CreatepostboxContext } from '../pages/CreatePostBoxPage1';
// import * as S from './styles';

function InputName() {

    const { setNickname } = useContext(CreatepostboxContext);

    const processNickname = e => {
        setNickname(e.target.value);
    };

    return (
        <>
            <div className="name-or-nickname">
                이름 혹은 닉네임
            </div>
            <input placeholder="친구들이 알아볼 수 있게 닉네임을 써주세요." className="name-or-nickname-input" onChange={processNickname}>
            </input>
            <div className="name-or-nickname-line"></div>

        </>
    );
}

export default InputName;
