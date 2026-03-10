"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
        >
            <Card className="p-6 h-full flex flex-col gap-4 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:border-rose-500/40 transition-all duration-300 group overflow-hidden relative">
                {/* Subtle background glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/20 to-orange-500/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/10 group-hover:text-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.1)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] z-10">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-orange-400 transition-all z-10">{title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light z-10">
                    {description}
                </p>
            </Card>
        </motion.div>
    );
}

