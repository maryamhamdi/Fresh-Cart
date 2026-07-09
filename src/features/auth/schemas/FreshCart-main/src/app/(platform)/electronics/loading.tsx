import { ElectronicsPageSkeleton } from "@/src/features/categories/components/CategoryPage.skeleton"
import LoadingSpinner from "@/src/components/shared/LoadingSpinner"

export default function Loading() {
    return (
        <>
            <ElectronicsPageSkeleton />
            <LoadingSpinner message="Loading Electronics..." />
        </>
    )
}
