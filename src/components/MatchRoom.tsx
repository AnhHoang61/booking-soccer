import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  Send,
  CheckCircle2,
  ArrowLeft,
  Navigation,
  MessageSquare,
  Ticket,
} from 'lucide-react';
import type { ActiveMatch, MatchChat } from '../types';
import { sounds } from '../utils/audio';

interface MatchRoomProps {
  match: ActiveMatch;
  onExitRoom: () => void;
  onOpenTicket: () => void;
}

const quickMessages = [
  'Chào đội bạn! Tối nay giao lưu vui vẻ nhé!',
  'Bên mình mặc áo ĐỎ, bên bạn mặc áo XANH nhé để tránh trùng!',
  'Hẹn anh em có mặt trước 15 phút để khởi động và chia đội.',
  'Kèo cưa đôi 50/50 tiền sân & nước nhé!',
  'Bên mình đá dưỡng sinh là chính, không xoạc nhé anh em.',
];

export const MatchRoom: React.FC<MatchRoomProps> = ({ match, onExitRoom, onOpenTicket }) => {
  const [chats, setChats] = useState<MatchChat[]>(match.chats || []);
  const [inputText, setInputText] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(match.confirmedTeamA);
  const [opponentConfirmed, setOpponentConfirmed] = useState(match.confirmedTeamB);
  const [isLocked, setIsLocked] = useState(match.status === 'locked');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // Initial welcome chat if empty
  useEffect(() => {
    if (chats.length === 0) {
      const welcomeChat: MatchChat = {
        id: 'c-sys-1',
        senderTeamId: 'system',
        senderName: 'Hệ Thống Ghép Trận',
        message: `Trận đấu #${match.id.slice(-6).toUpperCase()} đã ghép thành công! Hai đội trưởng vui lòng thảo luận màu áo và bấm Chốt Kèo.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isSystem: true,
      };
      const initialOppChat: MatchChat = {
        id: 'c-opp-1',
        senderTeamId: match.teamB.id,
        senderName: match.teamB.captainName,
        message: `Chào FC ${match.teamA.name}! Đội mình ${match.teamB.name} rất vui được giao lưu cùng các bạn hôm nay.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setChats([welcomeChat, initialOppChat]);
    }
  }, [chats.length, match]);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText.trim();
    if (!content) return;

    sounds.playClick();
    const newChat: MatchChat = {
      id: `c-user-${Date.now()}`,
      senderTeamId: match.teamA.id,
      senderName: match.teamA.captainName,
      message: content,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setChats((prev) => [...prev, newChat]);
    setInputText('');

    // Opponent automated response simulation
    setTimeout(() => {
      let reply = 'Ok nhất trí đội bạn nhé!';
      if (content.includes('áo') || content.includes('ĐỎ') || content.includes('màu')) {
        reply = 'Ok, bên mình chốt mặc áo XANH DƯƠNG nhé, phân biệt rất rõ ràng.';
      } else if (content.includes('dưỡng sinh') || content.includes('xoạc')) {
        reply = 'Chuẩn luôn bạn, bên mình cũng toàn anh em đi làm, đá thể thao ra mồ hôi là chính!';
      } else if (content.includes('tiền') || content.includes('50/50')) {
        reply = 'Nhất trí 50/50 tiền sân nước sòng phẳng, đá xong tính bill tại quầy lễ tân sân nhé!';
      } else if (content.includes('trước 15 phút') || content.includes('khởi động')) {
        reply = 'Đội mình sẽ có mặt lúc 19h15 để thay đồ và làm nóng.';
      }

      const oppReply: MatchChat = {
        id: `c-opp-${Date.now()}`,
        senderTeamId: match.teamB.id,
        senderName: match.teamB.captainName,
        message: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setChats((prev) => [...prev, oppReply]);
      sounds.playClick();
    }, 1800);
  };

  const handleConfirmMatch = () => {
    sounds.playAccept();
    setHasConfirmed(true);

    // Opponent confirms shortly after
    setTimeout(() => {
      setOpponentConfirmed(true);
      setIsLocked(true);
      sounds.playMatchFound();

      const lockedChat: MatchChat = {
        id: `c-sys-${Date.now()}`,
        senderTeamId: 'system',
        senderName: 'Hệ Thống',
        message: '🎉 CẢ 2 ĐỘI TRƯỞNG ĐÃ XÁC NHẬN CHỐT KÈO THÀNH CÔNG! Vé trận đấu đã được tạo.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isSystem: true,
      };
      setChats((prev) => [...prev, lockedChat]);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header / Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExitRoom}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Rời Sảnh Trận Đấu</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Mã trận đấu:</span>
          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-emerald-400">
            #{match.id.slice(-6).toUpperCase()}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
              isLocked
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
            }`}
          >
            {isLocked ? 'ĐÃ CHỐT KÈO' : 'ĐANG ĐÀM PHÁN'}
          </span>
        </div>
      </div>

      {/* 1. EPIC VERSUS HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border border-gray-800 shadow-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
          {/* Team A (My Team) */}
          <div className="md:col-span-5 flex items-center md:justify-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/20 border-2 border-red-500/40 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shrink-0">
              {match.teamA.logo}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">{match.teamA.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {match.teamA.rank}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Đội trưởng: <strong className="text-gray-200">{match.teamA.captainName}</strong>
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                <span>
                  ELO: <strong className="text-emerald-400 font-bold">{match.teamA.elo}</strong>
                </span>
                <span>•</span>
                <span>
                  Uy tín: <strong className="text-emerald-400 font-bold">{match.teamA.fairPlayScore}%</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Áo:
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 border border-white/20" />
                  Đỏ
                </span>
              </div>
            </div>
          </div>

          {/* Versus Center Badge */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-gray-950 font-black text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-300">
              VS
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">Sân {match.fieldType}</span>
          </div>

          {/* Team B (Opponent Team) */}
          <div className="md:col-span-5 flex items-center md:justify-end gap-4 md:text-right">
            <div className="space-y-1 order-2 md:order-1">
              <div className="flex items-center md:justify-end gap-2">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 order-2 md:order-1">
                  {match.teamB.rank}
                </span>
                <span className="text-xl sm:text-2xl font-black text-white order-1 md:order-2">{match.teamB.name}</span>
              </div>
              <p className="text-xs text-gray-400">
                Đội trưởng: <strong className="text-gray-200">{match.teamB.captainName}</strong>
              </p>
              <div className="flex items-center md:justify-end gap-3 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  Áo:
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 border border-white/20" />
                  Xanh
                </span>
                <span>•</span>
                <span>
                  Uy tín: <strong className="text-emerald-400 font-bold">{match.teamB.fairPlayScore}%</strong>
                </span>
                <span>•</span>
                <span>
                  ELO: <strong className="text-emerald-400 font-bold">{match.teamB.elo}</strong>
                </span>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shrink-0 order-1 md:order-2">
              {match.teamB.logo}
            </div>
          </div>
        </div>

        {/* Color Clash Detector Alert */}
        <div className="mt-6 pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Màu áo thi đấu không trùng lặp (Đỏ vs Xanh Dương). Đã tối ưu nhận diện trên sân!</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zalo Đội Trưởng Đối Thủ: </span>
            <strong className="text-white font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
              {match.teamB.captainPhone}
            </strong>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: PITCH VENUE DETAILS + CHAT BOX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pitch Venue & Booking Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-gray-900/80 border border-gray-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Sân Bóng Trung Gian Được Chọn
            </h3>

            {/* Pitch Card */}
            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950">
              <img
                src={match.pitch.image}
                alt={match.pitch.name}
                className="w-full h-36 object-cover brightness-90 hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{match.pitch.name}</h4>
                  <span className="text-xs text-amber-400 font-bold">⭐ {match.pitch.rating}/5.0</span>
                </div>
                <p className="text-xs text-gray-400 flex items-start gap-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  {match.pitch.address}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-800">
                  <span className="text-gray-400">Giá thuê sân:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {match.pitch.pricePerHour.toLocaleString('vi-VN')} đ / trận (90p)
                  </span>
                </div>
              </div>
            </div>

            {/* Match Condition Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Ngày & Giờ đá:
                </span>
                <span className="font-bold text-white">{match.matchTime}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Kèo chia tiền:
                </span>
                <span className="font-bold text-amber-300">
                  {match.splitCost === '50-50'
                    ? '50/50 (Mỗi đội 50% tiền sân & nước)'
                    : match.splitCost === 'loser-pays'
                    ? 'Thua chịu 100% chi phí'
                    : 'Thua chịu tiền nước'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Trọng tài:
                </span>
                <span className="font-semibold text-gray-300">Có trọng tài sân bắt chính (Đã bao gồm)</span>
              </div>
            </div>

            {/* Confirmation Lock Buttons */}
            <div className="pt-2 space-y-3">
              {!isLocked ? (
                <button
                  onClick={handleConfirmMatch}
                  disabled={hasConfirmed}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    hasConfirmed
                      ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-500/40 cursor-default'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 shadow-lg shadow-emerald-500/20 active:scale-95'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{hasConfirmed ? 'BẠN ĐÃ CHỐT (ĐANG CHỜ ĐỐI THỦ)' : 'XÁC NHẬN CHỐT KÈO TRẬN ĐẤU'}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenTicket}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>XEM & TẢI VÉ TRẬN ĐẤU (QR CODE)</span>
                </button>
              )}

              <div className="flex items-center justify-around text-[11px] text-gray-400">
                <span>
                  Bạn:{' '}
                  <strong className={hasConfirmed ? 'text-emerald-400' : 'text-amber-400'}>
                    {hasConfirmed ? 'Đã Chốt' : 'Chưa Chốt'}
                  </strong>
                </span>
                <span>•</span>
                <span>
                  Đối thủ:{' '}
                  <strong className={opponentConfirmed ? 'text-emerald-400' : 'text-amber-400'}>
                    {opponentConfirmed ? 'Đã Chốt' : 'Chưa Chốt'}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Chat between Captains (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-3xl bg-gray-900/80 border border-gray-800 overflow-hidden h-[540px]">
          {/* Chat Header */}
          <div className="p-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Kênh Trao Đổi Đội Trưởng</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] text-gray-400">Trực tuyến 2/2 Đội Trưởng</span>
          </div>

          {/* Chat Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-950/40">
            {chats.map((chat) => {
              if (chat.isSystem) {
                return (
                  <div key={chat.id} className="text-center my-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                      {chat.message}
                    </span>
                  </div>
                );
              }

              const isMe = chat.senderTeamId === match.teamA.id;
              return (
                <div key={chat.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-500 mb-0.5 px-1">{chat.senderName}</span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700/60'
                    }`}
                  >
                    {chat.message}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-0.5 px-1">{chat.timestamp}</span>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Chat Bubble Prompts */}
          <div className="p-2 bg-gray-950/80 border-t border-gray-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickMessages.map((quick, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(quick)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-emerald-400 transition-colors shrink-0"
              >
                💬 {quick}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-gray-950 border-t border-gray-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Nhắn tin cho đội trưởng đối thủ..."
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
