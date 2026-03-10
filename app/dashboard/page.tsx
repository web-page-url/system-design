"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Cpu, Award } from "lucide-react";

export default function DashboardPage() {
    const STATS = [
        { title: "Problems Solved", value: "24", icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
        { title: "Average AI Score", value: "8.7", icon: <TrendingUp className="w-5 h-5 text-rose-400" /> },
        { title: "Global Rank", value: "#142", icon: <Award className="w-5 h-5 text-amber-400" /> },
        { title: "Architecture Level", value: "Senior", icon: <Cpu className="w-5 h-5 text-violet-400" /> },
    ];

    const LEADERBOARD = [
        { rank: 1, name: "Alex Chen", score: 98.4, solved: 120, title: "Staff Engineer" },
        { rank: 2, name: "Sarah Drasner", score: 97.2, solved: 115, title: "Principal" },
        { rank: 3, name: "David M.", score: 96.8, solved: 108, title: "Senior" },
        { rank: 4, name: "You", score: 85.0, solved: 24, title: "Mid-Level", isUser: true },
        { rank: 5, name: "Chris P.", score: 84.5, solved: 22, title: "Mid-Level" }
    ];

    return (
        <div className="min-h-screen bg-background relative selection:bg-rose-500/30">
            {/* Background Heat */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.15)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                        Commander Dashboard
                    </h1>
                    <p className="text-xl text-zinc-400 font-light">
                        Track your system design mastery.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="glass p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm font-medium text-zinc-400">{stat.title}</p>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Split Section: Leaderboard & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 glass rounded-3xl border border-white/10 bg-black/40 p-1 overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-400" />
                                Global Top Architects
                            </h2>
                        </div>
                        <div className="p-2">
                            {LEADERBOARD.map((user, i) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center justify-between p-4 rounded-2xl mb-1 transition-all ${user.isUser
                                            ? "bg-gradient-to-r from-rose-500/20 to-orange-500/10 border border-rose-500/30"
                                            : "hover:bg-white/5 border border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`text-lg font-black w-8 text-center ${i === 0 ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" :
                                                i === 1 ? "text-zinc-300" :
                                                    i === 2 ? "text-amber-700" : "text-zinc-600"
                                            }`}>
                                            #{user.rank}
                                        </span>
                                        <div>
                                            <h4 className="font-semibold text-white flex items-center gap-2">
                                                {user.name}
                                                {user.isUser && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/20 uppercase">You</span>}
                                            </h4>
                                            <p className="text-xs text-zinc-500">{user.title}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-white">{user.score}</div>
                                        <div className="text-xs text-zinc-500">{user.solved} solved</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity Mini-Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass rounded-3xl border border-white/10 bg-black/40 p-6 flex flex-col"
                    >
                        <h2 className="text-xl font-bold text-white mb-6">Recent AI Evals</h2>

                        <div className="space-y-4 flex-1">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">URL Shortener</h4>
                                    <span className="text-emerald-400 font-bold">9.2/10</span>
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">"Excellent horizontal scaling architecture. Good use of Bloom Filters..."</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">Design Uber</h4>
                                    <span className="text-amber-400 font-bold">7.4/10</span>
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">"Geolocation indexing using QuadTrees is solid, but missed the ride-matching queue..."</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button variant="outline" className="w-full glass border-zinc-700 text-zinc-300 hover:text-white">
                                View All Activity
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
