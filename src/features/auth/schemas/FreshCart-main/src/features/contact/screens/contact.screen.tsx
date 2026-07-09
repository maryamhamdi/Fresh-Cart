import {
    ContactHero,
    ContactInfoCards,
    ContactForm,
    ContactFaq,
    ContactSocial,
    ContactMap,
    ContactCta
} from '../components'

export default function ContactScreen() {
    return (
        <section className="min-h-screen bg-gray-50">
            <ContactHero />
            
            <div className="container mx-auto px-4 py-12">
                <ContactInfoCards />

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <ContactForm />

                    <div>
                        <ContactFaq />
                        <ContactSocial />
                    </div>
                </div>

                <ContactMap />
                <ContactCta />
            </div>
        </section>
    )
}
