'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faComments,
    faCheck,
    faSpinner,
    faPaperPlane,
    faChevronDown,
    faBox,
    faTruck,
    faRotateLeft,
    faTag,
    faMessage,
    faCircleQuestion
} from "@fortawesome/free-solid-svg-icons"
import { contactSchema, ContactFormValues, subjectOptions } from "../schemas"

const subjectIcons = {
    order: faBox,
    shipping: faTruck,
    return: faRotateLeft,
    product: faTag,
    feedback: faMessage,
    other: faCircleQuestion,
} as const

export default function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    const selectedSubject = watch('subject')

    const onSubmit = async (data: ContactFormValues) => {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitted(true)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const handleSelectSubject = (value: string) => {
        setValue('subject', value, { shouldValidate: true })
        setIsSelectOpen(false)
    }

    const getSelectedOption = () => {
        return subjectOptions.find(opt => opt.value === selectedSubject)
    }

    return (
        <div className="bg-[#e6e6e6] rounded-2xl p-6 sm:p-8
            shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]">
                    <FontAwesomeIcon icon={faComments} className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Send us a Message</h2>
                    <p className="text-sm text-gray-500">Fill out the form below</p>
                </div>
            </div>

            {isSubmitted ? (
                <div className="bg-[#e6e6e6] rounded-xl p-6 text-center
                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                    <div className="h-16 w-16 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-4
                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                        <FontAwesomeIcon icon={faCheck} className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm focus:outline-none transition-all
                                    shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                                    ${errors.name ? 'ring-2 ring-red-300' : ''}`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="john@example.com"
                                className={`w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm focus:outline-none transition-all
                                    shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                                    ${errors.email ? 'ring-2 ring-red-300' : ''}`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="+20 123 456 7890"
                                className={`w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm focus:outline-none transition-all
                                    shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                                    ${errors.phone ? 'ring-2 ring-red-300' : ''}`}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Subject *
                            </label>
                            <input type="hidden" {...register('subject')} />
                            <button
                                type="button"
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                className={`w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm text-left focus:outline-none transition-all flex items-center justify-between
                                    shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                                    ${errors.subject ? 'ring-2 ring-red-300' : ''}`}
                            >
                                {selectedSubject ? (
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={subjectIcons[selectedSubject as keyof typeof subjectIcons]}
                                            className="h-4 w-4 text-emerald-600"
                                        />
                                        <span className="text-gray-800">{getSelectedOption()?.label}</span>
                                    </span>
                                ) : (
                                    <span className="text-gray-400">Select a subject</span>
                                )}
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Custom Dropdown */}
                            {isSelectOpen && (
                                <div className="absolute z-50 w-full mt-2 bg-[#e6e6e6] rounded-xl overflow-hidden
                                    shadow-[6px_6px_16px_#c5c5c5,-6px_-6px_16px_#ffffff]">
                                    <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                                        {subjectOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleSelectSubject(option.value)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${selectedSubject === option.value
                                                        ? 'text-emerald-700 shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]'
                                                        : 'text-gray-700'
                                                    }`}
                                            >
                                                <span className={`flex items-center justify-center h-8 w-8 rounded-lg bg-[#e6e6e6] ${selectedSubject === option.value
                                                        ? 'shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]'
                                                        : 'shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]'
                                                    }`}>
                                                    <FontAwesomeIcon
                                                        icon={subjectIcons[option.value as keyof typeof subjectIcons]}
                                                        className={`h-4 w-4 ${selectedSubject === option.value
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-500'
                                                            }`}
                                                    />
                                                </span>
                                                <span className="font-medium text-sm">{option.label}</span>
                                                {selectedSubject === option.value && (
                                                    <FontAwesomeIcon icon={faCheck} className="h-4 w-4 text-emerald-600 ml-auto" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {errors.subject && (
                                <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Message *
                        </label>
                        <textarea
                            {...register('message')}
                            rows={5}
                            placeholder="How can we help you?"
                            className={`w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm focus:outline-none transition-all resize-none
                                shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]
                                ${errors.message ? 'ring-2 ring-red-300' : ''}`}
                        />
                        {errors.message && (
                            <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e6e6e6] text-emerald-700 rounded-xl font-medium transition-all disabled:opacity-70
                            shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
                            active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
                    >
                        {isSubmitting ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    )
}