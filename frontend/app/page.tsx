'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles, Zap, LayoutGrid, Search } from 'lucide-react';
import AgentCard from '@/components/AgentCard';
import ReportView from '@/components/ReportView';

// Types (Mocking backend response structure)
interface AgentState {
  name: string;
  role: string;
  status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  currentAction: string;
  logs: string[];
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [agents, setAgents] = useState<AgentState[]>([
    { name: 'Alice', role: 'Senior Tech Researcher', status: 'IDLE', currentAction: '', logs: [] },
    { name: 'Bob', role: 'Tech Industry Analyst', status: 'IDLE', currentAction: '', logs: [] },
    { name: 'Eve', role: 'Futurist Visionary', status: 'IDLE', currentAction: '', logs: [] },
    { name: 'Frank', role: 'Strategic Business Advisor', status: 'IDLE', currentAction: '', logs: [] },
    { name: 'Charlie', role: 'Ethical & Safety Critic', status: 'IDLE', currentAction: '', logs: [] },
    { name: 'Diana', role: 'Senior Tech Editor', status: 'IDLE', currentAction: '', logs: [] },
  ]);
  const [finalReport, setFinalReport] = useState<string | null>(null);

  const startResearch = async () => {
    if (!topic) return;
    setIsResearching(true);
    setFinalReport(null);

    // Reset Agents
    setAgents(prev => prev.map(a => ({ ...a, status: 'IDLE', logs: [], currentAction: '' })));

    try {
      const res = await fetch('http://localhost:8000/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      setJobId(data.job_id);
      pollStatus(data.job_id);
    } catch (e) {
      console.error(e);
      setIsResearching(false);
    }
  };

  const pollStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/research/${id}`);
        const data = await res.json();

        // ----------------------------------------------------
        // MOCK LOGIC FOR DEMO PURPOSES (Since backend doesn't stream yet)
        // ----------------------------------------------------
        if (data.status === 'RUNNING') {
          updateMockAgentState(Date.now());
        } else if (data.status === 'COMPLETED') {
          clearInterval(interval);
          setIsResearching(false);
          setFinalReport(data.result);
          setAgents(prev => prev.map(a => ({ ...a, status: 'COMPLETED', currentAction: 'Task Completed' })));
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setIsResearching(false);
          alert('Research Failed: ' + data.error);
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  };

  // Helper to simulate "Liveness" until we have real WebSockets
  const updateMockAgentState = (time: number) => {
    setAgents(prev => {
      const newAgents = [...prev];
      // Simple logic to cycle active agents for demo
      const activeIndex = Math.floor((time / 5000) % 6);

      const mockLogs = [
        "Browsing recent arXiv papers...",
        "Cross-referencing market data...",
        "Identifying key stakeholders...",
        "Analyzing competitive landscape...",
        "Synthesizing future scenarios...",
        "Drafting executive summary...",
        "Checking for bias and safety risks...",
        "Reviewing regulatory impact..."
      ];

      return newAgents.map((agent, idx) => {
        if (idx < activeIndex) return { ...agent, status: 'COMPLETED' };
        if (idx === activeIndex) {
          const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
          const currentLogs = agent.logs.length > 5 ? [...agent.logs.slice(1), randomLog] : [...agent.logs, randomLog];
          return {
            ...agent,
            status: 'RUNNING',
            currentAction: 'Analyzing data...',
            logs: currentLogs
          };
        }
        return { ...agent, status: 'IDLE' };
      });
    });
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020617]">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] animate-float" />
        {/* CSS Noise Pattern */}
        <div className="absolute inset-0 opacity-20 brightness-150 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-24 relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Agent Research System V2.0</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-8 tracking-tight"
          >
            Future Tech <br className="hidden md:block" /> Insight Lab
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Orchestrate an autonomous squad of AI researchers to decode emerging technologies and predict the future.
          </motion.p>
        </header>

        {/* Input Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-24 relative z-20"
        >
          <div className="glass-card p-2 pl-3 rounded-2xl flex items-center gap-2 shadow-2xl ring-1 ring-white/10 hover:ring-purple-500/20 transition-all duration-300">
            <div className="p-3 bg-white/5 rounded-xl">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What should we investigate today? (e.g. 'Neuromorphic Computing')"
              className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-500 font-medium px-2 py-4"
              onKeyDown={(e) => e.key === 'Enter' && startResearch()}
            />
            <button
              onClick={startResearch}
              disabled={isResearching || !topic}
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
              {isResearching ? (
                <>
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  <span>Launch Mission</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Suggestions */}
          {!isResearching && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["Quantum Internet", "Solid State Batteries", "Gene Editing", "6G Networks"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTopic(tag)}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Agent Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <LayoutGrid className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Agent Operations Center</h2>
            {isResearching && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20 animate-pulse">LIVE</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <AgentCard key={i} {...agent} />
            ))}
          </div>
        </div>

        {/* Report Section */}
        <AnimatePresence>
          {finalReport && (
            <div className="mb-24">
              <ReportView reportContent={finalReport} />
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="text-center text-gray-600 py-12 border-t border-white/5">
          <p className="text-sm">Future Tech Insight Lab &copy; 2026</p>
        </footer>
      </div>
    </main>
  );
}
