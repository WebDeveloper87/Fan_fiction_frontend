import React from 'react'
import Lyrics from "../components/Lyrics/Lyrics";
import Invocations from "../components/Invocations/Invocations";
import Review from "../components/Review/Review";

function MainPage() {
    return (
        <div>
                <Lyrics/>
                <Invocations/>
                <Review/>
        </div>

    )
}

export default MainPage
