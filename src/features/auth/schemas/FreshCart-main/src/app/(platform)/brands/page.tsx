import AllBrandsScreen from "@/src/features/brands/screens/AllBrands.screen"
import { getAllBrands } from "@/src/features/brands/server/brands.action"

export const metadata = {
    title: "All Brands | E-Commerce",
    description: "Discover products from trusted brands",
}

export default async function BrandsPage() {
    const response = await getAllBrands()
    const brands = response.data

    return <AllBrandsScreen brands={brands} />
}
