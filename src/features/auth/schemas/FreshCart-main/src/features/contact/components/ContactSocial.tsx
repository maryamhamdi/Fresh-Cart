import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faFacebookF, 
    faTwitter, 
    faInstagram, 
    faLinkedinIn 
} from "@fortawesome/free-brands-svg-icons"

interface SocialLink {
    icon: typeof faFacebookF
    href: string
    className: string
}

const socialLinks: SocialLink[] = [
    {
        icon: faFacebookF,
        href: "#",
        className: "bg-blue-600 hover:bg-blue-700"
    },
    {
        icon: faTwitter,
        href: "#",
        className: "bg-sky-500 hover:bg-sky-600"
    },
    {
        icon: faInstagram,
        href: "#",
        className: "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
    },
    {
        icon: faLinkedinIn,
        href: "#",
        className: "bg-blue-700 hover:bg-blue-800"
    }
]

export default function ContactSocial() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                    <a 
                        key={index}
                        href={social.href} 
                        className={`h-11 w-11 ${social.className} rounded-xl flex items-center justify-center text-white transition-colors`}
                    >
                        <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                    </a>
                ))}
            </div>
        </div>
    )
}
