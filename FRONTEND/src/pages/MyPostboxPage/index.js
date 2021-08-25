import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import Navbar from "../../components/NavbarDark";
import BackBtn from "../../components/Btn/BackBtnDark";
import LogoNameMyPostbox from "../../components/Txt/LogoNameMyPostbox";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Thumbs, Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/thumbs/thumbs.scss";
import "swiper/components/pagination/pagination.scss";
import MyPostboxItem from "../../components/MyPostboxItem";
import AlertCopyWhite from "../../components/Alert/AlertCopyWhite";

SwiperCore.use([Thumbs, Pagination, Autoplay]);

function MyPostbox() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.MyPostboxScene>
        <div className="fullbox-dark">
          <BackBtn></BackBtn>
          <Navbar></Navbar>

          <LogoNameMyPostbox></LogoNameMyPostbox>

          <AlertCopyWhite></AlertCopyWhite>

          <div>
            <Swiper
              className="service-flow"
              spaceBetween={0}
              slidesPerView={1}
              thumbs
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              id="mypostboxswiper"
            >
              <SwiperSlide>
                <MyPostboxItem></MyPostboxItem>
              </SwiperSlide>
              <SwiperSlide>
                <MyPostboxItem></MyPostboxItem>
              </SwiperSlide>
              <SwiperSlide>
                <MyPostboxItem></MyPostboxItem>
              </SwiperSlide>
              <SwiperSlide>
                <MyPostboxItem></MyPostboxItem>
              </SwiperSlide>
              <SwiperSlide>
                <MyPostboxItem></MyPostboxItem>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </S.MyPostboxScene>
    </>
  );
}

export default MyPostbox;
