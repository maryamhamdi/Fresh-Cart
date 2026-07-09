'use client'

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox, faStar, faTruck, faCheck, faShieldHalved, faRotateLeft,
    faChevronDown, faUser, faPen, faSpinner, faThumbsUp, faQuoteLeft,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../types/productsResponseType";
import { Review } from "../types/reviewsTypes";
import { getProductReviews, createProductReview } from "../server/reviews.action";
import { useSelector } from "react-redux";
import { AppState } from "@/src/store/store";
import { toast } from "react-toastify";

type TabType = "details" | "reviews" | "shipping";

interface ProductReviewProps {
    product: Product;
}

export default function ProductReview({ product }: ProductReviewProps) {
    const [activeTab, setActiveTab] = useState<TabType>("details");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isAuthinticated, userInfo } = useSelector((state: AppState) => state.auth);
    const { description, category, subcategory, brand, sold, ratingsAverage, ratingsQuantity, _id: productId } = product;

    // Fetch reviews
    const fetchReviews = async () => {
        setIsLoadingReviews(true);
        try {
            const result = await getProductReviews(productId);
            if (result.success && result.data) {
                setReviews(result.data.data || []);
            } else {
                setReviews([]);
            }
        } catch {
            setReviews([]);
        } finally {
            setIsLoadingReviews(false);
        }
    };

    // Fetch reviews when switching to reviews tab
    useEffect(() => {
        if (activeTab === "reviews") {
            fetchReviews();
        }
    }, [activeTab]);

    // Calculate rating distribution from actual reviews
    const getRatingDistribution = () => {
        if (reviews.length === 0) {
            const total = ratingsQuantity || 0;
            return {
                5: Math.round(total * 0.60),
                4: Math.round(total * 0.25),
                3: Math.round(total * 0.05),
                2: Math.round(total * 0.05),
                1: Math.round(total * 0.05),
            };
        }

        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            const rating = Math.min(5, Math.max(1, Math.round(review.rating)));
            distribution[rating as keyof typeof distribution]++;
        });
        return distribution;
    };

    const ratingDistribution = getRatingDistribution();
    const totalReviews = reviews.length || ratingsQuantity || 0;

    // Handle review submission
    const handleSubmitReview = async () => {
        if (!isAuthinticated) {
            toast.error("Please login to submit a review");
            return;
        }
        if (selectedRating === 0) {
            toast.error("Please select a rating");
            return;
        }
        if (reviewText.trim().length < 3) {
            toast.error("Please write a review (at least 3 characters)");
            return;
        }
        setIsSubmitting(true);
        const result = await createProductReview(productId, reviewText.trim(), selectedRating);
        if (result.success) {
            toast.success("Review submitted successfully!");
            setReviewText("");
            setSelectedRating(0);
            setShowReviewForm(false);
            // Refetch reviews
            fetchReviews();
        } else {
            toast.error(result.error || "Failed to submit review");
        }
        setIsSubmitting(false);
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get user initials
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const tabs = [
        { id: "details" as TabType, label: "Details", fullLabel: "Product Details", icon: faBox },
        { id: "reviews" as TabType, label: `Reviews`, fullLabel: `Reviews (${totalReviews})`, icon: faStar },
        { id: "shipping" as TabType, label: "Shipping", fullLabel: "Shipping & Returns", icon: faTruck },
    ];

    const keyFeatures = [
        "Premium Quality Product",
        "100% Authentic Guarantee",
        "Fast & Secure Packaging",
        "Quality Tested",
    ];

    const shippingInfo = [
        "Free shipping on orders over 500 EGP",
        "Standard delivery: 3-5 business days",
        "Express delivery available (1-2 business days)",
        "Track your order in real-time",
    ];

    const returnsInfo = [
        "14-day hassle-free returns",
        "Full refund or exchange available",
        "Free return shipping on defective items",
        "Easy online return process",
    ];

    // Star Rating Component
    const StarRating = ({ rating, size = "md", interactive = false, onSelect }: {
        rating: number;
        size?: "sm" | "md" | "lg";
        interactive?: boolean;
        onSelect?: (rating: number) => void;
    }) => {
        const sizeClasses = {
            sm: "h-3 w-3 sm:h-3.5 sm:w-3.5",
            md: "h-4 w-4 sm:h-5 sm:w-5",
            lg: "h-5 w-5 sm:h-6 sm:w-6"
        };

        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => onSelect?.(star)}
                        onMouseEnter={() => interactive && setHoveredRating(star)}
                        onMouseLeave={() => interactive && setHoveredRating(0)}
                        className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                    >
                        <FontAwesomeIcon
                            icon={star <= (interactive ? (hoveredRating || rating) : rating) ? faStar : faStarRegular}
                            className={`${sizeClasses[size]} ${star <= (interactive ? (hoveredRating || rating) : rating)
                                ? "text-amber-400"
                                : "text-gray-300"
                                } transition-colors`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
            <div className="bg-[#e6e6e6] rounded-2xl sm:rounded-3xl overflow-hidden
                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                {/* Tabs Header */}
                <div>
                    {/* Mobile Custom Dropdown */}
                    <div className="sm:hidden p-3" ref={dropdownRef}>
                        <div className="relative">
                            {/* Dropdown Trigger */}
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full flex items-center justify-between bg-[#e6e6e6] rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200
                                    ${isDropdownOpen
                                        ? 'shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]'
                                        : 'shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-[#e6e6e6] transition-colors text-emerald-600
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]`}>
                                        <FontAwesomeIcon
                                            icon={tabs.find(t => t.id === activeTab)?.icon || faBox}
                                            className="h-3.5 w-3.5"
                                        />
                                    </span>
                                    <span className="text-gray-800">{tabs.find(t => t.id === activeTab)?.fullLabel}</span>
                                </div>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`text-gray-400 text-sm transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-emerald-500' : ''}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-0 right-0 mt-2 bg-[#e6e6e6] rounded-2xl overflow-hidden z-50 transition-all duration-300 origin-top
                                shadow-[6px_6px_16px_#c5c5c5,-6px_-6px_16px_#ffffff]
                                ${isDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <div className="py-2">
                                    {tabs.map((tab, index) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-4 px-4 py-3.5 text-left transition-all duration-200 group
                                                ${activeTab === tab.id
                                                    ? 'text-emerald-700 shadow-[inset_2px_2px_5px_#c5c5c5,inset_-2px_-2px_5px_#ffffff]'
                                                    : 'text-gray-700'
                                                }`}
                                        >
                                            <span className={`flex items-center justify-center w-10 h-10 rounded-xl bg-[#e6e6e6] transition-all duration-200
                                                ${activeTab === tab.id
                                                    ? 'text-emerald-600 shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]'
                                                    : 'text-gray-500 shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]'
                                                }`}>
                                                <FontAwesomeIcon icon={tab.icon} className="h-4 w-4" />
                                            </span>
                                            <div className="flex-1">
                                                <span className={`block font-semibold text-sm ${activeTab === tab.id ? 'text-emerald-700' : 'text-gray-800'}`}>
                                                    {tab.fullLabel}
                                                </span>
                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                    {tab.id === 'details' && 'View product information'}
                                                    {tab.id === 'reviews' && 'See customer feedback'}
                                                    {tab.id === 'shipping' && 'Delivery & return options'}
                                                </span>
                                            </div>
                                            {activeTab === tab.id && (
                                                <span className="flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full">
                                                    <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Tabs */}
                    <div className="hidden sm:flex gap-2 p-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 rounded-xl text-sm font-medium transition-all relative
                                    ${activeTab === tab.id
                                        ? "text-emerald-600 shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <FontAwesomeIcon icon={tab.icon} className="h-4 w-4" />
                                <span className="hidden md:inline">{tab.fullLabel}</span>
                                <span className="md:hidden">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Product Details Tab */}
                    {activeTab === "details" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">About this Product</h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Product Information */}
                                <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 sm:p-5
                                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                    <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Product Information</h4>
                                    <div className="space-y-2.5 sm:space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Category</span>
                                            <span className="text-emerald-600 font-medium">{category.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Subcategory</span>
                                            <span className="text-gray-700 font-medium">{subcategory[0]?.name || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Brand</span>
                                            <span className="text-gray-700 font-medium">{brand.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Items Sold</span>
                                            <span className="text-gray-700 font-medium">{sold?.toLocaleString() || 0} sold</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 sm:p-5
                                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                    <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Key Features</h4>
                                    <ul className="space-y-2.5 sm:space-y-3">
                                        {keyFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2.5 sm:gap-3">
                                                <span className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#e6e6e6] flex items-center justify-center shrink-0
                                                    shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]">
                                                    <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-600" />
                                                </span>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "reviews" && (
                        <div className="space-y-6 sm:space-y-8">
                            {/* Rating Summary & Write Review Button */}
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                {/* Overall Rating Card */}
                                <div className="lg:w-64 shrink-0">
                                    <div className="bg-[#e6e6e6] rounded-2xl p-5 sm:p-6 text-center
                                        shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                        <div className="text-4xl sm:text-5xl font-bold text-gray-800">{ratingsAverage?.toFixed(1) || "0.0"}</div>
                                        <div className="flex justify-center mt-2">
                                            <StarRating rating={Math.round(ratingsAverage || 0)} size="md" />
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-2">Based on {totalReviews} reviews</p>

                                        {/* Write Review Button */}
                                        <button
                                            onClick={() => {
                                                if (!isAuthinticated) {
                                                    toast.info("Please login to write a review");
                                                    return;
                                                }
                                                setShowReviewForm(true);
                                            }}
                                            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e6e6e6] text-emerald-700 text-sm font-medium rounded-xl transition-all
                                                shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                                active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                        >
                                            <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
                                            Write a Review
                                        </button>
                                    </div>
                                </div>

                                {/* Rating Distribution */}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Rating Distribution</h4>
                                    <div className="space-y-2.5">
                                        {[5, 4, 3, 2, 1].map((stars) => {
                                            const count = ratingDistribution[stars as keyof typeof ratingDistribution];
                                            const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                                            return (
                                                <div key={stars} className="flex items-center gap-2 sm:gap-3">
                                                    <div className="flex items-center gap-1 w-16 sm:w-20">
                                                        <span className="text-xs sm:text-sm text-gray-600">{stars}</span>
                                                        <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-amber-400" />
                                                    </div>
                                                    <div className="flex-1 h-2.5 sm:h-3 bg-[#e6e6e6] rounded-full overflow-hidden
                                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-gray-500 w-10 sm:w-12 text-right">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Review Form Modal */}
                            {showReviewForm && (
                                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                                    <div className="bg-[#e6e6e6] rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto
                                        shadow-[10px_10px_20px_rgba(0,0,0,0.25),-6px_-6px_16px_rgba(255,255,255,0.3)]">
                                        {/* Modal Header */}
                                        <div className="flex items-center justify-between p-4 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Write a Review</h3>
                                            <button
                                                onClick={() => setShowReviewForm(false)}
                                                className="h-8 w-8 rounded-full bg-[#e6e6e6] flex items-center justify-center transition-all
                                                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                                    active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                            >
                                                <FontAwesomeIcon icon={faXmark} className="h-4 w-4 text-gray-500" />
                                            </button>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="p-4 sm:p-6 space-y-5">
                                            {/* User Info */}
                                            <div className="flex items-center gap-3 p-3 bg-[#e6e6e6] rounded-xl
                                                shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                                <div className="h-10 w-10 rounded-full bg-[#e6e6e6] flex items-center justify-center
                                                    shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]">
                                                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 text-sm">{userInfo?.name || "User"}</p>
                                                    <p className="text-xs text-gray-500">Posting publicly</p>
                                                </div>
                                            </div>

                                            {/* Star Rating Selection */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                                                <div className="flex items-center gap-3">
                                                    <StarRating
                                                        rating={selectedRating}
                                                        size="lg"
                                                        interactive
                                                        onSelect={setSelectedRating}
                                                    />
                                                    {selectedRating > 0 && (
                                                        <span className="text-sm text-gray-500">
                                                            {selectedRating === 1 && "Poor"}
                                                            {selectedRating === 2 && "Fair"}
                                                            {selectedRating === 3 && "Good"}
                                                            {selectedRating === 4 && "Very Good"}
                                                            {selectedRating === 5 && "Excellent"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Review Text */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                                                <textarea
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                    placeholder="Share your experience with this product..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-[#e6e6e6] rounded-xl text-sm focus:outline-none resize-none
                                                        shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">{reviewText.length}/500 characters</p>
                                            </div>
                                        </div>

                                        {/* Modal Footer */}
                                        <div className="flex items-center gap-3 p-4 sm:p-6">
                                            <button
                                                onClick={() => setShowReviewForm(false)}
                                                className="flex-1 px-4 py-2.5 bg-[#e6e6e6] text-gray-700 text-sm font-medium rounded-xl transition-all
                                                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                                    active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmitReview}
                                                disabled={isSubmitting || selectedRating === 0 || reviewText.trim().length < 3}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e6e6e6] text-emerald-700 text-sm font-medium rounded-xl transition-all disabled:opacity-50
                                                    shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]
                                                    active:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    "Submit Review"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reviews List */}
                            <div className="pt-6 sm:pt-8">
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Customer Reviews</h4>
                                    {reviews.length > 0 && (
                                        <span className="text-xs sm:text-sm text-gray-500">{reviews.length} reviews</span>
                                    )}
                                </div>

                                {isLoadingReviews ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-emerald-600 animate-spin mb-3" />
                                        <p className="text-gray-500 text-sm">Loading reviews...</p>
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <div className="text-center py-10 sm:py-12">
                                        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#e6e6e6] mb-4
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                            <FontAwesomeIcon icon={faStar} className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 mb-2 text-sm sm:text-base">No reviews yet</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">Be the first to review this product!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 sm:space-y-6">
                                        {reviews.map((review, index) => (
                                            <div
                                                key={review._id}
                                                className="bg-[#e6e6e6] rounded-2xl p-4 sm:p-5
                                                    shadow-[4px_4px_10px_#c5c5c5,-4px_-4px_10px_#ffffff]"
                                            >
                                                <div className="flex gap-3 sm:gap-4">
                                                    {/* Avatar */}
                                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#e6e6e6] flex items-center justify-center shrink-0
                                                        shadow-[2px_2px_5px_#c5c5c5,-2px_-2px_5px_#ffffff]">
                                                        <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                                                            {getInitials(review.user?.name || "User")}
                                                        </span>
                                                    </div>

                                                    {/* Review Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                                            <h5 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                                                                {review.user?.name || "Anonymous"}
                                                            </h5>
                                                            <div className="flex items-center gap-2">
                                                                <StarRating rating={review.rating} size="sm" />
                                                                <span className="text-xs text-gray-400">
                                                                    {formatDate(review.createdAt)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Review Text */}
                                                        <div className="relative">
                                                            <FontAwesomeIcon
                                                                icon={faQuoteLeft}
                                                                className="absolute -left-1 -top-1 h-3 w-3 text-emerald-300"
                                                            />
                                                            <p className="text-gray-600 text-sm leading-relaxed pl-3">
                                                                {review.review}
                                                            </p>
                                                        </div>

                                                        {/* Review Actions */}
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                                                                <FontAwesomeIcon icon={faThumbsUp} className="h-3 w-3" />
                                                                Helpful
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Shipping & Returns Tab */}
                    {activeTab === "shipping" && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Shipping Information */}
                                <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 sm:p-6
                                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#e6e6e6] flex items-center justify-center shrink-0
                                            shadow-[2px_2px_5px_#c5c5c5,-2px_-2px_5px_#ffffff]">
                                            <FontAwesomeIcon icon={faTruck} className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Shipping Information</h4>
                                    </div>
                                    <ul className="space-y-2.5 sm:space-y-3">
                                        {shippingInfo.map((info, index) => (
                                            <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                                                <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 mt-0.5 shrink-0" />
                                                <span className="text-gray-700 text-sm">{info}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Returns & Refunds */}
                                <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 sm:p-6
                                    shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#e6e6e6] flex items-center justify-center shrink-0
                                            shadow-[2px_2px_5px_#c5c5c5,-2px_-2px_5px_#ffffff]">
                                            <FontAwesomeIcon icon={faRotateLeft} className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Returns & Refunds</h4>
                                    </div>
                                    <ul className="space-y-2.5 sm:space-y-3">
                                        {returnsInfo.map((info, index) => (
                                            <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                                                <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 mt-0.5 shrink-0" />
                                                <span className="text-gray-700 text-sm">{info}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Buyer Protection Guarantee */}
                            <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4
                                shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#e6e6e6] flex items-center justify-center shrink-0
                                    shadow-[2px_2px_5px_#c5c5c5,-2px_-2px_5px_#ffffff]">
                                    <FontAwesomeIcon icon={faShieldHalved} className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Buyer Protection Guarantee</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                        Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. We ensure your shopping experience is safe and secure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}