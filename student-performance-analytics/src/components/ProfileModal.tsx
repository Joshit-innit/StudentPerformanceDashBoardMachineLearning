import React from 'react';
import { X, Github, Linkedin, Award, Cpu, Brain, CheckCircle2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0B1A]/90 backdrop-blur-2xl rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-blue-500/40 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                alt="Tammana Joshit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full shadow-md" title="Verified Architect">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">Tammana Joshit</h2>
          <p className="text-blue-400 font-medium text-sm sm:text-base mt-0.5 flex items-center justify-center gap-1.5">
            <Brain className="w-4 h-4" /> Machine Learning Engineer
          </p>
          <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed px-2 font-light">
            Specializing in predictive modeling and data architecture, Tammana focuses on building intelligent systems that make complex datasets accessible and meaningful for educators worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-all border border-white/15"
          >
            <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
          </a>
        </div>

        {/* Technical Competencies */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Core Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-mono border border-blue-400/30 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" /> TensorFlow
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-mono border border-blue-400/30">
              Python Data Science
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-mono border border-white/20">
              Three.js 3D Rendering
            </span>
            <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-400/30">
              Gemini AI Integration
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-mono border border-purple-400/30">
              Predictive Analytics
            </span>
          </div>
        </div>

        {/* Platform Status */}
        <div className="mt-6 bg-white/5 p-4 rounded-2xl flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Model Accuracy</p>
              <p className="text-[11px] text-white/50">Cross-validated cohort baseline</p>
            </div>
          </div>
          <span className="text-sm font-bold text-emerald-400 font-mono">97.8%</span>
        </div>
      </div>
    </div>
  );
};
