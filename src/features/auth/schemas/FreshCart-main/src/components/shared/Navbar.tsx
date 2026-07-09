"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCartShopping,
    faChevronDown,
    faGear,
    faGift,
    faHeadset,
    faMagnifyingGlass,
    faPhone,
    faRightFromBracket,
    faRightToBracket,
    faShoppingBag,
    faTruck,
    faUserPlus,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faAddressBook, faEnvelope, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from '../../assets/images/freshcart-logo.svg'
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/src/store/store";
import useLogout from "@/src/features/auth/hooks/useLogout";

export default function Navbar() {
    const path = usePathname()
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const categoriesRef = useRef<HTMLLIElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsNavOpen(false)
            setIsClosing(false)
        }, 300)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setIsCategoriesOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Handle scroll for sticky navbar
    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const numOfCartItems = useSelector((appState: AppState) => appState.cart.numOfCartItems)
    const wishlistCount = useSelector((appState: AppState) => appState.wishlist.wishlistCount)
    const { isAuthinticated, userInfo } = useSelector((appState: AppState) => appState.auth)
    const { logout } = useLogout()

    const categories = [
        { name: "All Categories", href: "/categories" },
        { name: "Electronics", href: "/electronics" },
        { name: "Women's Fashion", href: "/womens-fashion" },
        { name: "Men's Fashion", href: "/mens-fashion" },
        { name: "Beauty & Health", href: "/beauty-healthy" },
    ]

    return <>
        {/* Top Announcement Bar - Not sticky */}
        <div className={`text-gray-700 text-sm transition-all duration-300 ${isScrolled ? 'hidden' : ''}`}>
            <div className="container py-2">
                <div className="hidden lg:flex justify-between items-center">
                    {/* Left Side */}
                    <ul className="flex items-center gap-6">
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faTruck} className="text-primary-500" />
                            <span>Free Shipping on Orders 500 EGP</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faGift} className="text-primary-500" />
                            <span>New Arrivals Daily</span>
                        </li>
                    </ul>

                    {/* Right Side */}
                    <ul className="flex items-center gap-6">
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} className="text-primary-500" />
                            <a href="tel:+18001234567" className="hover:text-primary-600 transition-colors">+1 (800) 123-4567</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                            <a href="mailto:support@freshcart.com" className="hover:text-primary-600 transition-colors">support@freshcart.com</a>
                        </li>
                        {isAuthinticated ? (
                            <>
                                <li className="flex items-center gap-2 border-l border-primary-600 pl-6">
                                    <FontAwesomeIcon icon={faUser} className="text-primary-500" />
                                    <span>{userInfo?.name || 'User'}</span>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-l border-primary-600 pl-6">
                                    <Link href="/login" className="hover:text-primary-600 transition-colors">
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup" className="hover:text-primary-200 transition-colors">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>

        {/* Main Navbar - Sticky */}
        <header className={`bg-white shadow-sm sticky top-0 z-40 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container">
                <nav className="flex items-center justify-between py-4 gap-6">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image src={logo} alt="FreshCart logo" className="h-8 w-auto" />
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="w-full h-11 pl-4 pr-12 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                            />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        <li>
                            <Link
                                href="/"
                                className={`hover:text-primary-600 transition-colors ${path === '/' ? 'text-primary-600' : 'text-gray-700'}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/shop"
                                className={`hover:text-primary-600 transition-colors ${path.includes('shop') ? 'text-primary-600' : 'text-gray-700'}`}
                            >
                                Shop
                            </Link>
                        </li>
                        {/* Categories Dropdown */}
                        <li className="relative" ref={categoriesRef}>
                            <button
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                className={`flex items-center gap-1 hover:text-primary-600 transition-colors ${path.includes('categories') ? 'text-primary-600' : 'text-gray-700'}`}
                            >
                                Categories
                                <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCategoriesOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                                    {categories.map((category, index) => (
                                        <Link
                                            key={index}
                                            href={category.href}
                                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsCategoriesOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li>
                            <Link
                                href="/brands"
                                className={`hover:text-primary-600 transition-colors ${path.includes('brands') ? 'text-primary-600' : 'text-gray-700'}`}
                            >
                                Brands
                            </Link>
                        </li>
                    </ul>

                    {/* Right Side Icons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Support Badge */}
                        <Link href={'/contact'} className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                            <span className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faHeadset} className="text-white text-sm" />
                            </span>
                            <div className="text-xs">
                                <span className="text-primary-600 font-semibold">Support</span>
                                <p className="text-gray-600">24/7 Help</p>
                            </div>
                        </Link>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className={`relative h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors ${path.includes('wishlist') ? 'border-primary-500 text-primary-600' : 'text-gray-600'}`}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className={`relative h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors ${path.includes('cart') ? 'border-primary-500 text-primary-600' : 'text-gray-600'}`}
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                            {numOfCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    {numOfCartItems}
                                </span>
                            )}
                        </Link>

                        {/* Account with Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`relative h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors ${path.includes('profile') || isProfileOpen ? 'border-primary-500 text-primary-600' : 'text-gray-600'}`}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    {isAuthinticated && userInfo ? (
                                        <>
                                            {/* User Info Header */}
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <span className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faUser} className="text-primary-600" />
                                                    </span>
                                                    <span className="font-semibold text-gray-900">{userInfo.name}</span>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faUser} className="w-4 text-gray-400" />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/allorders"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faShoppingBag} className="w-4 text-gray-400" />
                                                    My Orders
                                                </Link>
                                                <Link
                                                    href="/wishlist"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} className="w-4 text-gray-400" />
                                                    My Wishlist
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faAddressBook} className="w-4 text-gray-400" />
                                                    Addresses
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faGear} className="w-4 text-gray-400" />
                                                    Settings
                                                </Link>
                                            </div>

                                            {/* Sign Out */}
                                            <div className="border-t border-gray-100 pt-2">
                                                <button
                                                    onClick={() => { logout(); setIsProfileOpen(false); }}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                                                >
                                                    <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Guest Menu */}
                                            <div className="p-4 space-y-2">
                                                <Link
                                                    href="/login"
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faRightToBracket} />
                                                    Sign In
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                    Create Account
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-3">
                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="relative text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faHeart} className="text-xl" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                            {numOfCartItems > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {numOfCartItems}
                                </span>
                            )}
                        </Link>

                        {/* Menu Button */}
                        <button
                            className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                            onClick={() => isNavOpen ? handleClose() : setIsNavOpen(true)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </nav>
            </div>
        </header>

        {/* Background Overlay */}
        {(isNavOpen || isClosing) && (
            <div
                onClick={handleClose}
                className={`fixed inset-0 z-40 ${isClosing ? 'backdrop-close' : 'backdrop-fade'}`}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            />
        )}

        {/* Mobile Off-Canvas Menu */}
        {(isNavOpen || isClosing) && (
            <div className={`fixed right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto z-50 flex flex-col ${isClosing ? 'offcanvas-close-right' : 'offcanvas-slide-right'}`}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                    <Image src={logo} alt="FreshCart logo" className="h-7" />
                    <button
                        className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-gray-400 text-lg" />
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full h-10 pl-4 pr-12 rounded-lg border border-gray-200 focus:border-primary-500 outline-none text-sm"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-sm" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="px-4 py-2 space-y-1">
                    <Link href="/" className="block py-3 text-gray-800 font-medium text-base hover:text-primary-600 transition-colors" onClick={handleClose}>
                        Home
                    </Link>
                    <Link href="/shop" className="block py-3 text-gray-800 font-medium text-base hover:text-primary-600 transition-colors" onClick={handleClose}>
                        Shop
                    </Link>
                    <Link href="/categories" className="block py-3 text-gray-800 font-medium text-base hover:text-primary-600 transition-colors" onClick={handleClose}>
                        Categories
                    </Link>
                    <Link href="/brands" className="block py-3 text-gray-800 font-medium text-base hover:text-primary-600 transition-colors" onClick={handleClose}>
                        Brands
                    </Link>
                </div>

                {/* Divider */}
                <hr className="border-gray-100 mx-4 my-2" />

                {/* User Actions */}
                <div className="px-4 py-2 space-y-1">
                    <Link href="/wishlist" className="flex items-center gap-4 py-3 text-gray-800 hover:text-primary-600 transition-colors" onClick={handleClose}>
                        <FontAwesomeIcon icon={faHeart} className="text-red-400 text-lg" />
                        <span className="font-medium">Wishlist</span>
                        {wishlistCount > 0 && (
                            <span className="ml-auto h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" className="flex items-center gap-4 py-3 text-gray-800 hover:text-primary-600 transition-colors" onClick={handleClose}>
                        <FontAwesomeIcon icon={faCartShopping} className="text-primary-500 text-lg" />
                        <span className="font-medium">Cart</span>
                        {numOfCartItems > 0 && (
                            <span className="ml-auto h-6 w-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {numOfCartItems}
                            </span>
                        )}
                    </Link>
                    {isAuthinticated && userInfo && (
                        <Link href="/profile" className="flex items-center gap-4 py-3 text-gray-600">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-lg" />
                            <span className="font-medium">{userInfo.name}</span>
                        </Link>
                    )}
                    {isAuthinticated ? (
                        <button
                            onClick={() => { logout(); handleClose(); }}
                            className="flex items-center gap-4 py-3 text-red-500 hover:text-red-600 transition-colors w-full"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    ) : (
                        <div className="space-y-3 pt-2">
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Create Account
                            </Link>
                        </div>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Support Section */}
                <Link href="/contact" className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faHeadset} className="text-primary-600" />
                        </span>
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Need Help?</p>
                            <p className="text-primary-600 text-sm font-medium">Contact Support</p>
                        </div>
                    </div>
                </Link>
            </div>
        )}
    </>
}
