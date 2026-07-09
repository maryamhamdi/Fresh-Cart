import { AllProductsPageSkeleton } from "@/src/features/products/components/products.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <AllProductsPageSkeleton />
            <LoadingSpinner message="Loading Products..." />
        </>
    )
}
