import MensFashionScreen from "@/src/features/categories/screens/mens-fashion.screen"
import { getProductsByCategory } from "@/src/features/products/server/products.action"
import { getSubcategoriesByCategory } from "@/src/features/categories/server/subcategories.action"
import { CATEGORY_IDS } from "@/src/features/categories/config/categories.config"

export const metadata = {
    title: "Men's Fashion | E-Commerce",
    description: "Shop the latest trends in men's clothing, shoes, and accessories",
}

export default async function MensFashionPage() {
    const categoryId = CATEGORY_IDS.MENS_FASHION
    
    const [productsResponse, subcategoriesResponse] = await Promise.all([
        getProductsByCategory(categoryId),
        getSubcategoriesByCategory(categoryId)
    ])
    
    return (
        <MensFashionScreen 
            products={productsResponse.data} 
            subcategories={subcategoriesResponse.data || []} 
        />
    )
}
