'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from "next/image";
import slider from '../../../assets/images/home-slider-1.png'
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTractor } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';



export default function Slider() {
    return <>
        <section className="slider relative">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                pagination={{ clickable: true }}
                loop={true}
            >
                <SwiperSlide>
                    <div className='py-45 relative h-64 w-full'>
                        <Image
                            src={slider}
                            alt="hero"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 z-10 flex flex-col justify-center text-white bg-linear-to-r from-primary-500/90 via-primary-500/50 to-primary-500/40">
                            <div className='container space-y-4 flex flex-col justify-center' data-aos="fade-up" data-aos-delay="100">
                                <h2 className='text-3xl font-bold max-w-92'>Fresh Products Delivered to your Door</h2>
                                <p>Get 20% off your first order</p>
                                <div className='flex gap-2'>
                                    <Link href={`/shop`}>
                                        <button className="btn px-5 py-2 bg-white text-primary-600/90">Shop Now</button>
                                    </Link>
                                    <Link href={`/shop`}>
                                        <button className="btn px-5 py-2 border-2 border-gray-300/50 text-white bg-transparent">View Deals</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='py-45 relative h-64 w-full'>
                        <Image
                            src={slider}
                            alt="hero"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 z-10 flex flex-col justify-center text-white bg-linear-to-r from-primary-500/90 via-primary-500/50 to-primary-500/40">
                            <div className='container space-y-4 flex flex-col justify-center' data-aos="fade-up" data-aos-delay="100">
                                <h2 className='text-3xl font-bold max-w-64'>Premium Quality Guaranteed</h2>
                                <p>Fresh from farm to your table</p>
                                <div className='flex gap-2'>
                                    <Link href={`/shop`}>
                                        <button className="btn px-5 py-2 bg-white text-blue-600/90">Shop Now</button>
                                    </Link>
                                    <Link href={`/about`}>
                                        <button className="btn px-5 py-2 border-2 border-gray-300/50 text-white bg-transparent">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='py-45 relative h-64 w-full'>
                        <Image
                            src={slider}
                            alt="hero"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 z-10 flex flex-col justify-center text-white bg-linear-to-r from-primary-500/90 via-primary-500/50 to-primary-500/40">
                            <div className='container space-y-4 flex flex-col justify-center' data-aos="fade-up" data-aos-delay="100">
                                <h2 className='text-3xl font-bold max-w-72'>Fast & Free Delivery</h2>
                                <p>Same day delivery available</p>
                                <div className='flex gap-2'>
                                    <Link href={`/shop`}>
                                        <button className="btn px-5 py-2 bg-white text-purple-600/90">Order Now</button>
                                    </Link>
                                    <Link href={`/delivery-info`}>
                                        <button className="btn px-5 py-2 border-2 border-gray-300/50 text-white bg-transparent">Delivery Info</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
            {/* create custome prev and next buttons and use it*/}
            <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white/80 rounded-full size-12 hidden sm:flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronLeft} className='text-primary-400 text-xl' />
            </div>
            <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/90 hover:bg-white/80 rounded-full size-12 hidden sm:flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronLeft} className='text-primary-400 text-xl rotate-180' />
            </div>
        </section>



    </>
}