import React from 'react';
import { Shield, Award, AlertTriangle, CheckCircle, HeartHandshake, Scale } from 'lucide-react';

export const RulesAndFairplay: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>Luật Thi Đấu & Văn Hóa Sân Cỏ</span>
        </div>
        <h2 className="text-3xl font-black text-white m-0">HỆ THỐNG UY TÍN & LUẬT GHÉP TRẬN</h2>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
          Được thiết kế dựa trên cơ chế chống toxic và matchmaking của các game Esports hàng đầu thế giới, kết hợp với đặc thù bóng đá phong trào Việt Nam.
        </p>
      </div>

      {/* Grid: 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fair Play Score */}
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">1. Điểm Uy Tín (Fair-play Score)</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Mỗi FC khởi điểm với 100 điểm uy tín. Điểm uy tín phản ánh thái độ văn minh, đúng giờ và tôn trọng đối thủ.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Đến sân đúng giờ: <strong>+2 điểm</strong></span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Được đối thủ chấm 5 sao: <strong>+3 điểm</strong></span>
            </div>
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Bùng kèo trong vòng 2 giờ: <strong>-30 điểm & cấm tìm trận 48h</strong></span>
            </div>
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Va chạm bạo lực / thô bạo: <strong>-50 điểm</strong></span>
            </div>
          </div>
        </div>

        {/* ELO Matchmaking */}
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">2. Cơ Chế Bậc ELO Game Chuẩn</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Thuật toán tự động ghép các đội có độ chênh lệch ELO không quá 100 điểm, bảo đảm trận đấu cân tài cân sức nhất.
          </p>

          <div className="space-y-2 text-xs text-gray-300">
            <p>
              • <strong>Thắng đội ELO cao hơn:</strong> Được cộng thêm điểm thưởng (+25 đến +35 ELO).
            </p>
            <p>
              • <strong>Thắng đội ELO thấp hơn:</strong> Cộng điểm tiêu chuẩn (+15 đến +20 ELO).
            </p>
            <p>
              • <strong>Hòa:</strong> Đội ELO thấp hơn được cộng nhẹ điểm, đội ELO cao hơn bị trừ nhẹ.
            </p>
            <p>
              • <strong>Thăng hạng:</strong> Khi đạt mốc 1700 ELO sẽ vào chuỗi thăng hạng Bạch Kim!
            </p>
          </div>
        </div>

        {/* Anti-Clash & Transparent Split */}
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">3. Minh Bạch Chi Phí & Màu Áo</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Giải quyết triệt để 2 vấn đề nhức nhối nhất của bóng đá phong trào: trùng màu áo thi đấu và mập mờ tiền sân.
          </p>

          <div className="space-y-2 text-xs text-gray-300">
            <p>
              • <strong>Chống trùng áo:</strong> Hệ thống tự động so màu áo chính & áo phụ. Nếu trùng, đội khách tự động đổi sang áo phụ.
            </p>
            <p>
              • <strong>Kèo 50/50:</strong> Chi phí sân và nước được chia đôi minh bạch tại quầy thanh toán lễ tân.
            </p>
            <p>
              • <strong>Kèo Thua Chịu 100%:</strong> Đội thua có nghĩa vụ thanh toán toàn bộ hóa đơn tiền sân cho ban quản lý.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
