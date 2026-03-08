import React from 'react'
import Lyrics from "../components/Lyrics/Lyrics";
import CardSwiper from "../components/CardsSwiper/CardSwiper";
import Invocations from "../components/Invocations/Invocations";

function MainPage() {
    return (
        <div>
                <Lyrics/>
                <Invocations/>
                <CardSwiper/>
        </div>

    )
}

export default MainPage
