import { React } from 'react';
import { useSwiper } from 'swiper/react';

export default function NextSlide() {
    const swiper = useSwiper();

    return (
        <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
    );
}
