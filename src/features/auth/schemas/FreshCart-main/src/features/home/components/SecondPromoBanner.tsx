import { faHeadset, faRotateLeft, faShieldHalved, faShip, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SecondPromoBanner() {
    return <>
        <div className="">
            <div className="container py-5 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
                    <div className="flex items-center gap-4 shadow-md shadow-primary-100 hover:shadow-primary-200 hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12 flex items-center justify-center bg-primary-200/30 text-primary-600 rounded-full">
                            <FontAwesomeIcon icon={faShippingFast} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Free Shipping</h3>
                            <p className="text-xs text-gray-600">On orders over 500 EGP</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shadow-md shadow-primary-100 hover:shadow-primary-200 hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12 flex items-center justify-center bg-primary-200/30 text-primary-600 rounded-full">
                            <FontAwesomeIcon icon={faRotateLeft} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Easy Returns</h3>
                            <p className="text-xs text-gray-600">14-day return policy</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shadow-md shadow-primary-100 hover:shadow-primary-200 hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12 flex items-center justify-center bg-primary-200/30 text-primary-600 rounded-full">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Secure Payment</h3>
                            <p className="text-xs text-gray-600">100% secure transactions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shadow-md shadow-primary-100 hover:shadow-primary-200 hover:scale-105 transition-all duration-200 py-4 ps-4 rounded-lg bg-transparent">
                        <div className="size-12 flex items-center justify-center bg-primary-200/30 text-primary-600 rounded-full">
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