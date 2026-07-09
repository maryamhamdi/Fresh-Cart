"use client";

import { Order } from "../types/ordsers.types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OrderCart from "../components/orderCart";

interface OrdersScreenProps {
    orders: Order[];
}

export default function OrdersScreen({ orders }: OrdersScreenProps) {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleOrderDetails = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8" data-aos="fade-down">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-primary-500 rounded-2xl flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faShoppingBag}
                                className="text-white text-2xl"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-500">
                                Track and manage your {orders.length} orders
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <FontAwesomeIcon icon={faShoppingBag} className="text-sm" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center" data-aos="zoom-in">
                            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon
                                    icon={faShoppingBag}
                                    className="text-gray-400 text-3xl"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No orders yet
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Start shopping to see your orders here
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        orders.map((order, idx) => (
                            <div key={order._id} data-aos="fade-up" data-aos-delay={100 + idx * 50}>
                                <OrderCart
                                    order={order}
                                    isExpanded={expandedOrder === order._id}
                                    onToggle={() => toggleOrderDetails(order._id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}