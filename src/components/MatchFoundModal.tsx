import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, MapPin, Clock, DollarSign, Swords, AlertCircle } from 'lucide-react';
import type { SoccerTeam, PitchVenue, MatchCriteria } from '../types';
import { sounds } from '../utils/audio';

interface MatchFoundModalProps {
  isOpen: boolean;
  myTeam: SoccerTeam;
  opponentTeam: SoccerTeam;
  proposedPitch: PitchVenue;
  criteria: MatchCriteria;
  onAcceptMatch: () => void;
  onDeclineMatch: () => void;
}

export const MatchFoundModal: React.FC<MatchFoundModalProps> = ({
  isOpen,
  myTeam,
  opponentTeam,
  proposedPitch,
  criteria,
  onAcceptMatch,
  onDeclineMatch,
}) => {
  const [countdown, setCountdown] = useState(15);
  const [hasUserAccepted, setHasUserAccepted] = useState(false);
  const [hasOpponentAccepted, setHasOpponentAccepted] = useState(false);

  // Play fanfare when match is found
  useEffect(() => {
    if (isOpen) {
      setCountdown(15);
      setHasUserAccepted(false);
      setHasOpponentAccepted(false);
      sounds.playMatchFound();

      // Opponent simulated accepts within 1.5 - 3 seconds
      const oppTimer = setTimeout(() => {
        setHasOpponentAccepted(true);
      }, 2000);

      return () => clearTimeout(oppTimer);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;

    if (countdown <= 0) {
      onDeclineMatch();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdown, onDeclineMatch]);

  // Check if both accepted - only show confetti for 1.5s then clear
  useEffect(() => {
    let clearConfettiTimer: number | null = null;
    let launchDelay: number | null = null;

    if (hasUserAccepted && hasOpponentAccepted) {
      sounds.playAccept();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#f59e0b'],
          ticks: 90, // short particle lifetime
        });

        // Clear confetti completely after 1.5 seconds (1-2s)
        clearConfettiTimer = window.setTimeout(() => {
          confetti.reset();
        }, 1500);
      } catch {}

      launchDelay = window.setTimeout(() => {
        onAcceptMatch();
      }, 1200);
    }

    return () => {
      if (clearConfettiTimer) clearTimeout(clearConfettiTimer);
      if (launchDelay) clearTimeout(launchDelay);
      confetti.reset();
    };
  }, [hasUserAccepted, hasOpponentAccepted, onAcceptMatch]);

  if (!isOpen) return null;

  const handleUserClickAccept = () => {
    if (hasUserAccepted) return;
    setHasUserAccepted(true);
    sounds.playAccept();
  };

  const readyCount = (hasUserAccepted ? 1 : 0) + (hasOpponentAccepted ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gray-950 border-2 border-emerald-500 p-6 sm:p-8 shadow-[0_0_100px_rgba(16,185,129,0.35)] overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 animate-pulse" />

        {/* Header with Countdown */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest">
            <Swords className="w-4 h-4 animate-bounce text-emerald-400" />
            <span>Đã Tìm Thấy Đối Thủ Phù Hợp!</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wider">
            SẴN SÀNG THI ĐẤU?
          </h2>

          <p className="text-xs sm:text-sm text-gray-400">
            Cả 2 đội trưởng phải bấm chấp nhận trong thời gian đếm ngược để xác nhận kèo.
          </p>

          {/* Large Countdown Circular Ring */}
          <div className="py-2 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className={`text-2xl font-black font-mono ${countdown <= 5 ? 'text-rose-400 animate-ping' : 'text-emerald-400'}`}>
                {countdown}
              </span>
            </div>
          </div>
        </div>

        {/* Ready Indicators */}
        <div className="my-6 p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-around">
          <div className="text-center">
            <span className="text-xs uppercase text-gray-400 font-bold block mb-1">Đội Của Bạn</span>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black ${
                hasUserAccepted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {hasUserAccepted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5 animate-spin" />}
              {hasUserAccepted ? 'ĐÃ SẴN SÀNG' : 'CHỜ BẠN BẤM'}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-gray-500">ĐỘI TRƯỞNG SẴN SÀNG</span>
            <span className="text-lg font-black text-white">{readyCount} / 2</span>
          </div>

          <div className="text-center">
            <span className="text-xs uppercase text-gray-400 font-bold block mb-1">Đội Đối Thủ</span>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black ${
                hasOpponentAccepted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {hasOpponentAccepted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5 animate-spin" />}
              {hasOpponentAccepted ? 'ĐÃ SẴN SÀNG' : 'ĐANG CHỜ...'}
            </div>
          </div>
        </div>

        {/* Versus Teams Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {/* My Team */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
              {myTeam.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">{myTeam.name}</span>
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 rounded font-bold">
                  {myTeam.rank}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                ELO: <strong className="text-emerald-400">{myTeam.elo}</strong> • {myTeam.district}
              </p>
            </div>
          </div>

          {/* Opponent Team */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 via-teal-950/20 to-gray-900 border border-teal-500/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
              {opponentTeam.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-cyan-300">{opponentTeam.name}</span>
                <span className="px-1.5 py-0.2 text-[10px] bg-cyan-500/20 text-cyan-300 rounded font-bold">
                  {opponentTeam.rank}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                ELO: <strong className="text-emerald-400">{opponentTeam.elo}</strong> • {opponentTeam.district} • Uy tín{' '}
                <strong className="text-emerald-400">{opponentTeam.fairPlayScore}%</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Proposed Match Details */}
        <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800 text-xs text-gray-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Sân đề xuất:
            </span>
            <span className="font-bold text-white">{proposedPitch.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Khung giờ:
            </span>
            <span className="font-bold text-white">{criteria.timeSlot}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-400">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Kèo tiền sân:
            </span>
            <span className="font-bold text-amber-300">
              {criteria.splitCost === '50-50'
                ? '50/50 (Cưa đôi)'
                : criteria.splitCost === 'loser-pays'
                ? 'Thua chịu 100%'
                : 'Thua tiền nước'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleUserClickAccept}
            disabled={hasUserAccepted}
            className={`w-full sm:flex-1 py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
              hasUserAccepted
                ? 'bg-emerald-600/50 text-white cursor-default border border-emerald-500/50'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-95'
            }`}
          >
            <Check className="w-5 h-5" />
            <span>{hasUserAccepted ? 'ĐÃ CHẤP NHẬN' : 'CHẤP NHẬN TRẬN ĐẤU'}</span>
          </button>

          <button
            onClick={onDeclineMatch}
            disabled={hasUserAccepted && hasOpponentAccepted}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gray-900 hover:bg-rose-950/60 border border-gray-800 hover:border-rose-500/40 text-gray-400 hover:text-rose-300 font-bold text-sm transition-all"
          >
            Từ Chối
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-gray-500 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          Từ chối liên tục 3 lần sẽ bị tạm khóa hàng chờ 5 phút để bảo vệ trải nghiệm ghép trận.
        </p>
      </div>
    </div>
  );
};
