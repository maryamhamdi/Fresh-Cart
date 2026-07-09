import Link from "next/link"

import ProductCard from "@/src/components/shared/product.cart"
import getProducts from "../../products/server/products.action"

export default async function FeaturedProducts() {

    const response = await getProducts()
    const products = response.data



    return <>
        <section className="categories py-10 bg-white container">
            <div className="flex gap-3 py-5">
                <div className="w-1.5 h-8 bg-linear-to-t from-primary-900 via-primary-700 to-primary-400 rounded-sm"></div>
                <div className="">
                    <h2 className="text-3xl font-bold">
                        Featured <span className="text-primary-700">Products</span></h2>

                </div>
            </div>
            <div className="grid mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {Array.isArray(products) ? products.map((product) => <ProductCard key={product._id} productInfo={product} />) : null}
            </div>
        </section>
    </>
} 