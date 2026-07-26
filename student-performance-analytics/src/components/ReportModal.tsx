import React, { useState } from 'react';
import { X, Download, Printer, Check, Sparkles, FileText } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportContent?: string;
  loading?: boolean;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  reportContent,
  loading = false,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (reportContent) {
      navigator.clipboard.writeText(reportContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0B1A]/90 backdrop-blur-2xl rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[85vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Executive Academic Report</h3>
              <p className="text-xs text-white/50">Student Performance Analytics Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 overflow-y-auto flex-1 text-white/80 space-y-4 text-sm leading-relaxed font-sans">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
              <Sparkles className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-sm font-semibold text-white">Synthesizing Cohort Intelligence...</p>
              <p className="text-xs text-white/50 max-w-xs font-light">Connecting variables across study hours, attendance trends, and exam outcomes.</p>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed text-white/90">
              {reportContent || "No report generated yet."}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white/10 text-white font-medium text-xs hover:bg-white/15 transition-all border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-blue-400" />}
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white/10 text-white font-medium text-xs hover:bg-white/15 transition-all border border-white/10"
            >
              <Printer className="w-4 h-4 text-purple-400" /> Print / Save PDF
            </button>
          </div>

          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
