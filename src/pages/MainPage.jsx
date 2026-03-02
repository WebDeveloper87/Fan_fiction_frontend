import React from 'react'
import Header from "../components/Header/Header";
import SwiperSlide from "../components/SwiperSlide/SwiperSlide";
import NextSlide from "../components/SwiperSlide/NextSlide";
import Footer from "../components/Footer/Footer";

function MainPage() {
    return (
        <div><Header/>
            <SwiperSlide/>
            <NextSlide/>
            <Footer/>
        </div>

    )
}

export default MainPage
