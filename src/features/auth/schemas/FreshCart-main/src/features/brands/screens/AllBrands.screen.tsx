'use client'

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faTags, 
    faArrowRight, 
    faSearch,
    faStore,
    faGripVertical,
    faList
} from "@fortawesome/free-solid-svg-icons"
import { Brand } from "../types/brand.types"

interface AllBrandsScreenProps {
    brands: Brand[]
}

type ViewMode = 'grid' | 'list'

export default function AllBrandsScreen({ brands }: AllBrandsScreenProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<ViewMode>('grid')

    // Filter brands based on search
    const filteredBrands = useMemo(() => {
        if (!searchQuery) return brands
        return brands.filter(brand => 
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [brands, searchQuery])

    return (
        <section className="min-h-screen bg-gray-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 py-10 sm:py-14">
                <div className="container mx-auto px-4">
                    <h1 className="flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faTags} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </span>
                        Shop by Brand
                    </h1>
                    <p className="text-purple-100 text-sm sm:text-base">
                        Discover products from {brands.length} trusted brands
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Stats Bar & Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={faStore} className="h-6 w-6 text-violet-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{filteredBrands.length}</p>
                                <p className="text-sm text-gray-500">
                                    {searchQuery ? 'Brands Found' : 'Total Brands'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 lg:w-72">
                                <FontAwesomeIcon 
                                    icon={faSearch} 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                                />
                                <input
                                    type="text"
                                    placeholder="Search brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                />
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === 'grid' 
                                            ? 'bg-white shadow-sm text-violet-600' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === 'list' 
                                            ? 'bg-white shadow-sm text-violet-600' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brands Grid/List */}
                {filteredBrands.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                            {filteredBrands.map((brand) => (
                                <Link
                                    key={brand._id}
                                    href={`/brands/${brand._id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-violet-200 hover:-translate-y-1">
                                        {/* Image Container */}
                                        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={brand.image}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/10 transition-colors duration-300"></div>
                                        </div>
                                        
                                        {/* Brand Name */}
                                        <div className="p-3 sm:p-4 text-center border-t border-gray-100">
                                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate group-hover:text-violet-600 transition-colors">
                                                {brand.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Products
                                                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // List View
                        <div className="space-y-4">
                            {filteredBrands.map((brand) => (
                                <Link
                                    key={brand._id}
                                    href={`/brands/${brand._id}`}
                                    className="group block"
                                >
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-violet-200">
                                        <div className="flex items-center gap-4 p-4 sm:p-5">
                                            {/* Image */}
                                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shrink-0 p-3">
                                                <Image
                                                    src={brand.image}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-violet-600 transition-colors">
                                                    {brand.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    View all products from {brand.name}
                                                </p>
                                            </div>
                                            
                                            {/* Arrow */}
                                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-violet-100 transition-colors shrink-0">
                                                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faTags} className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No brands found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchQuery 
                                ? `No brands match "${searchQuery}"`
                                : 'Brands will appear here once available'
                            }
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="px-5 py-2.5 bg-violet-500 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}

                {/* Featured Brands Section */}
                {!searchQuery && brands.length > 4 && (
                    <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-gradient-to-b from-violet-400 to-purple-600 rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Featured <span className="text-violet-600">Brands</span>
                            </h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {brands.slice(0, 4).map((brand) => (
                                <Link
                                    key={`featured-${brand._id}`}
                                    href={`/brands/${brand._id}`}
                                    className="group"
                                >
                                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                        <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white text-base truncate">
                                                {brand.name}
                                            </h3>
                                            <p className="text-violet-100 text-sm mt-0.5">
                                                Shop Now
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 text-white" />
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
