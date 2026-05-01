import { useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, BookOpenText, type LucideIcon } from "lucide-react";

type SocialLink = {
    id: string;
    icon: LucideIcon;
    label: string;
    href: string;
};

type ActionButtonProps = {
    text: string;
    href: string;
};

type ProfileImageSlide = {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
};

type GlassmorphismProfileCardProps = {
    avatarUrl: string;
    name: string;
    title: string;
    bio: string;
    imageSlides?: ProfileImageSlide[];
    socialLinks?: SocialLink[];
    actionButton: ActionButtonProps;
};

export function Component() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 font-sans transition-colors duration-500 sm:p-8">
            <ProfileCardDemo />
        </div>
    );
}

const ProfileCardDemo = () => {
    const cardProps = {
        avatarUrl: "/images/card/robin-francis-primary.jpg",
        name: "Robin Francis",
        title: "AI Innovator & Community Leader",
        bio: "Available for meaningful AI, product, accessibility, and community collaborations.",
        imageSlides: [
            { src: "/images/card/robin-francis-primary.jpg", alt: "Robin Francis portrait", fit: "cover" as const },
            { src: "/images/card/robin-francis-3d.png", alt: "Robin Francis 3D figure", fit: "contain" as const },
        ],
        socialLinks: [
            { id: "github", icon: Github, label: "GitHub", href: "https://github.com/robinfrancis186" },
            { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/robin-francis-b43565175" },
            { id: "instagram", icon: Instagram, label: "instagram", href: "https://www.instagram.com/robinfrancis186" },
            { id: "medium", icon: BookOpenText, label: "Medium", href: "https://medium.com/@robinfrancis186" },
        ],
        actionButton: {
            text: "Contact Me",
            href: "/#contact",
        },
    };

    return <GlassmorphismProfileCard {...cardProps} />;
};

const GlassmorphismProfileCard = ({
    avatarUrl,
    name,
    title,
    bio,
    imageSlides,
    socialLinks = [],
    actionButton,
}: GlassmorphismProfileCardProps) => {
    const slides = imageSlides?.length
        ? imageSlides
        : [{ src: avatarUrl, alt: `${name}'s avatar`, fit: "cover" as const }];
    const [activeImage, setActiveImage] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const currentSlide = slides[activeImage] ?? slides[0];

    const showPreviousImage = () => {
        setActiveImage((current) => (current - 1 + slides.length) % slides.length);
    };

    const showNextImage = () => {
        setActiveImage((current) => (current + 1) % slides.length);
    };

    const handleTouchEnd = (x: number) => {
        if (touchStartX === null || slides.length < 2) return;

        const deltaX = touchStartX - x;
        if (Math.abs(deltaX) > 32) {
            if (deltaX > 0) showNextImage();
            else showPreviousImage();
        }
        setTouchStartX(null);
    };

    return (
        <div className="relative w-full max-w-sm">
            <div
                className="relative flex flex-col items-center rounded-3xl border border-white/10 bg-card/40 p-8 text-center backdrop-blur-xl transition-all duration-500 ease-out"
                style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div
                    className="mb-4 flex flex-col items-center gap-3"
                    onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
                    onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
                >
                    <button
                        type="button"
                        className="relative size-32 overflow-hidden rounded-3xl border-2 border-white/20 bg-secondary/40 p-1 transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                        onClick={slides.length > 1 ? showNextImage : undefined}
                        aria-label="Switch profile image"
                    >
                        <img
                            src={currentSlide.src}
                            alt={currentSlide.alt}
                            className={`size-full rounded-[1.25rem] ${currentSlide.fit === "contain" ? "object-contain" : "object-cover"}`}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = `https://placehold.co/96x96/0A84FF/white?text=${name.charAt(0)}`;
                            }}
                        />
                    </button>

                    {slides.length > 1 && (
                        <div className="flex items-center justify-center gap-2" aria-label="Profile image selector">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.src}
                                    type="button"
                                    className={`size-2.5 rounded-full transition-all duration-300 ${index === activeImage ? "w-5 bg-primary" : "bg-muted-foreground/25 hover:bg-muted-foreground/45"}`}
                                    onClick={() => setActiveImage(index)}
                                    aria-label={`Show ${slide.alt}`}
                                    aria-current={index === activeImage ? "true" : undefined}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="text-2xl font-bold text-card-foreground">{name}</h1>
                <p className="mt-1 text-sm font-medium text-primary">{title}</p>
                <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">{bio}</p>

                <div className="my-6 h-px w-1/2 rounded-full bg-border" />

                <div className="flex items-center justify-center gap-3">
                    {socialLinks.map((item) => (
                        <SocialButton key={item.id} item={item} />
                    ))}
                </div>

                <ActionButton action={actionButton} />
            </div>

            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-30 blur-2xl transition-all duration-500 ease-out" />
        </div>
    );
};

const SocialButton = ({
    item,
}: {
    item: SocialLink;
}) => (
    <div className="group relative">
        <a
            href={item.href}
            className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-secondary/50 transition-all duration-300 ease-out hover:bg-secondary"
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="relative z-10 flex items-center justify-center">
                <item.icon size={20} className="text-secondary-foreground/70 transition-all duration-200 ease-out group-hover:text-secondary-foreground" />
            </div>
        </a>
        <Tooltip item={item} />
    </div>
);

const ActionButton = ({ action }: { action: ActionButtonProps }) => (
    <a
        href={action.href}
        className="group mt-8 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
        <span>{action.text}</span>
        <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
    </a>
);

const Tooltip = ({ item }: { item: SocialLink }) => (
    <div
        role="tooltip"
        className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
    >
        {item.label}
        <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-popover" />
    </div>
);

export { GlassmorphismProfileCard };
