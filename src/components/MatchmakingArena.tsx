import React from 'react';
import {
  Swords,
  Flame,
  Zap,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Activity,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import type { MatchCriteria, MatchMode, FieldType, SplitCostType, PlayStyle, SoccerTeam } from '../types';
import { districtList, timeSlots } from '../data/mockData';
import { sounds } from '../utils/audio';

interface MatchmakingArenaProps {
  criteria: MatchCriteria;
  setCriteria: React.Dispatch<React.SetStateAction<MatchCriteria>>;
  onStartQueue: () => void;
  myTeam: SoccerTeam;
  activeOnlineTeamsCount: number;
}

export const MatchmakingArena: React.FC<MatchmakingArenaProps> = ({
  criteria,
  setCriteria,
  onStartQueue,
  myTeam,
  activeOnlineTeamsCount,
}) => {
  const handleModeChange = (mode: MatchMode) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, mode }));
  };

  const handleFieldTypeChange = (fieldType: FieldType) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, fieldType }));
  };

  const handleDistrictChange = (district: string) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, district }));
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, timeSlot }));
  };

  const handleSplitCostChange = (splitCost: SplitCostType) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, splitCost }));
  };

  const handlePlayStyleChange = (playStyle: PlayStyle) => {
    sounds.playClick();
    setCriteria((prev) => ({ ...prev, playStyle }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero HUD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-emerald-950/40 to-gray-900 border border-emerald-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hệ Thống Ghép Đội Thông Minh Elo-Match™</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white m-0">
              SẢNH TÌM ĐỐI THỦ
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Chọn chế độ thi đấu, thiết lập bộ tiêu chí sân bãi & kèo thi đấu. Hệ thống sẽ tự động ghép với đội bóng có trình độ ngang tầm, cùng khung giờ và vị trí gần bạn nhất!
            </p>
          </div>

          {/* Quick Active Pool Stat */}
          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto p-4 rounded-2xl bg-gray-950/80 border border-gray-800 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Đang tìm đối</span>
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-400">
              {activeOnlineTeamsCount} <span className="text-sm font-normal text-gray-400">Đội bóng</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. MATCH MODE SELECTOR (Like Game Queues) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2 m-0">
            <Swords className="w-5 h-5 text-emerald-400" />
            1. Chọn Chế Độ Thi Đấu
          </h2>
          <span className="text-xs text-gray-400">Chọn mục đích của trận đấu</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ranked Mode */}
          <div
            onClick={() => handleModeChange('ranked')}
            className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 group overflow-hidden ${
              criteria.mode === 'ranked'
                ? 'bg-gradient-to-b from-amber-950/40 via-gray-900 to-gray-900 border-amber-500 shadow-lg shadow-amber-500/10'
                : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
            }`}
          >
            {criteria.mode === 'ranked' && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-gray-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Đang Chọn
              </div>
            )}
            <div className="flex items-start gap-3">
              <div
                className={`p-3 rounded-xl ${
                  criteria.mode === 'ranked'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Đấu Xếp Hạng (Ranked)</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Ghép với đối thủ cùng bậc ELO (±100). Thắng cộng điểm rank, tích lũy huy hiệu & thăng hạng lên BXH khu vực.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
                  <span>⚡ Điểm ELO chuẩn</span>
                  <span>•</span>
                  <span>Trọng tài đề xuất</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Match */}
          <div
            onClick={() => handleModeChange('quick')}
            className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 group overflow-hidden ${
              criteria.mode === 'quick'
                ? 'bg-gradient-to-b from-emerald-950/40 via-gray-900 to-gray-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
            }`}
          >
            {criteria.mode === 'quick' && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-emerald-600 text-gray-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Đang Chọn
              </div>
            )}
            <div className="flex items-start gap-3">
              <div
                className={`p-3 rounded-xl ${
                  criteria.mode === 'quick'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Giao Hữu Nhanh</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Ưu tiên tìm đối nhanh nhất. Bỏ qua chênh lệch rank, tập trung vào vị trí sân gần và khung giờ thuận tiện nhất.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                  <span>⏱️ Thời gian chờ &lt; 30s</span>
                  <span>•</span>
                  <span>Giao lưu vui vẻ</span>
                </div>
              </div>
            </div>
          </div>

          {/* High Stakes / Kèo Thua Chịu */}
          <div
            onClick={() => handleModeChange('stakes')}
            className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 group overflow-hidden ${
              criteria.mode === 'stakes'
                ? 'bg-gradient-to-b from-rose-950/40 via-gray-900 to-gray-900 border-rose-500 shadow-lg shadow-rose-500/10'
                : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
            }`}
          >
            {criteria.mode === 'stakes' && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-rose-600 text-gray-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Đang Chọn
              </div>
            )}
            <div className="flex items-start gap-3">
              <div
                className={`p-3 rounded-xl ${
                  criteria.mode === 'stakes'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Kèo Thách Đấu (High Stakes)</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Dành cho các FC tự tin chiến thuật. Thua trả 100% tiền sân hoặc chầu nước. Kịch tính & cam go đến phút chót!
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-rose-400 font-semibold">
                  <span>🔥 Thua chịu sân 100%</span>
                  <span>•</span>
                  <span>Đòi hỏi uy tín &gt; 90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MATCH PREFERENCES GRID */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2 m-0">
          <Activity className="w-5 h-5 text-emerald-400" />
          2. Tiêu Chí Ghép Trận Chi Tiết
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Field Type Selector */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Thể Thức Sân
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800">
              {(['5', '7', '11'] as FieldType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleFieldTypeChange(type)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    criteria.fieldType === type
                      ? 'bg-emerald-500 text-gray-950 shadow-md font-black'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Sân {type}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              {criteria.fieldType === '7'
                ? '⭐ Chuẩn phong trào phổ biến nhất'
                : criteria.fieldType === '5'
                ? '⚡ Tốc độ cao, ban bật nhanh'
                : '🏆 Sân tiêu chuẩn chuyên nghiệp'}
            </p>
          </div>

          {/* District Selector */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Khu Vực (Hà Nội)
            </label>
            <select
              value={criteria.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-emerald-500"
            >
              {districtList.map((d) => (
                <option key={d} value={d} className="bg-gray-900 text-gray-200">
                  {d}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500">Hệ thống sẽ lọc sân bóng trung gian tiện cho 2 đội</p>
          </div>

          {/* Time Slot */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Khung Giờ Đá
            </label>
            <select
              value={criteria.timeSlot}
              onChange={(e) => handleTimeSlotChange(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-emerald-500"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="bg-gray-900 text-gray-200">
                  {slot}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500">Giờ bóng lăn mong muốn của đội bạn</p>
          </div>

          {/* Split Cost Type */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Quy Tắc Tiền Sân
            </label>
            <select
              value={criteria.splitCost}
              onChange={(e) => handleSplitCostChange(e.target.value as SplitCostType)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="50-50">50/50 (Cưa đôi sòng phẳng)</option>
              <option value="loser-pays">Thua chịu 100% (Thắng free sân)</option>
              <option value="water-only">Thua chịu nước ngọt / bia</option>
              <option value="free">Giao lưu miễn phí (Đã có bên bao)</option>
            </select>
            <p className="text-[11px] text-gray-500">Minh bạch chi phí trước khi vào trận</p>
          </div>
        </div>

        {/* Playstyle Selector */}
        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gray-800 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Phong Cách Chơi Cam Kết</h4>
              <p className="text-xs text-gray-400">Cam kết tinh thần thể thao văn minh</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'dưỡng-sinh', label: '🧘 Dưỡng Sinh (Không xoạc)', desc: 'Chơi bóng văn minh, thể dục nhẹ nhàng' },
              { id: 'cân-bằng', label: '⚖️ Cân Bằng (Vừa sức)', desc: 'Nhiệt tình cọ xát, tranh chấp vừa phải' },
              { id: 'máu-lửa', label: '🔥 Máu Lửa (Thử thách)', desc: 'Pressing cao độ, quyết liệt nhưng công bằng' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handlePlayStyleChange(style.id as PlayStyle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  criteria.playStyle === style.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500 font-bold'
                    : 'bg-gray-950 text-gray-400 border border-gray-800 hover:text-gray-200'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. YOUR SQUAD STATUS & THE BIG "FIND MATCH" BUTTON */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-lg">
              {myTeam.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">{myTeam.name}</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {myTeam.rank} ({myTeam.elo} ELO)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Đội trưởng: <strong className="text-gray-200">{myTeam.captainName}</strong> • {myTeam.players.length} cầu thủ đăng ký • Màu áo:{' '}
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 align-middle ml-1 mr-0.5" /> Đỏ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-xs uppercase text-gray-400 font-semibold">Tỷ lệ thắng</span>
              <span className="text-lg font-black text-emerald-400">
                {Math.round((myTeam.wins / (myTeam.wins + myTeam.losses + myTeam.draws)) * 100)}%
              </span>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div className="text-right">
              <span className="block text-xs uppercase text-gray-400 font-semibold">Fair-play</span>
              <span className="text-lg font-black text-emerald-400">{myTeam.fairPlayScore}/100</span>
            </div>
          </div>
        </div>

        {/* Big Launch Matchmaking Button */}
        <div className="flex flex-col items-center justify-center pt-2">
          <button
            onClick={onStartQueue}
            className="group relative w-full sm:w-auto min-w-[320px] px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-gray-950 font-black text-xl tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] flex items-center justify-center gap-3"
          >
            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Swords className="w-6 h-6 animate-bounce" />
            <span>TÌM ĐỐI THỦ NGAY</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-950/20 text-gray-950 font-bold ml-1">
              {criteria.mode === 'ranked' ? 'RANKED' : criteria.mode === 'stakes' ? 'KÈO GẮT' : 'QUICK'}
            </span>
          </button>
          <p className="mt-3 text-xs text-gray-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Thời gian ghép ước tính: <strong className="text-emerald-400">15 - 35 giây</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
