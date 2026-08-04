import { useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, BookOpenText, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ensureRobinFrancisAlt } from "@/lib/imageSeo";

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
    position?: string;
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
            { src: "/images/card/robin-francis-primary.jpg", alt: "Robin Francis portrait", fit: "cover" as const, position: "50% 18%" },
            { src: "/images/card/robin-francis-3d.png", alt: "Robin Francis 3D figure", fit: "contain" as const, position: "50% 50%" },
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
    const [isImagePreviewed, setIsImagePreviewed] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const frontSlide = slides[0];
    const backSlide = slides[1] ?? slides[0];
    const isFlipped = slides.length > 1 && (isImagePreviewed || activeImage === 1);

    const showPreviousImage = () => {
        setActiveImage((current) => (current - 1 + slides.length) % slides.length);
    };

    const showNextImage = () => {
        setActiveImage((current) => (current + 1) % slides.length);
    };

    const toggleImage = () => {
        if (slides.length < 2) return;
        setIsImagePreviewed(false);
        showNextImage();
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
        <div className="relative w-full max-w-[410px]">
            <div
                className="relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-black/5 bg-white/90 px-7 py-8 text-center shadow-[0_34px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 ease-out dark:border-white/10 dark:bg-zinc-950/[0.88] dark:shadow-[0_34px_90px_rgba(0,0,0,0.48)] sm:px-9 sm:py-9"
            >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-primary/[0.10] to-transparent dark:from-primary/[0.18]" />
                <div
                    className="relative z-10 mb-6 flex flex-col items-center gap-3"
                    onMouseEnter={() => slides.length > 1 && activeImage === 0 && setIsImagePreviewed(true)}
                    onMouseLeave={() => setIsImagePreviewed(false)}
                    onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
                    onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
                >
                    <button
                        type="button"
                        className="group relative size-28 rounded-full outline-none [perspective:2000px] transition-transform duration-300 hover:scale-[1.015] active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:size-32"
                        onClick={toggleImage}
                        aria-label={isFlipped ? "Show portrait image" : "Show 3D figure image"}
                        aria-pressed={activeImage === 1}
                    >
                        <span className="absolute -inset-4 rounded-full bg-primary/10 opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-primary/20" />
                        <span
                            className={cn(
                                "relative block size-full rounded-full",
                                "[transform-style:preserve-3d]",
                                "transition-all duration-700 ease-out",
                                isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute inset-0 size-full overflow-hidden rounded-full",
                                    "[backface-visibility:hidden] [transform:rotateY(0deg)]",
                                    "border border-white bg-slate-100 p-1.5",
                                    "shadow-[0_18px_40px_rgba(15,23,42,0.16)] ring-1 ring-slate-950/5 transition-all duration-700 dark:border-white/10 dark:bg-zinc-900 dark:ring-white/10",
                                    isFlipped ? "opacity-0" : "opacity-100"
                                )}
                            >
                                <ProfileImage slide={frontSlide} fallbackName={name} />
                            </span>
                            <span
                                className={cn(
                                    "absolute inset-0 size-full overflow-hidden rounded-full",
                                    "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                                    "border border-white bg-slate-100 p-1.5",
                                    "shadow-[0_18px_40px_rgba(15,23,42,0.16)] ring-1 ring-slate-950/5 transition-all duration-700 dark:border-white/10 dark:bg-zinc-900 dark:ring-white/10",
                                    isFlipped ? "opacity-100" : "opacity-0"
                                )}
                            >
                                <ProfileImage slide={backSlide} fallbackName={name} />
                            </span>
                        </span>
                    </button>

                    {slides.length > 1 && (
                        <div className="flex items-center justify-center gap-2 rounded-full border border-slate-950/5 bg-slate-950/[0.03] px-2.5 py-1.5 shadow-inner dark:border-white/10 dark:bg-white/[0.06]" aria-label="Profile image selector">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.src}
                                    type="button"
                                    className={`h-2.5 rounded-full transition-all duration-300 ${index === activeImage ? "w-6 bg-primary shadow-[0_0_14px_rgba(10,132,255,0.42)]" : "w-2.5 bg-slate-400/30 hover:bg-slate-500/45 dark:bg-white/[0.22] dark:hover:bg-white/35"}`}
                                    onClick={() => {
                                        setActiveImage(index);
                                        setIsImagePreviewed(false);
                                    }}
                                    aria-label={`Show ${slide.alt}`}
                                    aria-current={index === activeImage ? "true" : undefined}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="relative z-10 text-[2rem] font-bold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-[2.35rem]">{name}</h1>
                <p className="relative z-10 mt-2 text-base font-medium leading-snug text-primary sm:text-lg">{title}</p>
                <p className="relative z-10 mt-5 max-w-[34ch] text-center text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">{bio}</p>

                <div className="relative z-10 my-6 h-px w-40 rounded-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />

                <div className="relative z-10 flex items-center justify-center gap-3.5">
                    {socialLinks.map((item) => (
                        <SocialButton key={item.id} item={item} />
                    ))}
                </div>

                <ActionButton action={actionButton} />
            </div>

            <div className="absolute inset-x-8 -bottom-8 -z-10 h-32 rounded-full bg-primary/[0.18] blur-3xl transition-all duration-500 ease-out dark:bg-primary/[0.24]" />
        </div>
    );
};

const ProfileImage = ({
    slide,
    fallbackName,
}: {
    slide: ProfileImageSlide;
    fallbackName: string;
}) => (
    <img
        src={slide.src}
        alt={ensureRobinFrancisAlt(slide.alt, "profile")}
        className={`size-full rounded-full bg-white ${slide.fit === "contain" ? "object-contain" : "object-cover"}`}
        style={{ objectPosition: slide.position ?? "50% 50%" }}
        onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `https://placehold.co/96x96/0A84FF/white?text=${fallbackName.charAt(0)}`;
        }}
    />
);

const SocialButton = ({
    item,
}: {
    item: SocialLink;
}) => (
    <div className="group relative">
        <a
            href={item.href}
            className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-slate-950/5 bg-slate-50 text-slate-500 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-md dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-400 dark:hover:bg-white/12 dark:hover:text-white sm:size-14"
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="relative z-10 flex items-center justify-center">
                <item.icon size={20} className="transition-all duration-200 ease-out" />
            </div>
        </a>
        <Tooltip item={item} />
    </div>
);

const ActionButton = ({ action }: { action: ActionButtonProps }) => (
    <a
        href={action.href}
        className="group relative z-10 mt-8 flex min-w-52 items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_42px_rgba(10,132,255,0.28)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_22px_54px_rgba(10,132,255,0.34)] active:scale-95 sm:min-w-56 sm:text-lg"
    >
        <span>{action.text}</span>
        <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
    </a>
);

const Tooltip = ({ item }: { item: SocialLink }) => (
    <div
        role="tooltip"
        className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-lg border border-slate-950/10 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-zinc-900 dark:text-slate-200"
    >
        {item.label}
        <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-slate-950/10 bg-white dark:border-white/10 dark:bg-zinc-900" />
    </div>
);

export { GlassmorphismProfileCard };
