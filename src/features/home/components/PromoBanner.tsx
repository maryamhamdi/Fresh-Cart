import { faHeadset, faRotateLeft, faShieldHalved, faShip, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeturesInfo() {
    return <>
        <div className="bg-[#e6e6e6]">
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="flex group items-center gap-4 shadow-md hover:shadow-[#004643] hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12 flex items-center justify-center bg-blue-200/20 text-blue-500  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-400/40 transition-all duration-10 rounded-full">
                            <FontAwesomeIcon icon={faShippingFast} className="text-lg text-[#2b7fff]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Free Shipping</h3>
                            <p className="text-xs text-gray-600">On orders over 500 EGP</p>
                        </div>
                    </div>
                     <div className="flex group items-center gap-4 shadow-md hover:shadow-[#004643] hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-green-400/40 transition-all duration-100 flex items-center justify-center bg-green-200/20 text-green-500 rounded-full">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-lg text-[rgb(99, 230, 190)]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Secure Payment</h3>
                            <p className="text-xs text-gray-600">100% secure transactions</p>
                        </div>
                    </div>
                    <div className="flex group items-center gap-4 shadow-md hover:shadow-[#004643] hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-orange-400/40 transition-all duration-100 flex items-center justify-center bg-orange-200/20 text-orange-500 rounded-full">
                            <FontAwesomeIcon icon={faRotateLeft} className="text-lg text-[rgb(255, 105, 0)]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Easy Returns</h3>
                            <p className="text-xs text-gray-600">14-day return policy</p>
                        </div>
                    </div>
                    <div className="flex group items-center gap-4 shadow-md hover:shadow-[#004643] hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-400/40 transition-all duration-100 flex items-center justify-center bg-purple-300/20 text-purple-500 rounded-full">
                            <FontAwesomeIcon icon={faHeadset} className="text-lg text-[#ad46ff]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">24/7 Support</h3>
                            <p className="text-xs text-gray-600">Dedicated support team</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}