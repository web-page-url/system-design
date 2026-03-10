"use client";

import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import mermaid from "mermaid";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const DIAGRAM_TYPES = [
    { id: "flowchart", label: "High level diagram", defaultCode: `flowchart TD\n  B["client"];\n  C{"server"};\n  D["Database"];\n  n0["node 0"];\n  n1[("node 1")];\n  n2(("node 2"));\n  n3(("node 3"));\n  B --> C;\n  C --> D;` },
    { id: "er", label: "ER diagram", defaultCode: `erDiagram\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : has\n    CUSTOMER ||--o{ ORDER : places\n    CUSTOMER ||--o{ INVOICE : "liable for"\n    DELIVERY-ADDRESS ||--o{ ORDER : receives\n    INVOICE ||--|{ ORDER : covers\n    ORDER ||--|{ ORDER-ITEM : includes\n    PRODUCT-CATEGORY ||--|{ PRODUCT : contains\n    PRODUCT ||--o{ ORDER-ITEM : "ordered in"` },
    { id: "class", label: "Class diagram", defaultCode: `classDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n      +String beakColor\n      +swim()\n      +quack()\n    }\n    class Fish{\n      -int sizeInFeet\n      -canEat()\n    }\n    class Zebra{\n      +bool is_wild\n      +run()\n    }` },
    { id: "sequence", label: "Sequence diagram", defaultCode: `sequenceDiagram\n    Alice->>+John: Hello John, how are you?\n    Alice->>+John: John, can you hear me?\n    John-->>-Alice: Hi Alice, I can hear you!\n    John-->>-Alice: I feel great!` },
    { id: "state", label: "State diagram", defaultCode: `stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]` }
];

export default function MermaidEditor({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [selectedType, setSelectedType] = useState(DIAGRAM_TYPES[0]);
    const [code, setCode] = useState(DIAGRAM_TYPES[0].defaultCode);
    const [svgContent, setSvgContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            fontFamily: "monospace",
        });
    }, []);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code.trim()) return;
            try {
                setError(null);
                const { svg } = await mermaid.render("mermaid-preview", code);
                setSvgContent(svg);
            } catch (err: any) {
                // mermaid throws error UI directly sometimes, or promises throw
                console.error("Mermaid Render Error", err);
                setError(err?.message || "Syntax error in diagram");
            }
        };

        // De-bounce rendering slightly
        const timeout = setTimeout(renderDiagram, 300);
        return () => clearTimeout(timeout);
    }, [code]);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = DIAGRAM_TYPES.find(t => t.id === e.target.value);
        if (type) {
            setSelectedType(type);
            setCode(type.defaultCode);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
                >
                    <div className="w-full h-full max-w-7xl max-h-[90vh] bg-[#0A0B10] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                        {/* Header */}
                        <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#12131A] shrink-0">
                            <h2 className="text-white font-medium text-sm flex items-center gap-2">
                                Mermaid Diagram Editor
                            </h2>
                            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-md text-zinc-400 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Split Content */}
                        <div className="flex-1 flex overflow-hidden flex-col md:flex-row">

                            {/* Left Panel: Editor & Controls */}
                            <div className="w-full md:w-[45%] flex flex-col border-r border-white/5 bg-[#0D0F16]">

                                {/* Code Editor Area */}
                                <div className="flex-1 relative border-b border-white/5 bg-[#1A1C23]">
                                    <textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="absolute inset-0 w-full h-full bg-transparent text-emerald-300 font-mono text-xs p-4 resize-none outline-none leading-relaxed whitespace-pre"
                                        spellCheck={false}
                                    />
                                </div>

                                {/* Bottom Controls Area */}
                                <div className="p-4 bg-[#0A0B10] shrink-0 h-[200px] flex flex-col gap-4">
                                    <div className="flex items-center gap-6 text-xs text-zinc-300">
                                        <div className="flex flex-col gap-1.5 relative">
                                            <label className="text-blue-400 font-medium">Diagram type</label>
                                            <select
                                                value={selectedType.id}
                                                onChange={handleTypeChange}
                                                className="bg-transparent border border-blue-500/50 rounded-md px-3 py-1.5 outline-none text-white appearance-none cursor-pointer hover:border-blue-400 focus:border-blue-400 w-48"
                                            >
                                                {DIAGRAM_TYPES.map(t => (
                                                    <option key={t.id} value={t.id} className="bg-[#0A0B10]">{t.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <div className="flex flex-col gap-1.5 items-center">
                                                <span>Zoom</span>
                                                <div className="w-8 h-4 bg-blue-500 rounded-full flex items-center p-0.5 cursor-pointer"><div className="w-3 h-3 bg-white rounded-full"></div></div>
                                            </div>
                                            <div className="flex flex-col gap-1.5 items-center">
                                                <span>Include</span>
                                                <div className="w-8 h-4 bg-blue-500 rounded-full flex items-center p-0.5 cursor-pointer"><div className="w-3 h-3 bg-white rounded-full"></div></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contextual Drag Palette mocked UI based on selected type */}
                                    <div className="flex-1 mt-2">
                                        {selectedType.id === "flowchart" && (
                                            <div className="flex flex-wrap gap-2">
                                                <div className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-md cursor-grab">Subgraph</div>
                                                <div className="px-3 py-1.5 bg-blue-500 text-white text-[10px] font-bold rounded shadow-md cursor-grab">Square</div>
                                                <div className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-full shadow-md cursor-grab">Circle</div>
                                                <div className="px-3 py-1.5 bg-blue-400 text-white text-[10px] font-bold rounded-lg rounded-t-sm shadow-md cursor-grab">Cylinder</div>
                                                <div className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold shadow-md cursor-grab transform rotate-45 mt-2 ml-2 w-8 h-8 flex items-center justify-center"><div className="-rotate-45">Diamond</div></div>
                                            </div>
                                        )}
                                        {selectedType.id === "class" && (
                                            <div className="flex gap-4 opacity-70">
                                                <div className="text-[10px] border border-white/40 p-1 flex flex-col">
                                                    <div className="border-b border-white/40 text-center px-4 font-bold">Class</div>
                                                    <div className="border-b border-white/40 px-1">+attribute</div>
                                                    <div className="px-1">+method()</div>
                                                </div>
                                                <div className="text-[10px] border border-dashed border-white/40 p-1 flex flex-col items-center justify-center">
                                                    &lt;&lt;interface&gt;&gt;
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Right Panel: Rendered SVG */}
                            <div className="flex-1 bg-[#101218] relative flex items-center justify-center overflow-auto p-4 border border-transparent">
                                {error ? (
                                    <div className="text-rose-400 bg-rose-500/10 p-4 rounded-md border border-rose-500/20 max-w-md font-mono text-xs whitespace-pre-wrap">
                                        {error}
                                    </div>
                                ) : (
                                    <div
                                        ref={containerRef}
                                        className="w-full h-full flex flex-col items-center justify-center overflow-auto mermaid-container"
                                        dangerouslySetInnerHTML={{ __html: svgContent }}
                                        style={{
                                            // Inject a little CSS to ensure mermaid text is white/visible in dark mode
                                            // Mermaid handles dark mode somewhat well if initialized with theme: 'dark'
                                        }}
                                    />
                                )}

                                {/* Bottom Right Controls */}
                                <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1">
                                    <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                                        <ZoomIn className="w-3 h-3" />
                                    </button>
                                    <span className="text-[9px] font-bold text-zinc-400 mt-1">RESET</span>
                                    <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                                        <ZoomOut className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
