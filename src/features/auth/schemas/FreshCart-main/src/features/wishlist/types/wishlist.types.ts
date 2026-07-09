export interface WishlistProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    images: string[];
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    subcategory: {
        _id: string;
        name: string;
        slug: string;
        category: string;
    }[];
    brand: {
        _id: string;
        name: string;
        slug: string;
    };
    ratingsAverage: number;
    ratingsQuantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface WishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
}
