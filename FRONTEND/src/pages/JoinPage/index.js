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
    const KakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                // fetch(`${'http://158.247.195.25/account/login/kakao/'}`, {
                //     method: "POST",
                //     body: JSON.stringify({
                //         access_token: authObj.access_token,
                //     }),
                // })
                console.log(authObj);
                // console.log(authObj.access_token);
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
                    const kakao_token = localStorage.getItem("Kakao_token");
                    if (res.access_token) {
                        console.log(res);
                        // alert(res.user_name + "님, poppy mail에 오신 것을 환영합니다!");
                        history.push("/joininfo");
                    }
                })
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
