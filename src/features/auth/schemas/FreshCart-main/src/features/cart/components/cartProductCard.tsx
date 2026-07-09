"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faPlus,
	faTrashCan,
	faCheck,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "../types/userCartTypes";
import { clearCart, removeFromCart, updateCartItemQuantity } from "../server/cart.actions";
import Swal from 'sweetalert2'
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { removeProductFromCart, setCartInfo, clearCartState } from "../store/cart.slice";


const formatPrice = (value: number) =>
	value.toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function CartProductCard({info} : {info:CartItem}) {
	const { count , product , price , _id } = info;
	const { title, imageCover, category, quantity , id, _id: productId } = product;
	const total = price * count;

	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.auth.isAuthinticated);

	const handleRemove  = async () => {
		// Show confirmation dialog
		const result = await Swal.fire({
			html: `
				<div class="flex flex-col items-center py-2">
					<div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
						<svg class="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
						</svg>
					</div>
					<h2 class="text-xl font-bold text-gray-900 mb-2">Remove Item</h2>
					<p class="text-gray-500 text-center mb-1">Are you sure you want to remove</p>
					<p class="font-semibold text-gray-800 text-center mb-4">"${title}"</p>
					<p class="text-sm text-gray-400">This action cannot be undone.</p>
				</div>
			`,
			showCancelButton: true,
			confirmButtonText: 'Yes, Remove',
			cancelButtonText: 'Cancel',
			customClass: {
				popup: 'rounded-2xl',
				confirmButton: 'bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors',
				cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors',
				actions: 'gap-3'
			},
			buttonsStyling: false,
			reverseButtons: true
		})

		if (result.isConfirmed) {
			// Implement the logic to remove the item from the cart
			dispatch(removeProductFromCart(productId || id));
			if (isAuth) {
				const response = await removeFromCart(productId || id);
			}
			Swal.fire({
				html: `
					<div class="flex flex-col items-center py-2">
						<div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
							<svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						<h2 class="text-xl font-bold text-gray-900 mb-2">Removed!</h2>
						<p class="text-gray-500 text-center">Item has been removed from your cart.</p>
					</div>
				`,
				showConfirmButton: false,
				timer: 1200,
				customClass: {
					popup: 'rounded-2xl'
				}
			})
		}
	}

	const handleUpdateQuantity = async (newCount: number) => {
		// Implement the logic to update the quantity of the item in the cart
		if(newCount < 1) return 

		try {
			const response = await updateCartItemQuantity(id, newCount)
			dispatch(setCartInfo(response))
			// Optionally, you can show a success message or update the UI based on the response
		} catch (error) {
			
		}
	}



	return (
		<div className="space-y-4">
			{/* Desktop Card */}
			<article className="hidden sm:flex bg-white rounded-2xl border border-gray-200 p-5 flex-col lg:flex-row gap-5 shadow">
				{/* Left: Image & Stock Badge */}
				<div className="flex flex-col items-center gap-3 shrink-0">
					<Link href={`/products/${id}`}>
						<div className="relative h-28 w-28 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 hover:border-emerald-200 transition-colors">
							<Image
								src={imageCover}
								alt={title}
								fill
								className="object-contain p-2"
							/>
						</div>
					</Link>
					<span
						className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
							quantity > 0
								? "bg-emerald-500 text-white"
								: "bg-rose-100 text-rose-600"
						}`}
					>
						{quantity > 0 && (
							<FontAwesomeIcon icon={faCheck} className="text-[10px]" />
						)}
						{quantity > 0 ? "In Stock" : "Out of Stock"}
					</span>
				</div>

				{/* Middle: Product Info */}
				<div className="flex-1 space-y-3">
					<Link href={`/products/${id}`}>
						<h3 className="text-lg font-semibold text-gray-900 leading-snug hover:text-emerald-600 transition-colors">
							{title}
						</h3>
					</Link>
					<div className="flex flex-wrap items-center gap-2">
						<span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
							{category?.name || "Category"}
						</span>
						<span className="text-xs text-gray-400">SKU: {_id ? _id.slice(-8) : ''}</span>
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-xl font-bold text-emerald-600">
							{formatPrice(price)} EGP
						</span>
						<span className="text-sm text-gray-400">per unit</span>
					</div>

					{/* Quantity Selector */}
					<div className="flex items-center gap-1 pt-1 bg-gray-100/60 w-fit p-1 rounded-lg">
						<button
							disabled={count <= 1}
							onClick={() => handleUpdateQuantity(count - 1)}
							type="button"
							className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
							aria-label="Decrease quantity"
						>
							<FontAwesomeIcon icon={faMinus} className="text-xs" />
						</button>
						<span className="w-10 text-center text-gray-900 font-semibold">
							{count}
						</span>
						<button
							disabled={count >= quantity}
							onClick={() => handleUpdateQuantity(count + 1)}
							type="button"
							className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label="Increase quantity"
						>
							<FontAwesomeIcon icon={faPlus} className="text-xs" />
						</button>
					</div>
				</div>

				{/* Right: Total & Delete */}
				<div className="flex items-end gap-4 lg:ml-auto">
					<div className="text-right">
						<p className="text-xs text-gray-400 mb-1">Total</p>
						<p className="text-2xl font-bold text-gray-900">
							{formatPrice(total)}{" "}
							<span className="text-sm font-medium text-gray-500">EGP</span>
						</p>
					</div>
					<button
						onClick={handleRemove}
						type="button"
						className="h-11 w-11 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
						aria-label="Remove item"
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</article>

			{/* Mobile Card */}
			<article className="sm:hidden bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
				{/* Top Row: Image + Info + Delete */}
				<div className="flex gap-3">
					<Link href={`/products/${id}`}>
						<div className="relative h-20 w-20 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
							<Image
								src={imageCover}
								alt={title}
								fill
								className="object-contain p-1.5"
							/>
						</div>
					</Link>
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<div className="min-w-0">
								<Link href={`/products/${id}`}>
									<h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-emerald-600 transition-colors">
										{title}
									</h3>
								</Link>
								<p className="text-xs text-gray-500 mt-0.5">{category?.name || "Category"}</p>
							</div>
							<button
								onClick={handleRemove}
								type="button"
								className="p-2 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
								aria-label="Remove item"
							>
								<FontAwesomeIcon icon={faTrashCan} className="text-sm" />
							</button>
						</div>
						{/* Price per unit */}
						<p className="text-sm font-bold text-emerald-600 mt-1">
							{formatPrice(price)} EGP
						</p>
						{/* Stock Badge - Inline */}
						<span
							className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${
								quantity > 0
									? "bg-emerald-50 text-emerald-600"
									: "bg-rose-50 text-rose-600"
							}`}
						>
							{quantity > 0 && (
								<FontAwesomeIcon icon={faCheck} className="text-[8px]" />
							)}
							{quantity > 0 ? "In Stock" : "Out of Stock"}
						</span>
					</div>
				</div>

				{/* Bottom Row: Quantity + Total */}
				<div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
					{/* Quantity Selector */}
					<div className="flex items-center gap-1 bg-gray-100/60 p-1 rounded-lg">
						<button
							disabled={count <= 1}
							onClick={() => handleUpdateQuantity(count - 1)}
							type="button"
							className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label="Decrease quantity"
						>
							<FontAwesomeIcon icon={faMinus} className="text-xs" />
						</button>
						<span className="w-8 text-center text-gray-900 font-semibold text-sm">
							{count}
						</span>
						<button
							disabled={count >= quantity}
							onClick={() => handleUpdateQuantity(count + 1)}
							type="button"
							className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label="Increase quantity"
						>
							<FontAwesomeIcon icon={faPlus} className="text-xs" />
						</button>
					</div>

					{/* Total */}
					<div className="text-right">
						<p className="text-[10px] text-gray-400 uppercase tracking-wide">Total</p>
						<p className="text-lg font-bold text-gray-900">
							{formatPrice(total)} <span className="text-xs font-medium text-gray-500">EGP</span>
						</p>
					</div>
				</div>
			</article>
		</div>
	);
}
