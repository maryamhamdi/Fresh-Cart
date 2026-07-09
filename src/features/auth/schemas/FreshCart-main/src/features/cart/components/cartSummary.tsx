"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faLock, faTag, faTruck, faXmark, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { applyCoupon } from "../server/cart.actions";
import { useAppDispatch } from "@/src/store/store";
import { setCartInfo, clearDiscount } from "../store/cart.slice";
import { toast } from "react-toastify";

const formatPrice = (value: number) =>
	value.toLocaleString("en-US", { minimumFractionDigits: 0 });

interface OrderSummaryProps {
	info: {
		cartId: string;
		totalCartPrice: number;
		numOfCartItems: number;
		totalCartPriceAfterDiscount: number | null;
	};
}

export default function OrderSummary({ info }: OrderSummaryProps) {
	const dispatch = useAppDispatch();
	const [showPromoInput, setShowPromoInput] = useState(false);
	const [promoCode, setPromoCode] = useState("");
	const [isApplying, setIsApplying] = useState(false);
	const [promoError, setPromoError] = useState<string | null>(null);

	const itemCount = info.numOfCartItems;
	const subtotal = info.totalCartPrice;
	const discountedPrice = info.totalCartPriceAfterDiscount;
	const hasDiscount = discountedPrice !== null && discountedPrice < subtotal;
	const discountAmount = hasDiscount ? subtotal - discountedPrice : 0;
	
	const priceForShipping = hasDiscount ? discountedPrice : subtotal;
	const shippingCost = priceForShipping >= 500 ? 0 : 70;
	const shippingLabel = shippingCost === 0 ? "Free" : `${shippingCost}`;
	
	const finalPrice = hasDiscount ? discountedPrice : subtotal;
	const total = finalPrice + shippingCost;

	const handleApplyPromo = async () => {
		if (!promoCode.trim()) {
			setPromoError("Please enter a promo code");
			return;
		}

		setIsApplying(true);
		setPromoError(null);

		try {
			const response = await applyCoupon(promoCode.trim());
			dispatch(setCartInfo(response));
			toast.success("Promo code applied successfully!");
			setShowPromoInput(false);
		} catch (error: any) {
			setPromoError(error.message || "Invalid promo code");
		} finally {
			setIsApplying(false);
		}
	};

	const handleRemovePromo = () => {
		dispatch(clearDiscount());
		setPromoCode("");
		setPromoError(null);
		toast.info("Promo code removed");
	};

	return (
		<aside className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
			<div className="bg-emerald-700 text-white p-4 sm:p-5 lg:p-6">
				<div className="flex items-center gap-3">
					<span className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/10 flex items-center justify-center">
						<FontAwesomeIcon icon={faBoxOpen} className="text-lg sm:text-xl" />
					</span>
					<div>
						<h3 className="text-base sm:text-lg lg:text-xl font-semibold">Order Summary</h3>
						<p className="text-xs sm:text-sm text-emerald-100">
							{itemCount} item{itemCount === 1 ? "" : "s"} in your cart
						</p>
					</div>
				</div>
			</div>

			<div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
				{priceForShipping < 500 ? (
					<div className="bg-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-start gap-3">
						<span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
							<FontAwesomeIcon icon={faTruck} className="text-sm sm:text-base" />
						</span>
						<div className="min-w-0">
							<p className="font-semibold text-orange-700 text-sm sm:text-base">For Free Shipping!</p>
							<p className="text-xs sm:text-sm text-orange-600">Still need {formatPrice(500 - priceForShipping)} EGP</p>
						</div>
					</div>
				) : (
					<div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-start gap-3">
						<span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
							<FontAwesomeIcon icon={faTruck} className="text-sm sm:text-base" />
						</span>
						<div>
							<p className="font-semibold text-emerald-700 text-sm sm:text-base">Free Shipping!</p>
							<p className="text-xs sm:text-sm text-emerald-600">You qualify for free delivery</p>
						</div>
					</div>
				)}

				<div className="space-y-2.5 sm:space-y-3 text-sm text-gray-600">
					<div className="flex items-center justify-between">
						<span>Subtotal</span>
						<span className="font-semibold text-gray-900">
							{formatPrice(subtotal)} EGP
						</span>
					</div>
					
					{/* Discount Row */}
					{hasDiscount && (
						<div className="flex items-center justify-between text-emerald-600">
							<div className="flex items-center gap-2">
								<FontAwesomeIcon icon={faTag} className="text-xs" />
								<span>Promo Discount</span>
							</div>
							<span className="font-semibold">-{formatPrice(discountAmount)} EGP</span>
						</div>
					)}

					<div className="flex items-center justify-between">
						<span>Shipping</span>
						<span className={`font-semibold ${shippingCost === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
							{shippingLabel}
						</span>
					</div>
					<div className="border-t border-dashed border-gray-200 pt-2.5 sm:pt-3 flex items-center justify-between text-base">
						<span className="font-semibold text-gray-900">Total</span>
						<div className="text-right">
							{hasDiscount && (
								<span className="text-sm text-gray-400 line-through mr-2">
									{formatPrice(subtotal + shippingCost)}
								</span>
							)}
							<span className="text-lg sm:text-xl font-bold text-gray-900">
								{itemCount == 0 ? "0" : formatPrice(Math.round(total))} EGP
							</span>
						</div>
					</div>
				</div>

				{/* Promo Code Section */}
				{hasDiscount ? (
					<div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
						<div className="flex items-center gap-2">
							<span className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
								<FontAwesomeIcon icon={faCheck} className="text-xs" />
							</span>
							<div>
								<p className="text-sm font-medium text-emerald-700">Promo Applied</p>
								<p className="text-xs text-emerald-600">You saved {formatPrice(discountAmount)} EGP</p>
							</div>
						</div>
						<button
							type="button"
							onClick={handleRemovePromo}
							className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
							title="Remove promo code"
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
				) : showPromoInput ? (
					<div className="space-y-3">
						<div className="flex gap-2">
							<input
								type="text"
								value={promoCode}
								onChange={(e) => {
									setPromoCode(e.target.value);
									setPromoError(null);
								}}
								placeholder="Enter promo code"
								className="flex-1 h-11 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
								disabled={isApplying}
							/>
							<button
								type="button"
								onClick={handleApplyPromo}
								disabled={isApplying}
								className="h-11 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-xl transition-colors flex items-center gap-2 text-sm"
							>
								{isApplying ? (
									<FontAwesomeIcon icon={faSpinner} className="animate-spin" />
								) : (
									"Apply"
								)}
							</button>
						</div>
						{promoError && (
							<p className="text-xs text-rose-500 bg-rose-50 p-2 rounded-lg">
								{promoError}
							</p>
						)}
						<button
							type="button"
							onClick={() => {
								setShowPromoInput(false);
								setPromoCode("");
								setPromoError(null);
							}}
							className="text-xs text-gray-500 hover:text-gray-700"
						>
							Cancel
						</button>
					</div>
				) : (
					<button
						type="button"
						onClick={() => setShowPromoInput(true)}
						className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 text-sm sm:text-base transition-colors"
					>
						<FontAwesomeIcon icon={faTag} />
						Apply Promo Code
					</button>
				)}

				<Link
					href="/checkout"
					className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/70 hover:bg-emerald-700 text-sm sm:text-base transition-colors"
				>
					<FontAwesomeIcon icon={faLock} />
					Secure Checkout
				</Link>
			</div>
		</aside>
	);
}
