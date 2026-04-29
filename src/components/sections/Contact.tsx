import { Button } from "@/components/ui/neon-button";
import { useState, lazy, Suspense } from "react";
import GitHubActivity from "./GitHubActivity";

// Lazy load the heavy Three.js shader background (saves ~300KB on initial load)
const DotScreenShader = lazy(() => 
    import("@/components/ui/dot-shader-background").then(module => ({ 
        default: module.DotScreenShader 
    }))
);

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:robinfrancis186@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="contact" className="relative w-full overflow-hidden bg-background py-20 antialiased md:py-28">
            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,520px)] lg:px-8">
                <div className="mx-auto w-full max-w-2xl lg:mx-0">
                    <h1 className="text-center font-sans text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground md:text-7xl lg:text-left">
                        Get in touch
                    </h1>
                    <p className="mx-auto my-3 max-w-lg text-center text-sm text-muted-foreground lg:mx-0 lg:text-left">
                        I'm always open to collaborations, mentorship, community projects, or opportunities to build meaningful technology.
                    </p>
                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                                />
                            </div>
                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="mt-4 w-full resize-none rounded-lg border border-neutral-200/50 bg-white/50 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
                            />
                            <Button neon={true} className="w-full border-transparent bg-primary py-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                Send Message
                            </Button>
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
