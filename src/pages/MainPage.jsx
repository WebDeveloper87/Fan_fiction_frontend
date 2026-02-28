import React from 'react'
import Header from "../components/Header/Header";
import NextSlide from "../components/SwiperSlide/NextSlide";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Lyrics from "../components/Lyrics/Lyrics";

function MainPage() {
    return (
        <div>
            <Header/>
            <Lyrics/>
            {/*<SwiperSlide/>*/}
            <NextSlide/>
            <Outlet/>
            <Footer/></div>
    )
}

export default MainPage
    ``