import React from 'react';
import { Trophy, Shield, Swords } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';
import { sounds } from '../utils/audio';

interface LeaderboardProps {
  onChallenge: (teamName: string) => void;
}

const rankTiers = [
  { name: 'Thách Đấu', elo: '2000+', color: 'from-amber-400 to-rose-500', icon: '👑' },
  { name: 'Cao Thủ', elo: '1900 - 1999', color: 'from-purple-400 to-indigo-500', icon: '⚔️' },
  { name: 'Kim Cương', elo: '1800 - 1899', color: 'from-cyan-400 to-blue-500', icon: '💎' },
  { name: 'Bạch Kim', elo: '1700 - 1799', color: 'from-emerald-400 to-teal-500', icon: '🛡️' },
  { name: 'Vàng (Bạn)', elo: '1600 - 1699', color: 'from-amber-300 to-yellow-500', icon: '🥇' },
  { name: 'Bạc', elo: '1400 - 1599', color: 'from-gray-300 to-gray-400', icon: '🥈' },
  { name: 'Đồng', elo: '< 1400', color: 'from-amber-700 to-amber-900', icon: '🥉' },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ onChallenge }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-gray-950 via-amber-950/20 to-gray-950 border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Mùa Giải Xếp Hạng 2026 - Giai Đoạn 1</span>
          </div>
          <h2 className="text-3xl font-black text-white m-0">BẢNG XẾP HẠNG FC KHU VỰC</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Điểm ELO được cập nhật tự động sau mỗi trận đấu chính thức. Top 3 đội dẫn đầu cuối mùa sẽ nhận Cúp Vàng và tài trợ 100% tiền sân trong giải vô địch!
          </p>
        </div>

        {/* Tier Badges Mini Row */}
        <div className="flex items-center gap-2 overflow-x-auto p-2 bg-gray-900/80 rounded-2xl border border-gray-800">
          {rankTiers.map((tier) => (
            <div key={tier.name} className="flex flex-col items-center px-2 py-1 text-center min-w-[70px]">
              <span className="text-xl">{tier.icon}</span>
              <span className="text-[10px] font-bold text-gray-200 mt-0.5">{tier.name}</span>
              <span className="text-[9px] text-gray-500 font-mono">{tier.elo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl bg-gray-900/60 border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase font-black tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-4 text-center">Hạng</th>
                <th className="py-4 px-4">Đội Bóng (FC)</th>
                <th className="py-4 px-4">Bậc Rank</th>
                <th className="py-4 px-4 text-center">Điểm ELO</th>
                <th className="py-4 px-4 text-center">Trận Thắng</th>
                <th className="py-4 px-4 text-center">Tỷ Lệ Thắng</th>
                <th className="py-4 px-4 text-center">Fair-play</th>
                <th className="py-4 px-4">Danh Hiệu</th>
                <th className="py-4 px-4 text-right">Thách Đấu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {mockLeaderboard.map((team) => {
                const isMe = team.name.includes('(Bạn)');
                return (
                  <tr
                    key={team.rank}
                    className={`transition-colors ${
                      isMe
                        ? 'bg-amber-500/10 hover:bg-amber-500/15 font-semibold border-l-4 border-amber-500'
                        : 'hover:bg-gray-800/40'
                    }`}
                  >
                    {/* Rank Number */}
                    <td className="py-4 px-4 text-center">
                      {team.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-gray-950 font-black shadow-lg shadow-amber-400/30">
                          1
                        </span>
                      ) : team.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 text-gray-950 font-black shadow-lg shadow-gray-300/30">
                          2
                        </span>
                      ) : team.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black shadow-lg shadow-amber-700/30">
                          3
                        </span>
                      ) : (
                        <span className="font-bold text-gray-400 font-mono">#{team.rank}</span>
                      )}
                    </td>

                    {/* Team Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{team.name}</span>
                        {isMe && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Bạn
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Rank Tier */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-gray-950 border border-gray-800 text-amber-300">
                        {team.tier}
                      </span>
                    </td>

                    {/* ELO */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-400 text-sm">
                      {team.elo}
                    </td>

                    {/* Wins */}
                    <td className="py-4 px-4 text-center font-mono text-gray-300 font-bold">
                      {team.wins} trận
                    </td>

                    {/* Win rate */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-emerald-400 font-bold">{team.winRate}</span>
                    </td>

                    {/* Fair play */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-gray-300">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        {team.fairPlay}%
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-4 px-4">
                      <span className="text-xs text-gray-300 bg-gray-950 px-2 py-1 rounded-lg border border-gray-800">
                        {team.badge}
                      </span>
                    </td>

                    {/* Challenge action */}
                    <td className="py-4 px-4 text-right">
                      {!isMe && (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onChallenge(team.name);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-emerald-500/20 border border-gray-800 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-300 font-bold text-xs flex items-center gap-1.5 ml-auto transition-colors"
                        >
                          <Swords className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Gạ Kèo</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
