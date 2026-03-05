import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import logo from "../../photos/logo.png";
import "./swiper.css";

export default function CardsSwiper() {
    return (
        <div className="cards-wrapper">
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="cardsSwiper"
            >
                <SwiperSlide className="card-slide">
                    <div className="fanfic-card"> <h1>Vasil</h1> <h2>This is a very good project</h2><img src={logo} alt={"logo"}/></div>
                </SwiperSlide>

                <SwiperSlide className="card-slide">
                    <div className="fanfic-card"><img src={logo} alt={"logo"}/></div>
                </SwiperSlide>

                <SwiperSlide className="card-slide">
                    <div className="fanfic-card"><img src={logo} alt={"logo"}/></div>
                </SwiperSlide>

                <SwiperSlide className="card-slide">
                    <div className="fanfic-card"><img src={logo} alt={"logo"}/></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}