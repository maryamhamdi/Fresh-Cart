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
    iconColor: string
}

const socialLinks: SocialLink[] = [
    {
        icon: faFacebookF,
        href: "#",
        iconColor: "text-blue-600"
    },
    {
        icon: faTwitter,
        href: "#",
        iconColor: "text-sky-500"
    },
    {
        icon: faInstagram,
        href: "#",
        iconColor: "text-pink-600"
    },
    {
        icon: faLinkedinIn,
        href: "#",
        iconColor: "text-blue-700"
    }
]

export default function ContactSocial() {
    return (
        <div className="bg-[#e6e6e6] rounded-2xl p-6 mt-6
            shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
            <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        className={`h-11 w-11 bg-[#e6e6e6] rounded-xl flex items-center justify-center transition-all
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                            active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                            ${social.iconColor}`}
                    >
                        <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                    </a>
                ))}
            </div>
        </div>
    )
}