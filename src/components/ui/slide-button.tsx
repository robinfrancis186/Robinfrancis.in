"use client"

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type JSX,
} from "react"
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

const DRAG_CONSTRAINTS = { left: 0, right: 188 }
const DRAG_THRESHOLD = 0.9

const ANIMATION_CONFIG = {
    spring: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8,
    },
}

type SlideButtonStatus = "idle" | "loading" | "success" | "error"

type SlideButtonProps = Omit<ButtonProps, "onSubmit" | "type"> & {
    label?: string
    status?: SlideButtonStatus
    onSlideComplete?: () => boolean | void
    resetKey?: string | number
}

type StatusIconProps = {
    status: SlideButtonStatus
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    const iconMap: Partial<Record<StatusIconProps["status"], JSX.Element>> = useMemo(
        () => ({
            loading: <Loader2 className="size-5 animate-spin" />,
            success: <Check className="size-5" />,
            error: <X className="size-5" />,
        }),
        []
    )

    if (!iconMap[status]) return null

    return (
        <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
        >
            {iconMap[status]}
        </motion.div>
    )
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
    (
        {
            className,
            disabled,
            label = "Slide to send",
            status = "idle",
            onSlideComplete,
            resetKey,
            ...props
        },
        ref
    ) => {
        const [isDragging, setIsDragging] = useState(false)
        const [completed, setCompleted] = useState(false)
        const dragHandleRef = useRef<HTMLDivElement | null>(null)

        const dragX = useMotionValue(0)
        const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
        const dragProgress = useTransform(
            springX,
            [0, DRAG_CONSTRAINTS.right],
            [0, 1]
        )
        const adjustedWidth = useTransform(springX, (x) => x + 28)
        const labelOpacity = useTransform(dragProgress, [0, 0.72], [1, 0])

        const isLocked = disabled || status === "loading" || status === "success"

        const reset = useCallback(() => {
            setCompleted(false)
            setIsDragging(false)
            dragX.set(0)
        }, [dragX])

        useEffect(() => {
            if (status === "idle" || status === "error") {
                reset()
            }
        }, [reset, resetKey, status])

        const handleDragStart = useCallback(() => {
            if (completed || isLocked) return
            setIsDragging(true)
        }, [completed, isLocked])

        const handleDragEnd = useCallback(() => {
            if (completed || isLocked) return
            setIsDragging(false)

            if (dragProgress.get() < DRAG_THRESHOLD) {
                dragX.set(0)
                return
            }

            const shouldContinue = onSlideComplete?.()
            if (shouldContinue === false) {
                dragX.set(0)
                return
            }

            setCompleted(true)
        }, [completed, dragProgress, dragX, isLocked, onSlideComplete])

        const handleDrag = useCallback(
            (
                _event: MouseEvent | TouchEvent | PointerEvent,
                info: PanInfo
            ) => {
                if (completed || isLocked) return
                const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
                dragX.set(newX)
            },
            [completed, dragX, isLocked]
        )

        return (
            <motion.div
                animate={{ width: completed ? "9rem" : "100%" }}
                transition={ANIMATION_CONFIG.spring}
                className={cn(
                    "relative flex h-16 max-w-full items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-blue-50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(37,99,235,0.12)] dark:bg-blue-950/30",
                    disabled && "opacity-70"
                )}
            >
                {!completed && (
                    <>
                        <motion.div
                            style={{ width: adjustedWidth }}
                            className="absolute inset-y-0 left-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                        <motion.span
                            style={{ opacity: labelOpacity }}
                            className="pointer-events-none z-[1] select-none text-sm font-semibold text-blue-700 dark:text-blue-200"
                        >
                            {label}
                        </motion.span>
                    </>
                )}

                <AnimatePresence>
                    {!completed && (
                        <motion.div
                            ref={dragHandleRef}
                            drag={isLocked ? false : "x"}
                            dragConstraints={DRAG_CONSTRAINTS}
                            dragElastic={0.05}
                            dragMomentum={false}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDrag={handleDrag}
                            style={{ x: springX }}
                            className="absolute left-2 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
                        >
                            <Button
                                ref={ref}
                                disabled={isLocked}
                                {...props}
                                type="button"
                                size="icon"
                                className={cn(
                                    "size-12 rounded-full bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] hover:bg-blue-500",
                                    isDragging && "scale-105 transition-transform",
                                    className
                                )}
                                aria-label={label}
                            >
                                <SendHorizontal className="size-5" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {completed && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Button
                                ref={ref}
                                disabled={isLocked}
                                {...props}
                                type="button"
                                className={cn(
                                    "size-full rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500",
                                    className
                                )}
                                aria-label={status === "success" ? "Message sent" : label}
                            >
                                <AnimatePresence mode="wait">
                                    <StatusIcon status={status === "idle" ? "success" : status} />
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        )
    }
)

SlideButton.displayName = "SlideButton"

export { SlideButton }
