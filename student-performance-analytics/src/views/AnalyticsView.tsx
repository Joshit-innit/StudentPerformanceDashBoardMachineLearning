import React, { useState } from 'react';
import { Users, TrendingUp, BarChart2, Share2, Grid } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [activeFactor, setActiveFactor] = useState<string | null>(null);

  // Score Distribution Histogram Data
  const scoreBins = [
    { range: '0-40', height: 25, label: '12%', color: 'bg-blue-500/30 border border-blue-400/30' },
    { range: '41-60', height: 50, label: '24%', color: 'bg-blue-500/50 border border-blue-400/40' },
    { range: '61-80', height: 90, label: '42%', color: 'bg-gradient-to-t from-blue-500/60 to-blue-400/80 border border-blue-300/50 shadow-lg shadow-blue-500/20' },
    { range: '81-90', height: 65, label: '18%', color: 'bg-purple-500/60 border border-purple-400/40' },
    { range: '91-100', height: 35, label: '4%', color: 'bg-emerald-500/50 border border-emerald-400/40' },
    { range: '100+', height: 15, label: '0%', color: 'bg-white/10 border border-white/10' },
  ];

  // Correlation Heatmap Data
  const correlationMatrix = [
    [1.0, 0.78, 0.62, 0.81],
    [0.78, 1.0, 0.55, 0.72],
    [0.62, 0.55, 1.0, 0.48],
    [0.81, 0.72, 0.48, 1.0],
  ];

  const factorLabels = ['Attendance', 'Study Hrs', 'Sleep', 'Prior Grade'];

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Academic Performance Analytics
        </h1>
        <p className="mt-1 text-white/60 text-sm leading-relaxed font-light">
          Deep dive into spatial variables shaping student success across the current semester.
        </p>
      </div>

      {/* Top 2 Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
              TOTAL COHORT
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1,248
            </span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
              AVG. SCORE
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
              74.2%
            </span>
          </div>
        </div>
      </div>

      {/* Score Distribution Card */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Score Distribution
          </h3>
          <BarChart2 className="w-5 h-5 text-white/40" />
        </div>

        {/* Histogram Chart */}
        <div className="pt-4 pb-2">
          <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-white/10 pb-2">
            {scoreBins.map((bin, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] py-1 px-2 rounded font-mono pointer-events-none z-10 whitespace-nowrap shadow-xl">
                  {bin.range}: {bin.label}
                </div>
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 hover:brightness-125 ${bin.color}`}
                  style={{ height: `${bin.height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between px-2 pt-2 text-xs text-white/50 font-medium font-mono">
            <span>0-40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Study Time vs. Performance Scatter Plot Card */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Study Time vs. Performance Mesh
          </h3>
          <Share2 className="w-5 h-5 text-white/40" />
        </div>

        <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-white/10 relative h-48 flex items-center justify-center overflow-hidden">
          {/* Scatter Plot Points & Trend Line SVG */}
          <svg className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            <line x1="10%" y1="80%" x2="90%" y2="20%" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Scatter Dots */}
            <circle cx="15%" cy="75%" r="4" className="fill-blue-400 opacity-80" />
            <circle cx="28%" cy="62%" r="4" className="fill-blue-400 opacity-90" />
            <circle cx="38%" cy="58%" r="4" className="fill-purple-400 opacity-80" />
            <circle cx="42%" cy="42%" r="5" className="fill-blue-500 shadow-lg shadow-blue-500" />
            <circle cx="58%" cy="48%" r="4" className="fill-indigo-400 opacity-90" />
            <circle cx="68%" cy="32%" r="4" className="fill-blue-400 opacity-90" />
            <circle cx="75%" cy="22%" r="5" className="fill-emerald-400 shadow-lg shadow-emerald-500" />
            <circle cx="85%" cy="18%" r="4" className="fill-blue-400 opacity-90" />

            {/* Outliers */}
            <circle cx="35%" cy="35%" r="4" className="fill-purple-300 opacity-60" />
            <circle cx="60%" cy="65%" r="4" className="fill-indigo-300 opacity-60" />
          </svg>

          <span className="absolute bottom-3 left-4 text-xs font-mono text-white/40">
            Study Hours →
          </span>
        </div>
      </div>

      {/* Environmental Factors Progress Bars */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <h3 className="text-lg font-medium text-white">
          Environmental Factors
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Factor 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Motivation: High</span>
              <span className="text-blue-400 font-bold">88% Avg.</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[88%]" />
            </div>
          </div>

          {/* Factor 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Teacher Quality: High</span>
              <span className="text-purple-400 font-bold">82% Avg.</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-[82%]" />
            </div>
          </div>

          {/* Factor 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>School Type: Private</span>
              <span className="text-amber-400 font-bold">76% Avg.</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-[76%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Factor Correlation Heatmap Grid */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Factor Correlation Matrix
          </h3>
          <Grid className="w-5 h-5 text-white/40" />
        </div>

        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {correlationMatrix.map((row, rIdx) =>
            row.map((val, cIdx) => {
              const bgClass =
                val === 1.0
                  ? 'bg-blue-500 text-white font-bold border border-blue-400/50 shadow-md shadow-blue-500/20'
                  : val >= 0.75
                  ? 'bg-blue-500/40 text-white/90 border border-white/10'
                  : val >= 0.6
                  ? 'bg-purple-500/30 text-white/80 border border-white/10'
                  : 'bg-white/5 text-white/60 border border-white/5';

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`aspect-square rounded-xl ${bgClass} flex items-center justify-center text-xs p-1 text-center transition-all hover:scale-105 cursor-pointer`}
                  title={`${factorLabels[rIdx]} vs ${factorLabels[cIdx]}: ${val}`}
                  onClick={() => setActiveFactor(`${factorLabels[rIdx]} & ${factorLabels[cIdx]}: Correlation ${val}`)}
                >
                  {val === 1.0 ? '1.0' : val}
                </div>
              );
            })
          )}
        </div>

        {/* Labels below grid */}
        <div className="grid grid-cols-4 gap-1 text-[11px] font-mono text-white/50 text-center pt-1">
          <span>Attendance</span>
          <span>Study Hrs</span>
          <span>Sleep</span>
          <span>Prior Grade</span>
        </div>

        {activeFactor && (
          <p className="text-xs text-blue-300 bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-center font-medium">
            {activeFactor}
          </p>
        )}
      </div>

      {/* Historical Score Trend */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <h3 className="text-lg font-medium text-white">
          Historical Score Trend
        </h3>

        <div className="relative h-40 w-full pt-4">
          <svg className="w-full h-28 overflow-visible">
            {/* Dashed Baseline */}
            <path
              d="M 10 70 Q 70 85, 140 60 T 270 70 T 360 40"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Solid Main Trend Curve */}
            <path
              d="M 10 60 Q 70 30, 140 50 T 270 55 T 360 15"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Floating Current Score Pill */}
          <div className="absolute top-1 right-6 bg-blue-500 text-white font-bold text-xs py-1 px-3 rounded-full shadow-lg shadow-blue-500/30">
            84%
          </div>

          <div className="flex justify-between text-xs text-white/50 font-mono px-2 pt-2 border-t border-white/10">
            <span>Year 1</span>
            <span>Year 2</span>
            <span>Year 3</span>
            <span className="text-blue-400 font-bold">Current</span>
          </div>
        </div>
      </div>

      {/* Visualizing Potential Banner Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-52 sm:h-60 group border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
          alt="Visualizing Potential"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] via-[#0A0B1A]/50 to-transparent p-6 flex flex-col justify-end text-white">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Visualizing Potential
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-sm font-light">
            Every data point represents a unique path to student excellence.
          </p>
        </div>
      </div>
    </div>
  );
};
