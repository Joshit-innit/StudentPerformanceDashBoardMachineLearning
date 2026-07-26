import React, { useState } from 'react';
import { Users, TrendingUp, BarChart2, Share2, Grid, Database, Activity } from 'lucide-react';
import {
  cohortMetrics,
  correlationLabels,
  correlationMatrix,
  edaScatter,
  examScoreCorrelations,
  groupedScoreAverages,
  scoreDistribution,
} from '../data/edaData';

type Point = [number, number];

const colorForCorrelation = (value: number) => {
  const strength = Math.abs(value);
  if (value === 1) return 'bg-blue-500 text-white border-blue-300/60 shadow-md shadow-blue-500/20';
  if (value > 0.4) return 'bg-emerald-500/50 text-white border-emerald-300/40';
  if (value > 0.15) return 'bg-blue-500/35 text-white/90 border-blue-300/30';
  if (value < -0.08) return 'bg-rose-500/35 text-white/85 border-rose-300/30';
  if (strength > 0.03) return 'bg-purple-500/25 text-white/75 border-purple-300/20';
  return 'bg-white/5 text-white/55 border-white/10';
};

const scalePoint = (point: Point, xMin: number, xMax: number, yMin: number, yMax: number) => {
  const [x, y] = point;
  const cx = 8 + ((x - xMin) / (xMax - xMin)) * 84;
  const cy = 90 - ((y - yMin) / (yMax - yMin)) * 78;
  return { cx, cy };
};

const ScatterPlot: React.FC<{
  points: Point[];
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xLabel: string;
}> = ({ points, xMin, xMax, yMin, yMax, xLabel }) => (
  <div className="bg-black/30 p-4 sm:p-5 rounded-2xl border border-white/10 relative h-56 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[20, 40, 60, 80].map((line) => (
        <g key={line}>
          <line x1="8" y1={line} x2="94" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <line x1={line} y1="12" x2={line} y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        </g>
      ))}
      <line x1="8" y1="90" x2="94" y2="90" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
      <line x1="8" y1="12" x2="8" y2="90" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
      <line x1="12" y1="82" x2="90" y2="28" stroke="rgba(96,165,250,0.55)" strokeDasharray="2 2" strokeWidth="1.2" />
      {points.map((point, index) => {
        const { cx, cy } = scalePoint(point, xMin, xMax, yMin, yMax);
        return (
          <circle
            key={`${point[0]}-${point[1]}-${index}`}
            cx={cx}
            cy={cy}
            r="1.7"
            className={index % 4 === 0 ? 'fill-emerald-300/85' : 'fill-blue-400/80'}
          />
        );
      })}
    </svg>
    <span className="absolute left-4 top-3 text-[11px] font-mono text-white/40">Exam Score</span>
    <span className="absolute bottom-3 right-4 text-[11px] font-mono text-white/40">{xLabel}</span>
  </div>
);

export const AnalyticsView: React.FC = () => {
  const [activeFactor, setActiveFactor] = useState<string | null>(null);
  const maxScoreBin = Math.max(...scoreDistribution.map((bin) => bin.count));

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      <div>
        <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>EDA NOTEBOOK DATA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Academic Performance Analytics
        </h1>
        <p className="mt-1 text-white/60 text-sm leading-relaxed font-light">
          Visuals generated from the cleaned and preprocessed student performance datasets.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
            Total Records
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {cohortMetrics.totalStudents.toLocaleString()}
          </span>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
            Avg. Exam Score
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
            {cohortMetrics.avgExamScore}%
          </span>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Exam Score Distribution</h3>
          <BarChart2 className="w-5 h-5 text-white/40" />
        </div>

        <div className="pt-4 pb-2">
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-white/10 pb-2">
            {scoreDistribution.map((bin) => {
              const height = Math.max(5, (bin.count / maxScoreBin) * 100);
              return (
                <div key={bin.range} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] py-1 px-2 rounded font-mono pointer-events-none z-10 whitespace-nowrap shadow-xl">
                    {bin.count.toLocaleString()} students ({bin.percent}%)
                  </div>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:brightness-125 bg-gradient-to-t from-blue-500/65 to-emerald-400/75 border border-blue-300/40 shadow-lg shadow-blue-500/10"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-white/45 font-mono">{bin.percent}%</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-6 gap-2 px-2 pt-2 text-[11px] text-white/50 font-medium font-mono text-center">
            {scoreDistribution.map((bin) => (
              <span key={bin.range}>{bin.range}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Hours Studied vs Exam Score</h3>
            <Share2 className="w-5 h-5 text-white/40" />
          </div>
          <ScatterPlot points={edaScatter.hoursStudied as Point[]} xMin={1} xMax={44} yMin={55} yMax={101} xLabel="Hours Studied" />
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Attendance vs Exam Score</h3>
            <Activity className="w-5 h-5 text-white/40" />
          </div>
          <ScatterPlot points={edaScatter.attendance as Point[]} xMin={60} xMax={100} yMin={55} yMax={101} xLabel="Attendance %" />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Correlation Heatmap</h3>
          <Grid className="w-5 h-5 text-white/40" />
        </div>

        <div className="grid grid-cols-5 gap-2 pt-2">
          {correlationMatrix.map((row, rIdx) =>
            row.map((value, cIdx) => (
              <button
                key={`${rIdx}-${cIdx}`}
                className={`aspect-square rounded-xl border ${colorForCorrelation(value)} flex items-center justify-center text-xs p-1 text-center transition-all hover:scale-105`}
                title={`${correlationLabels[rIdx]} vs ${correlationLabels[cIdx]}: ${value}`}
                onClick={() => setActiveFactor(`${correlationLabels[rIdx]} and ${correlationLabels[cIdx]} correlation: ${value}`)}
              >
                {value.toFixed(2)}
              </button>
            ))
          )}
        </div>

        <div className="grid grid-cols-5 gap-1 text-[10px] sm:text-[11px] font-mono text-white/50 text-center pt-1">
          {correlationLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {activeFactor && (
          <p className="text-xs text-blue-300 bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-center font-medium">
            {activeFactor}
          </p>
        )}
      </div>

      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <h3 className="text-lg font-medium text-white">Grouped Score Averages</h3>
        {groupedScoreAverages.map((group) => (
          <div key={group.factor} className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">{group.factor}</h4>
            <div className="space-y-2">
              {group.values.map((item) => (
                <div key={`${group.factor}-${item.name}`} className="space-y-1.5">
                  <div className="flex justify-between gap-3 text-xs sm:text-sm font-medium text-white/80">
                    <span>{item.name} <span className="text-white/35 font-mono">({item.count.toLocaleString()})</span></span>
                    <span className="text-blue-300 font-bold">{item.avgScore}% avg.</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      style={{ width: `${item.avgScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <h3 className="text-lg font-medium text-white">Top Exam Score Correlations</h3>
        <div className="space-y-3">
          {examScoreCorrelations.map((item) => {
            const width = Math.max(8, Math.abs(item.value) * 100);
            return (
              <div key={item.feature} className="space-y-1.5">
                <div className="flex justify-between gap-3 text-xs sm:text-sm font-medium text-white/80">
                  <span>{item.feature}</span>
                  <span className={item.value >= 0 ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                    {item.value.toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={item.value >= 0 ? 'h-full bg-emerald-400 rounded-full' : 'h-full bg-rose-400 rounded-full'}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
