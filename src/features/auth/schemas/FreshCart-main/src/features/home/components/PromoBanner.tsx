import { faHeadset, faRotateLeft, faShieldHalved, faShip, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeturesInfo() {
    return <>
        <div className="bg-gray-50">
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="flex group items-center gap-4 shadow-sm hover:shadow-lg shadow-primary-100 hover:scale-102 transition-all duration-200 py-4 ps-4 rounded-lg bg-white">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-400/40 transition-all duration-100 flex items-center justify-center bg-blue-200/20 text-blue-500 rounded-full">
                            <FontAwesomeIcon icon={faShippingFast} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Free Shipping</h3>
                            <p className="text-xs text-gray-600">On orders over 500 EGP</p>
                        </div>
                    </div>
                    <div className="flex group items-center gap-4 shadow-sm hover:shadow-lg shadow-primary-100 hover:scale-102 transition-all duration-200 py-4 ps-4 rounded-lg bg-white">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary-400/40 transition-all duration-100 flex items-center justify-center bg-primary-200/20 text-primary-500 rounded-full">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Secure Payment</h3>
                            <p className="text-xs text-gray-600">100% secure transactions</p>
                        </div>
                    </div>
                    <div className="flex group items-center gap-4 shadow-sm hover:shadow-lg shadow-primary-100 hover:scale-102 transition-all duration-200 py-4 ps-4 rounded-lg bg-white">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-orange-400/40 transition-all duration-100 flex items-center justify-center bg-orange-200/20 text-orange-500 rounded-full">
                            <FontAwesomeIcon icon={faRotateLeft} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Easy Returns</h3>
                            <p className="text-xs text-gray-600">14-day return policy</p>
                        </div>
                    </div>
                    <div className="flex group items-center gap-4 shadow-sm hover:shadow-lg shadow-primary-100 hover:scale-102 transition-all duration-200 py-4 ps-4 rounded-lg bg-white">
                        <div className="size-12  group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-400/40 transition-all duration-100 flex items-center justify-center bg-purple-200/20 text-purple-500 rounded-full">
                            <FontAwesomeIcon icon={faHeadset} className="text-lg" />
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