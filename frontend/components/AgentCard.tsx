import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, FileText, CheckCircle2, Brain, Sparkles, Globe2, Target, Terminal } from 'lucide-react';

interface AgentProps {
    name: string;
    role: string;
    status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    currentAction?: string;
    logs: string[];
}

const AgentCard: React.FC<AgentProps> = ({ name, role, status, currentAction, logs }) => {
    // Auto-scroll logs
    const logsEndRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getIcon = () => {
        switch (role) {
            case 'Senior Tech Researcher': return <Search className="w-5 h-5 text-blue-400" />;
            case 'Tech Industry Analyst': return <Brain className="w-5 h-5 text-purple-400" />;
            case 'Futurist Visionary': return <Globe2 className="w-5 h-5 text-cyan-400" />;
            case 'Strategic Business Advisor': return <Target className="w-5 h-5 text-amber-400" />;
            case 'Ethical & Safety Critic': return <Activity className="w-5 h-5 text-rose-400" />; // Changed icon for variety
            case 'Senior Tech Editor': return <FileText className="w-5 h-5 text-emerald-400" />;
            default: return <Sparkles className="w-5 h-5 text-gray-400" />;
        }
    };

    const isActive = status === 'RUNNING';
    const isCompleted = status === 'COMPLETED';
    const isFailed = status === 'FAILED';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card rounded-xl p-5 relative overflow-hidden transition-all duration-300 ${isActive ? 'ring-1 ring-purple-500/30 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]' : ''}`}
        >
            {/* Active Highlight Gradient */}
            {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[shimmer_2s_infinite]" />}

            <div className="flex items-start gap-4 mb-4">
                <div className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-white tracking-tight truncate">{name}</h3>
                        {isActive && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-medium text-purple-300 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                Processing
                            </div>
                        )}
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-gray-500 font-medium truncate">{role}</p>
                </div>
            </div>

            {/* Status / Current Action Area */}
            <div className="min-h-[60px] mb-4 bg-black/20 rounded-lg p-3 border border-white/5">
                <div className="flex items-center gap-2 mb-1.5 opacity-50">
                    <Terminal className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400">System Activity</span>
                </div>
                <div className="font-mono text-xs leading-relaxed">
                    {isActive && currentAction ? (
                        <span className="text-purple-300 typing-cursor">
                            {currentAction}
                        </span>
                    ) : isCompleted ? (
                        <span className="text-emerald-400/80">Analysis complete. Waiting for next cycle.</span>
                    ) : isFailed ? (
                        <span className="text-rose-400">System error encountered.</span>
                    ) : (
                        <span className="text-gray-600">Standby mode...</span>
                    )}
                </div>
            </div>

            {/* Logs Window */}
            <div className="relative group">
                <div className="h-28 overflow-y-auto bg-[#050508] rounded-lg border border-white/5 p-3 custom-scrollbar font-mono text-[10px] leading-4 text-gray-500">
                    {logs.length === 0 ? (
                        <div className="h-full flex items-center justify-center opacity-30">
                            <span>Awaiting feed data...</span>
                        </div>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} className="mb-1 last:mb-0 break-words">
                                <span className="text-blue-500/50 mr-2">
                                    {isActive ? '>>' : '#'}
                                </span>
                                <span className={log.includes('Thinking') ? 'text-amber-500/80' : 'text-gray-400'}>
                                    {log}
                                </span>
                            </div>
                        ))
                    )}
                    <div ref={logsEndRef} />
                </div>
                {/* Fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default AgentCard;
