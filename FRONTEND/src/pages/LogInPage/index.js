import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as S from './styles';
import LogoNameLogin from '../../components/Txt/LogoNameLogin';
import BackBtn from '../../components/Btn/BackBtn';
import LoginMent from '../../components/Txt/LoginMent';
import KakaobtnImg from '../../image/kakao_login.png';
import LoginWithKakao from '../../components/Txt/LoginWithKakao';

const { Kakao } = window;

function LogInPage() {

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
                history.push("/howto");
            },
            fail: function(error) {
                alert(JSON.stringify(error))
            },
        })
    }
    
    return (
        <>
            <S.LogInScene>
                    <BackBtn></BackBtn>

                <LogoNameLogin></LogoNameLogin>
                <LoginMent></LoginMent>

                <LoginWithKakao></LoginWithKakao>

                <S.KakaoBtn onClick={KakaoLoginClickHandler}>
                    <img src={KakaobtnImg} className="KakaobtnImg"/>
                </S.KakaoBtn>
            </S.LogInScene>
        </>
    );
}

export default LogInPage;
