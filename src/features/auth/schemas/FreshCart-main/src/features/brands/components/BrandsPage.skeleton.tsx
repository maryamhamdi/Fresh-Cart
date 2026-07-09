export function AllBrandsPageSkeleton() {
    return (
        <section className="min-h-screen bg-gray-50 animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 py-10 sm:py-14 opacity-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 rounded-xl"></div>
                        <div className="h-8 w-48 bg-white/30 rounded-lg"></div>
                    </div>
                    <div className="h-4 w-64 bg-white/20 rounded-lg"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Stats Bar Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-xl"></div>
                            <div>
                                <div className="h-8 w-16 bg-gray-100 rounded mb-1"></div>
                                <div className="h-4 w-24 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                        <div className="h-11 w-72 bg-gray-100 rounded-xl"></div>
                    </div>
                </div>

                {/* Brands Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="aspect-square bg-gray-100"></div>
                            <div className="p-3 sm:p-4 text-center border-t border-gray-100">
                                <div className="h-5 w-24 bg-gray-100 rounded mx-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function BrandPageSkeleton() {
    return (
        <section className="min-h-screen bg-gray-50 animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 py-10 sm:py-14 opacity-50">
                <div className="container mx-auto px-4">
                    <div className="h-4 w-32 bg-white/20 rounded mb-4"></div>
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white/30 rounded-2xl"></div>
                        <div>
                            <div className="h-8 w-48 bg-white/30 rounded-lg mb-2"></div>
                            <div className="h-4 w-32 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Top Bar Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 h-11 bg-gray-100 rounded-xl"></div>
                        <div className="flex gap-3">
                            <div className="h-11 w-24 bg-gray-100 rounded-xl"></div>
                            <div className="h-11 w-32 bg-gray-100 rounded-xl"></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="h-4 w-32 bg-gray-100 rounded-lg"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Sidebar Skeleton */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <div className="h-5 w-20 bg-gray-100 rounded"></div>
                            </div>
                            <div className="p-4 space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-100 rounded"></div>
                                        {[...Array(3)].map((_, j) => (
                                            <div key={j} className="h-10 bg-gray-50 rounded-lg"></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Skeleton */}
                    <main className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gray-100"></div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                                        <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                                        <div className="h-5 w-1/3 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    )
}
