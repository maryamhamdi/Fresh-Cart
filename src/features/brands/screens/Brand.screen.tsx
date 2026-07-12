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
        <section className="min-h-screen bg-[#e6e6e6]">
            {/* Header Banner */}
            <div className="bg-[#e6e6e6] py-10 sm:py-14 shadow-[inset_0_-6px_12px_rgba(0,0,0,0.04)]">
                <div className="container mx-auto px-4">
                    <h1 className="flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                        </span>
                        Browse Categories
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Explore our {categories.length} categories to find what you need
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Stats Bar */}
                <div className="bg-[#e6e6e6] rounded-2xl p-4 sm:p-6 mb-8
                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                                shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]">
                                <FontAwesomeIcon icon={faBoxesStacked} className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
                                <p className="text-sm text-gray-500">Total Categories</p>
                            </div>
                        </div>
                        <Link
                            href="/shop"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#e6e6e6] text-emerald-700 rounded-xl text-sm font-medium transition-all
                                shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
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
                                <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden transition-all duration-300
                                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
                                    hover:shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff] hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="relative aspect-square bg-[#e6e6e6] m-3 rounded-xl p-4 sm:p-6
                                        shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Name */}
                                    <div className="p-3 sm:p-4 text-center">
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
                    <div className="text-center py-16 bg-[#e6e6e6] rounded-2xl
                        shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]">
                        <div className="h-20 w-20 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-4
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <FontAwesomeIcon icon={faLayerGroup} className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No categories found</h3>
                        <p className="text-gray-500 mb-4">Categories will appear here once available</p>
                    </div>
                )}

                {/* Featured Categories Section */}
                {categories.length > 3 && (
                    <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-emerald-500/60 rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
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
                                    <div className="bg-[#e6e6e6] rounded-2xl p-6 flex items-center gap-4 transition-all duration-300
                                        shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
                                        hover:shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff] hover:scale-[1.02]">
                                        <div className="h-20 w-20 bg-[#e6e6e6] rounded-xl flex items-center justify-center shrink-0
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={60}
                                                height={60}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 text-lg truncate">
                                                {category.name}
                                            </h3>
                                            <p className="text-emerald-600 text-sm mt-1">
                                                Shop Now
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 bg-[#e6e6e6] rounded-full flex items-center justify-center
                                            shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]">
                                            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-emerald-600" />
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