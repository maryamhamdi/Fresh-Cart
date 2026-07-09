import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
export default function ContactHero() {
    return (
        <div className="bg-[#e6e6e6] py-12 sm:py-16 shadow-[inset_0_-6px_12px_rgba(0,0,0,0.04)]">
            <div className="container mx-auto px-4 text-center">
                <span className="inline-flex items-center justify-center h-16 w-16 bg-[#e6e6e6] rounded-2xl mb-4
                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                    <FontAwesomeIcon icon={faHeadset} className="text-4xl text-emerald-600" />
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                    Get in Touch
                </h1>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>
        </div>
    )
}