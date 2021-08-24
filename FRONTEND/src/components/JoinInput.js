import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
// import * as S from './styles';

function JoinInput() {

    return (
        <>
            <div className="joininput-name">
                <div className="input-title">
                    이름 </div>
                <textarea className="input-name" placeholder="김파피"></textarea>
            </div>

            <div className="joininput-birth">
                <div className="birth-title">
                    생년월일 </div>
                <textarea className="input-birth" placeholder="20001018"></textarea>
            </div>

            <div className="joininput-sex">
            <div className="sex-title">
                    성별 </div>
                <DropdownButton id="dropdown-basic-button" title="">
                    <Dropdown.Item eventKey="item1">남자</Dropdown.Item>
                    <Dropdown.Item eventKey="item1">여자</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className="joininput-phone">
                <div className="phone-title">
                    핸드폰번호 </div>
                <textarea className="input-phone" placeholder="010-0000-0000"></textarea>
            </div>

        </>
    );
}

export default JoinInput;
