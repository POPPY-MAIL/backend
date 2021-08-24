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
    const KakaoLoginClickHandler = () => {
        history.push("/howto");
        Kakao.Auth.login({
            success: function (authObj) {
                // fetch(`${'http://158.247.195.25/account/login/kakao/'}`, {
                //     method: "POST",
                //     body: JSON.stringify({
                //         access_token: authObj.access_token,
                //     }),
                // })
                fetch('http://158.247.195.25/account/login/kakao/', {
                    method: "POST",
                    headers: {
                        // 'Authorization' : 'SkNi7ptE9aIrTY-MxBudk1PRPPshudyD-2Lbugopb1UAAAF7d0-yHQ',
                        'Authorization' : authObj.access_token,
                    },
                    body: JSON.stringify({
                        access_token: authObj.access_token,
                    }),
                })

                .then(res => res.json())
                .then(res => {
                    localStorage.setItem("Kakao_token", res.access_token);
                    if (res.access_token) {
                        console.log(res);
                        alert(res.user_name + "님, poppy mail에 오신 것을 환영합니다!");
                        history.push("/howto");
                        // window.location.href="/howto";
                        
                    }
                })
            },
            fail: function(error) {
                alert(JSON.stringify(error))
            },
        })
    }

    // const KakaoLoginClickHandler = () => {
    //     Kakao.Auth.login({
    //         success: function (response) {
    //             console.log(response);
    //             history.push("/howto");
    //         },
    //         fail: function(error) {
    //             alert(JSON.stringify(error))
    //         },
    //     })
    // }
    
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
