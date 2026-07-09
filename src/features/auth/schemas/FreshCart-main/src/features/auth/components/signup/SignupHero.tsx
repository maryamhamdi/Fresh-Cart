import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserPlus, 
    faShieldHalved, 
    faCircleCheck, 
    faRocket,
    faGift,
    faStar,
    faHeart
} from '@fortawesome/free-solid-svg-icons';

const SignUpHero = () => {
    return (
        <div className="hidden lg:flex flex-col items-center justify-center p-8 xl:p-12 ">
            {/* Illustration */}
            <div className="relative mb-8">
                <div className="w-64 h-64 xl:w-80 xl:h-80 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-200">
                    <FontAwesomeIcon icon={faUserPlus} className="text-white text-7xl xl:text-8xl" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <FontAwesomeIcon icon={faGift} className="text-white text-2xl" />
                </div>
                <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                    <FontAwesomeIcon icon={faStar} className="text-white text-xl" />
                </div>
                <div className="absolute top-1/4 -right-8 w-12 h-12 bg-rose-400 rounded-lg flex items-center justify-center shadow-lg animate-bounce delay-200">
                    <FontAwesomeIcon icon={faHeart} className="text-white text-lg" />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md">
                <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
                    Join Our Community
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Create your account today and unlock exclusive benefits, special offers, and personalized shopping experience.
                </p>

                {/* Trust Features */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faRocket} className="text-purple-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Quick Setup</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Verified</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Safe & Secure</span>
                    </div>
                </div>

                {/* Benefits List */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                        <FontAwesomeIcon icon={faGift} className="text-emerald-500" />
                        <span>Get <span className="font-semibold text-gray-900">20% off</span> your first order</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                        <FontAwesomeIcon icon={faStar} className="text-amber-500" />
                        <span>Earn rewards on every purchase</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpHero;