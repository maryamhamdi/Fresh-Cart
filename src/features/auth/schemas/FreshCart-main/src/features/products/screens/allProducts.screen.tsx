'use client'

import { useState, useEffect, useMemo } from "react"
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
    faTags,
    faLayerGroup,
    faMoneyBill,
    faStore
} from "@fortawesome/free-solid-svg-icons"
import ProductCard from "@/src/components/shared/product.cart"
import { Product } from "../types/productsResponseType"

interface AllProductsScreenProps {
    products: Product[]
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-az' | 'name-za'
type ViewMode = 'grid' | 'list'

export default function AllProductsScreen({ products }: AllProductsScreenProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>('default')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedBrand, setSelectedBrand] = useState<string>('all')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    // Extract unique categories and brands
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category?.name).filter(Boolean))
        return ['all', ...Array.from(cats)]
    }, [products])

    const brands = useMemo(() => {
        const brandSet = new Set(products.map(p => p.brand?.name).filter(Boolean))
        return ['all', ...Array.from(brandSet)]
    }, [products])

    // Get min and max prices
    const { minPrice, maxPrice } = useMemo(() => {
        const prices = products.map(p => p.priceAfterDiscount || p.price)
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        }
    }, [products])

    // Initialize price range
    useEffect(() => {
        setPriceRange([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products]

        // Search filter
        if (searchQuery) {
            result = result.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category?.name === selectedCategory)
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
    }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy])

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
        setSelectedCategory('all')
        setSelectedBrand('all')
        setPriceRange([minPrice, maxPrice])
        setSortBy('default')
    }

    const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || priceRange[0] !== minPrice || priceRange[1] !== maxPrice

    // Sidebar Filter Component (reusable for both mobile and desktop)
    const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? '' : 'sticky top-24'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filter Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className="h-4 w-4 text-emerald-600" />
                            <h3 className="font-semibold text-gray-900">Filters</h3>
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <FontAwesomeIcon icon={faSearch} className="h-3.5 w-3.5 text-gray-400" />
                        Search
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="p-4 border-b border-gray-100">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5 text-gray-400" />
                        Categories
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {categories.map(cat => (
                            <label
                                key={cat}
                                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors
                                    ${selectedCategory === cat 
                                        ? 'bg-emerald-50 text-emerald-700' 
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                />
                                <span className="text-sm">{cat === 'all' ? 'All Categories' : cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div className="p-4 border-b border-gray-100">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <FontAwesomeIcon icon={faTags} className="h-3.5 w-3.5 text-gray-400" />
                        Brands
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {brands.map(brand => (
                            <label
                                key={brand}
                                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors
                                    ${selectedBrand === brand 
                                        ? 'bg-emerald-50 text-emerald-700' 
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={selectedBrand === brand}
                                    onChange={() => setSelectedBrand(brand)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                />
                                <span className="text-sm">{brand === 'all' ? 'All Brands' : brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="p-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <FontAwesomeIcon icon={faMoneyBill} className="h-3.5 w-3.5 text-gray-400" />
                        Price Range
                    </label>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="font-medium">{priceRange[0].toLocaleString()} EGP</span>
                            <span className="font-medium">{priceRange[1].toLocaleString()} EGP</span>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    className="w-full accent-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full accent-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-10 sm:py-14" data-aos="fade-down">
                <div className="container mx-auto px-4">
                    <h1 className="flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faStore} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </span>
                        All Products
                    </h1>
                    <p className="text-emerald-100 text-sm sm:text-base">
                        Discover our complete collection of {products.length} products
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 sm:py-8">
                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all
                            ${isMobileFilterOpen || hasActiveFilters
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-white border-gray-200 text-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
                            <span className="font-medium">Filters</span>
                            {hasActiveFilters && (
                                <span className="h-5 w-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                                    !
                                </span>
                            )}
                        </div>
                        <FontAwesomeIcon 
                            icon={isMobileFilterOpen ? faChevronUp : faChevronDown} 
                            className="h-4 w-4"
                        />
                    </button>
                    
                    {/* Mobile Filter Panel */}
                    {isMobileFilterOpen && (
                        <div className="mt-4">
                            <FilterSidebar isMobile />
                        </div>
                    )}
                </div>

                {/* Main Layout with Sidebar */}
                <div className="flex gap-6">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <aside className="hidden lg:block w-72 shrink-0" data-aos="fade-right" data-aos-delay="100">
                        <FilterSidebar />
                    </aside>

                    {/* Products Section */}
                    <div className="flex-1 min-w-0" data-aos="fade-up" data-aos-delay="200">
                        {/* Top Controls */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                {/* Results Count */}
                                <p className="text-sm text-gray-600">
                                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of {products.length} products
                                </p>

                                {/* Sort & View Controls */}
                                <div className="flex items-center gap-3">
                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium
                                                ${isSortOpen
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-200'
                                                }`}
                                        >
                                            <FontAwesomeIcon icon={faSort} className="h-4 w-4" />
                                            <span className="hidden sm:inline">
                                                {sortOptions.find(o => o.value === sortBy)?.label || 'Sort'}
                                            </span>
                                            <FontAwesomeIcon 
                                                icon={faChevronDown} 
                                                className={`h-3 w-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Sort Dropdown Menu */}
                                        {isSortOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                                                {sortOptions.map(option => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setSortBy(option.value as SortOption)
                                                            setIsSortOpen(false)
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                                                            ${sortBy === option.value
                                                                ? 'bg-emerald-50 text-emerald-700 font-medium'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={
                                viewMode === 'grid'
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                                    : "flex flex-col gap-4"
                            }>
                                {filteredProducts.map((product, idx) => (
                                    <div key={product._id} data-aos="zoom-in" data-aos-delay={100 + idx * 50}>
                                        <ProductCard productInfo={product} viewMode={viewMode} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faBoxOpen} className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
