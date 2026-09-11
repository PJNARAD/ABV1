import { 
  RiskZone, 
  LiveAlert, 
  FieldReport, 
  RoadCondition, 
  ResponsePriority, 
  NotificationItem, 
  NetworkStatus,
  SystemSettings
} from '../types';
import { 
  INITIAL_RISK_ZONES, 
  INITIAL_ALERTS, 
  INITIAL_FIELD_REPORTS, 
  INITIAL_ROAD_CONDITIONS, 
  INITIAL_RESPONSE_PRIORITIES, 
  INITIAL_NOTIFICATIONS, 
  ANALYTICS_DATA 
} from '../data/mockData';

const STORAGE_KEYS = {
  ZONES: 'ner_risk_zones',
  ALERTS: 'ner_alerts',
  REPORTS: 'ner_field_reports',
  ROADS: 'ner_roads',
  PRIORITIES: 'ner_priorities',
  NOTIFS: 'ner_notifications',
  OFFLINE_QUEUE: 'ner_offline_sync_queue',
  SETTINGS: 'ner_settings'
};

export const DEFAULT_SETTINGS: SystemSettings = {
  accountName: 'Er. Rajeshwar Sharma, IAS',
  officialDesignation: 'District Disaster Management Officer & Special Secretary',
  districtOffice: 'NER Disaster Operations Centre, Guwahati / Gangtok Division',
  emailAlerts: true,
  smsEmergencyBroadcast: true,
  soundAlerts: true,
  criticalThresholdProb: 85,
  highThresholdProb: 70,
  rainfallWarningThreshold: 150,
  offlineAutoSync: true,
  autoRefreshIntervalSeconds: 60,
  satelliteLayerDefault: false,
  radarOverlay: true
};

export class ApiService {
  private static networkStatus: NetworkStatus = 'online';
  private static listeners: ((status: NetworkStatus) => void)[] = [];

