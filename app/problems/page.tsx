"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight, Database, Server, Smartphone, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_PROBLEMS = [
    {
        id: "design-url-shortener",
        title: "Design a URL Shortener",
        difficulty: "Easy",
        tags: ["System Design", "Database", "Hashing"],
        companies: ["Google", "Facebook", "Amazon"],
        icon: <Search className="w-5 h-5 text-sky-400" />
    },
    {
        id: "design-uber",
        title: "Design Uber",
        difficulty: "Hard",
        tags: ["Geolocation", "Real-time", "Microservices"],
        companies: ["Uber", "Lyft"],
        icon: <Smartphone className="w-5 h-5 text-rose-500" />
    },
    {
        id: "design-dropbox",
        title: "Design Dropbox",
        difficulty: "Medium",
        tags: ["Storage", "Sync", "ACID"],
        companies: ["Dropbox", "Google", "Microsoft"],
        icon: <Database className="w-5 h-5 text-violet-500" />
    },
    {
        id: "design-ticket-booking",
        title: "Design a Ticket Booking System",
        difficulty: "Medium",
        tags: ["Concurrency", "Transactions", "Load Balancing"],
        companies: ["BookMyShow", "Ticketmaster"],
        icon: <Server className="w-5 h-5 text-orange-500" />
    }
];

export default function ProblemsPage() {
    return (
        <div className="min-h-screen bg-background relative selection:bg-rose-500/30">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,_rgba(244,63,94,0.15)_0%,_transparent_60%)] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,_rgba(139,92,246,0.15)_0%,_transparent_60%)] blur-[100px] pointer-events-none" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">

                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tight mb-4">
                            Architecture Challenges
                        </h1>
                        <p className="text-xl text-zinc-400 font-light max-w-2xl">
                            From URL shorteners to global ride-sharing networks. Practice designing systems that handle massive scale.
                        </p>
                    </div>

                    {/* Quick Filters / Search Placeholder */}
                    <div className="flex gap-4">
                        <div className="glass px-4 h-12 flex items-center gap-3 rounded-full border-zinc-800 text-zinc-300 w-full md:w-64">
                            <Search className="w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                className="bg-transparent border-none outline-none w-full placeholder:text-zinc-600 text-sm"
                            />
                        </div>
                        <Button variant="outline" className="h-12 w-12 rounded-full glass border-zinc-800 p-0 flex items-center justify-center">
                            <Filter className="w-5 h-5 text-zinc-300" />
                        </Button>
                    </div>
                </motion.div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {MOCK_PROBLEMS.map((problem, index) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.01, y: -4 }}
                        >
                            <Link href={`/problems/${problem.id}`}>
                                <Card className="glass p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-zinc-700/80 transition-all cursor-pointer relative overflow-hidden">

                                    {/* Hover flare */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0 pointer-events-none" />

                                    <div className="flex gap-6 items-start md:items-center relative z-10 w-full">
                                        <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                            {problem.icon}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                                                {problem.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                                            "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                    }`}>
                                                    {problem.difficulty}
                                                </span>
                                                {problem.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex shrink-0 items-center justify-center h-12 w-12 rounded-full border border-white/5 bg-white/5 group-hover:bg-rose-500 group-hover:border-rose-500 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all relative z-10">
                                        <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
