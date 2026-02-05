import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, FileText, CheckCircle, Brain, AlertTriangle } from 'lucide-react';

interface AgentProps {
    name: string;
    role: string;
    status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    currentAction?: string; // e.g., "Searching for quantum computing..."
    logs: string[];
}

const AgentCard: React.FC<AgentProps> = ({ name, role, status, currentAction, logs }) => {
    const getIcon = () => {
        switch (role) {
            case 'Senior Tech Researcher': return <Search className="w-6 h-6 text-blue-400" />;
            case 'Tech Industry Analyst': return <Brain className="w-6 h-6 text-purple-400" />;
            case 'Ethical & Safety Critic': return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
            case 'Senior Tech Editor': return <FileText className="w-6 h-6 text-green-400" />;
            default: return <Activity className="w-6 h-6 text-gray-400" />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'RUNNING': return 'border-blue-500/50 bg-blue-500/10';
            case 'COMPLETED': return 'border-green-500/50 bg-green-500/10';
            case 'FAILED': return 'border-red-500/50 bg-red-500/10';
            default: return 'border-white/10 bg-white/5';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-6 rounded-2xl border backdrop-blur-xl ${getStatusColor()} transition-all duration-500`}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                    {getIcon()}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-sm text-gray-400">{role}</p>
                </div>
                {status === 'RUNNING' && (
                    <div className="ml-auto">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    </div>
                )}
                {status === 'COMPLETED' && <CheckCircle className="ml-auto w-5 h-5 text-green-500" />}
            </div>

            {/* Current Action / Thought */}
            <div className="mb-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-mono">Current Activity</div>
                <div className="h-16 overflow-hidden relative">
                     <p className="text-sm text-gray-300 font-mono">
                        {status === 'RUNNING' && currentAction ? (
                            <span className="typing-effect">› {currentAction}</span>
                        ) : status === 'COMPLETED' ? (
                            <span className="text-green-400">› Task successfully completed.</span>
                        ) : (
                            <span className="text-gray-600">› Waiting for task...</span>
                        )}
                    </p>
                    {status === 'RUNNING' && <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-900/0 to-transparent pointer-events-none" />}
                </div>
            </div>

            {/* Logs Mini-Console */}
            <div className="bg-black/40 rounded-lg p-3 h-32 overflow-y-auto font-mono text-xs border border-white/5">
                {logs.length === 0 ? (
                    <span className="text-gray-600 italic">No logs yet...</span>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="text-gray-400 mb-1 border-b border-white/5 pb-1 last:border-0">
                            <span className="text-blue-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default AgentCard;
