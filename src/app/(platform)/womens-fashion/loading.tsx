import { WomensFashionPageSkeleton } from "@/src/features/categories/components/CategoryPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <WomensFashionPageSkeleton />
            <LoadingSpinner message="Loading Women's Fashion..." />
        </>
    )
}
