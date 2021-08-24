import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import Navbar from '../../components/NavbarDark';
import BackBtn from '../../components/Btn/BackBtnDark';
import LogoNameReceivedLetter from '../../components/Txt/LogoNameReceivedLetter';
import ReceivedLetterMent from '../../components/Txt/ReceivedLetterMent';
import ReceivedLetterPoppyImg from '../../image/ReceivedLetterPoppy.png';
import KakaoPlusImg from '../../image/kakao_plus.png'


function ReceivedLetterPage() {

    //   if (loading) return <LoadingScreen />;
    //   if (error) return <div>에러가 발생했습니다.</div>;
    return (
        <>
            <S.ReceivedLetterScene>
                <div className="fullbox-dark">
                        <BackBtn></BackBtn>
                    <Navbar></Navbar>

                    <LogoNameReceivedLetter></LogoNameReceivedLetter>

                    <ReceivedLetterMent></ReceivedLetterMent>

                    <div className="ReceivedLetterPoppy">
                        <img src={ReceivedLetterPoppyImg} />
                    </div>

                    <div className="kakaoplus-desc">
                        아직 추가하지 않았다면,
                    </div>

                    <div className="kakaoplus-received-letter-page">
                        <img src={KakaoPlusImg} />
                    </div>
                    

                </div>

            </S.ReceivedLetterScene>
        </>
    );
}

export default ReceivedLetterPage;
