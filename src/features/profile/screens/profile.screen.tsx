'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faLocationDot,
    faCog,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import MyAddresses from '../components/myAddresses'
import ProfileInfo from '../components/profileInfo'
import ChangePassword from '../components/changePassword'

type TabType = 'addresses' | 'settings'

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('addresses')

    return (
        <section className="min-h-screen bg-[#e6e6e6]">
            {/* Hero Header */}
            <div className="bg-[#e6e6e6] text-gray-700" data-aos="fade-down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-4">
                        <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
                            Home
                        </Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="font-medium text-gray-600">My Account</span>
                    </nav>

                    {/* Title */}
                    <div className="flex items-center gap-4">
                        <span className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#e6e6e6] shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff] text-emerald-600">
                            <FontAwesomeIcon icon={faUser} className="text-2xl" />
                        </span>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Account</h1>
                            <p className="text-gray-500">Manage your addresses and account settings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-72 shrink-0" data-aos="fade-right" data-aos-delay="100">
                        <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden sticky top-6 shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800">My Account</h3>
                            </div>
                            <nav className="p-3 space-y-2">
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        activeTab === 'addresses'
                                            ? 'text-emerald-600 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]'
                                            : 'text-gray-600 shadow-[4px_4px_10px_#c5c5c5,-4px_-4px_10px_#ffffff] hover:text-emerald-600'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#e6e6e6] ${
                                            activeTab === 'addresses'
                                                ? 'shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff] text-emerald-600'
                                                : 'shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] text-gray-500'
                                        }`}>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </span>
                                        <span className="font-medium">My Addresses</span>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                </button>

                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        activeTab === 'settings'
                                            ? 'text-emerald-600 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]'
                                            : 'text-gray-600 shadow-[4px_4px_10px_#c5c5c5,-4px_-4px_10px_#ffffff] hover:text-emerald-600'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#e6e6e6] ${
                                            activeTab === 'settings'
                                                ? 'shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff] text-emerald-600'
                                                : 'shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] text-gray-500'
                                        }`}>
                                            <FontAwesomeIcon icon={faCog} />
                                        </span>
                                        <span className="font-medium">Settings</span>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0" data-aos="fade-up" data-aos-delay="200">
                        {activeTab === 'addresses' && <MyAddresses />}
                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Account Settings</h2>
                                    <p className="text-sm text-gray-500">Update your profile information and change your password</p>
                                </div>
                                <ProfileInfo />
                                <ChangePassword />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}