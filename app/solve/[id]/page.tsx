"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, Send, PenTool, Bot, Mic, MonitorPlay,
    Bookmark, Bold, Italic, Underline, Type, List, ListOrdered,
    Maximize2, X, User
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import MermaidEditor from "@/components/solve/MermaidEditor";

export default function SolveWorkspace() {
    const params = useParams();
    const slug = params?.id as string;
    const problemName = slug?.replace(/-/g, ' ') || 'Challenge';

    // --- State for Interactivity ---

    // 1. Chat State
    const [messages, setMessages] = useState([
        { role: "bot", content: `Welcome to the practice session. Let's design **${problemName}** together. What constraints are we working with?` }
    ]);
    const [chatInput, setChatInput] = useState("");
    const chatScrollRef = useRef<HTMLDivElement>(null);

    // 2. Editor State
    const [editorData, setEditorData] = useState({
        functional: "",
        nonFunctional: "",
        api: "",
        highLevel: ""
    });
    const [isEvaluating, setIsEvaluating] = useState(false);

    // 3. Modal State
    const [isMermaidOpen, setIsMermaidOpen] = useState(false);

    // Scroll to bottom of chat when new message arrives
    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [messages]);

    // --- Handlers ---

    const handleSendChat = () => {
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setChatInput("");

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "That's a good point. What about the database schema for that?",
                "Make sure to consider how this scales during peak traffic.",
                "Can you elaborate on your API endpoints?",
                "I see. Have you thought about caching strategies here?"
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            setMessages(prev => [...prev, { role: "bot", content: randomResponse }]);
        }, 1200);
    };

    const handleAskFeedback = () => {
        setMessages(prev => [...prev, { role: "user", content: "Can you give me feedback on my current design?" }]);
        setIsEvaluating(true);

        setTimeout(() => {
            setIsEvaluating(false);
            let feedback = "Looking at your design... ";
            if (editorData.functional.trim().length < 10) {
                feedback += "Your functional requirements look a bit sparse. Try listing exact features the user needs. ";
            } else {
                feedback += "Good start on the functional requirements! ";
            }
            if (!editorData.api.includes("POST") && !editorData.api.includes("GET")) {
                feedback += "Don't forget to define specific HTTP methods (GET, POST) in your API section.";
            }
            setMessages(prev => [...prev, { role: "bot", content: feedback }]);
        }, 2000);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#050505] overflow-hidden relative selection:bg-rose-500/30 font-sans">

            <div className="absolute top-0 left-1/4 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(244,63,94,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,_rgba(139,92,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-black/60 backdrop-blur-md shrink-0 relative z-20">

                {/* Left Nav */}
                <div className="flex items-center gap-6">
                    <Link href={`/problems`} className="text-zinc-500 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-md bg-white/5 border border-white/5 hover:border-white/10">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                            <PenTool className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-xs font-semibold text-white tracking-wide">Editorial</span>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:bg-white/5 cursor-pointer transition-colors">
                            <MonitorPlay className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:bg-white/5 cursor-pointer transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Center Nav / Actions */}
                <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-rose-400 cursor-pointer border border-white/5 transition-colors">
                        <Mic className="w-4 h-4" />
                    </div>
                    <Button
                        onClick={handleAskFeedback}
                        disabled={isEvaluating}
                        className="h-8 bg-rose-500/10 border border-rose-500/20 text-rose-100 hover:bg-rose-500/20 hover:border-rose-500/40 text-xs font-bold rounded-full px-5 flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all disabled:opacity-50"
                    >
                        {isEvaluating ? "Evaluating..." : "Evaluate"}
                        <Send className="w-3 h-3 text-rose-400" />
                    </Button>
                </div>

                {/* Right Nav */}
                <div className="flex items-center gap-3">
                    <Button className="h-8 bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] border-none text-xs font-bold px-4">
                        Get Premium
                    </Button>
                    <Button variant="outline" className="h-8 bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs px-4">
                        Login
                    </Button>
                </div>
            </header>

            {/* Main 3-Pane Interface */}
            <div className="flex-1 flex overflow-hidden">

                {/* Pane 1: Chat with Coach (Left) */}
                <div className="w-[300px] border-r border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
                    <div className="h-12 flex items-center px-4 border-b border-white/5 shrink-0">
                        <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                            <Bot className="w-4 h-4 text-rose-400" />
                            Chat with Coach
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref={chatScrollRef}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-md border ${msg.role === "bot"
                                    ? "bg-gradient-to-br from-rose-500 to-orange-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                                    : "bg-zinc-800 border-zinc-700"
                                    }`}>
                                    {msg.role === "bot" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-zinc-300" />}
                                </div>
                                <div className={`rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.role === "bot"
                                    ? "bg-rose-500/5 border border-rose-500/10 rounded-tl-sm text-zinc-300"
                                    : "bg-white/10 border border-white/10 rounded-tr-sm text-white"
                                    }`}>
                                    {/* Simple bold parsing */}
                                    {msg.content.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} className="text-white">{text}</strong> : text)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-white/5 bg-black/40 mt-auto">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSendChat()}
                                placeholder="Type your question here..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-rose-500/50 focus:bg-rose-500/5 transition-all"
                            />
                            <button
                                onClick={handleSendChat}
                                className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pane 2: Your Design / Rich Text Editor (Middle) */}
                <div className="flex-1 border-r border-white/5 bg-[#0d0d10] flex flex-col min-w-[400px]">
                    <div className="h-12 flex items-center px-6 border-b border-white/5 shrink-0">
                        <h3 className="text-sm font-semibold text-white tracking-wide">Your design</h3>
                    </div>

                    {/* Formatting Toolbar */}
                    <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 bg-[#121215]">
                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md p-1">
                            <span className="text-xs px-2 text-zinc-400 font-medium whitespace-nowrap">Normal</span>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Bold className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Italic className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Underline className="w-3.5 h-3.5" /></button>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Type className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><List className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><ListOrdered className="w-3.5 h-3.5" /></button>
                        </div>

                        {/* Contextual Action Buttons */}
                        <div className="flex gap-2 ml-4 overflow-x-auto">
                            <button
                                onClick={handleAskFeedback}
                                className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs px-3 py-1.5 rounded-full font-medium transition-colors shadow-[0_0_10px_rgba(244,63,94,0.2)] whitespace-nowrap"
                            >
                                <Bot className="w-3.5 h-3.5" /> Get Feedback
                            </button>
                            <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap">
                                <MonitorPlay className="w-3.5 h-3.5" /> View Feedback
                            </button>
                        </div>
                    </div>

                    {/* Editor Area (Scrollable) */}
                    <div className="flex-1 overflow-y-auto px-10 py-8">
                        <div className="max-w-3xl space-y-8">
                            <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Requirements</h1>

                            <div className="space-y-2 group">
                                <h2 className="text-lg font-semibold text-zinc-200">Functional Requirements:</h2>
                                <textarea
                                    value={editorData.functional}
                                    onChange={e => setEditorData(prev => ({ ...prev, functional: e.target.value }))}
                                    className="w-full bg-transparent resize-none outline-none text-zinc-400 text-sm leading-relaxed placeholder:text-zinc-600/60 min-h-[60px] focus:text-zinc-200 transition-colors"
                                    placeholder="List the key functional requirements for the system (Ask the AI for hints if stuck)..."
                                />
                            </div>

                            <div className="space-y-2 group">
                                <h2 className="text-lg font-semibold text-zinc-200">Non-Functional Requirements:</h2>
                                <textarea
                                    value={editorData.nonFunctional}
                                    onChange={e => setEditorData(prev => ({ ...prev, nonFunctional: e.target.value }))}
                                    className="w-full bg-transparent resize-none outline-none text-zinc-400 text-sm leading-relaxed placeholder:text-zinc-600/60 min-h-[60px] focus:text-zinc-200 transition-colors"
                                    placeholder="List the key non-functional requirements (performance, scalability, reliability, etc.)..."
                                />
                            </div>

                            <div className="h-px w-full bg-white/5 my-8" />

                            <div className="space-y-2 group">
                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">API Design</h2>
                                <textarea
                                    value={editorData.api}
                                    onChange={e => setEditorData(prev => ({ ...prev, api: e.target.value }))}
                                    className="w-full bg-transparent resize-none outline-none text-zinc-400 text-sm leading-relaxed placeholder:text-zinc-600/60 min-h-[100px] focus:text-zinc-200 transition-colors"
                                    placeholder="Define the APIs expected from the system. This is your chance to analyze and define the read and write paths so that you can come up with the high-level design..."
                                />
                            </div>

                            <div className="h-px w-full bg-white/5 my-8" />

                            <div className="space-y-2 group">
                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">High-Level Design</h2>
                                <textarea
                                    value={editorData.highLevel}
                                    onChange={e => setEditorData(prev => ({ ...prev, highLevel: e.target.value }))}
                                    className="w-full bg-transparent resize-none outline-none text-zinc-400 text-sm leading-relaxed placeholder:text-zinc-600/60 min-h-[100px] focus:text-zinc-200 transition-colors"
                                    placeholder="Describe the overall system architecture. Identify the main components needed to solve the problem end-to-end. Use the diagramming tool to create a block diagram."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pane 3: Diagram Builder (Right) */}
                <div className="flex-1 bg-[#09090b] flex flex-col relative min-w-[400px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.02)_0%,_transparent_60%)] pointer-events-none" />

                    {/* Diagram Toolbar */}
                    <div className="h-12 flex items-center justify-between px-4 border-b border-white/5 shrink-0 bg-[#0d0d10] z-10 relative">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold text-white tracking-wide">Diagram</h3>
                            <div className="flex bg-white/5 p-0.5 rounded-md border border-white/10">
                                <button
                                    onClick={() => setIsMermaidOpen(true)}
                                    className="px-2 py-1 text-[10px] font-medium rounded bg-white/10 text-white shadow-sm hover:bg-white/20 transition-colors"
                                >
                                    Mermaid
                                </button>
                                <button className="px-2 py-1 text-[10px] font-medium rounded text-zinc-500 hover:text-white transition-colors">Excalidraw</button>
                            </div>
                        </div>
                    </div>
                    {/* Shape Palette (Drag and Drop) */}
                    <div className="px-6 py-4 flex flex-col gap-2 border-b border-white/5 bg-[#0a0a0c] z-10 relative">
                        <span className="text-xs text-zinc-500 font-medium">Drag and Drop - Draggable components</span>
                        <div className="flex gap-2">
                            <motion.div drag dragMomentum={false} className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded shadow-[0_4px_10px_rgba(16,185,129,0.3)] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center gap-1 z-50">
                                Subgraph
                            </motion.div>
                            <motion.div drag dragMomentum={false} className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded shadow-[0_4px_10px_rgba(59,130,246,0.3)] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center gap-1 z-50">
                                Square
                            </motion.div>
                            <motion.div drag dragMomentum={false} className="px-3 py-1.5 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-[0_4px_10px_rgba(99,102,241,0.3)] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center gap-1 z-50">
                                Circle
                            </motion.div>
                            <motion.div drag dragMomentum={false} className="px-3 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-lg rounded-t-sm shadow-[0_4px_10px_rgba(14,165,233,0.3)] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center gap-1 z-50">
                                Cylinder
                            </motion.div>
                        </div>
                    </div>

                    {/* Canvas Area (Interactive Flowchart) */}
                    <div className="flex-1 relative border border-transparent overflow-hidden flex flex-col items-center justify-center">
                        {/* Floating controls */}
                        <div className="absolute top-4 left-4 flex gap-4 text-xs font-medium text-zinc-400 z-20">
                            <div className="flex flex-col gap-1">
                                <span>Diagram type</span>
                                <select className="bg-black text-white border border-white/20 rounded px-2 py-1 outline-none text-xs">
                                    <option>High level diagram</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 items-center">
                                    <span>Zoom</span>
                                    <div className="w-8 h-4 bg-blue-500 rounded-full flex items-center p-0.5"><div className="w-3 h-3 bg-white rounded-full"></div></div>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <span>Include</span>
                                    <div className="w-8 h-4 bg-zinc-700 rounded-full flex items-center justify-end p-0.5"><div className="w-3 h-3 bg-white rounded-full"></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                            <button className="p-2 bg-white/5 border border-white/10 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Draggable Mock Nodes */}
                        <div className="relative w-full h-full flex flex-col items-center justify-center mt-12 scale-[0.85]">

                            {/* Node 1 */}
                            <motion.div
                                drag dragMomentum={false}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="w-40 h-20 border-2 border-zinc-400 bg-[#121215] flex items-center justify-center text-xl text-zinc-300 font-mono relative cursor-grab active:cursor-grabbing hover:border-white hover:text-white transition-colors shadow-lg z-10"
                            >
                                client
                            </motion.div>

                            {/* Arrow 1 */}
                            <div className="w-1 h-20 bg-zinc-600 relative z-0">
                                <div className="absolute -bottom-2 -left-[6px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-zinc-600" />
                            </div>

                            {/* Node 2 (Diamond) */}
                            <motion.div
                                drag dragMomentum={false}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-40 h-40 rotate-45 border-2 border-zinc-400 bg-[#121215] flex items-center justify-center relative cursor-grab active:cursor-grabbing hover:border-white transition-colors shadow-lg z-10 mt-[-10px]"
                            >
                                <div className="-rotate-45 text-xl text-zinc-300 font-mono hover:text-white transition-colors">
                                    server
                                </div>
                            </motion.div>

                            {/* Arrow 2 */}
                            <div className="w-1 h-20 bg-zinc-600 relative z-0 mt-[-10px]">
                                <div className="absolute -bottom-2 -left-[6px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-zinc-600" />
                            </div>

                            {/* Node 3 */}
                            <motion.div
                                drag dragMomentum={false}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-48 h-20 border-2 border-zinc-400 bg-[#121215] flex items-center justify-center text-xl text-zinc-300 font-mono relative cursor-grab active:cursor-grabbing hover:border-rose-400 hover:text-rose-400 transition-colors shadow-lg z-10"
                            >
                                Database
                            </motion.div>
                        </div>

                        <div className="absolute bottom-4 right-4 z-20">
                            <button className="flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-white transition-colors">
                                <X className="w-4 h-4 bg-zinc-800 rounded-sm" />
                                <span className="text-[10px] font-bold">RESET</span>
                            </button>
                        </div>
                    </div>

                    {/* Mermaid Syntax helper pane (Top right floating) */}
                    <div className="absolute top-12 right-0 w-64 bg-[#0a0a0c] border-l border-b border-rose-500/20 z-30 shadow-[0_0_30px_rgba(244,63,94,0.05)] overflow-hidden rounded-bl-lg">
                        <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between">
                            <span className="text-xs font-semibold text-rose-400">Syntax help</span>
                            <button className="text-rose-400/50 hover:text-rose-400"><X className="w-3 h-3" /></button>
                        </div>
                        <div className="p-4 font-mono text-[10px] text-zinc-400 leading-relaxed">
                            <span className="text-amber-300">flowchart</span> TD<br />
                            &nbsp;&nbsp;B[<span className="text-rose-300">client</span>]<br />
                            &nbsp;&nbsp;C --&gt; D[<span className="text-rose-300">Database</span>]
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <MermaidEditor
                isOpen={isMermaidOpen}
                onClose={() => setIsMermaidOpen(false)}
            />

        </div>
    );
}
