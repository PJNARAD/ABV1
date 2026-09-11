export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type RoadStatus = 'OPEN' | 'PARTIALLY BLOCKED' | 'BLOCKED' | 'HIGH RISK';

export type ReportStatus = 'Submitted' | 'Under Investigation' | 'Team Dispatched' | 'Resolved';

export type AlertStatus = 'Active' | 'Under Review' | 'Escalated' | 'Resolved';

export type NetworkStatus = 'online' | 'limited' | 'offline';

export type SupportedLanguage = 
  | 'English'
  | 'Hindi'
  | 'Assamese'
  | 'Bengali'
  | 'Manipuri'
  | 'Mizo'
  | 'Khasi'
  | 'Garo'
  | 'Tripuri';

export interface RiskZone {
  id: string;
  name: string;
  district: string;
  state: 'Sikkim' | 'Assam' | 'Arunachal Pradesh' | 'Meghalaya' | 'Nagaland' | 'Manipur' | 'Mizoram' | 'Tripura';
  coordinates: [number, number]; // [lat, lng]
  riskLevel: RiskLevel;
  probability: number; // percentage
  rainfall24h: number; // mm
  soilMoisture: number; // percentage
  slopeAngle: number; // degrees
  elevation: number; // meters
  historicalEventsCount: number;
  lastEventDate: string;
  aiRecommendation: string;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  populationAtRisk: number;
  criticalRoadAffected?: string;
  svgPos: { x: number; y: number }; // normalized positioning on NER map [0-1000, 0-600]
}

export interface LiveAlert {
  id: string;
  title: string;
  location: string;
  district: string;
  state: string;
  severity: RiskLevel;
  trigger: string;
  timeAgo: string;
  timestamp: string;
  status: AlertStatus;
  recipientsCount: number;
  requiresResponse: boolean;
  coordinates: [number, number];
  aiRecommendation?: string;
  actionRequired?: string;
  assignedTeam?: string;
}

export interface FieldReport {
  id: string;
  hazardType: 'Road Crack' | 'Rockfall' | 'Mudflow' | 'Slope Subsidence' | 'Debris Flow' | 'Retaining Wall Failure';
  location: string;
  district: string;
  state: string;
  submittedBy: string;
  submitterRole: 'Field Officer' | 'Emergency Team' | 'Citizen' | 'Geological Surveyor';
  timeAgo: string;
  timestamp: string;
  severity: RiskLevel;
  gpsCoordinates: string;
  status: ReportStatus;
  description: string;
  imageUrl?: string;
  assignedTeam?: string;
  isSynced: boolean;
}

export interface RoadCondition {
  id: string;
  name: string;
  corridor: string;
  district: string;
  state: string;
  status: RoadStatus;
  lastUpdated: string;
  alternativeRoute: string;
  blockageCause?: string;
  trafficRestriction: string;
}

export interface ResponsePriority {
  id: string;
  priorityRank: number;
  riskLevel: RiskLevel;
  zoneName: string;
  district: string;
  reason: string;
  recommendedResponse: string;
  populationExposure: string;
  assignedTeam?: string;
  status: 'Pending Dispatch' | 'Team Assigned' | 'On-Site' | 'Resolved';
}

export interface NotificationItem {
  id: string;
  category: 'Emergency' | 'Weather' | 'Landslide' | 'Road' | 'System';
  title: string;
  message: string;
  timeAgo: string;
  severity: RiskLevel | 'INFO';
  read: boolean;
}

export interface SystemSettings {
  accountName: string;
  officialDesignation: string;
  districtOffice: string;
  emailAlerts: boolean;
  smsEmergencyBroadcast: boolean;
  soundAlerts: boolean;
  criticalThresholdProb: number;
  highThresholdProb: number;
  rainfallWarningThreshold: number;
  offlineAutoSync: boolean;
  autoRefreshIntervalSeconds: number;
  satelliteLayerDefault: boolean;
  radarOverlay: boolean;
}

export type UserRole = 
  | 'SDMA Administrator'
  | 'NDRF Field Officer'
  | 'BRO Engineer'
  | 'Geological Surveyor (GSI)'
  | 'Public / Observer'
  | 'Citizen / General Public';

export interface UserProfile {
  name: string;
  officialId: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  jurisdiction: string;
  clearanceLevel: string;
  phone: string;
  avatarInitials: string;
}
