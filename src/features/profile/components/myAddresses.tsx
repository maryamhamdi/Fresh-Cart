'use client'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLocationDot,
    faPlus,
    faTrash,
    faPhone,
    faCity,
    faHome,
    faSpinner,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { Address } from '../types/address.types'
import { getUserAddresses, removeAddress } from '../server/profile.actions'
import { toast } from 'react-toastify'
import AddressFormModal from './AddressFormModal'

export default function MyAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)

    const fetchAddresses = async () => {
        try {
            setIsLoading(true)
            const response = await getUserAddresses()
            setAddresses(response.data || [])
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleDelete = async (addressId: string) => {
        setDeletingId(addressId)
        try {
            const response = await removeAddress(addressId)
            setAddresses(response.data || [])
            toast.success('Address removed successfully')
        } catch (error) {
            toast.error('Failed to remove address')
        } finally {
            setDeletingId(null)
        }
    }

    const handleAddressAdded = (newAddresses: Address[]) => {
        setAddresses(newAddresses)
        setShowAddModal(false)
        toast.success('Address added successfully')
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <FontAwesomeIcon icon={faSpinner} className="text-3xl text-emerald-500 animate-spin" />
                <span className="ml-3 text-gray-500">Loading addresses...</span>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Addresses</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e6e6e6] text-emerald-600 font-medium shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="hidden sm:inline">Add Address</span>
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-12 bg-[#e6e6e6] rounded-2xl shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#e6e6e6] mb-4 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Addresses Yet</h3>
                    <p className="text-gray-500 mb-6">Add your first delivery address to make checkout faster and easier.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-2.5 rounded-xl bg-[#e6e6e6] text-emerald-600 font-medium shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] transition-all"
                    >
                        Add New Address
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className="bg-[#e6e6e6] rounded-2xl p-5 shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff] hover:shadow-[3px_3px_8px_#c5c5c5,-3px_-3px_8px_#ffffff] transition-shadow"
                        >
                            {/* Address Name Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e6e6e6] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] text-emerald-600">
                                        <FontAwesomeIcon icon={faHome} className="text-sm" />
                                    </span>
                                    <span className="font-semibold text-gray-800">{address.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(address._id)}
                                    disabled={deletingId === address._id}
                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 bg-[#e6e6e6] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff] transition-all disabled:opacity-50"
                                >
                                    {deletingId === address._id ? (
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    ) : (
                                        <FontAwesomeIcon icon={faTrash} />
                                    )}
                                </button>
                            </div>

                            {/* Address Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2 text-gray-600">
                                    <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-gray-400" />
                                    <span>{address.details}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FontAwesomeIcon icon={faCity} className="text-gray-400" />
                                    <span>{address.city}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                    <span>{address.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Address Modal */}
            {showAddModal && (
                <AddressFormModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleAddressAdded}
                />
            )}
        </div>
    )
}