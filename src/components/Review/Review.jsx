import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import logo from "../../photos/logo.png";
import "./review.css";
import {useState} from "react";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

export default function Review() {

    const [review, setReview] = useState('');
    const {t} = useTranslation();


    const sendReview = async (e) => {
        e.preventDefault();

        if (!review.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            const token = localStorage.getItem("JWT_TOKEN");
            const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");

            if (!token || !access_token) {
                toast.error(t("NotLoggedIn"));
                return;
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}review/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "x-refresh-token": access_token,
                    },
                    body: JSON.stringify({
                        content: review,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error sending review");
            }


            toast.success("Review sent");
            setReview('')

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <div className='reviewContent'>
            <form action="">
                <p>Leave your comment</p>
                <input type="text" placeholder='Your comment' value={review} onChange={(e) => setReview(e.target.value)}/>
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
                                <img src={logo} alt="logo"/>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                            <div className="fanfic-card">
                                <h1>Anna</h1>
                                <h2>Love this fanfic vibe ✨</h2>
                                <img src={logo} alt="logo"/>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                            <div className="fanfic-card">
                                <h1>Mark</h1>
                                <h2>Perfect UI & smooth animations</h2>
                                <img src={logo} alt="logo"/>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                            <div className="fanfic-card">
                                <h1>Sofia</h1>
                                <h2>Best place for stories</h2>
                                <img src={logo} alt="logo"/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </div>

    );
}