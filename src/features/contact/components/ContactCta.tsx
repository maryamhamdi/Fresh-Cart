import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
export default function ContactCta() {
    return (
        <div className="mt-12 bg-[#e6e6e6] rounded-2xl p-8 sm:p-12 text-center
            shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Need Immediate Assistance?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="tel:+201234567890"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#e6e6e6] text-emerald-700 rounded-xl font-medium transition-all
                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                        active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                >
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                    Call Us Now
                </a>
                <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#e6e6e6] text-gray-700 rounded-xl font-medium transition-all
                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                        active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}