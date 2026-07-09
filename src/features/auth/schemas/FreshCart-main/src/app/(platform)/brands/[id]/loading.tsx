import { BrandPageSkeleton } from "@/src/features/brands/components/BrandsPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <BrandPageSkeleton />
            <LoadingSpinner message="Loading Brand..." />
        </>
    )
}
