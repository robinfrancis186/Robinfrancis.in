import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

const GITHUB_USERNAME = "robinfrancis186";
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const GITHUB_USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

type ContributionDay = {
    date: string;
    count: number;
    level: number;
};

type GitHubProfile = {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
};

type GitHubActivityState = {
    profile: GitHubProfile | null;
    contributions: ContributionDay[];
    total: number;
    recentEvents: number;
    status: "loading" | "ready" | "fallback" | "error";
};

type ContributionTooltip = {
    x: number;
    y: number;
    text: string;
};

const createEmptyContributionYear = () => {
    const days: ContributionDay[] = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 366);

    for (let index = 0; index <= 366; index += 1) {
        const current = new Date(start);
        current.setDate(start.getDate() + index);
        days.push({
            date: current.toISOString().slice(0, 10),
            count: 0,
            level: 0,
        });
    }

    return days;
};

const levelFromCount = (count: number) => {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
};

const opacityForLevel = (level: number) => {
    switch (level) {
        case 1:
            return 0.3;
        case 2:
            return 0.55;
        case 3:
            return 0.8;
        case 4:
            return 1;
        case 0:
        default:
            return 0.15;
    }
};

const createEventContributionFallback = (events: { created_at?: string }[]) => {
    const dayMap = new Map<string, number>();

    events.forEach((event) => {
        if (!event.created_at) return;
        const date = event.created_at.slice(0, 10);
        dayMap.set(date, (dayMap.get(date) ?? 0) + 1);
    });

    const days = createEmptyContributionYear().map((day) => {
        const count = dayMap.get(day.date) ?? 0;
        return {
            ...day,
            count,
            level: levelFromCount(count),
        };
    });

    return {
        days,
        total: days.reduce((sum, day) => sum + day.count, 0),
    };
};

const polarToCartesian = (center: number, radius: number, angle: number) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
        x: center + radius * Math.cos(radians),
        y: center + radius * Math.sin(radians),
    };
};

const describeArcSegment = (
    center: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
) => {
    const outerStart = polarToCartesian(center, outerRadius, startAngle);
    const outerEnd = polarToCartesian(center, outerRadius, endAngle);
    const innerEnd = polarToCartesian(center, innerRadius, endAngle);
    const innerStart = polarToCartesian(center, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
        "Z",
    ].join(" ");
};

