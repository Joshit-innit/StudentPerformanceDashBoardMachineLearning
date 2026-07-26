import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ProfileModal } from './components/ProfileModal';
import { DashboardView } from './views/DashboardView';
import { AnalyticsView } from './views/AnalyticsView';
import { PredictView } from './views/PredictView';
import { InsightsView } from './views/InsightsView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <DashboardView onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'predict':
        return <PredictView />;
      case 'insights':
        return <InsightsView />;
      case 'about':
        return <AboutView onOpenProfile={() => setProfileOpen(true)} />;
      default:
        return <DashboardView onNavigate={(tab) => setCurrentTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* Ambient Frosted Glass Glowing Blobs */}
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-[30%] right-[10%] w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <Navbar currentTab={currentTab} onOpenProfile={() => setProfileOpen(true)} />

      {/* Main Screen Content */}
      <main className="max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 relative z-10">
        {renderCurrentView()}
      </main>

      {/* Bottom Tab Navigation */}
      <BottomNav currentTab={currentTab} onChangeTab={(tab) => setCurrentTab(tab)} />

      {/* Profile Drawer / Modal */}
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
