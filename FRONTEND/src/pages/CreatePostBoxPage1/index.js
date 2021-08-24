import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import Navbar from '../../components/Navbar';
import LogoNameCreatePostBox from '../../components/Txt/LogoNameCreatePostBox';
import BackBtn from '../../components/Btn/BackBtn';
import CompleteBtn from '../../components/Btn/CompleteBtn';
import InputName from '../../components/InputName'
import AlertNickname from '../../components/Alert/AlertNickname';


function CreatePostBoxPage1() {

    //   if (loading) return <LoadingScreen />;
    //   if (error) return <div>에러가 발생했습니다.</div>;
    return (
        <>
            <S.CreatePostBoxScene>
                <div className="fullbox">
                        <BackBtn></BackBtn>
                    <Navbar></Navbar>

                    <LogoNameCreatePostBox></LogoNameCreatePostBox>

                    <InputName></InputName>

                    <AlertNickname></AlertNickname>

                    <Link to="/createpostboxsteptwo">
                        <CompleteBtn></CompleteBtn>
                    </Link>

                </div>

            </S.CreatePostBoxScene>
        </>
    );
}

export default CreatePostBoxPage1;
