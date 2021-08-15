import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs, Pagination } from 'swiper';
import "swiper/swiper.scss";
import "swiper/components/thumbs/thumbs.scss"
import "swiper/components/pagination/pagination.scss"

import * as S from './styles';
import Navbar from '../../components/Navbar';
import LogoNameHowto from '../../components/Txt/LogoNameHowto';
import BackBtn from '../../components/Btn/BackBtn';
import Flow1 from '../../components/ServiceFlow/Flow1';
import Flow2 from '../../components/ServiceFlow/Flow2';
import Flow3 from '../../components/ServiceFlow/Flow3';
import Flow4 from '../../components/ServiceFlow/Flow4';
import Flow5 from '../../components/ServiceFlow/Flow5';

SwiperCore.use([Thumbs ,Pagination])


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

                    <div>
                        <Swiper className="service-flow" spaceBetween={0} slidesPerView={1} thumbs pagination={{ clickable: true }}>
                            <SwiperSlide><Flow1></Flow1></SwiperSlide>
                            <SwiperSlide><Flow2></Flow2></SwiperSlide>
                            <SwiperSlide><Flow3></Flow3></SwiperSlide>
                            <SwiperSlide><Flow4></Flow4></SwiperSlide>
                            <SwiperSlide><Flow5></Flow5></SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            </S.HowToScene>
        </>
    );
}

export default HowToPage;
