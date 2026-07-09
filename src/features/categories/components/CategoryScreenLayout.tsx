'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFilter,
    faSort,
    faGripVertical,
    faList,
    faChevronDown,
    faXmark,
    faSearch,
    faBoxOpen,
    faChevronUp,
    faArrowRight,
    faTag,
    faStore
} from "@fortawesome/free-solid-svg-icons"
import ProductCard from "@/src/components/shared/product.cart"
import { Product } from "@/src/features/products/types/productsResponseType"
import { Subcategory } from "../types/Subcategory.response.type"
import { CategoryConfig } from "../config/categories.config"

interface CategoryScreenLayoutProps {
    config: CategoryConfig
    products: Product[]
    subcategories: Subcategory[]
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-az' | 'name-za'
type ViewMode = 'grid' | 'list'

export default function CategoryScreenLayout({
    config,
    products,
    subcategories
}: CategoryScreenLayoutProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>('default')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
    const [selectedBrand, setSelectedBrand] = useState<string>('all')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState({
        subcategories: true,
        brands: true,
        price: true
    })

    // Extract unique brands from products
    const brands = useMemo(() => {
        const brandSet = new Set(products.map(p => p.brand?.name).filter(Boolean))
        return ['all', ...Array.from(brandSet)]
    }, [products])

    // Get min and max prices
    const { minPrice, maxPrice } = useMemo(() => {
        if (products.length === 0) return { minPrice: 0, maxPrice: 100000 }
        const prices = products.map(p => p.priceAfterDiscount || p.price)
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        }
    }, [products])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products]

        // Search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Subcategory filter
        if (selectedSubcategory !== 'all') {
            result = result.filter(p =>
                p.subcategory?.some(sub => sub._id === selectedSubcategory)
            )
        }

        // Brand filter
        if (selectedBrand !== 'all') {
            result = result.filter(p => p.brand?.name === selectedBrand)
        }

        // Price filter
        result = result.filter(p => {
            const price = p.priceAfterDiscount || p.price
            return price >= priceRange[0] && price <= priceRange[1]
        })

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price))
                break
            case 'price-high':
                result.sort((a, b) => (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price))
                break
            case 'rating':
                result.sort((a, b) => b.ratingsAverage - a.ratingsAverage)
                break
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                break
            case 'name-az':
                result.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'name-za':
                result.sort((a, b) => b.title.localeCompare(a.title))
                break
        }

        return result
    }, [products, searchQuery, selectedSubcategory, selectedBrand, priceRange, sortBy])

    const sortOptions = [
        { value: 'default', label: 'Default' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Top Rated' },
        { value: 'newest', label: 'Newest First' },
        { value: 'name-az', label: 'Name: A to Z' },
        { value: 'name-za', label: 'Name: Z to A' },
    ]

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedSubcategory('all')
        setSelectedBrand('all')
        setPriceRange([minPrice, maxPrice])
        setSortBy('default')
    }

    const hasActiveFilters = searchQuery || selectedSubcategory !== 'all' || selectedBrand !== 'all' || priceRange[0] !== minPrice || priceRange[1] !== maxPrice

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    // Filter Sidebar Component
    const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? '' : 'sticky top-24'}`}>
            <div className="bg-[#e6e6e6] rounded-2xl overflow-hidden
                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                {/* Filter Header */}
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className={`h-4 w-4 text-${config.accentColor}-600`} />
                            <h3 className="font-semibold text-gray-800">Filters</h3>
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Subcategories Filter */}
                    {subcategories.length > 0 && (
                        <div className="pb-4">
                            <button
                                onClick={() => toggleSection('subcategories')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="flex items-center gap-2 font-medium text-gray-800">
                                    <FontAwesomeIcon icon={faTag} className={`h-4 w-4 text-${config.accentColor}-500`} />
                                    Subcategories
                                </span>
                                <FontAwesomeIcon
                                    icon={expandedSections.subcategories ? faChevronUp : faChevronDown}
                                    className="h-3 w-3 text-gray-400"
                                />
                            </button>
                            {expandedSections.subcategories && (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedSubcategory('all')}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedSubcategory === 'all'
                                                ? `text-${config.accentColor}-700 font-medium shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]`
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        All Subcategories
                                    </button>
                                    {subcategories.map(sub => (
                                        <button
                                            key={sub._id}
                                            onClick={() => setSelectedSubcategory(sub._id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedSubcategory === sub._id
                                                    ? `text-${config.accentColor}-700 font-medium shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]`
                                                    : 'text-gray-600'
                                                }`}
                                        >
                                            {sub.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Brands Filter */}
                    {brands.length > 1 && (
                        <div className="pb-4">
                            <button
                                onClick={() => toggleSection('brands')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="flex items-center gap-2 font-medium text-gray-800">
                                    <FontAwesomeIcon icon={faStore} className={`h-4 w-4 text-${config.accentColor}-500`} />
                                    Brands
                                </span>
                                <FontAwesomeIcon
                                    icon={expandedSections.brands ? faChevronUp : faChevronDown}
                                    className="h-3 w-3 text-gray-400"
                                />
                            </button>
                            {expandedSections.brands && (
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedBrand === brand
                                                    ? `text-${config.accentColor}-700 font-medium shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]`
                                                    : 'text-gray-600'
                                                }`}
                                        >
                                            {brand === 'all' ? 'All Brands' : brand}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Price Range Filter */}
                    <div>
                        <button
                            onClick={() => toggleSection('price')}
                            className="flex items-center justify-between w-full mb-3"
                        >
                            <span className="flex items-center gap-2 font-medium text-gray-800">
                                <span className={`text-${config.accentColor}-500`}>$</span>
                                Price Range
                            </span>
                            <FontAwesomeIcon
                                icon={expandedSections.price ? faChevronUp : faChevronDown}
                                className="h-3 w-3 text-gray-400"
                            />
                        </button>
                        {expandedSections.price && (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-1/2 px-3 py-2 rounded-lg text-sm bg-[#e6e6e6] focus:outline-none
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-1/2 px-3 py-2 rounded-lg text-sm bg-[#e6e6e6] focus:outline-none
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full accent-emerald-500"
                                />
                                <p className="text-xs text-gray-500 text-center">
                                    EGP {priceRange[0].toLocaleString()} - EGP {priceRange[1].toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className="min-h-screen bg-[#e6e6e6]">
            {/* Hero Banner */}
            <div className="bg-[#e6e6e6] py-10 sm:py-14 shadow-[inset_0_-6px_12px_rgba(0,0,0,0.04)]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="h-12 w-12 sm:h-14 sm:w-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                            <FontAwesomeIcon icon={config.icon} className={`h-6 w-6 sm:h-7 sm:w-7 text-${config.accentColor}-600`} />
                        </span>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                                {config.name}
                            </h1>
                            <p className="text-gray-500 text-sm sm:text-base mt-1">
                                {config.description}
                            </p>
                        </div>
                    </div>

                    {/* Featured Icons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {config.featuredIcons.slice(0, 6).map((icon, index) => (
                            <span
                                key={index}
                                className="h-10 w-10 bg-[#e6e6e6] rounded-lg flex items-center justify-center
                                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                            >
                                <FontAwesomeIcon icon={icon} className={`h-4 w-4 text-${config.accentColor}-500`} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Top Bar - Search, Sort, View Mode */}
                <div className="bg-[#e6e6e6] rounded-2xl p-4 mb-6
                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder={`Search in ${config.name}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm bg-[#e6e6e6] focus:outline-none
                                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-[#e6e6e6] transition-all
                                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                    active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                            >
                                <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
                                Filters
                                {hasActiveFilters && (
                                    <span className={`w-2 h-2 bg-${config.accentColor}-500 rounded-full`}></span>
                                )}
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-[#e6e6e6] transition-all
                                        shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                        active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                >
                                    <FontAwesomeIcon icon={faSort} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Sort by</span>
                                    <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isSortOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsSortOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-[#e6e6e6] rounded-xl z-20 overflow-hidden
                                            shadow-[6px_6px_16px_#c5c5c5,-6px_-6px_16px_#ffffff]">
                                            {sortOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value as SortOption)
                                                        setIsSortOpen(false)
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-all ${sortBy === option.value
                                                            ? `text-${config.accentColor}-700 font-medium shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]`
                                                            : 'text-gray-700'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="hidden sm:flex items-center gap-1.5 bg-[#e6e6e6] rounded-xl p-1
                                shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                            ? `text-${config.accentColor}-600 bg-[#e6e6e6] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]`
                                            : 'text-gray-400'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                            ? `text-${config.accentColor}-600 bg-[#e6e6e6] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]`
                                            : 'text-gray-400'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results count & Active filters */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
                        </p>

                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2">
                                {selectedSubcategory !== 'all' && (
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6e6e6] text-${config.accentColor}-700 rounded-lg text-xs font-medium
                                        shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]`}>
                                        {subcategories.find(s => s._id === selectedSubcategory)?.name}
                                        <button onClick={() => setSelectedSubcategory('all')}>
                                            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedBrand !== 'all' && (
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6e6e6] text-${config.accentColor}-700 rounded-lg text-xs font-medium
                                        shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]`}>
                                        {selectedBrand}
                                        <button onClick={() => setSelectedBrand('all')}>
                                            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1'
                                }`}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} productInfo={product} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-[#e6e6e6] rounded-2xl
                                shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]">
                                <div className="h-20 w-20 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-4
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <FontAwesomeIcon icon={faBoxOpen} className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearFilters}
                                    className={`px-5 py-2.5 bg-[#e6e6e6] text-${config.accentColor}-700 rounded-xl text-sm font-medium transition-all
                                        shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                        active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]`}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsMobileFilterOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#e6e6e6] overflow-y-auto">
                        <div className="sticky top-0 bg-[#e6e6e6] p-4 flex items-center justify-between
                            shadow-[0_3px_6px_rgba(0,0,0,0.06)]">
                            <h2 className="font-semibold text-gray-800">Filters</h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 rounded-lg bg-[#e6e6e6] transition-all
                                    shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]
                                    active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <FilterSidebar isMobile />
                        </div>
                        <div className="sticky bottom-0 bg-[#e6e6e6] p-4
                            shadow-[0_-3px_6px_rgba(0,0,0,0.06)]">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className={`w-full py-3 bg-[#e6e6e6] text-${config.accentColor}-700 rounded-xl font-medium transition-all
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                    active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]`}
                            >
                                Show {filteredProducts.length} Products
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}