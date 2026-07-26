import React, { useState } from 'react';
import { Hero3DCanvas } from '../components/three/Hero3DCanvas';
import { TabType, CohortMetrics } from '../types';
import { Users, Star, Calendar, Cpu, Sparkles, RefreshCw, ArrowRight, Radio, Activity } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<CohortMetrics>({
    totalStudents: 6607,
    avgExamScore: 84.2,
    avgAttendance: 92.5,
    predAccuracy: 97.8,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        totalStudents: 6607 + Math.floor(Math.random() * 20) - 10,
        avgExamScore: parseFloat((84.2 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        avgAttendance: parseFloat((92.5 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        predAccuracy: 97.8,
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      {/* Top Intelligence Pill & Title Header */}
      <div className="text-center max-w-2xl mx-auto pt-2 px-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-blue-500/5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Intelligence Powered</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
          Student Performance <br />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400">
            Analytics Engine
          </span>
        </h1>

        <p className="mt-3 text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-light">
          Monitor academic performance, explore spatial trends, and predict student exam scores using an intelligent analytics platform.
        </p>
      </div>

      {/* Hero 3D Card Container */}
      <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 sm:p-4">
        <Hero3DCanvas />

        {/* Floating System Status Badge */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/10 backdrop-blur-2xl border border-white/15 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="w-5 h-5 animate-pulse text-emerald-400" />
          </div>
          <div className="text-left">
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
              System Status
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">
              Optimal (Stable)
            </span>
          </div>
        </div>
      </div>

      {/* Performance Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-medium text-white tracking-tight">
            Performance Overview
          </h2>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-all px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
          >
            <span>Refresh</span>
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Total Students */}
          <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {metrics.totalStudents.toLocaleString()}
              </p>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mt-1">
                Total Students
              </p>
            </div>
          </div>

          {/* Card 2: Avg. Exam Score */}
          <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between group">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {metrics.avgExamScore}%
              </p>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mt-1">
                Avg. Exam Score
              </p>
            </div>
          </div>

          {/* Card 3: Avg. Attendance */}
          <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between group">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {metrics.avgAttendance}%
              </p>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mt-1">
                Avg. Attendance
              </p>
            </div>
          </div>

          {/* Card 4: Pred. Accuracy */}
          <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between group">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {metrics.predAccuracy}%
              </p>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mt-1">
                Pred. Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frosted Glass CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-tr from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 text-white shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ready for Deep Intelligence?
          </h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-md leading-relaxed font-light">
            Start by exploring the current cohort analytics or generate a real-time score prediction.
          </p>
        </div>

        <div className="relative z-10 space-y-3 pt-1">
          <button
            onClick={() => onNavigate('analytics')}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-[0.99]"
          >
            <span>Go to Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('predict')}
            className="w-full py-3.5 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>Run Prediction Engine</span>
            <Radio className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
