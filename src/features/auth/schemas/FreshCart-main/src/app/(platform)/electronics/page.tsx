import ElectronicsScreen from "@/src/features/categories/screens/Electronics.screen"
import { getProductsByCategory } from "@/src/features/products/server/products.action"
import { getSubcategoriesByCategory } from "@/src/features/categories/server/subcategories.action"
import { CATEGORY_IDS } from "@/src/features/categories/config/categories.config"

export const metadata = {
    title: "Electronics | E-Commerce",
    description: "Discover the latest gadgets, smartphones, laptops, and electronic devices",
}

export default async function ElectronicsPage() {
    const categoryId = CATEGORY_IDS.ELECTRONICS
    
    const [productsResponse, subcategoriesResponse] = await Promise.all([
        getProductsByCategory(categoryId),
        getSubcategoriesByCategory(categoryId)
    ])
    
    return (
        <ElectronicsScreen 
            products={productsResponse.data} 
            subcategories={subcategoriesResponse.data || []} 
        />
    )
}