const GitHubActivity = () => {
    const [activity, setActivity] = useState<GitHubActivityState>({
        profile: null,
        contributions: createEmptyContributionYear(),
        total: 0,
        recentEvents: 0,
        status: "loading",
    });

    useEffect(() => {
        let isMounted = true;

        const loadGitHubActivity = async () => {
            try {
                const [profileResponse, contributionsResponse] = await Promise.all([
                    fetch(GITHUB_USER_URL, {
                        headers: { Accept: "application/vnd.github+json" },
                    }),
                    fetch(CONTRIBUTIONS_URL),
                ]);

                if (!profileResponse.ok || !contributionsResponse.ok) {
                    throw new Error("GitHub contribution data unavailable");
                }

                const profile = (await profileResponse.json()) as GitHubProfile;
                const contributionPayload = await contributionsResponse.json();
                const contributions = (contributionPayload.contributions ?? []) as ContributionDay[];
                const total = Number(contributionPayload.total?.lastYear ?? 0);

                if (!isMounted) return;
                setActivity({
                    profile,
                    contributions: contributions.length ? contributions : createEmptyContributionYear(),
                    total,
                    recentEvents: 0,
                    status: "ready",
                });
            } catch {
                try {
                    const [profileResponse, eventsResponse] = await Promise.all([
                        fetch(GITHUB_USER_URL, {
                            headers: { Accept: "application/vnd.github+json" },
                        }),
                        fetch(GITHUB_EVENTS_URL, {
                            headers: { Accept: "application/vnd.github+json" },
                        }),
                    ]);

                    if (!profileResponse.ok || !eventsResponse.ok) {
                        throw new Error("GitHub fallback unavailable");
                    }

                    const profile = (await profileResponse.json()) as GitHubProfile;
                    const events = await eventsResponse.json();
                    const fallback = createEventContributionFallback(Array.isArray(events) ? events : []);

                    if (!isMounted) return;
                    setActivity({
                        profile,
                        contributions: fallback.days,
                        total: fallback.total,
                        recentEvents: Array.isArray(events) ? events.length : 0,
                        status: "fallback",
                    });
                } catch {
                    if (!isMounted) return;
                    setActivity((current) => ({
                        ...current,
                        status: "error",
                    }));
                }
            }
        };

        loadGitHubActivity();
        return () => {
            isMounted = false;
        };
    }, []);

    const chartDays = useMemo(
        () => [...activity.contributions].sort((a, b) => a.date.localeCompare(b.date)),
        [activity.contributions]
    );

    const total = activity.total || chartDays.reduce((sum, day) => sum + day.count, 0);
    const profileUrl = activity.profile?.html_url ?? `https://github.com/${GITHUB_USERNAME}`;
    const profileName = activity.profile?.login ?? GITHUB_USERNAME;
    const activeDays = chartDays.filter((day) => day.count > 0).length;

    return (
        <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 p-5 text-foreground shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#070707]/95 dark:text-white md:p-6"
        >
            <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
                    GitHub Activity
                </span>
                <span className="h-px flex-1 bg-primary/20" />
            </div>
            <GitHubRadialChart
                days={chartDays}
                total={total}
                activeDays={activeDays}
                profileUrl={profileUrl}
                profileName={profileName}
                isLoading={activity.status === "loading"}
            />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <GitHubMetric value={total.toLocaleString()} label="Contributions" />
                <GitHubMetric value={(activity.profile?.public_repos ?? 0).toLocaleString()} label="Repos" />
                <GitHubMetric value={(activity.profile?.followers ?? 0).toLocaleString()} label="Followers" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground dark:text-white/45">
                <span>{activity.status === "fallback" ? `${activity.recentEvents} recent events` : "Live"}</span>
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 normal-case tracking-normal text-muted-foreground transition-colors hover:text-foreground dark:text-white/60 dark:hover:text-white"
                >
                    <Github className="h-4 w-4" />
                    @{profileName}
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
            {activity.status === "error" && (
                <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-center text-sm text-muted-foreground dark:text-white/60">
                    GitHub activity could not be loaded right now. The chart will retry on the next page load.
                </p>
            )}
        </motion.aside>
    );
};

const GitHubMetric = ({ value, label }: { value: string; label: string }) => (
    <div className="rounded-xl border border-border/70 bg-background/70 px-2 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="text-lg font-black leading-none text-foreground dark:text-white">{value}</div>
        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:text-white/35">
            {label}
        </div>
    </div>
);

