import React, { useState } from 'react';
import { Users, Plus, Shirt, Phone, MapPin, Trash2 } from 'lucide-react';
import type { SoccerTeam, Player } from '../types';
import { sounds } from '../utils/audio';

interface TeamManagementProps {
  myTeam: SoccerTeam;
  setMyTeam: React.Dispatch<React.SetStateAction<SoccerTeam>>;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({ myTeam, setMyTeam }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState<number>(9);
  const [newPlayerPos, setNewPlayerPos] = useState<'GK' | 'DF' | 'MF' | 'FW'>('FW');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    sounds.playAccept();
    const newP: Player = {
      id: `p-${Date.now()}`,
      name: newPlayerName.trim(),
      number: Number(newPlayerNumber),
      position: newPlayerPos,
      rating: Math.floor(Math.random() * 10) + 80,
    };

    setMyTeam((prev) => ({
      ...prev,
      players: [...prev.players, newP],
    }));

    setNewPlayerName('');
    setShowAddForm(false);
  };

  const handleRemovePlayer = (id: string) => {
    sounds.playDecline();
    setMyTeam((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Team Profile Overview Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border-2 border-amber-500/40 flex items-center justify-center text-5xl shadow-xl">
              {myTeam.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white m-0">{myTeam.name}</h2>
                <span className="px-2 py-0.5 rounded text-xs font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {myTeam.rank}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-xl">{myTeam.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center">
            <div className="p-3 rounded-2xl bg-gray-950 border border-gray-800">
              <span className="text-[10px] uppercase text-gray-400 font-bold block">Bậc ELO</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{myTeam.elo}</span>
            </div>
            <div className="p-3 rounded-2xl bg-gray-950 border border-gray-800">
              <span className="text-[10px] uppercase text-gray-400 font-bold block">Thành Tích</span>
              <span className="text-xl font-black text-white font-mono">
                {myTeam.wins}W - {myTeam.losses}L
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-gray-950 border border-gray-800">
              <span className="text-[10px] uppercase text-gray-400 font-bold block">Uy Tín</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{myTeam.fairPlayScore}%</span>
            </div>
          </div>
        </div>

        {/* Team Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs text-gray-300">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950 border border-gray-800">
            <Users className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-gray-500 block">Đội trưởng:</span>
              <strong className="text-white">{myTeam.captainName}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950 border border-gray-800">
            <Phone className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-gray-500 block">SĐT Zalo liên hệ:</span>
              <strong className="text-white font-mono">{myTeam.captainPhone}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950 border border-gray-800">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-gray-500 block">Khu vực đăng ký:</span>
              <strong className="text-white">{myTeam.district}, {myTeam.city}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950 border border-gray-800">
            <Shirt className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-gray-500 block">Màu áo thi đấu:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 border border-white/20" /> Đỏ (Chính)
                </span>
                <span className="flex items-center gap-1 font-semibold text-gray-300">
                  <span className="inline-block w-3 h-3 rounded-full bg-white border border-gray-400" /> Trắng (Phụ)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster / Lineup Management */}
      <div className="p-6 md:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              DANH SÁCH CẦU THỦ ({myTeam.players.length} người)
            </h3>
            <p className="text-xs text-gray-400">Đội hình sẵn sàng triệu tập thi đấu các giải và ghép trận</p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowAddForm(!showAddForm);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Cầu Thủ</span>
          </button>
        </div>

        {/* Add Player Inline Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddPlayer}
            className="p-4 rounded-2xl bg-gray-950 border border-emerald-500/30 flex flex-wrap items-center gap-3 text-xs animate-fadeIn"
          >
            <input
              type="text"
              required
              placeholder="Tên cầu thủ (Ví dụ: Tuấn Khỉ)"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="flex-1 min-w-[180px] bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Số áo"
              value={newPlayerNumber}
              onChange={(e) => setNewPlayerNumber(Number(e.target.value))}
              className="w-20 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
            <select
              value={newPlayerPos}
              onChange={(e) => setNewPlayerPos(e.target.value as 'GK' | 'DF' | 'MF' | 'FW')}
              className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="FW">Tiền đạo (FW)</option>
              <option value="MF">Tiền vệ (MF)</option>
              <option value="DF">Hậu vệ (DF)</option>
              <option value="GK">Thủ môn (GK)</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black"
            >
              Lưu
            </button>
          </form>
        )}

        {/* Players Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {myTeam.players.map((player) => (
            <div
              key={player.id}
              className="p-3.5 rounded-2xl bg-gray-950 border border-gray-800 hover:border-emerald-500/40 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center font-black text-emerald-400 font-mono text-sm">
                  #{player.number}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">{player.name}</span>
                    {player.isCaptain && (
                      <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-black">
                        C
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    Vị trí: <strong className="text-gray-200">{player.position}</strong> • Chỉ số:{' '}
                    <strong className="text-emerald-400">{player.rating}</strong>
                  </span>
                </div>
              </div>

              {!player.isCaptain && (
                <button
                  onClick={() => handleRemovePlayer(player.id)}
                  title="Xóa cầu thủ"
                  className="p-1 text-gray-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
