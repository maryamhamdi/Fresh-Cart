import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRightToBracket, 
    faShieldHalved, 
    faCircleCheck, 
    faFingerprint,
    faUserShield,
    faBolt,
    faLock
} from '@fortawesome/free-solid-svg-icons';

const SignInHero = () => {
    return (
        <div className="hidden lg:flex flex-col items-center justify-center p-8 xl:p-12 ">
            {/* Illustration */}
            <div className="relative mb-8">
                <div className="w-64 h-64 xl:w-80 xl:h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-200">
                    <FontAwesomeIcon icon={faRightToBracket} className="text-white text-7xl xl:text-8xl" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-white text-2xl" />
                </div>
                <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                    <FontAwesomeIcon icon={faFingerprint} className="text-white text-xl" />
                </div>
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg animate-bounce delay-150">
                    <FontAwesomeIcon icon={faUserShield} className="text-white text-lg" />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md">
                <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
                    Welcome Back!
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Sign in to your account to continue shopping and manage your orders. Your security is our priority.
                </p>

                {/* Trust Features */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-indigo-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Secure Login</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faBolt} className="text-emerald-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Fast Access</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                            <FontAwesomeIcon icon={faLock} className="text-purple-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">Protected</span>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600">
                        <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-500 mr-2" />
                        Trusted by over <span className="font-semibold text-gray-900">10,000+</span> happy customers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInHero;