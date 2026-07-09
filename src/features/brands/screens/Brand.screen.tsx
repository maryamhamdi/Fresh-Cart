'use client'

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faArrowLeft,
    faFilter, 
    faSort, 
    faGripVertical, 
    faList, 
    faChevronDown,
    faXmark,
    faSearch,
    faBoxOpen,
    faChevronUp,
    faStore,
    faTag
} from "@fortawesome/free-solid-svg-icons"
import ProductCard from "@/src/components/shared/product.cart"
import { Product } from "@/src/features/products/types/productsResponseType"
import { Brand } from "../types/brand.types"

interface BrandScreenProps {
    brand: Brand
    products: Product[]
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-az' | 'name-za'
type ViewMode = 'grid' | 'list'

export default function BrandScreen({ brand, products }: BrandScreenProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>('default')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true
    })

    // Extract unique categories from products
    const categories = useMemo(() => {
        const catSet = new Set(products.map(p => p.category?.name).filter(Boolean))
        return ['all', ...Array.from(catSet)]
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
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category?.name === selectedCategory)
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
    }, [products, searchQuery, selectedCategory, priceRange, sortBy])

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
        setPriceRange([minPrice, maxPrice])
        setSortBy('default')
    }

    const hasActiveFilters = searchQuery || selectedCategory !== 'all' || priceRange[0] !== minPrice || priceRange[1] !== maxPrice

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    // Filter Sidebar Component
    const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? '' : 'sticky top-24'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filter Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className="h-4 w-4 text-violet-600" />
                            <h3 className="font-semibold text-gray-900">Filters</h3>
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
                    {/* Categories Filter */}
                    {categories.length > 1 && (
                        <div className="border-b border-gray-100 pb-4">
                            <button
                                onClick={() => toggleSection('categories')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="flex items-center gap-2 font-medium text-gray-900">
                                    <FontAwesomeIcon icon={faTag} className="h-4 w-4 text-violet-500" />
                                    Categories
                                </span>
                                <FontAwesomeIcon 
                                    icon={expandedSections.categories ? faChevronUp : faChevronDown} 
                                    className="h-3 w-3 text-gray-400" 
                                />
                            </button>
                            {expandedSections.categories && (
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                selectedCategory === category
                                                    ? 'bg-violet-100 text-violet-700 font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {category === 'all' ? 'All Categories' : category}
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
                            <span className="flex items-center gap-2 font-medium text-gray-900">
                                <span className="text-violet-500">$</span>
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
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full accent-violet-500"
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
        <section className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 py-10 sm:py-14">
                <div className="container mx-auto px-4">
                    {/* Back Link */}
                    <Link 
                        href="/brands" 
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
                        Back to All Brands
                    </Link>
                    
                    <div className="flex items-center gap-5">
                        {/* Brand Logo */}
                        <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg">
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                                {brand.name}
                            </h1>
                            <p className="text-purple-100 text-sm sm:text-base mt-1">
                                {products.length} products available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Top Bar - Search, Sort, View Mode */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                            />
                            <input
                                type="text"
                                placeholder={`Search in ${brand.name} products...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                                )}
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
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
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                                            {sortOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value as SortOption)
                                                        setIsSortOpen(false)
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                                        sortBy === option.value
                                                            ? 'bg-violet-50 text-violet-700 font-medium'
                                                            : 'text-gray-700 hover:bg-gray-50'
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
                            <div className="hidden sm:flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
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

                    {/* Results count & Active filters */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                        </p>
                        
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2">
                                {selectedCategory !== 'all' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium">
                                        {selectedCategory}
                                        <button onClick={() => setSelectedCategory('all')}>
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
                            <div className={`grid gap-4 sm:gap-6 ${
                                viewMode === 'grid' 
                                    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
                                    : 'grid-cols-1'
                            }`}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} productInfo={product} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faBoxOpen} className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-5 py-2.5 bg-violet-500 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors"
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
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900">Filters</h2>
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <FilterSidebar isMobile />
                        </div>
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors"
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
