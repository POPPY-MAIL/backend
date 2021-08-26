import React, { createContext, useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";

import * as S from "./styles";
import Navbar from "../../components/Navbar";
import LogoNameCreatePostBox from "../../components/Txt/LogoNameCreatePostBox";
import BackBtn from "../../components/Btn/BackBtn";
import CompleteBtn from "../../components/Btn/CompleteBtn";
import InputName from "../../components/InputName";
import AlertNickname from "../../components/Alert/AlertNickname";

export const CreatepostboxContext = createContext({
  setNickname: () => {},
});

function CreatePostBoxPage1() {
  const history = useHistory();
  const [_alert, setAlert] = useState(null);

  const [nickname, setNickname] = useState("");
  const value = useMemo(() => ({ setNickname }), [setNickname]);

  // const AlertNicknameComplete = () => {

  // }

  const CreatepostboxRequest2 = () => {
    history.push("/createpostboxsteptwo");
  };

  const CreatepostboxRequest = () => {
    if (nickname === "") {
      alert("필수 입력 요소가 작성되지 않았습니다 ... 알림창 만드러야댐");
    } else {
      //   alert(nickname);
      setAlert(
        <div>
          <AlertNickname></AlertNickname>
          <div className="create-post-box-btn" onClick={CreatepostboxRequest2}>
            완료
          </div>
        </div>
      );
      //   history.push("/createpostboxsteptwo");
    }
    // fetch('http://158.247.195.25/sign_in/', {
    //     method: "POST",
    //     headers: {

    //     },
    //     body: JSON.stringify({
    //         'name': name,
    //         'birthdate': birthdate,
    //         'gender': gender,
    //         'phone': phone,
    //     }),
    // })
    //     .then(res => res.json())
    //     .then(res => {
    //         // localStorage.setItem("Kakao_token", res.access_token);
    //         // const kakao_token = localStorage.getItem("Kakao_token");
    //         if (res) {
    //             console.log(res);
    //             // alert(res.user_name + "님, poppy mail에 오신 것을 환영합니다!");
    //             // history.push("/joininfo");
    //         }
    //     })
  };

  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <CreatepostboxContext.Provider value={value}>
      <S.CreatePostBoxScene>
        <div className="fullbox">
          <BackBtn></BackBtn>
          <Navbar></Navbar>

          <LogoNameCreatePostBox></LogoNameCreatePostBox>

          <InputName></InputName>

          <div className="create-post-box-btn" onClick={CreatepostboxRequest}>
            완료
          </div>

          {_alert}
        </div>
      </S.CreatePostBoxScene>
    </CreatepostboxContext.Provider>
  );
}

export default CreatePostBoxPage1;
