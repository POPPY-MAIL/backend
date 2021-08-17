import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import Navbar from '../../components/Navbar';
import BackBtn from '../../components/Btn/BackBtn';
import GoHomeBtn from '../../components/Btn/GoHomeBtn';
import LogoNameKakaoPlus from '../../components/Txt/LogoNameKakaoPlus';
import KakaoPlusMent from '../../components/Txt/KakaoPlusMent';
import KakaoPlusImg from '../../components/Img/KakaoPlusImg';


function KakaoPlus() {

    //   if (loading) return <LoadingScreen />;
    //   if (error) return <div>에러가 발생했습니다.</div>;
    return (
        <>
            <S.KakaoPlusScene>
                <div className="fullbox">
                    <Link to="/">
                        <BackBtn></BackBtn>
                    </Link>
                    <Navbar></Navbar>

                    <LogoNameKakaoPlus></LogoNameKakaoPlus>

                    <KakaoPlusMent></KakaoPlusMent>

                    <KakaoPlusImg></KakaoPlusImg>

                    <GoHomeBtn></GoHomeBtn>
                    

                </div>

            </S.KakaoPlusScene>
        </>
    );
}

export default KakaoPlus;
