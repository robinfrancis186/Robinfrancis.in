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
    const [statusMessage, setStatusMessage] = useState("");
    const [resetKey, setResetKey] = useState(0);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setButtonStatus("loading");
        setStatusMessage("");

        try {
            const response = await fetch("/api/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.error || "Message could not be sent right now.");
            }

            setButtonStatus("success");
            setStatusMessage("Message sent. I will get back to you soon.");
            setName("");
            setEmail("");
            setMessage("");

            window.setTimeout(() => {
                setButtonStatus("idle");
                setStatusMessage("");
                setResetKey((value) => value + 1);
            }, 3500);
        } catch (error) {
            setButtonStatus("error");
            setStatusMessage(error instanceof Error ? error.message : "Message could not be sent right now.");
            setResetKey((value) => value + 1);
        }
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
                            {statusMessage && (
                                <p
                                    role="status"
                                    className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-300"
                                >
                                    {statusMessage}
                                </p>
                            )}
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
