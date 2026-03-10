"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, glass = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl border border-border bg-card text-card-foreground shadow-sm relative overflow-hidden",
                    glass && "glass",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";
