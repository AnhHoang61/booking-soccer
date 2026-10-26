import React from 'react';
import { X, Calendar, MapPin, Phone, QrCode, Share2, CheckCircle2 } from 'lucide-react';
import type { ActiveMatch } from '../types';
import { sounds } from '../utils/audio';

interface MatchTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: ActiveMatch;
}

export const MatchTicketModal: React.FC<MatchTicketModalProps> = ({ isOpen, onClose, match }) => {
  if (!isOpen) return null;

  const handleShareZalo = () => {
    sounds.playClick();
    const text = `⚽ KÈO BÓNG ĐÁ ĐÃ CHỐT!\nTrận: ${match.teamA.name} vs ${match.teamB.name}\nGiờ đá: ${match.matchTime}\nĐịa điểm: ${match.pitch.name} - ${match.pitch.address}\nMàu áo: Đội mình mặc áo ĐỎ nhé anh em!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Đã sao chép thông tin kèo bóng đá vào bộ nhớ tạm! Bạn có thể dán vào nhóm Zalo đội bóng.');
    }
  };

  const handleAddToCalendar = () => {
    sounds.playClick();
    const title = encodeURIComponent(`Đá bóng: ${match.teamA.name} vs ${match.teamB.name}`);
    const details = encodeURIComponent(
      `Trận giao hữu tại ${match.pitch.name} (${match.pitch.address}). Hotline sân: ${match.pitch.phone}.`
    );
    const location = encodeURIComponent(`${match.pitch.name}, ${match.pitch.address}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-gray-950 border border-emerald-500/40 p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ticket Header */}
        <div className="text-center pb-4 border-b border-gray-800 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>VÉ XÁC NHẬN SÂN THÀNH CÔNG</span>
          </div>
          <h3 className="text-2xl font-black text-white">MATCH TICKET</h3>
          <p className="text-xs text-gray-400 font-mono">MÃ ĐẶT: #{match.id.slice(-6).toUpperCase()}</p>
        </div>

        {/* Versus Row */}
        <div className="my-5 p-3 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-around text-center">
          <div>
            <div className="text-2xl">{match.teamA.logo}</div>
            <span className="text-xs font-black text-white block mt-1">{match.teamA.name}</span>
            <span className="text-[10px] text-red-400 font-bold">Áo Đỏ</span>
          </div>
          <div className="font-black text-emerald-400 text-sm">VS</div>
          <div>
            <div className="text-2xl">{match.teamB.logo}</div>
            <span className="text-xs font-black text-white block mt-1">{match.teamB.name}</span>
            <span className="text-[10px] text-blue-400 font-bold">Áo Xanh</span>
          </div>
        </div>

        {/* Match Info List */}
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-2.5 text-gray-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">{match.pitch.name}</strong>
              <span className="text-[11px] text-gray-400">{match.pitch.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-300">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Thời gian: <strong className="text-white">{match.matchTime}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-300">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Hotline ban quản lý sân: <strong className="text-emerald-400 font-mono">{match.pitch.phone}</strong></span>
          </div>
        </div>

        {/* Fake QR Code Representation for Check-in */}
        <div className="my-6 p-4 rounded-2xl bg-white text-gray-950 flex flex-col items-center justify-center text-center shadow-inner">
          <div className="w-32 h-32 flex items-center justify-center border-4 border-gray-900 rounded-xl p-2 bg-white">
            <QrCode className="w-full h-full text-gray-900" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mt-2">
            Quét mã tại quầy lễ tân để nhận sân & bóng
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleShareZalo}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Sao chép thông tin gửi nhóm Zalo FC</span>
          </button>

          <button
            onClick={handleAddToCalendar}
            className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Lưu vào Google Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
