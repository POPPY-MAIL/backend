import React from 'react';
import * as BsIcons from 'react-icons/bs';
import MyPageImg from './Img/MyPageImg';
import AboutImg from './Img/AboutImg';
import FaqImg from './Img/FaqImg';
import LogoutImg from './Img/LogoutImg';

export const SidebarData = [
    {
        title: '마이 페이지',
        path: '/mypage',
        icon: <MyPageImg />,
        cName: 'nav-text'
    },
    {
        title: 'About 파피메일',
        path: '/',
        icon: <AboutImg />,
        cName: 'nav-text'
    },
    {
        title: '자주 묻는 질문',
        path: '/join',
        icon: <FaqImg />,
        cName: 'nav-text'
    },
    {
        title: '로그아웃',
        path: '/login',
        icon: <LogoutImg />,
        cName: 'nav-text'
    }
];