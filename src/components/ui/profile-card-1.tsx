import { useState } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

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

type GlassmorphismProfileCardProps = {
    avatarUrl: string;
    name: string;
    title: string;
    bio: string;
    socialLinks?: SocialLink[];
    actionButton: ActionButtonProps;
};

const GlassmorphismProfileCard = ({
    avatarUrl,
    name,
    title,
    bio,
    socialLinks = [],
    actionButton,
}: GlassmorphismProfileCardProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-sm">
            <div
                className="relative flex flex-col items-center rounded-3xl border border-white/10 bg-card/40 p-8 text-center backdrop-blur-xl transition-all duration-500 ease-out"
                style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="mb-4 h-24 w-24 rounded-full border-2 border-white/20 p-1">
                    <img
                        src={avatarUrl}
                        alt={`${name} avatar`}
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>

                <h2 className="text-2xl font-bold text-card-foreground">{name}</h2>
                <p className="mt-1 text-sm font-medium text-primary">{title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>

                <div className="my-6 h-px w-1/2 rounded-full bg-border" />

                <div className="flex items-center justify-center gap-3">
                    {socialLinks.map((item) => (
                        <SocialButton
                            key={item.id}
                            item={item}
                            setHoveredItem={setHoveredItem}
                            hoveredItem={hoveredItem}
                        />
                    ))}
                </div>

                <ActionButton action={actionButton} />
            </div>

            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/50 to-cyan-400/50 opacity-30 blur-2xl transition-all duration-500 ease-out" />
        </div>
    );
};

const SocialButton = ({
    item,
    setHoveredItem,
    hoveredItem,
}: {
    item: SocialLink;
    setHoveredItem: (value: string | null) => void;
    hoveredItem: string | null;
}) => (
    <div className="relative">
        <a
            href={item.href}
            className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary/50 transition-all duration-300 ease-out hover:bg-secondary"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="relative z-10 flex items-center justify-center">
                <item.icon size={20} className="text-secondary-foreground/70 transition-all duration-200 ease-out group-hover:text-secondary-foreground" />
            </div>
        </a>
        <Tooltip item={item} hoveredItem={hoveredItem} />
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

const Tooltip = ({ item, hoveredItem }: { item: SocialLink; hoveredItem: string | null }) => (
    <div
        role="tooltip"
        className={`pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground backdrop-blur-md transition-all duration-300 ease-out ${hoveredItem === item.id ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
    >
        {item.label}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-popover" />
    </div>
);

export { GlassmorphismProfileCard };
