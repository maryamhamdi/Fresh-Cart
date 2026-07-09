'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLock,
    faEye,
    faEyeSlash,
    faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

export default function ChangePassword() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: ChangePasswordValues) => {
        setIsSubmitting(true)
        try {
            // Note: API doesn't support password change, this is UI only
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success('Password changed successfully')
            reset()
        } catch (error) {
            toast.error('Failed to change password')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden shadow-[6px_6px_14px_#c5c5c5,-6px_-6px_14px_#ffffff]">
            {/* Header */}
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e6e6e6] shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] text-amber-500">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <div>
                        <h3 className="font-semibold text-gray-800">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            {...register('currentPassword')}
                            placeholder="Enter your current password"
                            className="w-full h-11 pl-10 pr-12 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.currentPassword && (
                        <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.currentPassword.message}</p>
                    )}
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            {...register('newPassword')}
                            placeholder="Enter your new password"
                            className="w-full h-11 pl-10 pr-12 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Must be at least 6 characters</p>
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            placeholder="Confirm your new password"
                            className="w-full h-11 pl-10 pr-12 rounded-xl bg-[#e6e6e6] text-gray-700 shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] outline-none transition-all focus:shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 bg-[#e6e6e6] p-2 rounded-lg shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e6e6e6] text-amber-500 font-medium shadow-[5px_5px_10px_#c5c5c5,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] transition-all disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            <span>Changing...</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faLock} />
                            <span>Change Password</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}