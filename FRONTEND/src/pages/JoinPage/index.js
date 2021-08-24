import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as S from './styles';
import LogoNameJoin from '../../components/Txt/LogoNameJoin';
import BackBtn from '../../components/Btn/BackBtn';
import JoinMent from '../../components/Txt/JoinMent';
import KakaobtnImg from '../../image/kakao_login.png';
import JoinWithKakao from '../../components/Txt/JoinWithKakao';

const { Kakao } = window;

function JoinPage() {

    const history = useHistory()
    // const KakaoLoginClickHandler = () => {
    //     Kakao.Auth.login({
    //         success: function (authObj) {
    //             fetch(`${'요청보낼 벡엔드 서버 url'}`, {
    //                 method: "POST",
    //                 body: JSON.stringify({
    //                     access_token: authObj.access_token,
    //                 }),
    //             })

    //             .then(res => res.json())
    //             .then(res => {
    //                 localStorage.setItem("Kakao_token", res.access_token);
    //                 if (res.access_token) {
    //                     alert("poppy mail에 오신 것을 환영합니다!")
    //                     history.push("/login");
    //                 }
    //             })
    //         },
    //         fail: function(error) {
    //             alert(JSON.stringify(error))
    //         },
    //     })
    // }

    const KakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            success: function (response) {
                console.log(response);
                history.push("/joininfo");
            },
            fail: function(error) {
                alert(JSON.stringify(error))
            },
        })
    }
    return (
        <>
            <S.JoinScene>
                    <BackBtn></BackBtn>
                    <LogoNameJoin></LogoNameJoin>
                

                <JoinMent></JoinMent>
            </S.JoinScene>

            <JoinWithKakao></JoinWithKakao>

            <S.KakaoBtn onClick={KakaoLoginClickHandler}>
                    <img src={KakaobtnImg} className="KakaobtnImg"/>
            </S.KakaoBtn>
        </>
    );
}

export default JoinPage;
