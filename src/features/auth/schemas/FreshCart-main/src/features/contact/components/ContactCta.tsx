import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function ContactCta() {
    return (
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Need Immediate Assistance?
            </h2>
            <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
                Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                    href="tel:+201234567890"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                >
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                    Call Us Now
                </a>
                <Link 
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}
