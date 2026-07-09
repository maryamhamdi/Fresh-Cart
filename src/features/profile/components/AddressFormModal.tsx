'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTimes,
    faHome,
    faLocationDot,
    faCity,
    faPhone,
    faSpinner,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Address, AddressFormData } from '../types/address.types'
import { addAddress } from '../server/profile.actions'

const addressSchema = z.object({
    name: z.string().min(2, 'Address name must be at least 2 characters'),
    details: z.string().min(5, 'Please provide detailed address'),
    city: z.string().min(2, 'City is required'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
})

interface AddressFormModalProps {
    onClose: () => void
    onSuccess: (addresses: Address[]) => void
}

export default function AddressFormModal({ onClose, onSuccess }: AddressFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: '',
            details: '',
            city: '',
            phone: ''
        }
    })

    const onSubmit = async (data: AddressFormData) => {
        setIsSubmitting(true)
        try {
            const response = await addAddress(data)
            onSuccess(response.data || [])
        } catch (error) {
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#e6e6e6] rounded-2xl w-full max-w-md overflow-hidden shadow-[10px_10px_24px_#c5c5c5,-10px_-10px_24px_#ffffff]">
                {/* Header */}
                <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] text-emerald-600">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Add New Address</h3>
                                <p className="text-sm text-gray-500">Save a delivery address</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-[#e6e6e6] text-gray-500 shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff] transition-all"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    {/* Address Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Address Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="e.g. Home, Office, Work"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.name.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            City <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faCity} />
                            </span>
                            <input
                                type="text"
                                {...register('city')}
                                placeholder="e.g. Cairo, Alexandria, Giza"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                            />
                        </div>
                        {errors.city && (
                            <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.city.message}</p>
                        )}
                    </div>

                    {/* Address Details */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Address Details <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <textarea
                                {...register('details')}
                                rows={3}
                                placeholder="Street, building, floor, apt number..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all resize-none focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                            />
                        </div>
                        {errors.details && (
                            <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.details.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="01xxxxxxxxx"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-xl bg-[#e6e6e6] text-gray-700 font-medium shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 h-11 rounded-xl bg-[#e6e6e6] text-emerald-600 font-medium flex items-center justify-center gap-2 shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff] transition-all disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add Address</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}