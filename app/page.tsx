import { Hero } from "@/components/landing/Hero";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { Cpu, LayoutDashboard, BrainCircuit, Rocket } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Interactive Workspace",
      description: "Solve problems in structured sections: Requirements, Capacity, API Design, and Database Schema just like a real engineering doc.",
      icon: <LayoutDashboard className="w-6 h-6" />,
      delay: 0.1
    },
    {
      title: "Architecture Diagrams",
      description: "Map out your data flow, microservices, and databases directly in the browser. A visual tool built for massive scale.",
      icon: <Cpu className="w-6 h-6" />,
      delay: 0.2
    },
    {
      title: "Instant AI Evaluation",
      description: "Get detailed, ruthless scoring on architecture correctness, scalability, and tradeoffs the moment you submit.",
      icon: <BrainCircuit className="w-6 h-6" />,
      delay: 0.3
    },
    {
      title: "Expert Editorial Solutions",
      description: "Compare your design against FAANG-grade architectures and learn superior scaling patterns.",
      icon: <Rocket className="w-6 h-6" />,
      delay: 0.4
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Hero />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Built for Serious Engineering
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stop reading static articles. Start building architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
