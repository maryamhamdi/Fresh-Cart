import SigninForm from "../components/signin/SigninForm";
import SigninHero from "../components/signin/SigninHero";

export default function SigninScreen() {
    return (
        <section className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch min-h-[calc(100vh-8rem)]">
                    <SigninHero />
                    <SigninForm />
                </div>
            </div>
        </section>
    )
}