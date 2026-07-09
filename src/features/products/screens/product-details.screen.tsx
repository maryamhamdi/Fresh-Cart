import ProductInfo from "../components/product.info";
import ProductReview from "../components/product.review";
import RelevantProducts from "../components/relevant.product";
import { getProductById, getRelatedProducts } from "../server/products.action";

export default async function ProductDetailsScreen({productId}:{productId:string}) {
    const response = await getProductById(productId)
    const relatedProductsResponse = await getRelatedProducts(response.data.category._id, productId)
    
    return <>
        <div data-aos="fade-up"><ProductInfo product={response.data}/></div>
        <div data-aos="fade-up" data-aos-delay="200"><ProductReview product={response.data}/></div>
        <div data-aos="fade-up" data-aos-delay="400"><RelevantProducts products={relatedProductsResponse.data} /></div>
    </>
}