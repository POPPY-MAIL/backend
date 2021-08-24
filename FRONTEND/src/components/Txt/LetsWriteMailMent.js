import React from 'react';
// import * as S from './styles';

function LetsWriteMailMent() {

    const PopupPoppyMail = () => {
    };

    return (
        <>
            <div className="lets-write-mail-ment-big">
                ㅇㅇㅇ님의 우편함이 도착했습니다! <br></br> ㅇㅇㅇ님에게 언제 도착할 지 모르는 <br></br> 편지를 써주세요.
            </div>
            <div className="lets-write-mail-ment-small" onClick={PopupPoppyMail}>
                파피메일이 뭔가요?
            </div>

        </>
    );
}

export default LetsWriteMailMent;
