import { useState, useEffect, useRef } from 'react';
import './App.css';
import type {
  SoccerTeam,
  MatchCriteria,
  CustomLobby,
  ActiveMatch,
  PitchVenue,
} from './types';
import {
  currentUserTeam,
  mockOpponentTeams,
  mockPitches,
  mockCustomLobbies,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { MatchmakingArena } from './components/MatchmakingArena';
import { QueueModal } from './components/QueueModal';
import { MatchFoundModal } from './components/MatchFoundModal';
import { MatchRoom } from './components/MatchRoom';
import { MatchTicketModal } from './components/MatchTicketModal';
import { LobbyBrowser } from './components/LobbyBrowser';
import { Leaderboard } from './components/Leaderboard';
import { TeamManagement } from './components/TeamManagement';
import { RulesAndFairplay } from './components/RulesAndFairplay';
import { sounds } from './utils/audio';

export function App() {
  // Navigation & tabs
  const [currentTab, setCurrentTab] = useState<
    'matchmaking' | 'lobbies' | 'leaderboard' | 'team' | 'rules' | 'match-room'
  >('matchmaking');

  // User team state
  const [myTeam, setMyTeam] = useState<SoccerTeam>(currentUserTeam);

  // Matchmaking criteria
  const [criteria, setCriteria] = useState<MatchCriteria>({
    mode: 'ranked',
    fieldType: '7',
    district: 'Cầu Giấy',
    timeSlot: 'Tối nay: 19:30 - 21:00',
    splitCost: '50-50',
    playStyle: 'cân-bằng',
  });

  // Custom lobbies list
  const [lobbies, setLobbies] = useState<CustomLobby[]>(mockCustomLobbies);

  // Active online teams simulation counter
  const [activeOnlineTeams, setActiveOnlineTeams] = useState(48);

  // Queue state
  const [isInQueue, setIsInQueue] = useState(false);
  const [isQueueMinimized, setIsQueueMinimized] = useState(false);
  const [queueTime, setQueueTime] = useState(0);

  // Match Found state
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [matchedOpponent, setMatchedOpponent] = useState<SoccerTeam | null>(null);
  const [proposedPitch, setProposedPitch] = useState<PitchVenue | null>(null);

  // Active Match in Room
  const [activeMatch, setActiveMatch] = useState<ActiveMatch | null>(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  // Audio mute
  const [isMuted, setIsMuted] = useState(false);

  // Ref for queue timer interval
  const queueIntervalRef = useRef<number | null>(null);

  // Random fluctuation of online teams
  useEffect(() => {
    const poolInterval = setInterval(() => {
      setActiveOnlineTeams((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(30, Math.min(65, prev + delta));
      });
    }, 8000);

    return () => clearInterval(poolInterval);
  }, []);

  // Queue Timer & Matchmaking simulation trigger
  useEffect(() => {
    if (isInQueue) {
      setQueueTime(0);
      queueIntervalRef.current = window.setInterval(() => {
        setQueueTime((prev) => {
          const nextTime = prev + 1;

          // Simulated match found between 5 and 7 seconds
          if (nextTime === 6) {
            triggerMatchFound();
          }

          return nextTime;
        });
      }, 1000);
    } else {
      if (queueIntervalRef.current) {
        clearInterval(queueIntervalRef.current);
        queueIntervalRef.current = null;
      }
    }

    return () => {
      if (queueIntervalRef.current) {
        clearInterval(queueIntervalRef.current);
      }
    };
  }, [isInQueue]);

  // Trigger Match Found
  const triggerMatchFound = () => {
    if (queueIntervalRef.current) {
      clearInterval(queueIntervalRef.current);
      queueIntervalRef.current = null;
    }

    // Pick an opponent (preferably matching criteria or random)
    let candidate = mockOpponentTeams.find(
      (t) => t.district === criteria.district || t.preferredFieldType === criteria.fieldType
    );
    if (!candidate) {
      candidate = mockOpponentTeams[0];
    }

    // Pick a pitch (matching district if possible)
    let pitch = mockPitches.find((p) => p.district === criteria.district);
    if (!pitch) {
      pitch = mockPitches[0];
    }

    setMatchedOpponent(candidate);
    setProposedPitch(pitch);
    setIsMatchFound(true);
    setIsQueueMinimized(false); // bring modal forward
  };

  // Start finding match
  const handleStartQueue = () => {
    sounds.playAccept();
    setIsInQueue(true);
    setIsQueueMinimized(false);
  };

  // Cancel finding match
  const handleCancelQueue = () => {
    sounds.playDecline();
    setIsInQueue(false);
    setIsQueueMinimized(false);
    setQueueTime(0);
  };

  // Accept found match
  const handleAcceptMatch = () => {
    if (!matchedOpponent || !proposedPitch) return;

    const newMatch: ActiveMatch = {
      id: `m-${Date.now()}`,
      mode: criteria.mode,
      teamA: myTeam,
      teamB: matchedOpponent,
      pitch: proposedPitch,
      matchTime: criteria.timeSlot,
      matchDate: 'Hôm nay',
      fieldType: criteria.fieldType,
      splitCost: criteria.splitCost,
      teamAJersey: myTeam.primaryJerseyColor,
      teamBJersey: matchedOpponent.primaryJerseyColor,
      confirmedTeamA: false,
      confirmedTeamB: false,
      status: 'negotiating',
      chats: [],
    };

    setActiveMatch(newMatch);
    setIsInQueue(false);
    setIsMatchFound(false);
    setCurrentTab('match-room');
  };

  // Decline found match
  const handleDeclineMatch = () => {
    sounds.playDecline();
    setIsMatchFound(false);
    setIsInQueue(false);
    setMatchedOpponent(null);
  };

  // Join a custom lobby directly
  const handleJoinLobby = (lobby: CustomLobby) => {
    let pitch = mockPitches.find((p) => p.name === lobby.pitchName);
    if (!pitch) {
      pitch = mockPitches[0];
    }

    const newMatch: ActiveMatch = {
      id: `lobby-match-${Date.now()}`,
      mode: 'quick',
      teamA: myTeam,
      teamB: lobby.hostTeam,
      pitch,
      matchTime: lobby.matchTime,
      matchDate: lobby.matchDate,
      fieldType: lobby.fieldType,
      splitCost: lobby.splitCost,
      teamAJersey: myTeam.primaryJerseyColor,
      teamBJersey: lobby.hostTeam.primaryJerseyColor,
      confirmedTeamA: false,
      confirmedTeamB: false,
      status: 'negotiating',
      chats: [],
    };

    setActiveMatch(newMatch);
    setCurrentTab('match-room');
  };

  // Create a new lobby
  const handleCreateLobby = (newLobbyData: Partial<CustomLobby>) => {
    const fullLobby: CustomLobby = {
      id: `lobby-${Date.now()}`,
      title: newLobbyData.title || `FC ${myTeam.name} tìm đối`,
      hostTeam: myTeam,
      fieldType: newLobbyData.fieldType || '7',
      district: newLobbyData.district || myTeam.district,
      pitchName: newLobbyData.pitchName || myTeam.homePitch || 'Sân PVV Cầu Giấy',
      matchDate: newLobbyData.matchDate || 'Hôm nay',
      matchTime: newLobbyData.matchTime || '19:30 - 21:00',
      splitCost: newLobbyData.splitCost || '50-50',
      playStyle: newLobbyData.playStyle || myTeam.playStyle,
      note: newLobbyData.note || 'Cần đối mềm giao lưu vui vẻ.',
      status: 'open',
      createdAt: 'Vừa xong',
    };

    setLobbies((prev) => [fullLobby, ...prev]);
  };

  // Challenge a team directly from Leaderboard
  const handleChallengeTeam = (teamName: string) => {
    let opp = mockOpponentTeams.find((t) => t.name === teamName);
    if (!opp) {
      opp = {
        ...mockOpponentTeams[0],
        name: teamName,
      };
    }

    const newMatch: ActiveMatch = {
      id: `chall-${Date.now()}`,
      mode: 'ranked',
      teamA: myTeam,
      teamB: opp,
      pitch: mockPitches[0],
      matchTime: 'Tối nay: 20:00 - 21:30',
      matchDate: 'Hôm nay',
      fieldType: '7',
      splitCost: '50-50',
      teamAJersey: myTeam.primaryJerseyColor,
      teamBJersey: opp.primaryJerseyColor,
      confirmedTeamA: false,
      confirmedTeamB: false,
      status: 'negotiating',
      chats: [],
    };

    setActiveMatch(newMatch);
    setCurrentTab('match-room');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-gray-950">
      {/* Top Gaming HUD Navbar */}
      <Navbar
        currentTab={currentTab === 'match-room' ? 'matchmaking' : currentTab}
        setCurrentTab={setCurrentTab}
        myTeam={myTeam}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isInQueue={isInQueue}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'matchmaking' && (
          <MatchmakingArena
            criteria={criteria}
            setCriteria={setCriteria}
            onStartQueue={handleStartQueue}
            myTeam={myTeam}
            activeOnlineTeamsCount={activeOnlineTeams}
          />
        )}

        {currentTab === 'match-room' && activeMatch && (
          <MatchRoom
            match={activeMatch}
            onExitRoom={() => {
              sounds.playClick();
              setCurrentTab('matchmaking');
            }}
            onOpenTicket={() => setIsTicketOpen(true)}
          />
        )}

        {currentTab === 'lobbies' && (
          <LobbyBrowser
            lobbies={lobbies}
            onJoinLobby={handleJoinLobby}
            onCreateLobby={handleCreateLobby}
            myTeam={myTeam}
            availablePitches={mockPitches}
          />
        )}

        {currentTab === 'leaderboard' && (
          <Leaderboard onChallenge={handleChallengeTeam} />
        )}

        {currentTab === 'team' && (
          <TeamManagement myTeam={myTeam} setMyTeam={setMyTeam} />
        )}

        {currentTab === 'rules' && <RulesAndFairplay />}
      </main>

      {/* Queue Overlay or Floating Bottom Bar */}
      <QueueModal
        isOpen={isInQueue && !isMatchFound}
        isMinimized={isQueueMinimized}
        setIsMinimized={setIsQueueMinimized}
        queueTime={queueTime}
        onCancelQueue={handleCancelQueue}
        criteria={criteria}
      />

      {/* "MATCH FOUND" 15-second Accept Modal */}
      {matchedOpponent && proposedPitch && (
        <MatchFoundModal
          isOpen={isMatchFound}
          myTeam={myTeam}
          opponentTeam={matchedOpponent}
          proposedPitch={proposedPitch}
          criteria={criteria}
          onAcceptMatch={handleAcceptMatch}
          onDeclineMatch={handleDeclineMatch}
        />
      )}

      {/* Match Ticket with QR Modal */}
      {activeMatch && (
        <MatchTicketModal
          isOpen={isTicketOpen}
          onClose={() => setIsTicketOpen(false)}
          match={activeMatch}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-900 bg-gray-950/80 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-400">MatchPitch E-Soccer System</span>
            <span>•</span>
            <span>Cơ chế ghép trận tìm đối bóng đá phong trào chuẩn Esports</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>🛡️ Chống bùng kèo</span>
            <span>⚖️ Cân bằng ELO</span>
            <span>📍 Tối ưu khoảng cách sân</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
