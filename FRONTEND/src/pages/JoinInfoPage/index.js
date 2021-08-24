import React, { createContext, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import JoinInfoMent from '../../components/Txt/JoinInfoMent';
import LogoNameJoin from '../../components/Txt/LogoNameJoin';
import CompleteBtn from '../../components/Btn/CompleteBtn';

import * as S from './styles';
import JoinInput from '../../components/JoinInput';

export const UserContext = createContext({
    setNickname: () => { },
    setBirthdate: () => { },
    setGender: () => { },
    setPhone: () => { }
})

function JoinInfoPage() {

    const [nickname, setNickname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const value = useMemo(() => ({ setNickname, setBirthdate, setGender, setPhone }), [setNickname, setBirthdate, setGender, setPhone]);

    const JoinRequest = () => {
        console.log(nickname + birthdate + gender + phone);
        // fetch('http://158.247.195.25/mailbox/', {
        //     method: "POST",
        //     headers: {
        //         'name' : nickname,
        //         'birthdate' : birthdate,
        //         'gender' : gender,
        //         'phone' : phone,
        //     },
        //     body: JSON.stringify({
        //         // access_token: authObj.access_token,
        //     }),
        // })
    };

    return (
        <UserContext.Provider value={value}>
            <S.JoinInfoScene>

                <LogoNameJoin></LogoNameJoin>
                <JoinInfoMent></JoinInfoMent>

                <JoinInput></JoinInput>

                {/* <Link to="/joincomplete"> */}
                {/* <CompleteBtn onClick={test}></CompleteBtn> */}
                <div className="create-post-box-btn" onClick={JoinRequest}>
                    완료
                </div>
                {/* </Link> */}


            </S.JoinInfoScene>
        </UserContext.Provider>
    );
}

export default JoinInfoPage;
