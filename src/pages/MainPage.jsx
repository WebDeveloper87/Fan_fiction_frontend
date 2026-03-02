import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Lyrics from "../components/Lyrics/Lyrics";
import CardSwiper from "../components/CardsSwiper/CardSwiper";
import ReviewButton from "../components/ReviewButton/ReviewButton";
import Invocations from "../components/Invocations/Invocations";

function MainPage() {
    return (
        <div><Header/>
            <Lyrics/>
            <Invocations/>
            <CardSwiper/>
            <ReviewButton/>
            <Footer/>
        </div>

    )
}

export default MainPage
