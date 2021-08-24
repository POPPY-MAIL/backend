import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import JoinInfoMent from '../../components/Txt/JoinInfoMent';
import LogoNameJoin from '../../components/Txt/LogoNameJoin';
import CompleteBtn from '../../components/Btn/CompleteBtn';

import * as S from './styles';
import JoinInput from '../../components/JoinInput';

function JoinInfoPage() {
    
    return (
        <>
            <S.JoinInfoScene>

                <LogoNameJoin></LogoNameJoin>
                <JoinInfoMent></JoinInfoMent>

                <JoinInput></JoinInput>

                <Link to="/joincomplete">
                    <CompleteBtn></CompleteBtn>
                </Link>
                

            </S.JoinInfoScene>
        </>
    );
}

export default JoinInfoPage;
