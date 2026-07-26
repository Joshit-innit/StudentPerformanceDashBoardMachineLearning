import React from 'react';
import { TabType } from '../types';
import { GraduationCap } from 'lucide-react';
import profilePhoto from '../assets/profile-photo.png';

interface NavbarProps {
  currentTab: TabType;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onOpenProfile }) => {
  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'Dashboard';
      case 'analytics':
        return 'Analytics';
      case 'predict':
        return 'Predictions';
      case 'insights':
        return 'Insights';
      case 'about':
        return 'About';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500/30 to-blue-500/30 border border-white/20 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
              {getTabTitle(currentTab)}
            </h1>
          </div>
        </div>

        {/* Right: User Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="group flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          title="Tammana Joshit - Machine Learning Engineer Profile"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-500/50 group-hover:ring-blue-400 transition-all shadow-md">
              <img
                src={profilePhoto}
                alt="Tammana Joshit"
                className="w-full h-full object-cover [object-position:center_28%]"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 ring-2 ring-[#0A0B1A] rounded-full"></span>
          </div>
        </button>
      </div>
    </header>
  );
};
