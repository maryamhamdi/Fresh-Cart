import BrandScreen from "@/src/features/brands/screens/Brand.screen"
import { getBrandById, getProductsByBrand } from "@/src/features/brands/server/brands.action"
import { notFound } from "next/navigation"

interface BrandPageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: BrandPageProps) {
    const { id } = await params
    try {
        const response = await getBrandById(id)
        return {
            title: `${response.data.name} | E-Commerce`,
            description: `Shop products from ${response.data.name}`,
        }
    } catch {
        return {
            title: "Brand Not Found | E-Commerce",
        }
    }
}

export default async function BrandPage({ params }: BrandPageProps) {
    const { id } = await params
    
    try {
        const [brandResponse, productsResponse] = await Promise.all([
            getBrandById(id),
            getProductsByBrand(id)
        ])
        
        return (
            <BrandScreen 
                brand={brandResponse.data} 
                products={productsResponse.data || []} 
            />
        )
    } catch {
        notFound()
    }
}
