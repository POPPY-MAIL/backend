import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import Navbar from '../../components/Navbar';
import LogoNameHowto from '../../components/Txt/LogoNameHowto';
import BackBtn from '../../components/Btn/BackBtn';


function HowToPage() {

    //   if (loading) return <LoadingScreen />;
    //   if (error) return <div>에러가 발생했습니다.</div>;
    return (
        <>
            <S.HowToScene>
                <div className="fullbox">
                    <Link to="/">
                        <BackBtn></BackBtn>
                    </Link>
                    <Navbar></Navbar>

                    <LogoNameHowto></LogoNameHowto>
                </div>

            </S.HowToScene>
        </>
    );
}

export default HowToPage;
