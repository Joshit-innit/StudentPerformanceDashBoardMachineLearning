import React, { useState } from 'react';
import { Calendar, Clock, Brain, Globe, Download, Sparkles, Moon, Activity } from 'lucide-react';
import { ReportModal } from '../components/ReportModal';
import { cohortMetrics } from '../data/edaData';

export const InsightsView: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  const handleGetReport = async () => {
    setReportModalOpen(true);
    setReportLoading(true);

    try {
      const res = await fetch('/api/insights/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'Pedagogical Insights', studentCohort: 'STEM & Humanities 2026' }),
      });

      if (res.ok) {
        const data = await res.json();
        setReportText(data.report);
      } else {
        setReportText(`Executive Academic Report

1. Cohort Summary
   - Total records analyzed: 6,607 students.
   - Average exam score: 67.2%.
   - Average attendance: 80.0%.

2. EDA Findings
   - Attendance has the strongest observed correlation with exam score: 0.58.
   - Hours studied also has a meaningful positive correlation: 0.45.
   - Previous scores and tutoring sessions show smaller positive relationships.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>SMART ANALYSIS ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Learning Insights & Analytics
        </h1>
        <p className="mt-1 text-white/60 text-sm leading-relaxed font-light">
          Real patterns from {cohortMetrics.totalStudents.toLocaleString()} student records in the EDA notebook.
        </p>
      </div>

      {/* Insight 1: The Attendance Catalyst */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30">
            High Impact
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            The Attendance Catalyst
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed font-light">
            Attendance has the strongest positive relationship with exam score in the EDA correlation table: 0.58.
          </p>
        </div>

        {/* Small Bar Graph */}
        <div className="pt-2">
          <div className="h-16 flex items-end gap-2 px-1 border-b border-white/10 pb-1">
            <div className="flex-1 bg-blue-500/30 h-[18%] rounded-t-md border border-blue-400/20" />
            <div className="flex-1 bg-blue-500/40 h-[32%] rounded-t-md border border-blue-400/30" />
            <div className="flex-1 bg-blue-500/50 h-[45%] rounded-t-md border border-blue-400/40" />
            <div className="flex-1 bg-blue-500/70 h-[58%] rounded-t-md border border-blue-400/50" />
            <div className="flex-1 bg-blue-500 h-[100%] rounded-t-md border border-blue-300 shadow-md shadow-blue-500/30" />
          </div>
          <div className="flex justify-between text-[11px] text-white/50 font-mono pt-1.5 px-1">
            <span>Lower attendance</span>
            <span className="text-blue-400 font-bold">Higher attendance</span>
          </div>
        </div>
      </div>

      {/* Insight 2: Study Sweet Spot */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Study Sweet Spot
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed font-light">
            Hours studied has a 0.45 correlation with exam score, making it the second strongest signal in the EDA summary.
          </p>
        </div>
      </div>

      {/* Insight 3: The Tutoring Lift */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            The Tutoring Lift
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed font-light">
            Tutoring sessions show a smaller but positive relationship with exam score: 0.16 in the preprocessed data.
          </p>
        </div>
      </div>

      {/* Insight 4: The Wellness Multiplier Photo Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-60 sm:h-64 group border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
          alt="The Wellness Multiplier"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] via-[#0A0B1A]/60 to-transparent p-6 flex flex-col justify-end text-white">
          <div className="flex gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium flex items-center gap-1">
              <Moon className="w-3 h-3 text-purple-300" /> Sleep
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-300" /> Activity
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            The Wellness Multiplier
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-md leading-relaxed font-light">
            Sleep hours and physical activity are present in the EDA, but their direct score correlations are weak in this dataset.
          </p>
        </div>
      </div>

      {/* Insight 5: The Connectivity Gap */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">
            The Connectivity Gap
          </h3>
        </div>

        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
          Internet access has a small positive correlation with exam score in the preprocessed dataset: 0.05.
        </p>

        <div className="space-y-1.5 pt-2">
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[5%]" />
          </div>
          <p className="text-xs font-medium text-white/70">
            Correlation with exam score: 0.05
          </p>
        </div>
      </div>

      {/* Footer Text & Download Button */}
      <div className="text-center space-y-4 pt-2">
        <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed font-light">
          These insights are based on the local EDA notebook and dataset files in this project.
        </p>

        <button
          onClick={handleGetReport}
          className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mx-auto active:scale-[0.99]"
        >
          <Download className="w-4 h-4 text-blue-100" />
          <span>Get Detailed Report</span>
        </button>
      </div>

      {/* Executive Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportContent={reportText}
        loading={reportLoading}
      />
    </div>
  );
};
