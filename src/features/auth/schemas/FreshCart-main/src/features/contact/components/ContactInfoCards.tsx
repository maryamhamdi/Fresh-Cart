import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faEnvelope, 
    faPhone, 
    faLocationDot, 
    faClock 
} from "@fortawesome/free-solid-svg-icons"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

interface ContactInfo {
    icon: IconDefinition
    title: string
    details: string[]
    bgColor: string
    iconColor: string
}

const contactInfo: ContactInfo[] = [
    {
        icon: faPhone,
        title: "Phone",
        details: ["+20 123 456 7890", "+20 111 222 3333"],
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600"
    },
    {
        icon: faEnvelope,
        title: "Email",
        details: ["support@freshcart.com", "info@freshcart.com"],
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        icon: faLocationDot,
        title: "Address",
        details: ["123 Shopping Street", "Cairo, Egypt 12345"],
        bgColor: "bg-rose-100",
        iconColor: "text-rose-600"
    },
    {
        icon: faClock,
        title: "Working Hours",
        details: ["Mon - Fri: 9AM - 9PM", "Sat - Sun: 10AM - 6PM"],
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600"
    }
]

export default function ContactInfoCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-20 mb-12">
            {contactInfo.map((info, index) => (
                <div 
                    key={index}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow"
                >
                    <div className={`inline-flex items-center justify-center h-14 w-14 ${info.bgColor} rounded-xl mb-4`}>
                        <FontAwesomeIcon icon={info.icon} className={`h-6 w-6 ${info.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-500 text-sm">{detail}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}
