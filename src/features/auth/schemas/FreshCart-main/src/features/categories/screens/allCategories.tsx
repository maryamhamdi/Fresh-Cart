import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLayerGroup, faArrowRight, faBoxesStacked } from "@fortawesome/free-solid-svg-icons"
import { Category } from "../types/Category.response.type"

interface AllCategoriesScreenProps {
    categories: Category[]
}

export default function AllCategoriesScreen({ categories }: AllCategoriesScreenProps) {
    return (
        <section className="min-h-screen bg-gray-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-10 sm:py-14">
                <div className="container mx-auto px-4">
                    <h1 className="flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </span>
                        Browse Categories
                    </h1>
                    <p className="text-emerald-100 text-sm sm:text-base">
                        Explore our {categories.length} categories to find what you need
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Stats Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={faBoxesStacked} className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                                <p className="text-sm text-gray-500">Total Categories</p>
                            </div>
                        </div>
                        <Link 
                            href="/shop"
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
                        >
                            View All Products
                            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Categories Grid */}
                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/shop?category=${encodeURIComponent(category.name)}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300"></div>
                                    </div>
                                    
                                    {/* Category Name */}
                                    <div className="p-3 sm:p-4 text-center border-t border-gray-100">
                                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate group-hover:text-emerald-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Browse Products
                                            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faLayerGroup} className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
                        <p className="text-gray-500 mb-4">Categories will appear here once available</p>
                    </div>
                )}

                {/* Featured Categories Section */}
                {categories.length > 3 && (
                    <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Popular <span className="text-emerald-600">Categories</span>
                            </h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {categories.slice(0, 3).map((category) => (
                                <Link
                                    key={`featured-${category._id}`}
                                    href={`/shop?category=${encodeURIComponent(category.name)}`}
                                    className="group"
                                >
                                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                        <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={60}
                                                height={60}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white text-lg truncate">
                                                {category.name}
                                            </h3>
                                            <p className="text-emerald-100 text-sm mt-1">
                                                Shop Now
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
