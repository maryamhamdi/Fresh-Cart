'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '@/src/components/shared/product.cart'
import { Product } from '../types/productsResponseType'

import 'swiper/css'
import 'swiper/css/navigation'

interface RelevantProductsProps {
    products: Product[]
    title?: string
}

export default function RelevantProducts({ products, title = "You May Also Like" }: RelevantProductsProps) {
    if (!products || products.length === 0) return null

    // Split the title to style last word differently
    const titleParts = title.split(' ')
    const lastWord = titleParts.pop()
    const firstPart = titleParts.join(' ')

    return (
        <section className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
            {/* Section Background */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                            <FontAwesomeIcon icon={faWandSparkles} className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                            {firstPart} <span className="text-emerald-600">{lastWord}</span>
                        </h2>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                        <button 
                            className="relevant-prev h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Previous products"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                            className="relevant-next h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Next products"
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                    </div>
                </div>

                {/* Products Carousel */}
                <div className="overflow-hidden rounded-xl">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.relevant-next',
                            prevEl: '.relevant-prev',
                        }}
                        spaceBetween={12}
                        slidesPerView={1}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 14,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                        className="!overflow-hidden"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product._id} className="!h-auto">
                                <ProductCard productInfo={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
