import { SITE_FAQS } from "@/data/siteFaqs";

const FAQ = () => {
    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Quick answers about who I am, what I build, and how to get in touch.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid gap-4">
                    {SITE_FAQS.map((faq) => (
                        <div
                            key={faq.question}
                            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm p-6 text-left"
                        >
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                {faq.question}
                            </h3>
                            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;




