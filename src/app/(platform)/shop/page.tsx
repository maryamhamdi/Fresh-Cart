import AllProductsScreen from "@/src/features/products/screens/allProducts.screen"
import getProducts, { getProductsByCategory } from "@/src/features/products/server/products.action"

interface ShopPageProps {
    searchParams: Promise<{ category?: string }>
}

export default async function Shop({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const categoryId = params.category
    
    const response = categoryId 
        ? await getProductsByCategory(categoryId)
        : await getProducts()
    const products = response.data

    return <AllProductsScreen products={products} />
}