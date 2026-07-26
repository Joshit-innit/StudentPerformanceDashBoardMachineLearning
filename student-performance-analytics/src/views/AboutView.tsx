import React from 'react';
import { Sparkles, TrendingUp, Target, Github, Linkedin, Cpu, CheckCircle2 } from 'lucide-react';

interface AboutViewProps {
  onOpenProfile: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenProfile }) => {
  const techStack = [
    { name: 'TENSORFLOW', color: 'bg-amber-500/10 text-amber-300 border-amber-400/30' },
    { name: 'PYTHON', color: 'bg-blue-500/10 text-blue-300 border-blue-400/30' },
    { name: 'THREE.JS', color: 'bg-white/10 text-white border-white/20' },
    { name: 'REACT 19', color: 'bg-sky-500/10 text-sky-300 border-sky-400/30' },
    { name: 'TAILWIND CSS', color: 'bg-teal-500/10 text-teal-300 border-teal-400/30' },
    { name: 'GEMINI AI', color: 'bg-indigo-500/10 text-indigo-300 border-indigo-400/30' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      {/* Vision Header */}
      <div>
        <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>THE VISION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Redefining Educational Success
        </h1>
      </div>

      {/* Platform Description Container */}
      <div className="bg-white/5 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/10 text-white/80 text-sm leading-relaxed space-y-3 font-light shadow-2xl">
        <p>
          The <strong className="text-blue-400 font-bold">Student Performance Analytics Platform</strong> is a sophisticated ecosystem designed to bridge the gap between raw educational data and actionable pedagogical insights. By leveraging advanced Machine Learning, we transform historical academic records into predictive roadmaps for student growth.
        </p>
      </div>

      {/* 2 Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Predictive */}
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 space-y-2 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-base font-medium text-white">Predictive Engine</h3>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            Anticipating needs before they become hurdles.
          </p>
        </div>

        {/* Precise */}
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 space-y-2 shadow-xl">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-base font-medium text-white">Precise Analytics</h3>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            Data-driven accuracy in every visualization.
          </p>
        </div>
      </div>

      {/* Architect Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>ARCHITECT</span>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Photo with Overlay Title */}
          <div className="relative h-64 sm:h-72">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Tammana Joshit"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] via-[#0A0B1A]/40 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-bold tracking-tight">
                Tammana Joshit
              </h3>
              <p className="text-xs sm:text-sm text-blue-300 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Machine Learning Engineer</span>
              </p>
            </div>
          </div>

          {/* Bio & Social Links */}
          <div className="p-6 space-y-5">
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Specializing in predictive modeling and data architecture, Tammana focuses on building intelligent systems that make complex datasets accessible and meaningful for educators worldwide.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/30"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm transition-all border border-white/15"
              >
                <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Built With */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
          BUILT WITH
        </h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border ${tech.color} backdrop-blur-md shadow-sm`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
