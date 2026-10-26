import React, { useState } from 'react';
import { Plus, Search, MapPin, Clock, DollarSign, Shield, ArrowRight, Zap } from 'lucide-react';
import type { CustomLobby, FieldType, SoccerTeam, PitchVenue } from '../types';
import { districtList } from '../data/mockData';
import { sounds } from '../utils/audio';

interface LobbyBrowserProps {
  lobbies: CustomLobby[];
  onJoinLobby: (lobby: CustomLobby) => void;
  onCreateLobby: (newLobby: Partial<CustomLobby>) => void;
  myTeam: SoccerTeam;
  availablePitches: PitchVenue[];
}

export const LobbyBrowser: React.FC<LobbyBrowserProps> = ({
  lobbies,
  onJoinLobby,
  onCreateLobby,
  myTeam,
  availablePitches,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả Quận');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating a lobby
  const [formTitle, setFormTitle] = useState('');
  const [formFieldType, setFormFieldType] = useState<FieldType>('7');
  const [formDistrict, setFormDistrict] = useState('Cầu Giấy');
  const [formPitchName, setFormPitchName] = useState(availablePitches[0]?.name || 'Sân PVV Trần Thái Tông');
  const [formTime, setFormTime] = useState('19:30 - 21:00');
  const [formSplit, setFormSplit] = useState<'50-50' | 'loser-pays' | 'water-only'>('50-50');
  const [formNote, setFormNote] = useState('');

  const filteredLobbies = lobbies.filter((lobby) => {
    const matchDistrict = selectedDistrict === 'Tất cả Quận' || lobby.district === selectedDistrict;
    const matchField = selectedField === 'all' || lobby.fieldType === selectedField;
    return matchDistrict && matchField;
  });

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playAccept();
    onCreateLobby({
      title: formTitle || `FC ${myTeam.name} tìm đối sân ${formFieldType}`,
      fieldType: formFieldType,
      district: formDistrict,
      pitchName: formPitchName,
      matchDate: 'Hôm nay',
      matchTime: formTime,
      splitCost: formSplit,
      playStyle: myTeam.playStyle,
      note: formNote || 'Giao lưu bóng đá phong trào văn minh, tôn trọng đối thủ.',
    });
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gray-900/80 border border-gray-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2 m-0">
            <Zap className="w-6 h-6 text-emerald-400" />
            DANH SÁCH KÈO CHỜ MỞ (CUSTOM LOBBIES)
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Các đội bóng đã đặt sân hoặc đang tìm đối thủ cụ thể. Bấm &quot;Vào Giao Lưu&quot; để chốt kèo ngay lập tức!
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            setIsCreateModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Kèo Tìm Đối Mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs">
        <div className="flex items-center gap-2 text-gray-400">
          <Search className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Lọc theo:</span>
        </div>

        {/* District Filter */}
        <select
          value={selectedDistrict}
          onChange={(e) => {
            sounds.playClick();
            setSelectedDistrict(e.target.value);
          }}
          className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5 text-gray-200 focus:outline-none focus:border-emerald-500"
        >
          {districtList.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Field Type Filter */}
        <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800">
          {['all', '5', '7', '11'].map((f) => (
            <button
              key={f}
              onClick={() => {
                sounds.playClick();
                setSelectedField(f);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                selectedField === f ? 'bg-emerald-500 text-gray-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Tất cả sân' : `Sân ${f}`}
            </button>
          ))}
        </div>

        <span className="ml-auto text-gray-500 text-[11px]">
          Tìm thấy <strong className="text-emerald-400">{filteredLobbies.length}</strong> kèo mở
        </span>
      </div>

      {/* Lobby Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="group rounded-3xl bg-gray-900/60 hover:bg-gray-900 border border-gray-800 hover:border-emerald-500/50 p-5 space-y-4 transition-all duration-200 shadow-lg"
          >
            {/* Top row: Host team & tag */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-teal-500/30 flex items-center justify-center text-2xl shadow-inner">
                  {lobby.hostTeam.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{lobby.hostTeam.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {lobby.hostTeam.rank}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    ELO: <strong className="text-emerald-400">{lobby.hostTeam.elo}</strong> • Fair-play:{' '}
                    <strong className="text-emerald-400">{lobby.hostTeam.fairPlayScore}%</strong>
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Sân {lobby.fieldType}
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="font-bold text-sm text-gray-100 group-hover:text-emerald-300 transition-colors">
                {lobby.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{lobby.note}</p>
            </div>

            {/* Meta Tags */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 pt-2 border-t border-gray-800/80">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{lobby.pitchName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lobby.matchTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-amber-300 font-semibold">
                  {lobby.splitCost === '50-50'
                    ? '50/50 Sân & Nước'
                    : lobby.splitCost === 'loser-pays'
                    ? 'Thua trả 100%'
                    : 'Thua nước ngọt'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="capitalize">{lobby.playStyle}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-gray-500">Đăng {lobby.createdAt}</span>
              <button
                onClick={() => {
                  sounds.playAccept();
                  onJoinLobby(lobby);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 hover:text-gray-950 font-bold text-xs flex items-center gap-1.5 transition-all duration-200"
              >
                <span>Vào Giao Lưu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Custom Lobby */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-gray-950 border border-emerald-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                ĐĂNG KÈO TÌM ĐỐI THỦ MỚI
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-bold mb-1">Tiêu đề kèo (hoặc lời nhắn):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: FC IT Cầu Giấy cần đối mềm sân 7 tối nay..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Thể thức sân:</label>
                  <select
                    value={formFieldType}
                    onChange={(e) => setFormFieldType(e.target.value as FieldType)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="5">Sân 5 người</option>
                    <option value="7">Sân 7 người</option>
                    <option value="11">Sân 11 người</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1">Khu vực Quận:</label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {districtList.filter((d) => d !== 'Tất cả Quận').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Sân bóng dự kiến:</label>
                  <input
                    type="text"
                    value={formPitchName}
                    onChange={(e) => setFormPitchName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1">Khung giờ đá:</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1">Kèo chi phí:</label>
                <select
                  value={formSplit}
                  onChange={(e) => setFormSplit(e.target.value as '50-50' | 'loser-pays' | 'water-only')}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="50-50">50/50 Cưa đôi sòng phẳng</option>
                  <option value="loser-pays">Thua chịu 100% chi phí</option>
                  <option value="water-only">Thua chịu nước ngọt / bia</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-1">Ghi chú thêm:</label>
                <textarea
                  rows={2}
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="Yêu cầu trình độ, lối chơi..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black"
                >
                  Đăng Kèo Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
