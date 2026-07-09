import Categories from "../components/categories";
import ContactBanner from "../components/ContactBanner";
import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import FeturesInfo from "../components/PromoBanner";
import SecondPromoBanner from "../components/SecondPromoBanner";
import Slider from "../components/slider";

export default function HomeScreen() {
    return (
        <>
            <Slider />
            <section className="main">
                <div data-aos="fade-up"><FeturesInfo /></div>
                <div data-aos="fade-up" data-aos-delay="100"><Categories /></div>
                <div ><DealsBanner /></div>
                <div data-aos="fade-left" data-aos-delay="300"><FeaturedProducts /></div>
                <div data-aos="fade-up" data-aos-delay="400"><ContactBanner /></div>
                <div data-aos="fade-up" data-aos-delay="500"><SecondPromoBanner /></div>
            </section>
        </>
    );
}