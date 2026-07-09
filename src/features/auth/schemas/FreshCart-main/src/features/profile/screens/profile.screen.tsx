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
        <section className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white" data-aos="fade-down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-4">
                        <Link href="/" className="text-emerald-100 hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="mx-2 text-emerald-200">/</span>
                        <span className="font-medium">My Account</span>
                    </nav>

                    {/* Title */}
                    <div className="flex items-center gap-4">
                        <span className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faUser} className="text-2xl" />
                        </span>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">My Account</h1>
                            <p className="text-emerald-100">Manage your addresses and account settings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-72 shrink-0" data-aos="fade-right" data-aos-delay="100">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-6">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">My Account</h3>
                            </div>
                            <nav className="p-2">
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors ${
                                        activeTab === 'addresses'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            activeTab === 'addresses'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </span>
                                        <span className="font-medium">My Addresses</span>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                </button>

                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors ${
                                        activeTab === 'settings'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            activeTab === 'settings'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-gray-100 text-gray-500'
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
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Account Settings</h2>
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
