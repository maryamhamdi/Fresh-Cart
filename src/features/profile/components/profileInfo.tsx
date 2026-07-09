'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faEnvelope,
    faPhone,
    faSave,
    faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '@/src/store/store'

export default function ProfileInfo() {
    const { userInfo } = useAppSelector(state => state.auth)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Note: API doesn't support profile update, this is UI only
        setIsSubmitting(true)
        setTimeout(() => setIsSubmitting(false), 1000)
    }

    return (
        <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            {/* Header */}
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] text-emerald-600">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <div>
                        <h3 className="font-semibold text-gray-800">Profile Information</h3>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            defaultValue={userInfo?.name || ''}
                            placeholder="Enter your name"
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="email"
                            defaultValue={userInfo?.email || ''}
                            placeholder="Enter your email"
                            disabled
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-400 cursor-not-allowed shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <input
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e6e6e6] text-emerald-600 font-medium shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] transition-all disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faSave} />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}