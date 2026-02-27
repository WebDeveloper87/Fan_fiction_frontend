import React from 'react'
import { Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SwiperSlide from "../SwiperSlide/SwiperSlide";
import NextSlide from "../SwiperSlide/NextSlide"
function MainPage() {
    return (
        <div>

            <Header />
            <SwiperSlide/>
            <NextSlide/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainPage;