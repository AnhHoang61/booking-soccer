import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Shield, Radio, Search, MapPin, Clock, Users } from 'lucide-react';
import type { MatchCriteria } from '../types';
import { sounds } from '../utils/audio';

interface QueueModalProps {
  isOpen: boolean;
  isMinimized: boolean;
  setIsMinimized: (val: boolean) => void;
  queueTime: number; // in seconds
  onCancelQueue: () => void;
  criteria: MatchCriteria;
}

const statusMessages = [
  'Đang kết nối tới mạng lưới FC toàn khu vực...',
  'Đang quét các đội bóng online tại {district}...',
  'Lọc theo thể thức Sân {field} & khung giờ...',
  'Cân bằng chỉ số ELO (Khoảng ± 75 điểm)...',
  'Tính toán khoảng cách sân bóng trung gian...',
  'Đang chọn lọc FC có điểm Fair-play cao (>90%)...',
  'Đã phát hiện đối thủ tiềm năng! Đang xác minh...',
];

export const QueueModal: React.FC<QueueModalProps> = ({
  isOpen,
  isMinimized,
  setIsMinimized,
  queueTime,
  onCancelQueue,
  criteria,
}) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Cycle status messages
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statusMessages.length);
      sounds.playRadarPing();
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentMessage = statusMessages[currentStatusIndex]
    .replace('{district}', criteria.district === 'Tất cả Quận' ? 'Hà Nội' : criteria.district)
    .replace('{field}', criteria.fieldType);

  // If minimized, render a fixed bottom bar like League of Legends / Steam client
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-gray-950/95 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl flex items-center gap-4 backdrop-blur-lg animate-slideUp">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Đang Tìm Đối Thủ</span>
            <span className="text-xs font-black text-emerald-400 font-mono">{formatTime(queueTime)}</span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-[200px] truncate">{currentMessage}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setIsMinimized(false);
            }}
            title="Mở rộng cửa sổ tìm trận"
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onCancelQueue}
            title="Hủy tìm trận"
            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Full Overlay Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gray-950 border border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(16,185,129,0.25)] overflow-hidden">
        {/* Futuristic glowing corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-emerald-400 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-emerald-400 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-emerald-400 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-emerald-400 rounded-br-3xl pointer-events-none" />

        {/* Top Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {criteria.mode === 'ranked' ? 'Đấu Xếp Hạng' : criteria.mode === 'stakes' ? 'Kèo Thách Đấu' : 'Giao Hữu Nhanh'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setIsMinimized(true);
              }}
              title="Thu nhỏ để lướt xem tính năng khác"
              className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onCancelQueue}
              title="Hủy tìm trận"
              className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-rose-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Radar Scanner Animation & Timer */}
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-2 border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] mb-6">
            {/* Concentric radar rings */}
            <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
            <div className="absolute inset-10 rounded-full border border-emerald-500/10" />

            {/* Sweep radar hand */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-full radar-spinner bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </div>

            {/* Pulsing center soccer ball */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg border border-emerald-400/50">
              <span className="text-3xl animate-bounce">⚽</span>
            </div>
          </div>

          {/* Time Counter */}
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              {formatTime(queueTime)}
            </div>
            <p className="text-xs text-gray-400">Thời gian ước tính: ~00:25</p>
          </div>

          {/* Realtime Scanning Status */}
          <div className="mt-6 px-4 py-3 rounded-2xl bg-gray-900/90 border border-gray-800 w-full flex items-center gap-3">
            <Search className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
            <p className="text-xs text-emerald-300 font-medium text-left truncate">{currentMessage}</p>
          </div>

          {/* Criteria Recap Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-400">
            <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              Sân {criteria.fieldType}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {criteria.district}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              {criteria.timeSlot.split(':')[0]}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              Fair-play 95%+
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <button
            onClick={() => {
              sounds.playClick();
              setIsMinimized(true);
            }}
            className="flex-1 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold transition-colors"
          >
            Thu nhỏ (Lướt xem BXH)
          </button>
          <button
            onClick={onCancelQueue}
            className="flex-1 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition-colors"
          >
            Hủy Tìm Trận
          </button>
        </div>
      </div>
    </div>
  );
};
