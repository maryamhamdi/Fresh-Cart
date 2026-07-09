import { AllBrandsPageSkeleton } from "@/src/features/brands/components/BrandsPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <AllBrandsPageSkeleton />
            <LoadingSpinner message="Loading Brands..." />
        </>
    )
}
