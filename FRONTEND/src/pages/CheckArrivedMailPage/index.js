import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import BackBtn from "../../components/Btn/BackBtnDark";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Thumbs, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/thumbs/thumbs.scss";
import "swiper/components/pagination/pagination.scss";
import CheckLetter from "../../components/CheckArrivedLetter";
import LogoNameMyCheckArrivedMail from "../../components/Txt/LogoNameCheckArrivedMail";
import CheckArrivedLetterMent from "../../components/Txt/CheckArrivedMailMent";
import PeopleImg from "../../image/people.png";
import { DropdownButton, Dropdown } from "react-bootstrap";

SwiperCore.use([Thumbs, Pagination]);

function CheckArrivedMail() {
  //   if (loading) return <LoadingScreen />;
  //   if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <S.CheckArrivedMailScene>
        <div className="fullbox-dark">
          <BackBtn></BackBtn>

          <LogoNameMyCheckArrivedMail></LogoNameMyCheckArrivedMail>

          <CheckArrivedLetterMent></CheckArrivedLetterMent>

          <img className="people-img" src={PeopleImg}></img>

          <div>
            <Swiper
              className="service-flow"
              spaceBetween={0}
              slidesPerView={1}
              thumbs
              pagination={{ clickable: true }}
              id="checkarrivedmailswiper"
            >
              <SwiperSlide>
                <CheckLetter></CheckLetter>
              </SwiperSlide>
              <SwiperSlide>
                <CheckLetter></CheckLetter>
              </SwiperSlide>
              <SwiperSlide>
                <CheckLetter></CheckLetter>
              </SwiperSlide>
              <SwiperSlide>
                <CheckLetter></CheckLetter>
              </SwiperSlide>
              <SwiperSlide>
                <CheckLetter></CheckLetter>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </S.CheckArrivedMailScene>
    </>
  );
}

export default CheckArrivedMail;