  private static init() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.ZONES)) {
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(INITIAL_RISK_ZONES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_FIELD_REPORTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROADS)) {
      localStorage.setItem(STORAGE_KEYS.ROADS, JSON.stringify(INITIAL_ROAD_CONDITIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRIORITIES)) {
      localStorage.setItem(STORAGE_KEYS.PRIORITIES, JSON.stringify(INITIAL_RESPONSE_PRIORITIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE)) {
      const seededQueue: Partial<FieldReport>[] = [
        { id: 'OFF-001', hazardType: 'Road Crack', location: 'Tawang Pass Km 14', severity: 'HIGH', timeAgo: '30m ago', timestamp: '10:15 IST', status: 'Submitted', isSynced: false, submittedBy: 'Field Spotter Tawang', submitterRole: 'Citizen', district: 'Tawang', state: 'Arunachal Pradesh', gpsCoordinates: '27.5860° N, 91.8660° E', description: 'Transverse tension crack widening' },
        { id: 'OFF-002', hazardType: 'Mudflow', location: 'Lava-Algarah bypass', severity: 'CRITICAL', timeAgo: '45m ago', timestamp: '10:00 IST', status: 'Submitted', isSynced: false, submittedBy: 'BRO Patrol 22', submitterRole: 'Field Officer', district: 'East District', state: 'Sikkim', gpsCoordinates: '27.1200° N, 88.6500° E', description: 'Slurry debris flow across both lanes' },
        { id: 'OFF-003', hazardType: 'Rockfall', location: 'NH-29 Chumukedima', severity: 'MODERATE', timeAgo: '1h ago', timestamp: '09:45 IST', status: 'Submitted', isSynced: false, submittedBy: 'Traffic Police Post', submitterRole: 'Emergency Team', district: 'Kohima', state: 'Nagaland', gpsCoordinates: '25.8000° N, 93.7500° E', description: 'Boulder dislodgement on shoulder' },
        { id: 'OFF-004', hazardType: 'Slope Subsidence', location: 'Pelling West flank', severity: 'HIGH', timeAgo: '1h 15m ago', timestamp: '09:30 IST', status: 'Submitted', isSynced: false, submittedBy: 'Civil Defense Squad', submitterRole: 'Field Officer', district: 'West District', state: 'Sikkim', gpsCoordinates: '27.3000° N, 88.2300° E', description: 'Culvert base settling under load' },
        { id: 'OFF-005', hazardType: 'Retaining Wall Failure', location: 'Cherrapunji Point 3', severity: 'MODERATE', timeAgo: '2h ago', timestamp: '08:45 IST', status: 'Submitted', isSynced: false, submittedBy: 'PWD Inspector', submitterRole: 'Field Officer', district: 'East Khasi Hills', state: 'Meghalaya', gpsCoordinates: '25.2900° N, 91.7300° E', description: 'Gabion cage bulging outward' },
        { id: 'OFF-006', hazardType: 'Road Crack', location: 'Noney tunnel entry', severity: 'HIGH', timeAgo: '2h 30m ago', timestamp: '08:15 IST', status: 'Submitted', isSynced: false, submittedBy: 'Railway Safety Unit', submitterRole: 'Emergency Team', district: 'Noney', state: 'Manipur', gpsCoordinates: '24.8200° N, 93.6000° E', description: 'Shear crack on tunnel portal slope' },
        { id: 'OFF-007', hazardType: 'Debris Flow', location: 'Haflong Hill culvert', severity: 'CRITICAL', timeAgo: '3h ago', timestamp: '07:45 IST', status: 'Submitted', isSynced: false, submittedBy: 'Assam Rifles Patrol', submitterRole: 'Emergency Team', district: 'Dima Hasao', state: 'Assam', gpsCoordinates: '25.1700° N, 93.0200° E', description: 'Mud and logs completely choking drain' }
      ];
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(seededQueue));
    }
  }

  private static safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw || raw === 'undefined' || raw === 'null') return fallback;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  // Synchronous Core Getters
  public static getRiskZones(): RiskZone[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.ZONES), INITIAL_RISK_ZONES);
  }

  public static getLiveAlerts(): LiveAlert[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.ALERTS), INITIAL_ALERTS);
  }

  public static getFieldReports(): FieldReport[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.REPORTS), INITIAL_FIELD_REPORTS);
  }

  public static getRoadConditions(): RoadCondition[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.ROADS), INITIAL_ROAD_CONDITIONS);
  }

  public static getPriorities(): ResponsePriority[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.PRIORITIES), INITIAL_RESPONSE_PRIORITIES);
  }

  public static getNotifications(): NotificationItem[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.NOTIFS), INITIAL_NOTIFICATIONS);
  }

  public static getNetworkStatus(): NetworkStatus {
    return ApiService.networkStatus;
  }

  public static setNetworkStatus(status: NetworkStatus) {
    ApiService.networkStatus = status;
    ApiService.listeners.forEach(fn => fn(status));
    if (status === 'online') {
      ApiService.syncOfflineQueue();
    }
  }

  public static getOfflineQueue(): any[] {
    ApiService.init();
    return ApiService.safeParse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE), []);
  }

  public static submitFieldReport(reportData: any): { success: boolean; report: FieldReport; savedLocally: boolean } {
    ApiService.init();
    const newReport: FieldReport = {
      ...reportData,
      id: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
      timeAgo: 'Just now',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      status: 'Submitted',
      isSynced: ApiService.networkStatus === 'online'
    };

    if (ApiService.networkStatus !== 'online') {
      const queue = ApiService.getOfflineQueue();
      queue.unshift(newReport);
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
      return { success: true, report: newReport, savedLocally: true };
    }

    const current = ApiService.getFieldReports();
    current.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(current));
    return { success: true, report: newReport, savedLocally: false };
  }

  public static syncOfflineQueue(): number {
    ApiService.init();
    const queue = ApiService.getOfflineQueue();
    if (!queue || queue.length === 0) return 0;

    const current = ApiService.getFieldReports();
    const synced = queue.map(r => ({ ...r, isSynced: true }));
    const updated = [...synced, ...current];
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    return queue.length;
  }

  public static assignTeamToAlert(alertId: string, teamName: string): void {
    ApiService.init();
    const alerts = ApiService.getLiveAlerts();
    const updated = alerts.map(a => {
      if (a.id === alertId) {
        return { ...a, assignedTeam: teamName, status: 'Response Deployed' as const };
      }
      return a;
    });
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
  }

  public static assignTeamToReport(reportId: string, teamName: string): void {
    ApiService.init();
    const reports = ApiService.getFieldReports();
    const updated = reports.map(r => {
      if (r.id === reportId) {
        return { ...r, assignedTeam: teamName, status: 'Team Dispatched' as const };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
  }

  public static assignTeamToPriority(priorityId: string, teamName: string): void {
    ApiService.init();
    const priorities = ApiService.getPriorities();
    const updated = priorities.map(p => {
      if (p.id === priorityId) {
        return { ...p, assignedTeam: teamName, status: 'Team Assigned' as const };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PRIORITIES, JSON.stringify(updated));
  }

  public static resolveAlert(alertId: string): void {
    ApiService.init();
    const alerts = ApiService.getLiveAlerts();
    const updated = alerts.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'Resolved' as const, requiresResponse: false };
      }
      return a;
    });
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
  }

  public static resolveFieldReport(reportId: string): void {
    ApiService.init();
    const reports = ApiService.getFieldReports();
    const updated = reports.map(r => {
      if (r.id === reportId) {
        return { ...r, status: 'Resolved' as const };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));
  }

  public static getAnalytics() {
    return ANALYTICS_DATA;
  }

  // Instance methods for compatibility
  public getRiskZones() { return ApiService.getRiskZones(); }
  public getAlerts() { return ApiService.getLiveAlerts(); }
  public getLiveAlerts() { return ApiService.getLiveAlerts(); }
  public getFieldReports() { return ApiService.getFieldReports(); }
  public getRoadConditions() { return ApiService.getRoadConditions(); }
  public getResponsePriorities() { return ApiService.getPriorities(); }
  public getPriorities() { return ApiService.getPriorities(); }
  public getNetworkStatus() { return ApiService.getNetworkStatus(); }
  public setNetworkStatus(status: NetworkStatus) { return ApiService.setNetworkStatus(status); }
  public getOfflineQueue() { return ApiService.getOfflineQueue(); }
  public syncPendingReports() { return ApiService.syncOfflineQueue(); }
  public syncOfflineQueue() { return ApiService.syncOfflineQueue(); }
  public submitFieldReport(data: any) { return ApiService.submitFieldReport(data); }
  public assignTeamToPriority(id: string, name: string) { return ApiService.assignTeamToPriority(id, name); }
  public assignTeamToAlert(id: string, name: string) { return ApiService.assignTeamToAlert(id, name); }
  public assignTeamToReport(id: string, name: string) { return ApiService.assignTeamToReport(id, name); }
  public resolveAlert(id: string) { return ApiService.resolveAlert(id); }
  public resolveFieldReport(id: string) { return ApiService.resolveFieldReport(id); }
  public getAnalytics() { return ApiService.getAnalytics(); }
}

export const apiService = new ApiService();
