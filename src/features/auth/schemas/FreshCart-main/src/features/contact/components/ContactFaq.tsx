'use client'

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faQuestionCircle, 
    faChevronDown, 
    faChevronUp 
} from "@fortawesome/free-solid-svg-icons"

interface Faq {
    question: string
    answer: string
}

const faqs: Faq[] = [
    {
        question: "What are your shipping options?",
        answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and same-day delivery in select areas. Free shipping is available on orders over 500 EGP."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 14 days of delivery. Items must be unused and in their original packaging. Refunds are processed within 5-7 business days after we receive the returned item."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order in the 'My Orders' section of your account."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we ship within Egypt only. We're working on expanding our shipping options to serve customers internationally in the near future."
    },
    {
        question: "How do I cancel or modify my order?",
        answer: "You can cancel or modify your order within 2 hours of placing it through your account dashboard. After this window, please contact our support team for assistance."
    }
]

export default function ContactFaq() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-sm text-gray-500">Quick answers to common questions</p>
                </div>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div 
                        key={index}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                            <FontAwesomeIcon 
                                icon={openFaq === index ? faChevronUp : faChevronDown} 
                                className="h-4 w-4 text-gray-400 shrink-0" 
                            />
                        </button>
                        {openFaq === index && (
                            <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