const GitHubRadialChart = ({
    days,
    total,
    activeDays,
    profileUrl,
    profileName,
    isLoading,
}: {
    days: ContributionDay[];
    total: number;
    activeDays: number;
    profileUrl: string;
    profileName: string;
    isLoading: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = useState<ContributionTooltip | null>(null);
    const center = 170;
    const innerRadius = 40;
    const ringGap = 1.5;
    const sectorDegrees = 360 / 7;
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const legendLevels = [0, 1, 2, 3, 4];

    const weeks = useMemo(() => {
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const recentDays = days.filter((day) => day.date <= todayKey).slice(-140);
        const groupedWeeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];

        recentDays.forEach((day) => {
            if (new Date(`${day.date}T00:00:00`).getDay() === 0 && currentWeek.length > 0) {
                groupedWeeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push(day);
        });

        if (currentWeek.length > 0) {
            groupedWeeks.push(currentWeek);
        }

        return groupedWeeks;
    }, [days]);

    const ringWidth = weeks.length > 0 ? (115 - (weeks.length - 1) * ringGap) / weeks.length : 5;

    const handleArcMove = useCallback((event: MouseEvent<SVGPathElement>, day: ContributionDay) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const count = day.count;
        const formattedDate = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        setTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            text: `${count} contribution${count === 1 ? "" : "s"} on ${formattedDate}`,
        });
    }, []);

    return (
        <div ref={containerRef} className="relative mx-auto flex w-full flex-col items-center gap-3">
            <p className="sr-only">
                GitHub profile @{profileName} has {total.toLocaleString()} contributions across {activeDays.toLocaleString()} active days in the last year.
            </p>
            <svg
                viewBox="0 0 340 340"
                className="h-[280px] w-[280px] lg:h-[320px] lg:w-[320px]"
                role="img"
                aria-label={`${total.toLocaleString()} GitHub contributions across ${activeDays.toLocaleString()} active days in the last year`}
            >
                {dayLabels.map((label, index) => {
                    const angle = index * sectorDegrees + sectorDegrees / 2;
                    const point = polarToCartesian(center, 167, angle);
                    return (
                        <text
                            key={label}
                            x={point.x}
                            y={point.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-muted-foreground font-sans text-[7px] dark:fill-white/35"
                        >
                            {label}
                        </text>
                    );
                })}
                {weeks.map((week, weekIndex) => {
                    const inner = innerRadius + weekIndex * (ringWidth + ringGap);
                    const outer = inner + ringWidth;

                    return week.map((day) => {
                        const dayOfWeek = new Date(`${day.date}T00:00:00`).getDay();
                        const startAngle = dayOfWeek * sectorDegrees + 1;
                        const endAngle = (dayOfWeek + 1) * sectorDegrees - 1;

                        return (
                            <motion.path
                                key={day.date}
                                className="cursor-pointer transition-opacity duration-150 hover:brightness-125"
                                d={describeArcSegment(center, inner, outer, startAngle, endAngle)}
                                fill="hsl(var(--primary))"
                                fillOpacity={opacityForLevel(day.level)}
                                stroke="none"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 0.35,
                                    delay: Math.min((weekIndex * 7 + dayOfWeek) * 0.004, 0.45),
                                    ease: "backOut",
                                }}
                                style={{ transformOrigin: "170px 170px" }}
                                onMouseMove={(event) => handleArcMove(event, day)}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                <title>{`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}</title>
                            </motion.path>
                        );
                    });
                })}
                <text
                    x={center}
                    y={162}
                    textAnchor="middle"
                    className="fill-foreground font-black dark:fill-white"
                    style={{ fontSize: "18px" }}
                >
                    {isLoading ? "--" : total.toLocaleString()}
                </text>
                <text
                    x={center}
                    y={178}
                    textAnchor="middle"
                    className="fill-muted-foreground font-sans dark:fill-white/45"
                    style={{ fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                    contributions
                </text>
            </svg>
            {tooltip && (
                <>
                    <div
                        className="pointer-events-none absolute z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/70 dark:border-white/85"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    />
                    <div
                        className="pointer-events-none absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/80 dark:bg-white/90"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    />
                    <div
                        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded border border-border bg-popover px-2 py-1 text-[11px] text-popover-foreground shadow-lg dark:border-white/10 dark:bg-[#111111] dark:text-white/60"
                        style={{ left: tooltip.x, top: tooltip.y - 12 }}
                    >
                        {tooltip.text}
                    </div>
                </>
            )}
            <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary dark:text-white/55"
            >
                <Github className="h-5 w-5" />
                <span>@{profileName}</span>
                <ExternalLink className="h-4 w-4 -rotate-45 text-muted-foreground transition-all duration-300 group-hover:rotate-0 group-hover:text-primary dark:text-white/35" />
            </a>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-white/35">
                <span>Less</span>
                {legendLevels.map((level) => (
                    <svg key={level} width="14" height="14" aria-hidden="true">
                        <rect width="14" height="14" rx="3" fill="hsl(var(--primary))" fillOpacity={opacityForLevel(level)} />
                    </svg>
                ))}
                <span>More</span>
            </div>
        </div>
    );
};

export default GitHubActivity;
