import { SlideButton } from "@/components/ui/slide-button";
import { useRef, useState, lazy, Suspense, type FormEvent } from "react";
import GitHubActivity from "./GitHubActivity";

// Lazy load the heavy Three.js shader background (saves ~300KB on initial load)
const DotScreenShader = lazy(() => 
    import("@/components/ui/dot-shader-background").then(module => ({ 
        default: module.DotScreenShader 
    }))
);

const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [buttonStatus, setButtonStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [resetKey, setResetKey] = useState(0);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setButtonStatus("success");
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:robinfrancis186@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleSlideComplete = () => {
        const form = formRef.current;
        if (!form) return false;

        if (!form.checkValidity()) {
            form.reportValidity();
            setResetKey((value) => value + 1);
            return false;
        }

        setButtonStatus("loading");
        form.requestSubmit();
        return true;
    };

    return (
        <section id="contact" className="relative w-full overflow-hidden bg-background py-20 antialiased md:py-28">
            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,520px)] lg:px-8">
                <div className="mx-auto w-full max-w-2xl lg:mx-0">
                    <h2 className="text-center font-sans text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground md:text-7xl lg:text-left">
                        Get in touch
                    </h2>
                    <p className="mx-auto my-3 max-w-lg text-center text-sm text-muted-foreground lg:mx-0 lg:text-left">
                        I'm always open to collaborations, mentorship, community projects, or opportunities to build meaningful technology.
                    </p>
                    <div className="mt-6 flex justify-center lg:justify-start">
                        <a
                            href="https://chai4.me/robin"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Support Robin on Chai4Me"
                            className="inline-flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-8 py-2 no-underline shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-950"
                        >
                            <img
                                src="https://chai4.me/icons/wordmark.png"
                                alt="Chai4Me"
                                className="mb-1 h-8 object-contain"
                                loading="lazy"
                            />
                            <span className="font-sans text-sm font-semibold text-neutral-500 dark:text-neutral-400">@robin</span>
                        </a>
                    </div>
                    <div className="mt-8">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <label htmlFor="contact-name" className="sr-only">
                                    Your name
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    maxLength={80}
                                    required
                                    className="w-full rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                                />
                                <label htmlFor="contact-email" className="sr-only">
                                    Your email
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    maxLength={120}
                                    required
                                    className="w-full rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                                />
                            </div>
                            <label htmlFor="contact-message" className="sr-only">
                                Your message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={1500}
                                required
                                className="mt-4 w-full resize-none rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                            />
                            <SlideButton
                                label="Slide to send"
                                status={buttonStatus}
                                resetKey={resetKey}
                                onSlideComplete={handleSlideComplete}
                            />
                        </form>
                    </div>
                </div>
                <GitHubActivity />
            </div>
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />}>
                    <DotScreenShader />
                </Suspense>
            </div>
        </section>
    );
};

export default Contact;
