import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import logo from "../../photos/logo.png";
import "./swiper.css";

export default function CardsSwiper() {
    return (
        <section className="swiperSection">
            <div className="cards-wrapper">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="cardsSwiper"
                >
                    <SwiperSlide className="card-slide">
                        <div className="fanfic-card">
                            <h1>Vasil</h1>
                            <h2>This is a very good project</h2>
                            <img src={logo} alt="logo" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="card-slide">
                        <div className="fanfic-card">
                            <h1>Anna</h1>
                            <h2>Love this fanfic vibe ✨</h2>
                            <img src={logo} alt="logo" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="card-slide">
                        <div className="fanfic-card">
                            <h1>Mark</h1>
                            <h2>Perfect UI & smooth animations</h2>
                            <img src={logo} alt="logo" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="card-slide">
                        <div className="fanfic-card">
                            <h1>Sofia</h1>
                            <h2>Best place for stories</h2>
                            <img src={logo} alt="logo" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}