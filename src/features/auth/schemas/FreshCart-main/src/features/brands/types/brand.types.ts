// Pagination metadata type
export interface PaginationMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
}

// Brand item type
export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

// Brands API response type (list)
export interface BrandsResponse {
    results: number;
    metadata: PaginationMetadata;
    data: Brand[];
}

// Single brand API response type
export interface BrandResponse {
    data: Brand;
}
