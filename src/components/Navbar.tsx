import React from 'react';
import { Shield, Volume2, VolumeX, Zap, Trophy, Users, Swords, FileText } from 'lucide-react';
import type { SoccerTeam } from '../types';
import { sounds } from '../utils/audio';

interface NavbarProps {
  currentTab: 'matchmaking' | 'lobbies' | 'leaderboard' | 'team' | 'rules';
  setCurrentTab: (tab: 'matchmaking' | 'lobbies' | 'leaderboard' | 'team' | 'rules') => void;
  myTeam: SoccerTeam;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isInQueue: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  myTeam,
  isMuted,
  setIsMuted,
  isInQueue,
}) => {
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  const handleTabChange = (tab: 'matchmaking' | 'lobbies' | 'leaderboard' | 'team' | 'rules') => {
    sounds.playClick();
    setCurrentTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-900 shadow-lg shadow-emerald-500/20 border border-emerald-400/40">
              <span className="text-2xl animate-pulse">⚽</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  MATCHPITCH
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Ranked Matchmaking
                </span>
              </div>
              <p className="text-xs text-gray-400">Hệ thống ghép trận & tìm đối bóng đá tự động</p>
            </div>
          </div>

          {/* Navigation Tabs (Game Mode Selector style) */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-900/80 p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => handleTabChange('matchmaking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentTab === 'matchmaking'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>Ghép Trận</span>
              {isInQueue && (
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => handleTabChange('lobbies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentTab === 'lobbies'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Phòng Chờ Mở</span>
              <span className="px-1.5 py-0.2 text-[10px] bg-gray-800 text-emerald-400 rounded-md font-bold">4</span>
            </button>

            <button
              onClick={() => handleTabChange('leaderboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Bảng Xếp Hạng</span>
            </button>

            <button
              onClick={() => handleTabChange('team')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentTab === 'team'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Đội Của Bạn</span>
            </button>

            <button
              onClick={() => handleTabChange('rules')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentTab === 'rules'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Luật & Uy Tín</span>
            </button>
          </nav>

          {/* User Team HUD stats */}
          <div className="flex items-center gap-3">
            {/* Team Profile Card */}
            <div
              onClick={() => handleTabChange('team')}
              className="flex items-center gap-3 px-3 py-1.5 bg-gray-900 border border-gray-800 hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
                {myTeam.logo}
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-gray-100">{myTeam.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {myTeam.rank}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-emerald-400 font-semibold">{myTeam.elo} ELO</span>
                  <span>•</span>
                  <span className="text-gray-300 flex items-center gap-0.5">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    {myTeam.fairPlayScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-gray-800/60 overflow-x-auto text-xs">
          <button
            onClick={() => handleTabChange('matchmaking')}
            className={`flex flex-col items-center py-1 px-2 ${
              currentTab === 'matchmaking' ? 'text-emerald-400 font-bold' : 'text-gray-400'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Ghép Trận</span>
          </button>
          <button
            onClick={() => handleTabChange('lobbies')}
            className={`flex flex-col items-center py-1 px-2 ${
              currentTab === 'lobbies' ? 'text-emerald-400 font-bold' : 'text-gray-400'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Phòng Chờ</span>
          </button>
          <button
            onClick={() => handleTabChange('leaderboard')}
            className={`flex flex-col items-center py-1 px-2 ${
              currentTab === 'leaderboard' ? 'text-emerald-400 font-bold' : 'text-gray-400'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Xếp Hạng</span>
          </button>
          <button
            onClick={() => handleTabChange('team')}
            className={`flex flex-col items-center py-1 px-2 ${
              currentTab === 'team' ? 'text-emerald-400 font-bold' : 'text-gray-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Đội Của Bạn</span>
          </button>
        </div>
      </div>
    </header>
  );
};
