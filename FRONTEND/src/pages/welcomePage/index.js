import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import * as S from './styles';
import LoginBtn from '../../components/Btn/LoginBtn';
import JoinBtn from '../../components/Btn/JoinBtn';
import LogoName from '../../components/Txt/LogoName';
import Poppy from '../../components/Img/Poppy';
import WelcomeMent from '../../components/Txt/WelcomeMent';

function WelcomePage() {

    //   if (loading) return <LoadingScreen />;
    //   if (error) return <div>에러가 발생했습니다.</div>;
    return (
        <>
            <S.WelcomeScene>
                <div className="fullbox">
                    <LogoName></LogoName>
                    <Poppy></Poppy>
                    <WelcomeMent></WelcomeMent>

                    <Link to="/login">
                        <LoginBtn></LoginBtn>
                    </Link>

                    <Link to="/join">
                        <JoinBtn></JoinBtn>
                    </Link>
                </div>

            </S.WelcomeScene>
        </>
    );
}

export default WelcomePage;
