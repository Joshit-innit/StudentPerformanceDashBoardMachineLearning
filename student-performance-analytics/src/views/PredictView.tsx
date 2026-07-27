import React, { useState } from 'react';
import { Predictor3DOrb } from '../components/three/Predictor3DOrb';
import { StudentProfile, PredictionResult } from '../types';
import { Sparkles, Info, CheckCircle2, Sliders, Brain, RefreshCw } from 'lucide-react';
import { apiUrl } from '../lib/api';

export const PredictView: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>({
    studyHours: 25,
    attendance: 98,
    previousScore: 85,
    sleepHours: 8,
    motivation: 'Medium',
    internetAccess: true,
    extracurriculars: false,
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/predict'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        const data = await res.json();
        setPrediction(data);
      } else {
        const message = await res.text();
        throw new Error(message || 'Prediction request failed');
      }
    } catch (err) {
      console.error(err);
      setError('Could not reach the Spring Boot model API. Start the backend on port 8080 and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Score Predictor Engine
        </h1>
        <p className="mt-1 text-white/60 text-sm leading-relaxed font-light">
          AI-powered forecasting based on multi-dimensional student data points.
        </p>
      </div>

      {/* Student Profile Input Card */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 text-white font-medium text-base border-b border-white/10 pb-3">
          <Sliders className="w-5 h-5 text-blue-400" />
          <span>Student Profile Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Study Hours/Wk */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">
              Study Hours/Wk
            </label>
            <input
              type="number"
              value={profile.studyHours}
              onChange={(e) => setProfile({ ...profile, studyHours: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-medium text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 outline-none backdrop-blur-md transition-all"
              placeholder="e.g. 25"
            />
          </div>

          {/* Attendance % */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">
              Attendance %
            </label>
            <input
              type="number"
              value={profile.attendance}
              onChange={(e) => setProfile({ ...profile, attendance: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-medium text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 outline-none backdrop-blur-md transition-all"
              placeholder="e.g. 98"
            />
          </div>
        </div>

        {/* Previous Score Avg */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">
            Previous Score Avg
          </label>
          <input
            type="number"
            value={profile.previousScore}
            onChange={(e) => setProfile({ ...profile, previousScore: Number(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-medium text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 outline-none backdrop-blur-md transition-all"
            placeholder="Enter last exam average"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sleep Hours */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">
              Sleep Hours
            </label>
            <input
              type="text"
              value={`${profile.sleepHours} hrs`}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) setProfile({ ...profile, sleepHours: val });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-medium text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 outline-none backdrop-blur-md transition-all"
            />
          </div>

          {/* Motivation */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">
              Motivation Level
            </label>
            <select
              value={profile.motivation}
              onChange={(e) => setProfile({ ...profile, motivation: e.target.value as any })}
              className="w-full bg-[#0A0B1A]/90 border border-white/10 rounded-2xl py-3 px-4 text-sm font-medium text-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 outline-none backdrop-blur-md transition-all"
            >
              <option value="High" className="bg-[#0A0B1A] text-white">High</option>
              <option value="Medium" className="bg-[#0A0B1A] text-white">Medium</option>
              <option value="Low" className="bg-[#0A0B1A] text-white">Low</option>
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          {/* Internet Access */}
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">Internet Access</span>
            <button
              type="button"
              onClick={() => setProfile({ ...profile, internetAccess: !profile.internetAccess })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                profile.internetAccess ? 'bg-blue-500 justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Extracurriculars */}
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">Extracurriculars</span>
            <button
              type="button"
              onClick={() => setProfile({ ...profile, extracurriculars: !profile.extracurriculars })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                profile.extracurriculars ? 'bg-blue-500 justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 text-blue-200" />
          )}
          <span>{loading ? 'Calculating Prediction...' : '✨ Generate Score Prediction'}</span>
        </button>
        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
            {error}
          </div>
        )}
      </div>

      {/* Prediction Result Display */}
      {prediction && (
        <div className="bg-white/5 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{prediction.modelUsed ? 'Trained Model Prediction' : 'Prediction Complete'}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Predicted Score: <span className="text-blue-400 font-extrabold">{prediction.predictedScore}%</span>
            </h3>
            <p className="text-xs text-white/60">
              Grade: <span className="font-bold text-white">{prediction.grade}</span> • Confidence: <span className="font-bold text-blue-400">{prediction.confidenceScore}%</span> • Percentile: <span className="font-bold text-white">{prediction.percentile}th</span>
            </p>
          </div>

          {/* 3D Orb Display */}
          <div className="bg-black/40 rounded-2xl border border-white/10 p-2 overflow-hidden shadow-inner">
            <Predictor3DOrb score={prediction.predictedScore} />
          </div>

          {/* AI Insights & Summary */}
          <div className="space-y-3 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
              <Brain className="w-4 h-4 text-blue-400" />
              <span>Pedagogical Diagnosis</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              {prediction.summary}
            </p>
          </div>

          {/* Targeted Recommendations */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Actionable Recommendations
            </h4>
            <ul className="space-y-2">
              {prediction.recommendations.map((rec, i) => (
                <li key={i} className="text-xs sm:text-sm text-white/80 flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Key Performance Factors List */}
      <div className="bg-white/5 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Key Performance Factors
          </h3>
          <Info className="w-5 h-5 text-white/40" />
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Factor 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Attendance</span>
              <span className="text-blue-400 font-bold">High Impact</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[95%]" />
            </div>
          </div>

          {/* Factor 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Hours Studied</span>
              <span className="text-blue-400 font-bold">High Impact</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[88%]" />
            </div>
          </div>

          {/* Factor 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Parental Involvement</span>
              <span className="text-purple-400 font-bold">Medium Impact</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[65%]" />
            </div>
          </div>

          {/* Factor 4 */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-white/80">
              <span>Sleep Quality</span>
              <span className="text-purple-400 font-bold">Medium Impact</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[50%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-56 sm:h-64 group border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
          alt="Education Quote"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] via-[#0A0B1A]/60 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
          <blockquote className="text-base sm:text-xl font-light italic text-white/90 leading-relaxed max-w-lg">
            &quot;Education is the most powerful weapon which you can use to change the world.&quot;
          </blockquote>
        </div>
      </div>
    </div>
  );
};
