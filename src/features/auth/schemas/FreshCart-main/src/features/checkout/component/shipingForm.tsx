"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faInfoCircle,
    faCity,
    faLocationDot,
    faPhone,
    faBookmark,
    faCheck,
    faSpinner,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { shipingAdressValues } from "../schemas/checkOutSchema";
import { Address } from "@/src/features/profile/types/address.types";
import { getUserAddresses } from "@/src/features/profile/server/profile.actions";

interface ShippingFormProps {
    register: UseFormRegister<shipingAdressValues>,
    errors: FieldErrors<shipingAdressValues>,
    setValue?: UseFormSetValue<shipingAdressValues>
}

export default function ShippingForm({ register, errors, setValue }: ShippingFormProps) {
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([])
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
    const [showNewAddressForm, setShowNewAddressForm] = useState(false)

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getUserAddresses()
                const addresses = response.data || []
                setSavedAddresses(addresses)
                // If no saved addresses, show the form by default
                if (addresses.length === 0) {
                    setShowNewAddressForm(true)
                } else {
                    // Auto-select the first address
                    const firstAddress = addresses[0]
                    setSelectedAddressId(firstAddress._id)
                    if (setValue) {
                        setValue('city', firstAddress.city, { shouldValidate: true, shouldDirty: true })
                        setValue('details', firstAddress.details, { shouldValidate: true, shouldDirty: true })
                        setValue('phone', firstAddress.phone, { shouldValidate: true, shouldDirty: true })
                    }
                }
            } catch (error) {
                setShowNewAddressForm(true)
            } finally {
                setIsLoadingAddresses(false)
            }
        }
        fetchAddresses()
    }, [setValue])

    const handleSelectAddress = (address: Address) => {
        setSelectedAddressId(address._id)
        setShowNewAddressForm(false)
        if (setValue) {
            setValue('city', address.city, { shouldValidate: true, shouldDirty: true })
            setValue('details', address.details, { shouldValidate: true, shouldDirty: true })
            setValue('phone', address.phone, { shouldValidate: true, shouldDirty: true })
        }
    }

    const handleUseNewAddress = () => {
        setSelectedAddressId(null)
        setShowNewAddressForm(true)
        if (setValue) {
            setValue('city', '', { shouldValidate: false, shouldDirty: true })
            setValue('details', '', { shouldValidate: false, shouldDirty: true })
            setValue('phone', '', { shouldValidate: false, shouldDirty: true })
        }
    }

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="bg-emerald-600 text-white p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <FontAwesomeIcon icon={faHome} className="text-base sm:text-lg" />
                    <div>
                        <h3 className="font-semibold text-sm sm:text-base">Shipping Address</h3>
                        <p className="text-xs sm:text-sm text-emerald-100">
                            Where should we deliver your order?
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                {/* Saved Addresses Section */}
                {isLoadingAddresses ? (
                    <div className="flex items-center justify-center py-6">
                        <FontAwesomeIcon icon={faSpinner} className="text-2xl text-emerald-500 animate-spin" />
                    </div>
                ) : savedAddresses.length > 0 ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FontAwesomeIcon icon={faBookmark} className="text-emerald-500" />
                            <span>Saved Addresses</span>
                        </div>
                        
                        <div className="grid gap-3 sm:grid-cols-2">
                            {savedAddresses.map((address) => (
                                <button
                                    key={address._id}
                                    type="button"
                                    onClick={() => handleSelectAddress(address)}
                                    className={`relative text-left p-3 sm:p-4 rounded-xl border-2 transition-all ${
                                        selectedAddressId === address._id
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {selectedAddressId === address._id && (
                                        <span className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                        </span>
                                    )}
                                    <div className="font-medium text-gray-900 mb-1">{address.name}</div>
                                    <div className="text-sm text-gray-600 space-y-0.5">
                                        <p className="line-clamp-1">{address.details}</p>
                                        <p>{address.city}</p>
                                        <p>{address.phone}</p>
                                    </div>
                                </button>
                            ))}

                            {/* Add New Address Option */}
                            <button
                                type="button"
                                onClick={handleUseNewAddress}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-all ${
                                    showNewAddressForm
                                        ? 'border-emerald-500 bg-emerald-50'
                                        : 'border-gray-300 hover:border-emerald-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    showNewAddressForm ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                <span className={`text-sm font-medium ${showNewAddressForm ? 'text-emerald-700' : 'text-gray-600'}`}>
                                    Use New Address
                                </span>
                            </button>
                        </div>
                    </div>
                ) : null}

                {/* Divider - Only show when there are saved addresses */}
                {savedAddresses.length > 0 && (selectedAddressId || showNewAddressForm) && (
                    <hr className="border-gray-200" />
                )}

                {/* Form Fields - Show when using new address or no saved addresses */}
                {showNewAddressForm && (
                    <>
                        {/* Info Banner */}
                        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="text-blue-500 mt-0.5 text-sm sm:text-base shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="font-medium text-blue-700 text-sm sm:text-base">Delivery Information</p>
                                <p className="text-xs sm:text-sm text-blue-600">
                                    Please ensure your address is accurate for smooth delivery
                                </p>
                            </div>
                        </div>

                        {/* City Field */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">
                                City <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faCity} className="text-sm sm:text-base" />
                                </span>
                                <input
                                    type="text"
                                    {...register("city")}
                                    placeholder="e.g. Cairo, Alexandria, Giza"
                                    className="w-full h-10 sm:h-12 pl-9 sm:pl-11 pr-3 sm:pr-4 rounded-lg sm:rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                                />
                            </div>
                            {errors.city && (
                                <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-2 sm:ml-4 bg-red-50 p-1.5 sm:p-2 rounded-lg">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        {/* Street Address Field */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">
                                Street Address <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-sm sm:text-base" />
                                </span>
                                <input
                                    type="text"
                                    {...register("details")}
                                    placeholder="Street name, building, floor..."
                                    className="w-full h-10 sm:h-12 pl-9 sm:pl-11 pr-3 sm:pr-4 rounded-lg sm:rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                                />
                            </div>
                            {errors.details && (
                                <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-2 sm:ml-4 bg-red-50 p-1.5 sm:p-2 rounded-lg">
                                    {errors.details.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">
                                Phone Number <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faPhone} className="text-sm sm:text-base" />
                                </span>
                                <input
                                    type="tel"
                                    {...register("phone")}
                                    placeholder="01xxxxxxxxx"
                                    className="w-full h-10 sm:h-12 pl-9 sm:pl-11 pr-20 sm:pr-32 rounded-lg sm:rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
                                />
                                <span className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-gray-400">
                                    Egyptian only
                                </span>
                            </div>
                            {errors.phone && (
                                <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-2 sm:ml-4 bg-red-50 p-1.5 sm:p-2 rounded-lg">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Hidden inputs - always rendered for form registration, used when saved address is selected */}
                {!showNewAddressForm && (
                    <>
                        <input type="hidden" {...register("city")} />
                        <input type="hidden" {...register("details")} />
                        <input type="hidden" {...register("phone")} />
                    </>
                )}
            </div>
        </div>
    );
}

