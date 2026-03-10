"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Flame } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
            {/* Dopamine-triggering Dynamic Backgrounds */}
            <div className="absolute inset-0 bg-background z-0" />

            {/* Moving Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px] mask-radial-faded pointer-events-none" />

            {/* Intense Glowing Orbs (Multi-color heat and cyberpunk vibes) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.3)_0%,_transparent_60%)] blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.3)_0%,_transparent_60%)] blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.1, 0.4, 0.1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 left-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.3)_0%,_transparent_60%)] blur-[120px] pointer-events-none"
            />

            <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-8 mt-10">

                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md text-sm font-bold text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.4)] animate-float"
                >
                    <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                    <span className="tracking-wide uppercase text-xs bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400">The Ultimate Practice Platform</span>
                </motion.div>

                {/* Huge Aesthetic Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                    className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-amber-400 animate-text-shimmer drop-shadow-[0_0_40px_rgba(236,72,153,0.3)] pb-4 z-10"
                >
                    System Design
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl sm:text-2xl text-zinc-300 max-w-3xl font-light leading-relaxed tracking-wide z-10 relative"
                >
                    Master large-scale tech interviews. Practice with real-world scenarios, build architecture diagrams, and get <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 drop-shadow-md">instant AI feedback</span>.
                </motion.p>

                {/* Addictive CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                    className="flex flex-col sm:flex-row items-center gap-6 mt-10 w-full sm:w-auto z-10 relative"
                >
                    {/* Primary Action */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="h-[72px] px-12 rounded-2xl text-xl font-bold bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-[0_0_40px_rgba(244,63,94,0.4)] hover:shadow-[0_0_80px_rgba(139,92,246,0.6)] border-none transition-all group overflow-hidden relative">
                            <span className="relative z-10 flex items-center">
                                Start Solving
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-text-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] skew-x-12 z-0" />
                        </Button>
                    </motion.div>

                    {/* Secondary Action */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="lg" className="h-[72px] px-12 rounded-2xl text-xl font-medium glass border-zinc-700 hover:bg-zinc-800/50 hover:border-zinc-500 transition-all text-zinc-200 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            View Leaderboard
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom fade out to blend into next section */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
}
