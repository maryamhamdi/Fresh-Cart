import AllCategoriesScreen from "@/src/features/categories/screens/allCategories"
import getCategories from "@/src/features/categories/server/categories.action"

export default async function CategoriesPage() {
    const response = await getCategories()
    const categories = response.data

    return <AllCategoriesScreen categories={categories} />
}
