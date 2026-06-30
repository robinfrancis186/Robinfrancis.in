"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDomTheme } from "@/hooks/use-dom-theme";
import { forwardRef, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export type SocialItem = {
    id: string;
    url: string;
    icon: React.ReactNode;
    label: string;
};

export interface IdentityCardProps extends React.HTMLAttributes<HTMLDivElement> {
    fullName: string;
    place: string;
    about: string;
    avatarUrl: string;
    avatarText: string;
    scheme?: "plain" | "accented";
    socials?: SocialItem[];
    displayAvatar?: boolean;
    titleCss?: React.CSSProperties;
    cardCss?: React.CSSProperties;
    descClass?: string;
    bioClass?: string;
    footerClass?: string;
}

export const IdentityCardBody = forwardRef<HTMLDivElement, IdentityCardProps>(
    (
        {
            fullName,
            place,
            about,
            avatarUrl,
            avatarText,
            scheme = "plain",
            socials = [],
            displayAvatar = true,
            titleCss,
            cardCss,
            descClass,
            bioClass,
            footerClass,
            className,
            ...rest
        },
        ref
    ) => {
        const isAccent = scheme === "accented";

        return (
            <Card
                ref={ref}
                style={cardCss}
                className={cn(
                    "flex min-h-[30rem] flex-col rounded-3xl border-0 p-8 shadow-none",
                    isAccent
                        ? "text-[var(--on-accent-foreground)]"
                        : "bg-card/80 text-card-foreground backdrop-blur-xl",
                    className
                )}
                {...rest}
            >
                <CardHeader className="p-0">
                    <div className={cn(!displayAvatar && "invisible")}>
                        <Avatar
                            className="h-20 w-20 ring-2 ring-offset-4 ring-offset-card"
                            style={
                                {
                                    "--tw-ring-color": "var(--accent-color)",
                                } as React.CSSProperties
                            }
                        >
                            <AvatarImage src={avatarUrl} alt={`${fullName} profile photo`} />
                            <AvatarFallback>{avatarText}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardDescription
                        className={cn(
                            "pt-6 text-left text-sm font-medium uppercase tracking-[0.22em]",
                            !isAccent && "text-muted-foreground",
                            descClass
                        )}
                        style={isAccent ? { color: "var(--on-accent-muted-foreground)" } : {}}
                    >
                        {place}
                    </CardDescription>
                    <CardTitle
                        className="text-left text-4xl font-black tracking-tight"
                        style={{
                            ...(isAccent ? { color: "var(--on-accent-foreground)" } : {}),
                            ...titleCss,
                        }}
                    >
                        {fullName}
                    </CardTitle>
                </CardHeader>

                <CardContent className="mt-6 flex-grow p-0">
                    <p
                        className={cn(
                            "text-left text-base leading-relaxed",
                            !isAccent && "text-foreground/80",
                            bioClass
                        )}
                        style={isAccent ? { opacity: 0.92 } : {}}
                    >
                        {about}
                    </p>
                </CardContent>

                {socials.length > 0 && (
                    <CardFooter className={cn("mt-6 p-0", footerClass)}>
                        <div
                            className={cn(
                                "flex items-center gap-4",
                                !isAccent && "text-muted-foreground"
                            )}
                            style={
                                isAccent
                                    ? { color: "var(--on-accent-muted-foreground)" }
                                    : undefined
                            }
                        >
                            {socials.map((s) => (
                                <a
                                    key={s.id}
                                    href={s.url}
                                    aria-label={s.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "transition-opacity",
                                        isAccent ? "hover:opacity-75" : "hover:text-foreground"
                                    )}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </CardFooter>
                )}
            </Card>
        );
    }
);
IdentityCardBody.displayName = "IdentityCardBody";

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
    base: React.ReactNode;
    overlay: React.ReactNode;
    accent?: string;
    textOnAccent?: string;
    mutedOnAccent?: string;
}

export const RevealCardContainer = forwardRef<HTMLDivElement, RevealCardProps>(
    (
        {
            base,
            overlay,
            accent = "var(--primary)",
            textOnAccent = "#fff",
            mutedOnAccent = "rgba(255,255,255,0.8)",
            className,
            ...rest
        },
        ref
    ) => {
        const holderRef = useRef<HTMLDivElement | null>(null);
        const overlayRef = useRef<HTMLDivElement | null>(null);
        const isDark = useDomTheme();
        const overlayMode = isDark ? "light" : "dark";

        const assignRef = useCallback(
            (el: HTMLDivElement | null) => {
                holderRef.current = el;
                if (typeof ref === "function") ref(el);
                else if (ref) (ref as { current: HTMLDivElement | null }).current = el;
            },
            [ref]
        );

        const startClip = "circle(58px at 72px 72px)";
        const expandClip = "circle(160% at 72px 72px)";

        useGSAP(() => {
            gsap.set(overlayRef.current, { clipPath: startClip });
        }, { scope: holderRef });

        const reveal = () => {
            gsap.to(overlayRef.current, {
                clipPath: expandClip,
                duration: 0.8,
                ease: "expo.inOut",
            });
        };
        const conceal = () => {
            gsap.to(overlayRef.current, {
                clipPath: startClip,
                duration: 1,
                ease: "expo.out",
            });
        };

        return (
            <div
                ref={assignRef}
                onMouseEnter={reveal}
                onMouseLeave={conceal}
                onFocus={reveal}
                onBlur={conceal}
                style={
                    {
                        "--accent-color": accent,
                        "--on-accent-foreground": textOnAccent,
                        "--on-accent-muted-foreground": mutedOnAccent,
                        borderColor: "var(--accent-color)",
                    } as React.CSSProperties
                }
                className={cn(
                    "relative w-full max-w-[24rem] overflow-hidden rounded-3xl border-2 shadow-2xl shadow-primary/10",
                    className
                )}
                {...rest}
            >
                <div>{base}</div>
                <div
                    ref={overlayRef}
                    className={cn("absolute inset-0 h-full w-full", overlayMode)}
                >
                    {overlay}
                </div>
            </div>
        );
    }
);
RevealCardContainer.displayName = "RevealCardContainer";
