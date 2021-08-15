import React from 'react';
import * as BsIcons from 'react-icons/bs';
export const SidebarData = [
    {
        title: '마이 페이지',
        path: '/login',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: 'About 파피메일',
        path: '/',
        icon: <BsIcons.BsFillInfoCircleFill />,
        cName: 'nav-text'
    },
    {
        title: '자주 묻는 질문',
        path: '/join',
        icon: <BsIcons.BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: '로그아웃',
        path: '/login',
        icon: <BsIcons.BsEnvelopeFill />,
        cName: 'nav-text'
    }
];