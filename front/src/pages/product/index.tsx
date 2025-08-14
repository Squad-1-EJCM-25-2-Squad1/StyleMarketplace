import Header from "../../components/header";
import noImage from "../../assets/home/noImage.png";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Imports de estilos da bilbioteca de carrossel swiper
// Por algum motivo dá como erro mas não funcionam os estilos sem isso ¯\_(ツ)_/¯
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ItemCard from "../../components/itemCard";

export default function Product(){

    return(
        <div className="flex flex-col">
            <Header/>

            <main className="relative flex flex-col py-8 px-4">
                <nav className="text-gray-500 text-sm font-normal mb-8">
                    <ol className="flex gap-1">
                        <li><button className="cursor-pointer">Home /</button></li>
                        <li><button className="cursor-pointer">Sale /</button></li>
                        <li className="text-gray-950"><button className="cursor-pointer"> Premium Cotton T-shirt</button></li>
                    </ol>
                </nav>

                <div className="w-85 mx-auto">
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide><ItemCard image={noImage} discount={41}/></SwiperSlide>
                        <SwiperSlide><ItemCard image={noImage} discount={41}/></SwiperSlide>
                        <SwiperSlide><ItemCard image={noImage} discount={41}/></SwiperSlide>
                        <SwiperSlide><ItemCard image={noImage} discount={41}/></SwiperSlide>
                    </Swiper>
                </div>
            </main>
        </div>
    )
}