import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStore } from "@fortawesome/free-solid-svg-icons"

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center justify-between pt-2">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

// Filter Sidebar Skeleton
export function FilterSidebarSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filter Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Filter Sections */}
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 border-b border-gray-100 last:border-b-0">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((j) => (
                            <div key={j} className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Top Controls Skeleton
export function TopControlsSkeleton() {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-3">
                    <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="hidden sm:flex h-10 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

// Header Banner Skeleton
export function HeaderBannerSkeleton({ title = "All Products", subtitle = "Loading products..." }: { title?: string; subtitle?: string }) {
    return (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-10 sm:py-14">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faStore} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{title}</h1>
                </div>
                <p className="text-emerald-100 text-sm sm:text-base">{subtitle}</p>
            </div>
        </div>
    )
}

// Products Grid Skeleton
interface ProductsGridSkeletonProps {
    count?: number
}

export function ProductsGridSkeleton({ count = 8 }: ProductsGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(count)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}

// Complete Page Skeleton
export function AllProductsPageSkeleton() {
    return (
        <section className="min-h-screen bg-gray-50">
            <HeaderBannerSkeleton />

            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="flex gap-6">
                    {/* Sidebar Skeleton - Desktop Only */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <FilterSidebarSkeleton />
                    </aside>

                    {/* Products Section */}
                    <div className="flex-1 min-w-0">
                        <TopControlsSkeleton />
                        <ProductsGridSkeleton count={8} />
                    </div>
                </div>
            </div>
        </section>
    )
}
