import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
export default function ContactMap() {
    return (
        <div className="mt-12 bg-[#e6e6e6] rounded-2xl overflow-hidden
            shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
            <div className="p-4 shadow-[inset_0_-3px_6px_rgba(0,0,0,0.04)]">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-emerald-600" />
                    Our Location
                </h3>
            </div>
            <div className="h-72 sm:h-96 bg-[#e6e6e6] flex items-center justify-center p-3">
                <div className="w-full h-full rounded-xl overflow-hidden
                    shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            </div>
        </div>
    )
}