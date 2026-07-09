export default function ContactLoading() {
    return (
        <section className="min-h-screen bg-gray-50 animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-12 sm:py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="h-16 w-16 bg-white/20 rounded-2xl mx-auto mb-4" />
                    <div className="h-10 bg-white/20 rounded-lg max-w-md mx-auto mb-3" />
                    <div className="h-6 bg-white/20 rounded-lg max-w-2xl mx-auto" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Contact Info Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-20 mb-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="h-14 w-14 bg-gray-200 rounded-xl mx-auto mb-4" />
                            <div className="h-5 bg-gray-200 rounded w-24 mx-auto mb-2" />
                            <div className="h-4 bg-gray-100 rounded w-32 mx-auto mb-1" />
                            <div className="h-4 bg-gray-100 rounded w-28 mx-auto" />
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Form Skeleton */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                            <div>
                                <div className="h-6 bg-gray-200 rounded w-40 mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-32" />
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-100 rounded-xl" />
                                <div className="h-12 bg-gray-100 rounded-xl" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-100 rounded-xl" />
                                <div className="h-12 bg-gray-100 rounded-xl" />
                            </div>
                            <div className="h-32 bg-gray-100 rounded-xl" />
                            <div className="h-12 bg-emerald-200 rounded-xl" />
                        </div>
                    </div>

                    {/* FAQ Skeleton */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                                <div>
                                    <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
                                    <div className="h-4 bg-gray-100 rounded w-40" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-14 bg-gray-50 border border-gray-100 rounded-xl" />
                                ))}
                            </div>
                        </div>

                        {/* Social Skeleton */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
                            <div className="h-5 bg-gray-200 rounded w-24 mb-4" />
                            <div className="flex gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-11 w-11 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Skeleton */}
                <div className="mt-12 bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="h-5 bg-gray-200 rounded w-32" />
                    </div>
                    <div className="h-72 sm:h-96 bg-gray-200" />
                </div>

                {/* CTA Skeleton */}
                <div className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12">
                    <div className="h-8 bg-white/20 rounded-lg max-w-md mx-auto mb-3" />
                    <div className="h-5 bg-white/20 rounded-lg max-w-xl mx-auto mb-6" />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="h-12 bg-white/20 rounded-xl w-40 mx-auto sm:mx-0" />
                        <div className="h-12 bg-emerald-700/50 rounded-xl w-40 mx-auto sm:mx-0" />
                    </div>
                </div>
            </div>
        </section>
    )
}
