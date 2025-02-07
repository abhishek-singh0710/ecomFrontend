/* eslint-disable no-unused-vars */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// Import Swiper styles
import 'swiper/css';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
const HeroBanner = () => {

    // Automatically Generating The Classes colors[i] in the SwiperSlide Based On The Colors(color1,color2,color3) Provided
    // In The Tailwind.config.js 
    const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

  return (
    <div className='py-2 rounded-md'>
        <Swiper 
            grabCursor={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation 
            modules={[Pagination, EffectFade, Navigation, Autoplay]}
            pagination={{clickable: true}}
            scrollbar={{ draggable:true}}
            slidesPerView={1} >

            {bannerLists.map((item,i) => (
                <SwiperSlide key={i}>
                    <div className={`carousel-item rounded-md sm:h-[390px] h-96 ${colors[i]}`}>
                        <div className='flex items-center justify-evenly'>

                        <div className='lg:flex justify-center w-1/2 p-8'>
                            <div className='text-center'>
                                <h3 className='md:text-5xl text-3xl text-white font-bold'>{item.title}</h3>

                                <h1 className='md:text-4xl text-5xl text-white font-bold mt-2'>{item.subtitle}</h1>

                                <p className='md:text-2xl text-white font-bold mt-4'>{item.description}</p>

                                <Link 
                                    className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 md:h-10 md:w-36'
                                    to="/products">Shop</Link>
                            </div>
                        </div>

                        <div className='w-full flex justify-center lg:w-1/3 p-4'>
                            <img src={item?.image} />
                        </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
};

export default HeroBanner;