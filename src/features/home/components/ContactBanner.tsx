import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faEnvelope, faLeaf, faTag, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactBanner() {
    return <>
        <section className="contact-banner container">
            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14 py-10 bg-[#e6e6e6] rounded-3xl
                shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#e6e6e6] rounded-2xl flex items-center justify-center
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <FontAwesomeIcon icon={faEnvelope} className="text-emerald-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Newsletter</h3>
                            <p className="text-xs text-gray-500">50,000+ subscribers</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">Get the Freshest Updates
                            <span className="text-emerald-600"> Delivered Free</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-lg">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2.5 bg-[#e6e6e6] px-4 py-2.5 rounded-full
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <div className="w-7 h-7 bg-[#e6e6e6] rounded-full flex items-center justify-center
                                shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                <FontAwesomeIcon icon={faLeaf} className="text-emerald-600 text-xs" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Fresh Picks Weekly</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-[#e6e6e6] px-4 py-2.5 rounded-full
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <div className="w-7 h-7 bg-[#e6e6e6] rounded-full flex items-center justify-center
                                shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                <FontAwesomeIcon icon={faTruck} className="text-emerald-600 text-xs" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Free Delivery Codes</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-[#e6e6e6] px-4 py-2.5 rounded-full
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <div className="w-7 h-7 bg-[#e6e6e6] rounded-full flex items-center justify-center
                                shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                <FontAwesomeIcon icon={faTag} className="text-emerald-600 text-xs" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Members-Only Deals</span>
                        </div>
                    </div>
                    <form className="pt-2">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-5 pr-5 py-4 bg-[#e6e6e6] rounded-2xl text-gray-800 placeholder-gray-400
                                        shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]
                                        focus:outline-none text-base transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-emerald-700 bg-[#e6e6e6] transition-all duration-300
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                    active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                            >
                                <span>Subscribe</span>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 pl-1">✨ Unsubscribe anytime. No spam, ever.</p>
                    </form>
                </div>

                <div className="lg:col-span-2 lg:pl-8">
                    <div className="h-full flex flex-col justify-center">
                        <div className="bg-[#04194c4b] rounded-3xl p-8 relative overflow-hidden
                            shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                            <div className="relative space-y-5">
                                <div className="inline-block bg-[#e6e6e6] text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full
                                    shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                    📱 MOBILE APP
                                </div>
                                <h3 className="text-2xl font-bold leading-tight text-gray-800">Shop Faster on Our App</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Get app-exclusive deals &amp; 15% off your first order.</p>
                                <div className="flex flex-col gap-3 pt-2">
                                    <a href="#" className="flex items-center gap-3 bg-[#e6e6e6] px-4 py-3 rounded-xl transition-all
                                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                        hover:shadow-[inset_2px_2px_6px_#c5c5c5,inset_-2px_-2px_6px_#ffffff]">
                                        <FontAwesomeIcon icon={faApple} className="text-gray-700" />
                                        <div className="text-left">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Download on</div>
                                            <div className="text-sm font-semibold -mt-0.5 text-gray-800">App Store</div>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 bg-[#e6e6e6] px-4 py-3 rounded-xl transition-all
                                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                        hover:shadow-[inset_2px_2px_6px_#c5c5c5,inset_-2px_-2px_6px_#ffffff]">
                                        <FontAwesomeIcon icon={faGooglePlay} className="text-gray-700" />
                                        <div className="text-left">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Get it on</div>
                                            <div className="text-sm font-semibold -mt-0.5 text-gray-800">Google Play</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 pt-2 text-sm">
                                    <span className="text-yellow-400">★★★★★</span>
                                    <span className="text-gray-500">4.9 • 100K+ downloads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}