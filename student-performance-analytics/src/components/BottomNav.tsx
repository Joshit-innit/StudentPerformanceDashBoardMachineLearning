import React from 'react';
import { TabType } from '../types';
import { LayoutGrid, BarChart2, Radio, Lightbulb, Info } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'predict', label: 'Predict', icon: <Radio className="w-5 h-5" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0B1A]/80 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] py-2 px-3 sm:px-6">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 text-blue-400' : ''
                }`}
              >
                {tab.icon}
              </div>
              <span className={`text-[11px] sm:text-xs mt-0.5 tracking-tight ${isActive ? 'font-medium' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-1 bg-blue-500 rounded-full animate-pulse shadow-sm shadow-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
