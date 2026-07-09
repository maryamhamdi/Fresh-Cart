'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faQuestion,
  faHome,
  faShoppingBag,
  faLaptop,
  faTshirt,
  faCouch,
  faFutbol
} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const NotFoundHero = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary-50 to-emerald-50 min-h-screen">
      {/* Illustration */}
      <div className="relative mb-8">
        {/* Main Circle with Cart Icon */}
        <div className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 xl:w-80 xl:h-80 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-primary-200 animate-float">
          <FontAwesomeIcon icon={faShoppingCart} className="text-white text-5xl sm:text-7xl xl:text-8xl" />
        </div>

        {/* Floating Question Marks */}
        <div className="absolute -top-4 -right-4 w-10 h-10 sm:w-16 sm:h-16 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
          <FontAwesomeIcon icon={faQuestion} className="text-white text-lg sm:text-2xl" />
        </div>
        <div className="absolute top-1/4 -left-6 w-8 h-8 sm:w-14 sm:h-14 bg-rose-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
          <FontAwesomeIcon icon={faQuestion} className="text-white text-sm sm:text-xl" />
        </div>
        <div className="absolute -bottom-2 right-8 w-8 h-8 sm:w-12 sm:h-12 bg-emerald-400 rounded-lg flex items-center justify-center shadow-lg animate-bounce delay-150">
          <FontAwesomeIcon icon={faQuestion} className="text-white text-sm sm:text-lg" />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off. Let's get you back on track with our popular sections.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link href="/"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>

          </Link>
          <Link href="/platform/shop"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold hover:bg-primary-50 hover:scale-105 transition-all">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Shop Now</span>

          </Link>
        </div>

        {/* Popular Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/platform/electronics"
            className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
              <FontAwesomeIcon icon={faLaptop} className="text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Electronics</span>

          </Link>
          <Link href="/platform/mens-fashion"
            className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-pink-200 transition-colors">
              <FontAwesomeIcon icon={faTshirt} className="text-pink-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Fashion</span>

          </Link>
          <Link href="/platform/home"
            className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-amber-200 transition-colors">
              <FontAwesomeIcon icon={faCouch} className="text-amber-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Home & Living</span>

          </Link>
          <Link href="/platform/sports"
            className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
              <FontAwesomeIcon icon={faFutbol} className="text-green-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Sports</span>

          </Link>
        </div>
      </div>

      <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .delay-150 {
                    animation-delay: 150ms;
                }
            `}</style>
    </div>
  );
};

export default NotFoundHero;