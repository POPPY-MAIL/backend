import React, { useContext, useState } from "react";
import { UserContext } from "../pages/JoinInfoPage";
import { DropdownButton, Dropdown } from "react-bootstrap";
// import * as S from './styles';

function JoinInput() {
  // const [name, setName] = useState("");
  // const [birthdate, setBirthdate] = useState("");
  // const [gender, setGender] = useState("");
  // const [phone, setPhone] = useState("");
  const { setName, setBirthdate, setGender, setPhone } =
    useContext(UserContext);

  const processName = e => {
    setName(e.target.value);
  };

  const processBirthdate = e => {
    setBirthdate(e.target.value);
  };

  const setMan = e => {
    setGender("남");
  };

  const setWoman = e => {
    setGender("여");
  };

  const setNone = e => {
    setGender("");
  };

  const processPhone = e => {
    setPhone(e.target.value);
  };

  return (
    <>
      <div className="joininput-name">
        <div className="input-title">이름 </div>
        <input
          className="input-name"
          placeholder="김파피"
          onChange={processName}
        ></input>
      </div>

      <div className="joininput-birth">
        <div className="birth-title">생년월일 </div>
        <input
          className="input-birth"
          placeholder="20001018"
          onChange={processBirthdate}
        ></input>
      </div>

      <div className="joininput-sex">
        <div className="sex-title">성별 </div>
        <DropdownButton id="dropdown-basic-button" title="남">
          <Dropdown.Item eventKey="item1" onClick={setMan}>
            남
          </Dropdown.Item>
          <Dropdown.Item eventKey="item2" onClick={setWoman}>
            여
          </Dropdown.Item>
          <Dropdown.Item eventKey="item2" onClick={setNone}>
            선택하지 않음
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="joininput-phone">
        <div className="phone-title">핸드폰번호 </div>
        <input
          className="input-phone"
          placeholder="01000000000"
          onChange={processPhone}
        ></input>
      </div>
    </>
  );
}

export default JoinInput;
