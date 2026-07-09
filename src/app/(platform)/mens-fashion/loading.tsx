import { MensFashionPageSkeleton } from "@/src/features/categories/components/CategoryPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <MensFashionPageSkeleton />
            <LoadingSpinner message="Loading Men's Fashion..." />
        </>
    )
}
