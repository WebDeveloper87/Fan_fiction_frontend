import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import logo from "../../photos/logo.png";
import "./review.css";
import {useState} from "react";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

export default function Review() {

    const [review, setReview] = useState('');
    const { t } = useTranslation();

    const sendReview = (e) => {
        // e.preventDefault();
        // if (!review.trim()) {
        //     toast.error("All fields are required");
        // }
        //
        // const fetchReview = async () => {
        //     try {
        //         const token = localStorage.getItem("JWT_TOKEN");
        //         const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");
        //
        //         if (!token || !access_token) {
        //             toast.error({t('NotLoggedIn')
        //         });
        //         }
        //
        //         const response = await fetch(
        //             `${process.env.REACT_APP_API_URL}review/create`,
        //             {
        //                 method: "GET",
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                     "x-refresh-token" : `${access_token}`,
        //                 },
        //             }
        //         );
        //
        //         const data = await response.json();
        //
        //         if (!response.ok) {
        //             throw new Error(data.message || "User not found");
        //         }
        //
        //         console.log(data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
    }

    return (
        <div className='reviewContent'>
            <form action="">
                <input type="text"  value={review} onChange={(e) => setReview(e.target.value)} />
                <button type='submit' onClick={sendReview}>Send</button>
            </form>
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
        </div>

    );
}