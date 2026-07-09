interface CategoryPageSkeletonProps {
    heroGradient?: string
    title?: string
}

export function CategoryPageSkeleton({
    heroGradient = "from-gray-400 to-gray-500",
    title = "Loading..."
}: CategoryPageSkeletonProps) {
    return (
        <section className="min-h-screen bg-[#e6e6e6] animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="bg-[#e6e6e6] py-10 sm:py-14 shadow-[inset_0_-6px_12px_rgba(0,0,0,0.04)]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 bg-[#dcdcdc] rounded-xl"></div>
                        <div>
                            <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${heroGradient} mb-2`}></div>
                            <div className="h-8 w-48 bg-[#dcdcdc] rounded-lg mb-2"></div>
                            <div className="h-4 w-72 bg-[#dcdcdc] rounded-lg"></div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 w-10 bg-[#dcdcdc] rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Top Bar Skeleton */}
                <div className="bg-[#e6e6e6] rounded-2xl p-4 mb-6
                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 h-11 bg-[#dcdcdc] rounded-xl"></div>
                        <div className="flex gap-3">
                            <div className="h-11 w-24 bg-[#dcdcdc] rounded-xl"></div>
                            <div className="h-11 w-32 bg-[#dcdcdc] rounded-xl"></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="h-4 w-32 bg-[#dcdcdc] rounded-lg"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Sidebar Skeleton */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden
                            shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                            <div className="p-4">
                                <div className="h-5 w-20 bg-[#dcdcdc] rounded"></div>
                            </div>
                            <div className="p-4 space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-24 bg-[#dcdcdc] rounded"></div>
                                        {[...Array(4)].map((_, j) => (
                                            <div key={j} className="h-10 bg-[#dcdcdc]/70 rounded-lg"></div>
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
                                <div key={i} className="bg-[#e6e6e6] rounded-2xl overflow-hidden
                                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                    <div className="aspect-square m-3 rounded-xl bg-[#dcdcdc]
                                        shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.6)]"></div>
                                    <div className="p-4 pt-0 space-y-2">
                                        <div className="h-4 w-full bg-[#dcdcdc] rounded"></div>
                                        <div className="h-4 w-2/3 bg-[#dcdcdc] rounded"></div>
                                        <div className="h-5 w-1/3 bg-[#dcdcdc] rounded"></div>
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

// Specific category skeletons with their colors
export function ElectronicsPageSkeleton() {
    return <CategoryPageSkeleton heroGradient="from-blue-600 to-indigo-700" title="Electronics" />
}

export function WomensFashionPageSkeleton() {
    return <CategoryPageSkeleton heroGradient="from-pink-500 to-rose-600" title="Women's Fashion" />
}

export function MensFashionPageSkeleton() {
    return <CategoryPageSkeleton heroGradient="from-slate-700 to-gray-800" title="Men's Fashion" />
}

export function BeautyHealthyPageSkeleton() {
    return <CategoryPageSkeleton heroGradient="from-purple-500 to-fuchsia-600" title="Beauty & Health" />
}