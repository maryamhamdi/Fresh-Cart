import WomensFashionScreen from "@/src/features/categories/screens/womens-fashion.screen"
import { getProductsByCategory } from "@/src/features/products/server/products.action"
import { getSubcategoriesByCategory } from "@/src/features/categories/server/subcategories.action"
import { CATEGORY_IDS } from "@/src/features/categories/config/categories.config"

export const metadata = {
    title: "Women's Fashion | E-Commerce",
    description: "Explore trendy clothing, accessories, and footwear for women",
}

export default async function WomensFashionPage() {
    const categoryId = CATEGORY_IDS.WOMENS_FASHION
    
    const [productsResponse, subcategoriesResponse] = await Promise.all([
        getProductsByCategory(categoryId),
        getSubcategoriesByCategory(categoryId)
    ])
    
    return (
        <WomensFashionScreen 
            products={productsResponse.data} 
            subcategories={subcategoriesResponse.data || []} 
        />
    )
}
