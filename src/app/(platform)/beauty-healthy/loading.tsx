import { BeautyHealthyPageSkeleton } from "@/src/features/categories/components/CategoryPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <BeautyHealthyPageSkeleton />
            <LoadingSpinner message="Loading Beauty & Health..." />
        </>
    )
}
