import {A11y, Navigation, Pagination, Scrollbar} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{clickable: true}}
            scrollbar={{draggable: true}}
        >

            <SwiperSlide> <img src={} alt={}/> </SwiperSlide>
            <SwiperSlide><img src={} alt={}/></SwiperSlide>
            <SwiperSlide><img src={} alt={}/></SwiperSlide>
            <SwiperSlide><img src={} alt={}/></SwiperSlide>
        </Swiper>
    );
};