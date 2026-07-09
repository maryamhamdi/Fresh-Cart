import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"

export default function ContactHero() {
    return (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-12 sm:py-16">
            <div className="container mx-auto px-4 text-center">
                <span className="inline-flex items-center justify-center h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <FontAwesomeIcon icon={faHeadset} className="text-4xl text-white" />
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                    Get in Touch
                </h1>
                <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>
        </div>
    )
}
