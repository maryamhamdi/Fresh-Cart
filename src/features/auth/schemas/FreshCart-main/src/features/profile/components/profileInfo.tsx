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
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <div>
                        <h3 className="font-semibold text-gray-900">Profile Information</h3>
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
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
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
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
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
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
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
