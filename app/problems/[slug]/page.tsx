"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BarChart, Building2, Zap, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Keeping mock data localized to avoid over-engineering imports for now
const PROBLEM_DETAILS: Record<string, any> = {
    "design-url-shortener": {
        title: "Design a URL Shortener",
        difficulty: "Medium",
        tags: ["System Design", "Database", "Hashing", "API Gateway"],
        companies: ["Google", "Facebook", "Amazon"],
        timeEstimate: "45 mins",
        description: `A URL shortener is a service that creates a shorter alias for a long URL. Users are redirected to the original URL when they hit these aliases. This is a classic system design question to test your knowledge of databases, caching, and scalable ID generation.`,
        requirements: [
            "Given a URL, our service should generate a shorter and unique alias of it.",
            "When users access a short link, our service should redirect them to the original link.",
            "Links will expire after a standard default timespan.",
            "The system should be highly available. This is really important because if our service is down, all the URL redirections will start failing.",
            "URL redirection should happen in real-time with minimal latency."
        ]
    }
};

export default function ProblemDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // Minimal fallback if a problem isn't fleshed out
    const problem = PROBLEM_DETAILS[slug] || {
        title: "Design Challenge: " + slug.replace(/-/g, ' '),
        difficulty: "Hard",
        tags: ["Distributed Systems", "Scaling"],
        companies: ["FAANG"],
        timeEstimate: "60 mins",
        description: "Detailed description for this specific architecture challenge.",
        requirements: ["Requirement 1", "Requirement 2", "Requirement 3"]
    };

    return (
        <div className="min-h-screen bg-background relative selection:bg-rose-500/30">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.1)_0%,_transparent_60%)] blur-[100px] pointer-events-none" />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

                <Link href="/problems" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Problems
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                    "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}>
                            {problem.difficulty}
                        </span>

                        <div className="flex items-center text-sm text-zinc-400 bg-white/5 border border-white/5 rounded-full px-3 py-1">
                            <Clock className="w-4 h-4 mr-1.5 text-zinc-500" />
                            {problem.timeEstimate}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tighter mb-8">
                        {problem.title}
                    </h1>

                    {/* Tags array */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {problem.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 flex items-center">
                                <BarChart className="w-3 h-3 mr-1.5 opacity-50" />
                                {tag}
                            </span>
                        ))}
                        {problem.companies.map((company: string) => (
                            <span key={company} className="px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center">
                                <Building2 className="w-3 h-3 mr-1.5 opacity-50" />
                                {company}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-light leading-relaxed mb-12">
                        <p>{problem.description}</p>

                        <h3 className="text-2xl font-semibold text-white mt-12 mb-6">Functional Requirements</h3>
                        <ul className="space-y-4">
                            {problem.requirements.map((req: string, i: number) => (
                                <li key={i} className="flex items-start">
                                    <Zap className="w-5 h-5 mr-3 mt-1 shrink-0 text-amber-500" />
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Launch CTA */}
                    <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(244,63,94,0.05)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Ready to Design?</h4>
                            <p className="text-zinc-400">Jump into the workspace and draft your architecture.</p>
                        </div>

                        <Link href={`/solve/${slug}`} className="w-full sm:w-auto">
                            <Button size="lg" className="w-full h-14 px-8 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 border-none shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-all relative overflow-hidden">
                                <span className="relative z-10 font-bold text-lg flex items-center">
                                    Open Workspace
                                    <LayoutTemplate className="ml-2 w-5 h-5" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-text-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] skew-x-12 z-0" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
