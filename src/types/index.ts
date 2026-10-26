export type FieldType = '5' | '7' | '11';

export type MatchMode = 'ranked' | 'quick' | 'stakes';

export type SplitCostType = '50-50' | 'loser-pays' | 'water-only' | 'free';

export type PlayStyle = 'dưỡng-sinh' | 'cân-bằng' | 'máu-lửa';

export type RankTier = 'Đồng' | 'Bạc' | 'Vàng' | 'Bạch Kim' | 'Kim Cương' | 'Cao Thủ' | 'Thách Đấu';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  rating: number;
  isCaptain?: boolean;
}

export interface SoccerTeam {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  captainName: string;
  captainPhone: string;
  district: string;
  city: string;
  homePitch?: string;
  rank: RankTier;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  fairPlayScore: number; // 0 - 100
  primaryJerseyColor: string;
  secondaryJerseyColor: string;
  playStyle: PlayStyle;
  bio: string;
  players: Player[];
  preferredFieldType: FieldType;
}

export interface MatchCriteria {
  mode: MatchMode;
  fieldType: FieldType;
  district: string;
  timeSlot: string;
  splitCost: SplitCostType;
  playStyle: PlayStyle;
}

export interface PitchVenue {
  id: string;
  name: string;
  address: string;
  district: string;
  fieldTypes: FieldType[];
  pricePerHour: number;
  rating: number;
  image: string;
  phone: string;
  hasShower: boolean;
  hasParking: boolean;
  hasLighting: boolean;
}

export interface CustomLobby {
  id: string;
  title: string;
  hostTeam: SoccerTeam;
  fieldType: FieldType;
  district: string;
  pitchName: string;
  matchDate: string;
  matchTime: string;
  splitCost: SplitCostType;
  playStyle: PlayStyle;
  note: string;
  status: 'open' | 'matched' | 'completed';
  createdAt: string;
}

export interface MatchChat {
  id: string;
  senderTeamId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface ActiveMatch {
  id: string;
  mode: MatchMode;
  teamA: SoccerTeam;
  teamB: SoccerTeam;
  pitch: PitchVenue;
  matchTime: string;
  matchDate: string;
  fieldType: FieldType;
  splitCost: SplitCostType;
  teamAJersey: string;
  teamBJersey: string;
  confirmedTeamA: boolean;
  confirmedTeamB: boolean;
  status: 'negotiating' | 'locked' | 'played';
  chats: MatchChat[];
}
