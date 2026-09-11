import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';

export interface Translations {
  // Brand & Header
  systemTitle: string;
  systemSubtitle: string;
  systemOperational: string;
  signedInAs: string;
  roleOfficer: string;
  myProfile: string;
  systemSettings: string;
  signOut: string;
  notifications: string;
  selectLanguage: string;
  sessionAuthenticated: string;

  // Navigation
  navDashboard: string;
  navRiskMap: string;
  navAiPredictions: string;
  navAlerts: string;
  navFieldReports: string;
  navInfrastructure: string;
  navAnalytics: string;

  // Incident Command & Alerts Strip
  regionalAlertLevel: string;
  alertLevelOrange: string;
  alertLevelOrangeDesc: string;
  reportHazard: string;
  emergencyResponse: string;
  exportTelemetry: string;
  regionalRiskOverview: string;
  overviewSubtitle: string;
  lastUpdated: string;
  refreshData: string;

  // KPI Cards
  highRiskZones: string;
  criticalZones: string;
  roadsAffected: string;
  activeAlerts: string;
  monitoredLocations: string;
  increasing: string;
  immediateAttention: string;
  highways: string;
  active: string;
  urgent: string;
  viewRiskMap: string;
  filterCriticalSites: string;
  viewRouteBreakdown: string;
  openAlertConsole: string;
  viewTelemetryGrid: string;
  highRiskSubtitle: string;
  criticalSubtitle: string;
  roadsSubtitle: string;
  alertsSubtitle: string;
  monitoredSubtitle: string;

  // GIS Map
  liveLandslideRiskMap: string;
  mapEngineBadge: string;
  mapSubtitle: string;
  filterLabel: string;
  filterAll: string;
  filterCritical: string;
  filterHigh: string;
  filterModerate: string;
  filterLow: string;
  zoomIn: string;
  zoomOut: string;
  resetMap: string;
  mapLayers: string;
  gisLayerControls: string;
  baseMapTiles: string;
  street: string;
  satellite: string;
  terrain: string;
  telemetryOverlays: string;
  roadsAndLifelines: string;
  rainfallIsohyets: string;
  soilMoistureZones: string;
  historicalLandslides: string;
  openLocationInspector: string;
  rainfallParam: string;
  moistureParam: string;
  slopeParam: string;
  probParam: string;

  // Telemetry & Environmental Indicators
  environmentalRiskIndicators: string;
  clickToDiagnose: string;
  environmentalTelemetryDesc: string;
  syncMinAgo: string;
  rainfall24h: string;
  rainfallThresholdExceeded: string;
  soilMoisture: string;
  criticalSaturation: string;
  porePressureHigh: string;
  slopeStability: string;
  meanIncline: string;
  unstable: string;
  shearStrainRate: string;
  weatherForecast: string;
  heavyRain: string;
  next6Hours: string;
  imdWarningOrange: string;
  viewLiveTelemetryDiagnostics: string;

  // AI Prediction Card
  aiLandslidePrediction: string;
  aiModelBadge: string;
  aiPredictionDesc: string;
  viewAiAnalysis: string;
  riskProbability24h: string;
  probLegendCritical: string;
  probLegendHigh: string;
  probLegendModerate: string;
  confidenceScore: string;
  peakDangerWindow: string;
  peakDangerTime?: string;
  whyHighRisk: string;

  // Live Alerts Panel
  liveAlerts: string;
  viewAllAlerts: string;
  responseRequired: string;
  viewDetails: string;
  alertId: string;
  alertUrgentCount: string;

  // Sections
  roadConnectivity: string;
  allCorridors: string;
  recentFieldReports: string;
  submitReportBtn: string;
  allReportsBtn: string;
  emergencyPriorities: string;
  highestRiskLocations: string;
  districtRiskAnalysis: string;
  infrastructureStatus: string;

  // Footer
  footerDescription: string;
  poweredBy: string;
  aiPowered: string;
  gisMapping: string;
  satelliteData: string;
  sensorIntelligence: string;
  platformCol: string;
  monitoringCol: string;
  resourcesCol: string;
  supportCol: string;
  landslideRiskNav: string;
  weatherRadarNav: string;
  soilMoistureNav: string;
  terrainInSarNav: string;
  roadConnectivityNav: string;
  emergencyGuidelines: string;
  disasterManagement: string;
  userGuideSop: string;
  apiDocs: string;
  systemStatus: string;
  helpCenter: string;
  contactSupport: string;
  reportIssue: string;
  emergencyHotline: string;
  organizationLabel: string;
  organizationName: string;
  departmentLabel: string;
  departmentName: string;
  categoryLabel: string;
  categoryName: string;
  coverageLabel: string;
  coverageName: string;
  copyrightText: string;
  privacyPolicy: string;
  termsOfUse: string;
  accessibility: string;
  disclaimer: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  English: {
    systemTitle: 'NER Landslide Early Warning System',
    systemSubtitle: 'AI-Powered Risk Monitoring & Disaster Management',
    systemOperational: 'System Operational',
    signedInAs: 'Signed in as',
    roleOfficer: 'Role: District Collector',
    myProfile: 'My Profile',
    systemSettings: 'System Settings',
    signOut: 'Sign Out',
    notifications: 'Notifications',
    selectLanguage: 'Language',
    sessionAuthenticated: 'Session authenticated via Govt NIC credentials.',

    navDashboard: 'Dashboard',
    navRiskMap: 'Risk Map',
    navAiPredictions: 'AI Predictions',
    navAlerts: 'Alerts',
    navFieldReports: 'Field Reports',
    navInfrastructure: 'Infrastructure',
    navAnalytics: 'Analytics',

    regionalAlertLevel: 'Regional Alert Level:',
    alertLevelOrange: 'ORANGE — IMMINENT SLOPE HAZARD',
    alertLevelOrangeDesc: 'Heavy monsoon squalls across Sikkim & Arunachal Pradesh triggering widespread surface saturation.',
    reportHazard: 'Report a Hazard',
    emergencyResponse: 'Emergency Response',
    exportTelemetry: 'Export Telemetry',
    regionalRiskOverview: 'Regional Risk Overview',
    overviewSubtitle: 'Real-time landslide monitoring and early warning intelligence across the North Eastern Region.',
    lastUpdated: 'Last Updated: 2 minutes ago',
    refreshData: 'Refresh Data',

    highRiskZones: 'High-Risk Zones',
    criticalZones: 'Critical Zones',
    roadsAffected: 'Roads Affected',
    activeAlerts: 'Active Alerts',
    monitoredLocations: 'Monitored Locations',
    increasing: 'Increasing',
    immediateAttention: 'Immediate attention • NDRF alerted',
    highways: 'Highways',
    active: 'Active',
    urgent: 'Urgent',
    viewRiskMap: 'View Risk Map',
    filterCriticalSites: 'Filter Critical Sites',
    viewRouteBreakdown: 'View Route Breakdown',
    openAlertConsole: 'Open Alert Console',
    viewTelemetryGrid: 'View Telemetry Grid',
    highRiskSubtitle: '+6 from yesterday • 14 automated alerts',
    criticalSubtitle: 'Immediate attention • NDRF alerted',
    roadsSubtitle: '5 major corridors blocked • NH-10 & NH-29',
    alertsSubtitle: '3 in last hr • 8 Severe, 4 Warning',
    monitoredSubtitle: 'Across 8 states in North Eastern Region',

    liveLandslideRiskMap: 'Live Landslide Risk Map',
    mapEngineBadge: 'OpenStreetMap & Leaflet Engine',
    mapSubtitle: 'Real-time geospatial assessment across North Eastern Region (NER) based on rainfall, soil moisture, terrain slope, and telemetry.',
    filterLabel: 'Filter:',
    filterAll: 'ALL',
    filterCritical: 'CRITICAL',
    filterHigh: 'HIGH',
    filterModerate: 'MODERATE',
    filterLow: 'LOW',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetMap: 'Reset Map to NER Center',
    mapLayers: 'Map Layers',
    gisLayerControls: 'GIS Layer Controls',
    baseMapTiles: 'Base Map Tiles',
    street: 'Street',
    satellite: 'Satellite',
    terrain: 'Terrain',
    telemetryOverlays: 'Telemetry Overlays',
    roadsAndLifelines: 'Roads & Lifelines',
    rainfallIsohyets: 'Rainfall Isohyets',
    soilMoistureZones: 'Soil Moisture Zones',
    historicalLandslides: 'Historical Landslides',
    openLocationInspector: 'Open Location Inspector',
    rainfallParam: 'Rain',
    moistureParam: 'Moist.',
    slopeParam: 'Slope',
    probParam: 'Prob.',

    environmentalRiskIndicators: 'Environmental Risk Indicators',
    clickToDiagnose: 'Click to Diagnose',
    environmentalTelemetryDesc: 'Real-time telemetry aggregated from 1,284 IoT automatic weather and geotechnical sensor stations across NER.',
    syncMinAgo: 'Sync: 5 min ago',
    rainfall24h: 'Rainfall (24h)',
    rainfallThresholdExceeded: 'Threshold: 120 mm • Exceeded',
    soilMoisture: 'Soil Moisture',
    criticalSaturation: 'Critical Saturation',
    porePressureHigh: 'Pore Pressure: 48 kPa • High Risk',
    slopeStability: 'Slope Stability',
    meanIncline: 'mean incline',
    unstable: 'Unstable',
    shearStrainRate: 'Shear Strain: 4.2 mm/hr • Active Creep',
    weatherForecast: 'Weather Forecast',
    heavyRain: 'Heavy Rain',
    next6Hours: 'Next 6 hours',
    imdWarningOrange: 'IMD Warning: Orange Alert (45-65 mm/hr)',
    viewLiveTelemetryDiagnostics: 'View Live Telemetry / Diagnostics',

    aiLandslidePrediction: 'AI Landslide Prediction',
    aiModelBadge: 'Model: LandslideRisk-v1',
    aiPredictionDesc: 'Machine-learning models continuously analyze environmental and historical data to identify emerging risks.',
    viewAiAnalysis: 'View AI Analysis',
    riskProbability24h: 'Landslide Risk Probability — Next 24 Hours',
    probLegendCritical: 'Critical (85%)',
    probLegendHigh: 'High (75%)',
    probLegendModerate: 'Moderate (50%)',
    confidenceScore: 'Confidence Level: 94.2%',
    peakDangerWindow: 'Peak Danger Window: 14:00 - 18:00 Today',
    whyHighRisk: 'Why is this area high risk?',

    liveAlerts: 'Live Alerts',
    viewAllAlerts: 'View All Alerts',
    responseRequired: 'Response Required',
    viewDetails: 'View Details',
    alertId: 'ID:',
    alertUrgentCount: 'Urgent',

    roadConnectivity: 'Road Connectivity',
    allCorridors: 'All Corridors',
    recentFieldReports: 'Recent Field Reports',
    submitReportBtn: 'Submit Report',
    allReportsBtn: 'All Reports',
    emergencyPriorities: 'Emergency Response Priorities',
    highestRiskLocations: 'Highest Risk Locations',
    districtRiskAnalysis: 'District Risk Analysis',
    infrastructureStatus: 'Infrastructure & Connectivity Status',

    footerDescription: 'AI-powered disaster risk monitoring and early warning platform for the North Eastern Region of India.',
    poweredBy: 'Powered by:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'Satellite Data',
    sensorIntelligence: 'Sensor Intelligence',
    platformCol: 'Platform',
    monitoringCol: 'Monitoring',
    resourcesCol: 'Resources',
    supportCol: 'Support',
    landslideRiskNav: 'Landslide Risk',
    weatherRadarNav: 'Weather & Radar',
    soilMoistureNav: 'Soil Moisture',
    terrainInSarNav: 'Terrain InSAR',
    roadConnectivityNav: 'Road Connectivity',
    emergencyGuidelines: 'Emergency Guidelines',
    disasterManagement: 'Disaster Management',
    userGuideSop: 'User Guide & SOP',
    apiDocs: 'API Documentation',
    systemStatus: 'System Status',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    reportIssue: 'Report an Issue',
    emergencyHotline: 'Emergency Hotline: 1070 / 112',
    organizationLabel: 'Organization',
    organizationName: 'Ministry of Development of North Eastern Region (MDoNER)',
    departmentLabel: 'Department',
    departmentName: 'North Eastern Space Applications Centre (NESAC) & NDMA',
    categoryLabel: 'Category',
    categoryName: 'Government Disaster Management Platform',
    coverageLabel: 'Coverage',
    coverageName: '8 North Eastern States of India',
    copyrightText: '© 2026 NER Landslide Early Warning System. Government of India. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    accessibility: 'Accessibility',
    disclaimer: 'Disclaimer'
  },
  Hindi: {
    systemTitle: 'पूर्वोत्तर भूस्खलन पूर्व चेतावनी प्रणाली',
    systemSubtitle: 'एआई-संचालित जोखिम निगरानी एवं आपदा प्रबंधन',
    systemOperational: 'प्रणाली सामान्य रूप से सक्रिय',
    signedInAs: 'लॉग इन किया गया',
    roleOfficer: 'पद: जिला कलेक्टर',
    myProfile: 'मेरी प्रोफ़ाइल',
    systemSettings: 'सिस्टम सेटिंग्स',
    signOut: 'साइन आउट',
    notifications: 'सूचनाएं',
    selectLanguage: 'भाषा',
    sessionAuthenticated: 'सरकारी एनआईसी क्रेडेंशियल्स द्वारा सत्र सत्यापित।',

    navDashboard: 'डैशबोर्ड',
    navRiskMap: 'जोखिम मानचित्र',
    navAiPredictions: 'एआई भविष्यवाणियां',
    navAlerts: 'चेतावनी',
    navFieldReports: 'क्षेत्रीय रिपोर्ट',
    navInfrastructure: 'बुनियादी ढांचा',
    navAnalytics: 'विश्लेषण',

    regionalAlertLevel: 'क्षेत्रीय चेतावनी स्तर:',
    alertLevelOrange: 'नारंगी — ढलान पर अत्यधिक जोखिम',
    alertLevelOrangeDesc: 'सिक्किम और अरुणाचल प्रदेश में भारी मानसूनी वर्षा से व्यापक भू-संतृप्ति उत्पन्न हो रही है।',
    reportHazard: 'खतरे की सूचना दें',
    emergencyResponse: 'आपातकालीन प्रतिक्रिया',
    exportTelemetry: 'टेलीमेट्री डेटा निर्यात',
    regionalRiskOverview: 'क्षेत्रीय जोखिम अवलोकन',
    overviewSubtitle: 'पूर्वोत्तर क्षेत्र में वास्तविक समय भूस्खलन निगरानी एवं पूर्व चेतावनी आसूचना।',
    lastUpdated: 'अंतिम अद्यतन: २ मिनट पूर्व',
    refreshData: 'डेटा ताज़ा करें',

    highRiskZones: 'उच्च-जोखिम क्षेत्र',
    criticalZones: 'गंभीर क्षेत्र',
    roadsAffected: 'प्रभावित सड़कें',
    activeAlerts: 'सक्रिय चेतावनियां',
    monitoredLocations: 'निगरानी वाले स्थान',
    increasing: 'बढ़ रहा है',
    immediateAttention: 'तत्काल ध्यान आवश्यक • एनडीआरएफ सूचित',
    highways: 'राजमार्ग',
    active: 'सक्रिय',
    urgent: 'अति आवश्यक',
    viewRiskMap: 'मानचित्र देखें',
    filterCriticalSites: 'गंभीर स्थल देखें',
    viewRouteBreakdown: 'सड़क मार्ग विवरण',
    openAlertConsole: 'चेतावनी कंसोल खोलें',
    viewTelemetryGrid: 'टेलीमेट्री ग्रिड देखें',
    highRiskSubtitle: 'कल से +६ अधिक • १४ स्वचालित चेतावनियां',
    criticalSubtitle: 'तत्काल ध्यान आवश्यक • एनडीआरएफ सतर्क',
    roadsSubtitle: '५ मुख्य संपर्क मार्ग अवरुद्ध • एनएच-१० व एनएच-२९',
    alertsSubtitle: 'पिछले घंटे में ३ • ८ गंभीर, ४ चेतावनी',
    monitoredSubtitle: 'पूर्वोत्तर के सभी ८ राज्यों में',

    liveLandslideRiskMap: 'लाइव भूस्खलन जोखिम मानचित्र',
    mapEngineBadge: 'ओपनस्ट्रीटमैप एवं लीफलेट इंजन',
    mapSubtitle: 'वर्षा, मृदा नमी, ढलान और भू-सेंसर टेलीमेट्री पर आधारित वास्तविक समय भू-स्थानिक मूल्यांकन।',
    filterLabel: 'फ़िल्टर:',
    filterAll: 'सभी',
    filterCritical: 'गंभीर',
    filterHigh: 'उच्च',
    filterModerate: 'मध्यम',
    filterLow: 'कम',
    zoomIn: 'ज़ूम इन',
    zoomOut: 'ज़ूम आउट',
    resetMap: 'पूर्वोत्तर केंद्र पर रीसेट करें',
    mapLayers: 'मानचित्र परतें',
    gisLayerControls: 'जीआईएस परत नियंत्रण',
    baseMapTiles: 'मूल मानचित्र प्रकार',
    street: 'सड़क',
    satellite: 'उपग्रह',
    terrain: 'स्थलाकृति',
    telemetryOverlays: 'टेलीमेट्री ओवरले',
    roadsAndLifelines: 'सड़कें एवं जीवनरेखाएं',
    rainfallIsohyets: 'वर्षा समवृष्टि रेखाएं',
    soilMoistureZones: 'मृदा नमी क्षेत्र',
    historicalLandslides: 'ऐतिहासिक भूस्खलन स्थल',
    openLocationInspector: 'स्थान विवरण खोलें',
    rainfallParam: 'वर्षा',
    moistureParam: 'नमी',
    slopeParam: 'ढलान',
    probParam: 'संभावना',

    environmentalRiskIndicators: 'पर्यावरणीय जोखिम संकेतक',
    clickToDiagnose: 'जांच हेतु क्लिक करें',
    environmentalTelemetryDesc: 'पूर्वोत्तर भर के १२८४ स्वचालित आईओटी मौसम व भू-तकनीकी सेंसरों से संकलित डेटा।',
    syncMinAgo: 'सिंक: ५ मिनट पूर्व',
    rainfall24h: '२४ घंटे की वर्षा',
    rainfallThresholdExceeded: 'सीमा: १२० मिमी • पार हो चुकी है',
    soilMoisture: 'मृदा नमी स्तर',
    criticalSaturation: 'गंभीर संतृप्ति',
    porePressureHigh: 'पोर प्रेशर: ४८ केपीए • उच्च जोखिम',
    slopeStability: 'ढलान स्थिरता',
    meanIncline: 'औसत झुकाव',
    unstable: 'अस्थिर ढलान',
    shearStrainRate: 'शियर स्ट्रेन: ४.२ मिमी/घंटा • सक्रिय खिसकाव',
    weatherForecast: 'मौसम पूर्वानुमान',
    heavyRain: 'भारी वर्षा',
    next6Hours: 'अगले ६ घंटे',
    imdWarningOrange: 'मौसम विभाग चेतावनी: ऑरेंज अलर्ट (४५-६५ मिमी/घंटा)',
    viewLiveTelemetryDiagnostics: 'लाइव टेलीमेट्री / जांच देखें',

    aiLandslidePrediction: 'एआई भूस्खलन भविष्यवाणी',
    aiModelBadge: 'मॉडल: लैंडस्लाइडरिस्क-v1',
    aiPredictionDesc: 'मशीन-लर्निंग मॉडल पर्यावरणीय एवं ऐतिहासिक डेटा का निरंतर विश्लेषण कर उभरते जोखिमों की पहचान करते हैं।',
    viewAiAnalysis: 'एआई विश्लेषण देखें',
    riskProbability24h: 'भूस्खलन जोखिम संभावना — आगामी २४ घंटे',
    probLegendCritical: 'गंभीर (८५%)',
    probLegendHigh: 'उच्च (७५%)',
    probLegendModerate: 'मध्यम (५०%)',
    confidenceScore: 'विश्वसनीयता स्तर: ९४.२%',
    peakDangerWindow: 'चरम खतरे की अवधि: १४:०० - १८:०० आज',
    whyHighRisk: 'यह क्षेत्र उच्च जोखिम में क्यों है?',

    liveAlerts: 'लाइव चेतावनी',
    viewAllAlerts: 'सभी चेतावनियां देखें',
    responseRequired: 'प्रतिक्रिया अपेक्षित',
    viewDetails: 'विवरण देखें',
    alertId: 'आईडी:',
    alertUrgentCount: 'अति आवश्यक',

    roadConnectivity: 'सड़क संपर्क स्थिति',
    allCorridors: 'सभी कॉरिडोर',
    recentFieldReports: 'हालिया क्षेत्रीय रिपोर्ट',
    submitReportBtn: 'रिपोर्ट भेजें',
    allReportsBtn: 'सभी रिपोर्ट',
    emergencyPriorities: 'आपातकालीन प्रतिक्रिया प्राथमिकताएं',
    highestRiskLocations: 'सर्वाधिक जोखिम वाले स्थल',
    districtRiskAnalysis: 'जिला जोखिम विश्लेषण',
    infrastructureStatus: 'बुनियादी ढांचा व संपर्क स्थिति',

    footerDescription: 'पूर्वोत्तर भारत हेतु एआई-संचालित आपदा जोखिम निगरानी एवं पूर्व चेतावनी मंच।',
    poweredBy: 'संचालित:',
    aiPowered: 'एआई',
    gisMapping: 'जीआईएस',
    satelliteData: 'उपग्रह डेटा',
    sensorIntelligence: 'सेंसर आसूचना',
    platformCol: 'मंच',
    monitoringCol: 'निगरानी',
    resourcesCol: 'संसाधन',
    supportCol: 'सहायता',
    landslideRiskNav: 'भूस्खलन जोखिम',
    weatherRadarNav: 'मौसम एवं रडार',
    soilMoistureNav: 'मृदा नमी',
    terrainInSarNav: 'टेरेन इनसार',
    roadConnectivityNav: 'सड़क संपर्क',
    emergencyGuidelines: 'आपातकालीन दिशानिर्देश',
    disasterManagement: 'आपदा प्रबंधन',
    userGuideSop: 'उपयोगकर्ता मार्गदर्शिका एवं एसओपी',
    apiDocs: 'एपीआई दस्तावेज',
    systemStatus: 'प्रणाली स्थिति',
    helpCenter: 'सहायता केंद्र',
    contactSupport: 'सहयोग संपर्क',
    reportIssue: 'समस्या की रिपोर्ट करें',
    emergencyHotline: 'आपातकालीन हेल्पलाइन: १०७० / ११२',
    organizationLabel: 'संगठन',
    organizationName: 'उत्तर पूर्वी क्षेत्र विकास मंत्रालय (MDoNER)',
    departmentLabel: 'विभाग',
    departmentName: 'उत्तर पूर्वी अंतरिक्ष अनुप्रयोग केंद्र (NESAC) एवं NDMA',
    categoryLabel: 'श्रेणी',
    categoryName: 'सरकारी आपदा प्रबंधन प्रणाली',
    coverageLabel: 'कवरेज क्षेत्र',
    coverageName: 'भारत के ८ पूर्वोत्तर राज्य',
    copyrightText: '© २०२६ पूर्वोत्तर भूस्खलन पूर्व चेतावनी प्रणाली। भारत सरकार। सर्वाधिकार सुरक्षित।',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'उपयोग की शर्तें',
    accessibility: 'अभिगम्यता',
    disclaimer: 'अस्वीकरण'
  },
  Assamese: {
    systemTitle: 'উত্তৰ-পূৰ্বাঞ্চল ভূমিস্খলন আগতীয়া সতৰ্কবাৰ্তা ব্যৱস্থা',
    systemSubtitle: 'AI-চালিত ঝুঁকি নিৰীক্ষণ আৰু দুৰ্যোগ ব্যৱস্থাপনা',
    systemOperational: 'ব্যৱস্থা সুচাৰুৰূপে কাৰ্যক্ষম',
    signedInAs: 'প্ৰৱেশ কৰা হৈছে',
    roleOfficer: 'পদবী: জিলা উপায়ুক্ত',
    myProfile: 'মোৰ প্ৰফাইল',
    systemSettings: 'ব্যৱস্থা সংহতি',
    signOut: 'প্ৰস্থান কৰক',
    notifications: 'জাননীসমূহ',
    selectLanguage: 'ভাষা',
    sessionAuthenticated: 'চৰকাৰী NIC পৰিচয়ৰে প্ৰমাণিত সত্ৰ।',

    navDashboard: 'ডেশ্ববৰ্ড',
    navRiskMap: 'ঝুঁকি মানচিত্ৰ',
    navAiPredictions: 'AI পূৰ্বাভাস',
    navAlerts: 'সতৰ্কবাৰ্তা',
    navFieldReports: 'ক্ষেত্ৰ প্ৰতিবেদন',
    navInfrastructure: 'আন্তঃগাঁথনি',
    navAnalytics: 'পৰিসংখ্যা',

    regionalAlertLevel: 'আঞ্চলিক সতৰ্কতাৰ স্তৰ:',
    alertLevelOrange: 'কমলা — চৰম পাহাৰীয়া ঢালৰ বিপদ',
    alertLevelOrangeDesc: 'ছিকিম আৰু অৰুণাচল প্ৰদেশত প্ৰৱল মৌচুমী বৰষুণৰ ফলত ব্যাপক মাটিৰ জল-সংপৃক্ততা সৃষ্টি হৈছে।',
    reportHazard: 'বিপদৰ খবৰ দিয়ক',
    emergencyResponse: 'জৰুৰী সঁহাৰি',
    exportTelemetry: 'টেলিমেট্ৰি ৰপ্তানি',
    regionalRiskOverview: 'আঞ্চলিক ঝুঁকি পৰ্যালোচনা',
    overviewSubtitle: 'উত্তৰ-পূৰ্বাঞ্চলত সক্ৰিয় ভূমিস্খলন নিৰীক্ষণ আৰু আগতীয়া সতৰ্কবাৰ্তা ব্যৱস্থা।',
    lastUpdated: 'অন্তিম নবীকৰণ: ২ মিনিট আগতে',
    refreshData: 'তথ্য নবীকৰণ কৰক',

    highRiskZones: 'উচ্চ ঝুঁকি মণ্ডল',
    criticalZones: 'সংকটজনক মণ্ডল',
    roadsAffected: 'প্ৰভাৱিত পথসমূহ',
    activeAlerts: 'সক্ৰিয় সতৰ্কবাৰ্তা',
    monitoredLocations: 'পৰ্যবেক্ষিত স্থানসমূহ',
    increasing: 'বৃদ্ধি পাইছে',
    immediateAttention: 'তাৎক্ষণিক ব্যৱস্থা প্ৰয়োজন • NDRF সতৰ্ক',
    highways: 'ৰাষ্ট্ৰীয় ঘাইপথ',
    active: 'সক্ৰিয়',
    urgent: 'জৰুৰী',
    viewRiskMap: 'মানচিত্ৰ চাওক',
    filterCriticalSites: 'সংকটজনক স্থান চাওক',
    viewRouteBreakdown: 'পথৰ অৱস্থা চাওক',
    openAlertConsole: 'সতৰ্কতা কনচোল খোলক',
    viewTelemetryGrid: 'টেলিমেট্ৰি গ্ৰিড চাওক',
    highRiskSubtitle: 'কালিতকৈ +৬ অধিক • ১৪ স্বয়ংক্ৰিয় সতৰ্কবাৰ্তা',
    criticalSubtitle: 'তাৎক্ষণিক ব্যৱস্থা প্ৰয়োজন • NDRF সজাগ',
    roadsSubtitle: '৫টা প্ৰধান পথ বন্ধ • NH-10 আৰু NH-29',
    alertsSubtitle: 'যোৱা এঘণ্টাত ৩টা • ৮ চৰম, ৪ সতৰ্কতা',
    monitoredSubtitle: 'উত্তৰ-পূৰ্বাঞ্চলৰ ৮খন ৰাজ্যত বিস্তৃত',

    liveLandslideRiskMap: 'সজীৱ ভূমিস্খলন ঝুঁকি মানচিত্ৰ',
    mapEngineBadge: 'OpenStreetMap আৰু Leaflet ইঞ্জিন',
    mapSubtitle: 'বৰষুণ, মাটিৰ আৰ্দ্ৰতা, ঢাল আৰু ভূ-সংবেদন টেলিমেট্ৰিৰ আধাৰত প্ৰস্তুত ভৌগোলিক নিৰীক্ষণ।',
    filterLabel: 'ফিল্টাৰ:',
    filterAll: 'সকলো',
    filterCritical: 'সংকটজনক',
    filterHigh: 'উচ্চ',
    filterModerate: 'মধ্যম',
    filterLow: 'নিম্ন',
    zoomIn: 'জুম ইন',
    zoomOut: 'জুম আউট',
    resetMap: 'উত্তৰ-পূৰ্বাঞ্চললৈ কেন্দ্ৰীভূত কৰক',
    mapLayers: 'মানচিত্ৰ স্তৰসমূহ',
    gisLayerControls: 'GIS স্তৰ নিয়ন্ত্ৰণ',
    baseMapTiles: 'মূল মানচিত্ৰ টাইল',
    street: 'পথ',
    satellite: 'উপগ্ৰহ',
    terrain: 'ভূ-প্ৰকৃতি',
    telemetryOverlays: 'টেলিমেট্ৰি অভাৰলে’',
    roadsAndLifelines: 'পথ আৰু লাইফলাইন',
    rainfallIsohyets: 'বৰষুণৰ সমৰেখা',
    soilMoistureZones: 'মাটিৰ আৰ্দ্ৰতা মণ্ডল',
    historicalLandslides: 'ঐতিহাসিক ভূমিস্খলন স্থান',
    openLocationInspector: 'স্থান নিৰীক্ষণ খোলক',
    rainfallParam: 'বৰষুণ',
    moistureParam: 'আৰ্দ্ৰতা',
    slopeParam: 'ঢাল',
    probParam: 'সম্ভাৱনা',

    environmentalRiskIndicators: 'পাৰিৱেশিক ঝুঁকি সূচকসমূহ',
    clickToDiagnose: 'নিৰ্ণয়ৰ বাবে ক্লিক কৰক',
    environmentalTelemetryDesc: 'উত্তৰ-পূৰ্বাঞ্চলৰ ১২৮৪টা স্বয়ংক্ৰিয় IoT বতৰ আৰু ভূ-কাৰিকৰী চেন্সৰৰ তথ্য।',
    syncMinAgo: 'সংযোগ: ৫ মিনিট আগতে',
    rainfall24h: '২৪ ঘণ্টাত বৰষুণ',
    rainfallThresholdExceeded: 'সীমা: ১২০ মিমি • অতিক্ৰম কৰিছে',
    soilMoisture: 'মাটিৰ আৰ্দ্ৰতা',
    criticalSaturation: 'চৰম সংপৃক্ততা',
    porePressureHigh: 'ছিদ্ৰ চাপ: ৪৮ kPa • উচ্চ সংকট',
    slopeStability: 'পাহাৰীয়া ঢালৰ স্থিৰতা',
    meanIncline: 'গড় হেলনীয়া ঢাল',
    unstable: 'অস্থিৰ ঢাল',
    shearStrainRate: 'ছিয়াৰ ষ্ট্ৰেইন: ৪.২ মিমি/ঘণ্টা • সক্ৰিয় গতি',
    weatherForecast: 'বতৰৰ পূৰ্বাভাস',
    heavyRain: 'প্ৰৱল বৰষুণ',
    next6Hours: 'আগন্তুক ৬ ঘণ্টা',
    imdWarningOrange: 'IMD সতৰ্কতা: কমলা সতৰ্কবাৰ্তা (৪৫-৬৫ মিমি/ঘণ্টা)',
    viewLiveTelemetryDiagnostics: 'সজীৱ টেলিমেট্ৰি / নিদান চাওক',

    aiLandslidePrediction: 'AI ভূমিস্খলন পূৰ্বাভাস',
    aiModelBadge: 'মডেল: LandslideRisk-v1',
    aiPredictionDesc: 'মেচিন লাৰ্নিং মডেলে উদীয়মান সংকট চিনাক্ত কৰিবলৈ পাৰিৱেশিক আৰু ঐতিহাসিক তথ্য বিশ্লেষণ কৰে।',
    viewAiAnalysis: 'AI বিশ্লেষণ চাওক',
    riskProbability24h: 'ভূমিস্খলন সম্ভাৱনা — আগন্তুক ২৪ ঘণ্টা',
    probLegendCritical: 'সংকটজনক (৮৫%)',
    probLegendHigh: 'উচ্চ (৭৫%)',
    probLegendModerate: 'মধ্যম (৫০%)',
    confidenceScore: 'বিশ্বাসযোগ্যতা: ৯৪.২%',
    peakDangerWindow: 'চৰম বিপদকালীন সময়: আজি ১৪:০০ - ১৮:০০',
    whyHighRisk: 'এই অঞ্চলটো কিয় উচ্চ ঝুঁকিপূৰ্ণ?',

    liveAlerts: 'সজীৱ সতৰ্কবাৰ্তা',
    viewAllAlerts: 'সকলো সতৰ্কবাৰ্তা চাওক',
    responseRequired: 'সঁহাৰিৰ প্ৰয়োজন',
    viewDetails: 'বিৱৰণ চাওক',
    alertId: 'আইডি:',
    alertUrgentCount: 'জৰুৰী',

    roadConnectivity: 'পথ সংযোগ স্থিতি',
    allCorridors: 'সকলো কৰিড’ৰ',
    recentFieldReports: 'সাম্প্ৰতিক ক্ষেত্ৰ প্ৰতিবেদন',
    submitReportBtn: 'প্ৰতিবেদন দাখিল কৰক',
    allReportsBtn: 'সকলো প্ৰতিবেদন',
    emergencyPriorities: 'জৰুৰীকালীন সঁহাৰিৰ অগ্ৰাধিকাৰ',
    highestRiskLocations: 'সৰ্বোচ্চ ঝুঁকিপূৰ্ণ স্থানসমূহ',
    districtRiskAnalysis: 'জিলা ঝুঁকি বিশ্লেষণ',
    infrastructureStatus: 'আন্তঃগাঁথনি আৰু সংযোগৰ স্থিতি',

    footerDescription: 'ভাৰতৰ উত্তৰ-পূৰ্বাঞ্চলৰ বাবে AI-চালিত দুৰ্যোগ ঝুঁকি নিৰীক্ষণ আৰু আগতীয়া সতৰ্কবাৰ্তা মঞ্চ।',
    poweredBy: 'সহায়তাত:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'উপগ্ৰহ তথ্য',
    sensorIntelligence: 'চেন্সৰ প্ৰযুক্তি',
    platformCol: 'মঞ্চ',
    monitoringCol: 'নিৰীক্ষণ',
    resourcesCol: 'সম্পদসমূহ',
    supportCol: 'সহায়তা',
    landslideRiskNav: 'ভূমিস্খলন ঝুঁকি',
    weatherRadarNav: 'বতৰ আৰু ৰাডাৰ',
    soilMoistureNav: 'মাটিৰ আৰ্দ্ৰতা',
    terrainInSarNav: 'টেৰেইন InSAR',
    roadConnectivityNav: 'পথ সংযোগ',
    emergencyGuidelines: 'জৰুৰীকালীন নিৰ্দেশনাৱলী',
    disasterManagement: 'দুৰ্যোগ ব্যৱস্থাপনা',
    userGuideSop: 'ব্যৱহাৰকাৰী সহায়িকা আৰু SOP',
    apiDocs: 'API নথি-পত্ৰ',
    systemStatus: 'ব্যৱস্থা স্থিতি',
    helpCenter: 'সাহায্য কেন্দ্ৰ',
    contactSupport: 'যোগাযোগ কৰক',
    reportIssue: 'সমস্যাৰ খবৰ দিয়ক',
    emergencyHotline: 'জৰুৰীকালীন হেল্পলাইন: ১০৭০ / ১১২',
    organizationLabel: 'সংগঠন',
    organizationName: 'উত্তৰ-পূৰ্ব অঞ্চল উন্নয়ন মন্ত্ৰালয় (MDoNER)',
    departmentLabel: 'বিভাগ',
    departmentName: 'উত্তৰ-পূৰ্ব মহাকাশ প্ৰয়োগ কেন্দ্ৰ (NESAC) আৰু NDMA',
    categoryLabel: 'শ্ৰেণী',
    categoryName: 'চৰকাৰী দুৰ্যোগ ব্যৱস্থাপনা প্ৰণালী',
    coverageLabel: 'পৰিধি',
    coverageName: 'ভাৰতৰ ৮খন উত্তৰ-পূৰ্বাঞ্চলৰ ৰাজ্য',
    copyrightText: '© ২০২৬ উত্তৰ-পূৰ্বাঞ্চল ভূমিস্খলন আগতীয়া সতৰ্কবাৰ্তা ব্যৱস্থা। ভাৰত চৰকাৰ। সৰ্বস্বত্ব সংৰক্ষিত।',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfUse: 'ব্যৱহাৰৰ নিয়ম',
    accessibility: 'সহজ প্ৰৱেশাধিকাৰ',
    disclaimer: 'দায়মুক্তি'
  },
  Bengali: {
    systemTitle: 'উত্তর-পূর্বাঞ্চল ভূমিধস আগাম সতর্কবার্তা ব্যবস্থা',
    systemSubtitle: 'এআই-চালিত ঝুঁকি পর্যবেক্ষণ ও বিপর্যয় ব্যবস্থাপনা',
    systemOperational: 'সিস্টেম স্বাভাবিকভাবে সক্রিয়',
    signedInAs: 'লগ ইন করেছেন',
    roleOfficer: 'পদ: জেলা শাসক',
    myProfile: 'আমার প্রোফাইল',
    systemSettings: 'সিস্টেম সেটিংস',
    signOut: 'সাইন আউট',
    notifications: 'বিজ্ঞপ্তি',
    selectLanguage: 'ভাষা',
    sessionAuthenticated: 'সরকারি এনআইসি শংসাপত্র দ্বারা যাচাইকৃত সেশন।',

    navDashboard: 'ড্যাশবোর্ড',
    navRiskMap: 'ঝুঁকি মানচিত্র',
    navAiPredictions: 'এআই পূর্বাভাস',
    navAlerts: 'সতর্কতা',
    navFieldReports: 'মাঠ প্রতিবেদন',
    navInfrastructure: 'অবকাঠামো',
    navAnalytics: 'বিশ্লেষণ',

    regionalAlertLevel: 'আঞ্চলিক সতর্কতা মাত্রা:',
    alertLevelOrange: 'কমলা — পাহাড়ী ঢালে আসন্ন ভূমিধস ঝুঁকি',
    alertLevelOrangeDesc: 'সিকিম ও অরুণাচল প্রদেশে অবিরাম বর্ষণে পাহাড়ী ঢালে মাটির মারাত্মক আর্দ্রতা তৈরি হয়েছে।',
    reportHazard: 'বিপদের রিপোর্ট করুন',
    emergencyResponse: 'জরুরি প্রতিক্রিয়া',
    exportTelemetry: 'টেলিমেট্রি রপ্তানি',
    regionalRiskOverview: 'আঞ্চলিক ঝুঁকি পর্যালোচনা',
    overviewSubtitle: 'উত্তর-পূর্বাঞ্চলে রিয়েল-টাইম ভূমিধস পর্যবেক্ষণ ও আগাম সতর্কতা তথ্য।',
    lastUpdated: 'সর্বশেষ আপডেট: ২ মিনিট আগে',
    refreshData: 'তথ্য রিফ্রেশ করুন',

    highRiskZones: 'উচ্চ ঝুঁকিপূর্ণ এলাকা',
    criticalZones: 'সংকটপূর্ণ এলাকা',
    roadsAffected: 'ক্ষতিগ্রস্ত সড়ক',
    activeAlerts: 'সক্রিয় সতর্কতা',
    monitoredLocations: 'নজরদারিকৃত এলাকা',
    increasing: 'বৃদ্ধি পাচ্ছে',
    immediateAttention: 'অবিলম্বে ব্যবস্থা প্রয়োজন • NDRF সতর্ক',
    highways: 'মহাসড়ক',
    active: 'সক্রিয়',
    urgent: 'জরুরি',
    viewRiskMap: 'মানচিত্র দেখুন',
    filterCriticalSites: 'সংকটপূর্ণ স্থান দেখুন',
    viewRouteBreakdown: 'সড়ক বিবরণী দেখুন',
    openAlertConsole: 'সতর্কতা কনসোল খুলুন',
    viewTelemetryGrid: 'টেলিমেট্রি গ্রিড দেখুন',
    highRiskSubtitle: 'গতকাল থেকে +৬ বেশি • ১৪টি স্বয়ংক্রিয় সতর্কতা',
    criticalSubtitle: 'অবিলম্বে ব্যবস্থা প্রয়োজন • NDRF তৎপর',
    roadsSubtitle: '৫টি প্রধান সড়ক অবরুদ্ধ • NH-10 ও NH-29',
    alertsSubtitle: 'বিগত ১ ঘণ্টায় ৩টি • ৮টি চরম, ৪টি সতর্কতা',
    monitoredSubtitle: 'উত্তর-পূর্বাঞ্চলের ৮টি রাজ্যজুড়ে নজরদারি',

    liveLandslideRiskMap: 'লাইভ ভূমিধস ঝুঁকি মানচিত্র',
    mapEngineBadge: 'OpenStreetMap ও Leaflet ইঞ্জিন',
    mapSubtitle: 'বৃষ্টিপাত, মাটির আর্দ্রতা, ঢাল ও ভূ-সেন্সরের তথ্যের ওপর ভিত্তি করে রিয়েল-টাইম মানচিত্র।',
    filterLabel: 'ফিল্টার:',
    filterAll: 'সব',
    filterCritical: 'সংকটপূর্ণ',
    filterHigh: 'উচ্চ',
    filterModerate: 'মাঝারি',
    filterLow: 'কম',
    zoomIn: 'জুম ইন',
    zoomOut: 'জুম আউট',
    resetMap: 'উত্তর-পূর্বাঞ্চল কেন্দ্রে রিসেট করুন',
    mapLayers: 'মানচিত্রের স্তর',
    gisLayerControls: 'GIS স্তর নিয়ন্ত্রণ',
    baseMapTiles: 'মূল মানচিত্র প্রকার',
    street: 'রাস্তা',
    satellite: 'উপগ্রহ',
    terrain: 'ভূ-প্রকৃতি',
    telemetryOverlays: 'টেলিমেট্রি ওভারলে',
    roadsAndLifelines: 'সড়ক ও লাইফলাইন',
    rainfallIsohyets: 'বৃষ্টিপাতের সমরেখা',
    soilMoistureZones: 'মাটির আর্দ্রতা অঞ্চল',
    historicalLandslides: 'ঐতিহাসিক ভূমিধস স্থান',
    openLocationInspector: 'স্থান বিবরণ খুলুন',
    rainfallParam: 'বৃষ্টি',
    moistureParam: 'আর্দ্রতা',
    slopeParam: 'ঢাল',
    probParam: 'সম্ভাবনা',

    environmentalRiskIndicators: 'পরিবেশগত ঝুঁকি সূচক',
    clickToDiagnose: 'পরীক্ষার জন্য ক্লিক করুন',
    environmentalTelemetryDesc: 'উত্তর-পূর্বের ১২৮৪টি স্বয়ংক্রিয় আবহাওয়া ও জিওটেকনিক্যাল সেন্সর স্টেশন থেকে সংগৃহীত।',
    syncMinAgo: 'সিঙ্ক: ৫ মিনিট আগে',
    rainfall24h: '২৪ ঘণ্টার বৃষ্টিপাত',
    rainfallThresholdExceeded: 'সীমা: ১২০ মিমি • অতিক্রম করেছে',
    soilMoisture: 'মাটির আর্দ্রতা স্তর',
    criticalSaturation: 'সংকটপূর্ণ আর্দ্রতা',
    porePressureHigh: 'পোর প্রেসার: ৪৮ kPa • উচ্চ ঝুঁকি',
    slopeStability: 'পাহাড়ী ঢালের স্থায়িত্ব',
    meanIncline: 'গড় নতি',
    unstable: 'অস্থির ঢাল',
    shearStrainRate: 'শিয়ার স্ট্রেন: ৪.২ মিমি/ঘণ্টা • সক্রিয় স্খলন',
    weatherForecast: 'আবহাওয়ার পূর্বাভাস',
    heavyRain: 'ভারী বৃষ্টিপাত',
    next6Hours: 'আগামী ৬ ঘণ্টা',
    imdWarningOrange: 'IMD সতর্কতা: অরেঞ্জ অ্যালার্ট (৪৫-৬৫ মিমি/ঘণ্টা)',
    viewLiveTelemetryDiagnostics: 'লাইভ টেলিমেট্রি / ডায়াগনস্টিক দেখুন',

    aiLandslidePrediction: 'এআই ভূমিধস পূর্বাভাস',
    aiModelBadge: 'মডেল: LandslideRisk-v1',
    aiPredictionDesc: 'মেশিন লার্নিং মডেল পরিবেশগত ও ঐতিহাসিক তথ্য বিশ্লেষণ করে উদীয়মান ঝুঁকি চিহ্নিত করে।',
    viewAiAnalysis: 'এআই বিশ্লেষণ দেখুন',
    riskProbability24h: 'ভূমিধস ঝুঁকি সম্ভাবনা — আগামী ২৪ ঘণ্টা',
    probLegendCritical: 'সংকটপূর্ণ (৮৫%)',
    probLegendHigh: 'উচ্চ (৭৫%)',
    probLegendModerate: 'মাঝারি (৫০%)',
    confidenceScore: 'নির্ভরযোগ্যতা: ৯৪.২%',
    peakDangerWindow: 'সর্বোচ্চ বিপদের সময়: আজ ১৪:০০ - ১৮:০০',
    whyHighRisk: 'এই এলাকা কেন উচ্চ ঝুঁকিপূর্ণ?',

    liveAlerts: 'লাইভ সতর্কতা',
    viewAllAlerts: 'সব সতর্কতা দেখুন',
    responseRequired: 'সাড়া দেওয়া আবশ্যক',
    viewDetails: 'বিস্তারিত দেখুন',
    alertId: 'আইডি:',
    alertUrgentCount: 'জরুরি',

    roadConnectivity: 'সড়ক যোগাযোগ পরিস্থিতি',
    allCorridors: 'সব করিডোর',
    recentFieldReports: 'সাম্প্রতিক মাঠ প্রতিবেদন',
    submitReportBtn: 'প্রতিবেদন জমা দিন',
    allReportsBtn: 'সব প্রতিবেদন',
    emergencyPriorities: 'জরুরি সাড়া প্রদানের অগ্রাধিকার',
    highestRiskLocations: 'সর্বোচ্চ ঝুঁকিপূর্ণ স্থানসমূহ',
    districtRiskAnalysis: 'জেলা ঝুঁকি বিশ্লেষণ',
    infrastructureStatus: 'অবকাঠামো ও যোগাযোগ পরিস্থিতি',

    footerDescription: 'ভারতের উত্তর-পূর্বাঞ্চলের জন্য এআই-চালিত দুর্যোগ ঝুঁকি পর্যবেক্ষণ ও আগাম সতর্কবার্তা প্ল্যাটফর্ম।',
    poweredBy: 'পরিচালনায়:',
    aiPowered: 'এআই',
    gisMapping: 'জিআইএস',
    satelliteData: 'উপগ্রহ তথ্য',
    sensorIntelligence: 'সেন্সর প্রযুক্তি',
    platformCol: 'প্ল্যাটফর্ম',
    monitoringCol: 'পর্যবেক্ষণ',
    resourcesCol: 'রিসোর্স',
    supportCol: 'সহায়তা',
    landslideRiskNav: 'ভূমিধস ঝুঁকি',
    weatherRadarNav: 'আবহাওয়া ও রাডার',
    soilMoistureNav: 'মাটির আর্দ্রতা',
    terrainInSarNav: 'ভূখণ্ড InSAR',
    roadConnectivityNav: 'সড়ক যোগাযোগ',
    emergencyGuidelines: 'জরুরি নির্দেশিকা',
    disasterManagement: 'বিপর্যয় ব্যবস্থাপনা',
    userGuideSop: 'ব্যবহারকারী নির্দেশিকা ও এসওপি',
    apiDocs: 'এপিআই ডকুমেন্টেশন',
    systemStatus: 'সিস্টেম স্ট্যাটাস',
    helpCenter: 'সহায়তা কেন্দ্র',
    contactSupport: 'সাপোর্ট যোগাযোগ',
    reportIssue: 'সমস্যা রিপোর্ট করুন',
    emergencyHotline: 'জরুরি হটলাইন: ১০৭০ / ১১২',
    organizationLabel: 'সংস্থা',
    organizationName: 'উত্তর পূর্বাঞ্চল উন্নয়ন মন্ত্রণালয় (MDoNER)',
    departmentLabel: 'বিভাগ',
    departmentName: 'উত্তর পূর্ব মহাকাশ প্রয়োগ কেন্দ্র (NESAC) ও NDMA',
    categoryLabel: 'শ্রেণী',
    categoryName: 'সরকারি বিপর্যয় ব্যবস্থাপনা প্ল্যাটফর্ম',
    coverageLabel: 'পরিসীমা',
    coverageName: 'ভারতের ৮টি উত্তর-পূর্ব রাজ্য',
    copyrightText: '© ২০২৬ উত্তর-পূর্বাঞ্চল ভূমিধস আগাম সতর্কবার্তা ব্যবস্থা। ভারত সরকার। সর্বস্বত্ব সংরক্ষিত।',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfUse: 'ব্যবহারের শর্তাবলী',
    accessibility: 'অ্যাক্সেসযোগ্যতা',
    disclaimer: 'দাবিত্যাগ'
  },
  Manipuri: {
    systemTitle: 'NER লেন্দস্লাইদ অহেনবা চেকশিন ৱাফম সিস্তেম',
    systemSubtitle: 'AI-না থৌরাং তৌবা খুদোংথিবগী ৱারোইশিন',
    systemOperational: 'সিস্তেম মপুংফানা থবক তৌরি',
    signedInAs: 'লগ ইন তৌরে',
    roleOfficer: 'ফম: দিষ্ট্রিক কলেক্তর',
    myProfile: 'ঐগী প্রোফাইল',
    systemSettings: 'সিস্তেম সেটিংস',
    signOut: 'থোকপা',
    notifications: 'পাওদমশিং',
    selectLanguage: 'লোন',
    sessionAuthenticated: 'লৈঙাক্কী NIC ক্রেদেন্সিয়েলনা সেসন শেম্লে।',

    navDashboard: 'দেশবোর্দ',
    navRiskMap: 'মেপ',
    navAiPredictions: 'AI মতুংগী ফিভম',
    navAlerts: 'চেকশিন ৱাফম',
    navFieldReports: 'লমগী পাওদম',
    navInfrastructure: 'ইনফ্রাস্ত্রকচর',
    navAnalytics: 'এনালিটিক্স',

    regionalAlertLevel: 'লমদমগী চেকশিন তাঙ্কক:',
    alertLevelOrange: 'হিকপা মাঙবা — চিংলেম্বী খোকপগী অচৌবা খুদোংথিবা',
    alertLevelOrangeDesc: 'সিক্কিম অমসুং অরুনাচল প্রদেশতা নোং কুপ্না চুরাকপদগী চিংগী লৈহাওনা ঈশিং মপুংফানা লৌরে।',
    reportHazard: 'খুদোংথিবা পাওদম তৌবা',
    emergencyResponse: 'খুদক্তা তৌগদবা থবক',
    exportTelemetry: 'তেলিমিত্রি এক্সপোর্ত',
    regionalRiskOverview: 'লমদম অসিগী খুদোংথিবগী ফিভম',
    overviewSubtitle: 'নোংপোক-অৱাংবা ভারতকী লেন্দস্লাইদ য়েংশিনবা অমসুং অহেনবা চেকশিন ৱাফম।',
    lastUpdated: 'হন্দক নৌনা ফংবা: মিনিট ২গী মমাংদা',
    refreshData: 'অনৌবা ফংহনবা',

    highRiskZones: 'খুদোংথিবা মফমশিং',
    criticalZones: 'অকনবা মফমশিং',
    roadsAffected: 'শোমহল্লবা লম্বীশিং',
    activeAlerts: 'হৌজিক চত্থরিবা ৱাফম',
    monitoredLocations: 'য়েংশিল্লিবা মফমশিং',
    increasing: 'হেনগৎলক্লি',
    immediateAttention: 'খুদক্তা য়েংশিনগদবা • NDRF চেকশিনহৌরে',
    highways: 'হাইভেশিং',
    active: 'সক্রিয়',
    urgent: 'অকিবনি',
    viewRiskMap: 'মেপ য়েংবা',
    filterCriticalSites: 'অকনবা মফমশিং খনব',
    viewRouteBreakdown: 'লম্বীগী ফিভম য়েংবা',
    openAlertConsole: 'অলর্ত কন্সোল হাংদোকপা',
    viewTelemetryGrid: 'তেলিমিত্রি গ্রিদ য়েংবা',
    highRiskSubtitle: 'ঙরাংদগী +৬ হেনগৎলে • ১৪ ওতোমেতিক অলর্ত',
    criticalSubtitle: 'খুদক্তা য়েংশিনগদবা • NDRF শেম-শারে',
    roadsSubtitle: 'অচৌবা লম্বী ৫ থিংজিল্লে • NH-10 অমসুং NH-29',
    alertsSubtitle: 'পুং ১সিদা ৩ • ৮ অচৌবা, ৪ চেকশিনবা',
    monitoredSubtitle: 'অৱাং-নোংপোক স্তেত ৮ চুপ্পদা',

    liveLandslideRiskMap: 'লাইভ লেন্দস্লাইদ মেপ',
    mapEngineBadge: 'OpenStreetMap অমসুং Leaflet ইঞ্জীন',
    mapSubtitle: 'নোং চুরিবগী চাং, লৈহাওগী ঈশিং, চিংগী চিংলা অমসুং চেন্সর তেলিমিত্রিদা য়ুম্ফম ওইবা মেপ।',
    filterLabel: 'ফিল্তর:',
    filterAll: 'পুম্নমক',
    filterCritical: 'অকনবা',
    filterHigh: 'ৱাংবা',
    filterModerate: 'ময়ায়',
    filterLow: 'নেম্বা',
    zoomIn: 'জুম ইন',
    zoomOut: 'জুম আউত',
    resetMap: 'NER ময়োলদা পুশিল্লকপা',
    mapLayers: 'মেপকী লেয়রশিং',
    gisLayerControls: 'GIS লেয়র কন্ত্রোল',
    baseMapTiles: 'য়ুম্ফম মেপ টাইপ',
    street: 'লম্বী',
    satellite: 'সেতেলাইত',
    terrain: 'লমগী মশক',
    telemetryOverlays: 'তেলিমিত্রি ওভারলে',
    roadsAndLifelines: 'লম্বী অমসুং লাইফলাইন',
    rainfallIsohyets: 'নোং চুরিবগী চাং',
    soilMoistureZones: 'লৈহাওগী ঈশিং মফম',
    historicalLandslides: 'হান্নগী লেন্দস্লাইদ থোকফম',
    openLocationInspector: 'মফমসিগী পাওদম হাংদোকপা',
    rainfallParam: 'নোং',
    moistureParam: 'ঈশিং চাং',
    slopeParam: 'চিংলা',
    probParam: 'চাং',

    environmentalRiskIndicators: 'মহৌশাগী খুদোংথিবা তাকপশিং',
    clickToDiagnose: 'য়েংশিন্নবা নম্বিয়ু',
    environmentalTelemetryDesc: 'NER শিনবা থুংনা লৈবা IoT সেন্সর ১২৮৪ দগী পুথোকপা লাইভ তেলিমিত্রি।',
    syncMinAgo: 'সিঙ্ক: মিনিট ৫গী মমাংদা',
    rainfall24h: 'পুং ২৪গী নোং',
    rainfallThresholdExceeded: 'থ্রেশহোল্দ: ১২০ মিমী • হেনখ্রে',
    soilMoisture: 'লৈহাওগী ঈশিং চাং',
    criticalSaturation: 'অকনবা ঈশিং চাং',
    porePressureHigh: 'পোৰ প্রেসৰ: ৪৮ kPa • খুদোংথিবা ৱাংই',
    slopeStability: 'চিংলা লেপতুনা লৈবা',
    meanIncline: 'চিংলাগী মায়োল',
    unstable: 'লেপ্তবা চিংলা',
    shearStrainRate: 'সীয়ার স্ত্রেন: ৪.২ মিমী/পুং • খোংজেল য়াংলি',
    weatherForecast: 'নোং-নুংশিৎকী ফিভম',
    heavyRain: 'নোং কনবা',
    next6Hours: 'মথংগী পুং ৬সিদা',
    imdWarningOrange: 'IMD চেকশিন ৱাফম: ওরেন্জ অলর্ত (৪৫-৬৫ মিমী/পুং)',
    viewLiveTelemetryDiagnostics: 'লাইভ তেলিমিত্রি য়েংবা',

    aiLandslidePrediction: 'AI লেন্দস্লাইদ মতুংগী ফিভম',
    aiModelBadge: 'মোদেল: LandslideRisk-v1',
    aiPredictionDesc: 'মেছিন লর্নিং মোদেলশিংনা মতুংগী খুদোংথিবশিং খঙদোক্নবা মহৌশাগী ডাটা নৈনৈ।',
    viewAiAnalysis: 'AI এনালাইসিস য়েংবা',
    riskProbability24h: 'লেন্দস্লাইদ থোকপগী চাং — পুং ২৪গী মনুংদা',
    probLegendCritical: 'অকনবা (৮৫%)',
    probLegendHigh: 'ৱাংবা (৭৫%)',
    probLegendModerate: 'ময়ায় (৫০%)',
    confidenceScore: 'থাজবা য়াবা চাং: ৯৪.২%',
    peakDangerWindow: 'খুদোংথিবা চাউবা মতম: ঙসি ১৪:০০ - ১৮:০০',
    whyHighRisk: 'মফমসি করম্না খুদোংথিবনো?',

    liveAlerts: 'লাইভ চেকশিন ৱাফম',
    viewAllAlerts: 'পুম্নমক য়েংবা',
    responseRequired: 'থবক পাইখৎকদবা',
    viewDetails: 'অকুপ্পা য়েংবা',
    alertId: 'আইদি:',
    alertUrgentCount: 'অকিবনি',

    roadConnectivity: 'লম্বীগী মরী ফিভম',
    allCorridors: 'লম্বী পুম্নমক',
    recentFieldReports: 'হন্দক্কী লমগী পাওদম',
    submitReportBtn: 'পাওদম থাবা',
    allReportsBtn: 'পাওদম পুম্নমক',
    emergencyPriorities: 'খুদক্তা তৌগদবা থবকশিং',
    highestRiskLocations: 'খ্বাইদগী খুদোংথিবা মফমশিং',
    districtRiskAnalysis: 'জিলাগী ফিভম নৈনবা',
    infrastructureStatus: 'ইনফ্রাস্ত্রকচর অমসুং লম্বীগী ফিভম',

    footerDescription: 'নোংপোক-অৱাংবা ভারতকীদমক AI-না চলাইবা লেন্দস্লাইদ চেকশিন ৱাফম অমসুং য়েংশিনবগী প্লেৎফোৰ্ম।',
    poweredBy: 'সাপোর্ত তৌরিবা:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'সেতেলাইত ডাটা',
    sensorIntelligence: 'সেন্সর তেলিমিত্রি',
    platformCol: 'প্লেৎফোৰ্ম',
    monitoringCol: 'য়েংশিনবা',
    resourcesCol: 'রিসোর্সশিং',
    supportCol: 'সাপোর্ত',
    landslideRiskNav: 'লেন্দস্লাইদ রিস্ক',
    weatherRadarNav: 'নোং-নুংশিৎ অমসুং রাদার',
    soilMoistureNav: 'লৈহাওগী ঈশিং চাং',
    terrainInSarNav: 'তেরেইন InSAR',
    roadConnectivityNav: 'লম্বীগী মরী',
    emergencyGuidelines: 'জরুরী কাংলোনশিং',
    disasterManagement: 'খুদোংথিবা মেনেজমেন্ত',
    userGuideSop: 'য়ুজর গাইদ অমসুং SOP',
    apiDocs: 'API দক্যুমেন্ত',
    systemStatus: 'সিস্তেমগী ফিভম',
    helpCenter: 'হেল্প সেন্তর',
    contactSupport: 'কন্তেক্ত সপোর্ত',
    reportIssue: 'ৱাকৎপা',
    emergencyHotline: 'ইমর্জেন্সী হোৎলাইন: ১০৭০ / ১১২',
    organizationLabel: 'সংগঠন',
    organizationName: 'নোংপোক-অৱাং লমদম চাউখৎ-থৌরাং মন্ত্রালয় (MDoNER)',
    departmentLabel: 'বিভাগ',
    departmentName: 'নোংপোক-অৱাংবা স্পেস এপ্লিকেসন সেন্তর (NESAC) অমসুং NDMA',
    categoryLabel: 'থাক',
    categoryName: 'লৈঙাক্কী খুদোংথিবা মেনেজমেন্ত প্লেৎফোৰ্ম',
    coverageLabel: 'লমদম',
    coverageName: 'ভারতকী অৱাং-নোংপোক স্তেত ৮',
    copyrightText: '© ২০২৬ NER লেন্দস্লাইদ অহেনবা চেকশিন ৱাফম সিস্তেম। ভারত লৈঙাক। হক পুম্নমক ঙাকপনি।',
    privacyPolicy: 'প্রাইভেসি পোলিসি',
    termsOfUse: 'শীজিন্নবগী কাংলোন',
    accessibility: 'এক্সেসিবিলিতি',
    disclaimer: 'দিসক্লেইমর'
  },
  Mizo: {
    systemTitle: 'NER Min Chhe Hma Khawpui Enpuitu',
    systemSubtitle: 'AI hmanga Chhiatrupna Leh Min Chhiatna Vengtu',
    systemOperational: 'Khawl A Thawk Tha E',
    signedInAs: 'Lut Tu:',
    roleOfficer: 'Hna: District Collector',
    myProfile: 'Ka Profile',
    systemSettings: 'Khawl Kaihhruaina',
    signOut: 'Chhuak Rawh',
    notifications: 'Hriattirnate',
    selectLanguage: 'Ṭawng',
    sessionAuthenticated: 'Sawrkar NIC hmanga nemngheh fel a ni.',

    navDashboard: 'Dashboard',
    navRiskMap: 'Risk Map',
    navAiPredictions: 'AI Rinlawkna',
    navAlerts: 'Vaukhanna',
    navFieldReports: 'Field Report',
    navInfrastructure: 'Kawng Leh Inremna',
    navAnalytics: 'Thil Chhinchhiahna',

    regionalAlertLevel: 'Bial Vaukhanna Dinhmun:',
    alertLevelOrange: 'ENG-SEN — MIN CHHIAT DANGCHAWH DINHMUN',
    alertLevelOrangeDesc: 'Sikkim leh Arunachal Pradesh-a ruah sur nasat avangin tlang pang a hnawng nasa hle.',
    reportHazard: 'Chhiatna Thlen Thei Hriattir Rawh',
    emergencyResponse: 'Rang Taka Chetlakna',
    exportTelemetry: 'Telemetry Data La Chhuak Rawh',
    regionalRiskOverview: 'Hmar Chhak Bial Dinhmun Tlangpui',
    overviewSubtitle: 'Hmar Chhak biala min chhe thleng thei dinhmun rang taka hriattirna khawl.',
    lastUpdated: 'Tihtharnun hnuhnung: Minit 2 liam ta',
    refreshData: 'Thar Tura Tihtawp',

    highRiskZones: 'Hmun Hlauhawm Zual',
    criticalZones: 'Hmun Hlauthawnhawm',
    roadsAffected: 'Kawng Chhe Hote',
    activeAlerts: 'Vaukhanna Kal Mek',
    monitoredLocations: 'Hmun Vil Mekte',
    increasing: 'Pung chho mek',
    immediateAttention: 'Rang taka buaipui ngai • NDRF hriattir tawh',
    highways: 'Kawngpui lian',
    active: 'Thawk mek',
    urgent: 'Hmanhmawhthlak',
    viewRiskMap: 'Risk Map En Rawh',
    filterCriticalSites: 'Hmun hlauhawm zual thlang chhuak rawh',
    viewRouteBreakdown: 'Kawng dinhmun kimchang',
    openAlertConsole: 'Vaukhanna hmunpui hawng rawh',
    viewTelemetryGrid: 'Telemetry Grid En Rawh',
    highRiskSubtitle: 'Nimin aiin +6 in a tam • 14 automated alerts',
    criticalSubtitle: 'Hmanhmawh taka chetlak ngai • NDRF hriattir tawh',
    roadsSubtitle: 'Kawngpui lian 5 a ping • NH-10 & NH-29',
    alertsSubtitle: 'Darkar 1 liamta khan 3 • 8 Severe, 4 Warning',
    monitoredSubtitle: 'Hmar Chhak state 8 huamin',

    liveLandslideRiskMap: 'Min Chhiat Hlauhawm Lemchan',
    mapEngineBadge: 'OpenStreetMap & Leaflet Engine',
    mapSubtitle: 'Ruahsur dan, leitha tuihnang, tlang pang awn zawng leh sensor atanga chhut chhuah.',
    filterLabel: 'Thlanna:',
    filterAll: 'ZAWNG',
    filterCritical: 'HLAUHAWM ZUAL',
    filterHigh: 'SANG',
    filterModerate: 'LAIHNAWLPUI',
    filterLow: 'HNIAH',
    zoomIn: 'Tilenna (+)',
    zoomOut: 'Titehna (−)',
    resetMap: 'NER Laipui-ah Dah Tha Rawh',
    mapLayers: 'Map Hrang Hrang',
    gisLayerControls: 'GIS Layer Controls',
    baseMapTiles: 'Map Hnuaipui',
    street: 'Kawng',
    satellite: 'Satellite',
    terrain: 'Tlang Ram',
    telemetryOverlays: 'Telemetry Overlays',
    roadsAndLifelines: 'Kawngpui Pawimawhte',
    rainfallIsohyets: 'Ruah Sur Chhinchhiahna',
    soilMoistureZones: 'Leitha Tuihnang Hmun',
    historicalLandslides: 'Hmanlai Min Chhiatna Hmun',
    openLocationInspector: 'Hmun Dinhmun En Rawh',
    rainfallParam: 'Ruah',
    moistureParam: 'Hnawng',
    slopeParam: 'Awn',
    probParam: 'Chanvo',

    environmentalRiskIndicators: 'Bial Chhung Sik Leh Sa Dinhmun',
    clickToDiagnose: 'Hriatchian Nan Hmet Rawh',
    environmentalTelemetryDesc: 'NER chhung sensor khawl 1,284 atanga lakkhawm a ni.',
    syncMinAgo: 'Sync: Minit 5 liam ta',
    rainfall24h: 'Darkar 24 Ruah Sur Dan',
    rainfallThresholdExceeded: 'Pelh Chin: 120 mm • A pel tawh',
    soilMoisture: 'Leitha Tuihnang',
    criticalSaturation: 'Hnawng Hlauhawm',
    porePressureHigh: 'Pore Pressure: 48 kPa • A sang hle',
    slopeStability: 'Tlang Pang Ngheh Dan',
    meanIncline: 'awn dan chawhrual',
    unstable: 'A nghet lo',
    shearStrainRate: 'Shear Strain: 4.2 mm/hr • A tawlh mek',
    weatherForecast: 'Khawchin Thlirna',
    heavyRain: 'Ruahpui Vanawn',
    next6Hours: 'Darkar 6 lo awm turah',
    imdWarningOrange: 'IMD Vaukhanna: Orange Alert (45-65 mm/hr)',
    viewLiveTelemetryDiagnostics: 'Telemetry Enchhinna Hawng Rawh',

    aiLandslidePrediction: 'AI Min Chhiat Rinlawkna',
    aiModelBadge: 'Model: LandslideRisk-v1',
    aiPredictionDesc: 'Khawl thiamna (AI) hmangin hun kal tawh leh sik leh sa zirchian mek a ni.',
    viewAiAnalysis: 'AI Zirchianna En Rawh',
    riskProbability24h: 'Min Chhiat Thlen Theih Dan — Darkar 24 Lo Awm Turah',
    probLegendCritical: 'Hlauhawm Zual (85%)',
    probLegendHigh: 'Sang (75%)',
    probLegendModerate: 'Laihrawl (50%)',
    confidenceScore: 'Rintlak Dan: 94.2%',
    peakDangerWindow: 'Hlauhawm Hunlai Ber: 14:00 - 18:00 Vawiin',
    whyHighRisk: 'Engvanginnge he hmun hi a hlauhawm?',

    liveAlerts: 'Vaukhanna Awm Mek',
    viewAllAlerts: 'Vaukhanna Zawng En Rawh',
    responseRequired: 'Tawngchhanna Ngai',
    viewDetails: 'Kimchang En Rawh',
    alertId: 'ID:',
    alertUrgentCount: 'Hmanhmawhthlak',

    roadConnectivity: 'Kawngpui Inzawmna',
    allCorridors: 'Kawngpui Zawng',
    recentFieldReports: 'Field Report Hnuhnung Berte',
    submitReportBtn: 'Report Thehlut Rawh',
    allReportsBtn: 'Report Zawng',
    emergencyPriorities: 'Rang Taka Chetlak Ngaite',
    highestRiskLocations: 'Hmun Hlauhawm Zual Hote',
    districtRiskAnalysis: 'District Dinhmun Chhinchhiahna',
    infrastructureStatus: 'Kawngpui Leh Hmanraw Dinhmun',

    footerDescription: 'India Hmar Chhak biala chhiatrupna laka invenna AI khawl thiltithei tak.',
    poweredBy: 'Thlawp Tu:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'Satellite Data',
    sensorIntelligence: 'Sensor Khawl',
    platformCol: 'Khawlpui',
    monitoringCol: 'Vanna',
    resourcesCol: 'Hmanrawte',
    supportCol: 'Taimakna',
    landslideRiskNav: 'Min Chhiat Hlauhawm',
    weatherRadarNav: 'Khawchin Leh Radar',
    soilMoistureNav: 'Leitha Hnawng Dan',
    terrainInSarNav: 'InSAR Tlang Ram',
    roadConnectivityNav: 'Kawngpui Inzawmna',
    emergencyGuidelines: 'Hmanhmawh Kaihhruaina',
    disasterManagement: 'Chhiatna Enkawlna',
    userGuideSop: 'Kaihruaina Leh SOP',
    apiDocs: 'API Documentation',
    systemStatus: 'Khawl Dinhmun',
    helpCenter: 'Puihna Hmun',
    contactSupport: 'Bia Laia',
    reportIssue: 'Harsatna Hriattir Rawh',
    emergencyHotline: 'Hmanhmawh Helpline: 1070 / 112',
    organizationLabel: 'Pawl',
    organizationName: 'Ministry of Development of North Eastern Region (MDoNER)',
    departmentLabel: 'Department',
    departmentName: 'North Eastern Space Applications Centre (NESAC) & NDMA',
    categoryLabel: 'Chi',
    categoryName: 'Sawrkar Chhiatrupna Enkawlna Platform',
    coverageLabel: 'Huam Chin',
    coverageName: 'Hmar Chhak State 8',
    copyrightText: '© 2026 NER Landslide Early Warning System. India Sawrkar. Dikna zawng zawng hauh a ni.',
    privacyPolicy: 'Mimal Thuthukna',
    termsOfUse: 'Hman Dan Tur Dan',
    accessibility: 'Khawl Hman Awlsamna',
    disclaimer: 'Hriattirna Pawimawh'
  },
  Khasi: {
    systemTitle: 'Ka NER Landslide Early Warning System',
    systemSubtitle: 'Ka jingpeit bniah ia ka jingtwad khyndew da ka AI',
    systemOperational: 'Ka kor ka trei bha',
    signedInAs: 'La rung kum',
    roleOfficer: 'Kam: District Collector',
    myProfile: 'Ka Profile Jong Nga',
    systemSettings: 'Ki jingpynbeit ka kor',
    signOut: 'Mih noh',
    notifications: 'Ki jingpyntip',
    selectLanguage: 'Ktien',
    sessionAuthenticated: 'La pynskhem da ka NIC jong ka sorkar.',

    navDashboard: 'Dashboard',
    navRiskMap: 'Map jingma',
    navAiPredictions: 'Jingiohi lypa da ka AI',
    navAlerts: 'Jingmaham',
    navFieldReports: 'Kaiphod na madan',
    navInfrastructure: 'Ki surok bad ki jingtei',
    navAnalytics: 'Ka jingbishar bniah',

    regionalAlertLevel: 'Ka kyrdan jingmaham ka thain:',
    alertLevelOrange: 'SAW-STEM — KA JINGTWAD KHYNDEW BA LA JAN BHA',
    alertLevelOrangeDesc: 'U lapbah uba jur ha Sikkim bad Arunachal Pradesh u pynlong ia ka khyndew ban sngem jur.',
    reportHazard: 'Pynpaw ia ka jingma',
    emergencyResponse: 'Ka jingkloi ban iarap',
    exportTelemetry: 'Export ia ka Data',
    regionalRiskOverview: 'Ka jinglong jingman ka thain shatei lam mihngi',
    overviewSubtitle: 'Ka jingai jingtip mar ya kumta halor ka jingtwad khyndew.',
    lastUpdated: 'Update khadduh: 2 minit mynshuwa',
    refreshData: 'Pynthymmai ia ka data',

    highRiskZones: 'Ki jaka ba kham ma',
    criticalZones: 'Ki jaka ba shyrkhei',
    roadsAffected: 'Ki surok ba la shah ktah',
    activeAlerts: 'Ki jingmaham ba dang trei',
    monitoredLocations: 'Ki jaka ba la peit bniah',
    increasing: 'Dang nang kiew',
    immediateAttention: 'Donkam ban leit kloi • La pyntip ia ka NDRF',
    highways: 'Ki surok bah',
    active: 'Dang trei',
    urgent: 'Kloi',
    viewRiskMap: 'Peit ia ka map',
    filterCriticalSites: 'Jied ia ki jaka ba shyrkhei',
    viewRouteBreakdown: 'Peit ia ki surok',
    openAlertConsole: 'Plie ia ka kor maham',
    viewTelemetryGrid: 'Peit ia ka grid telemetry',
    highRiskSubtitle: '+6 na mynhynnin • 14 ki jingmaham automated',
    criticalSubtitle: 'Donkam ban shim khia mardor • NDRF la pynkhreh',
    roadsSubtitle: '5 tylli ki surok bah la khang • NH-10 & NH-29',
    alertsSubtitle: '3 ha ka shi kynta • 8 ba jur, 4 ba maham',
    monitoredSubtitle: 'Ha baroh 8 tylli ki jylla shatei lam mihngi',

    liveLandslideRiskMap: 'Ka map jingtwad khyndew mar ya kumta',
    mapEngineBadge: 'OpenStreetMap & Leaflet Engine',
    mapSubtitle: 'Ka jingbishar bniah halor u slap, ka jingjhieh ka khyndew, bad ki sensor telemetry.',
    filterLabel: 'Jied:',
    filterAll: 'BAROH',
    filterCritical: 'SHYRKHEI',
    filterHigh: 'JUR',
    filterModerate: 'PDENG',
    filterLow: 'STYR',
    zoomIn: 'Pynheh (+)',
    zoomOut: 'Pynrit (−)',
    resetMap: 'Pynphai sha pdeng NER',
    mapLayers: 'Ki layer jong ka map',
    gisLayerControls: 'Ki jingpyniaid layer GIS',
    baseMapTiles: 'Ka jait map',
    street: 'Surok',
    satellite: 'Satellite',
    terrain: 'Lum bad them',
    telemetryOverlays: 'Telemetry Overlays',
    roadsAndLifelines: 'Ki surok ba kongsan',
    rainfallIsohyets: 'Jingthew slap',
    soilMoistureZones: 'Jaka ba sngem khyndew',
    historicalLandslides: 'Jaka ba la ju twad khyndew',
    openLocationInspector: 'Plie jingtip bniah ka jaka',
    rainfallParam: 'Slap',
    moistureParam: 'Jhieh',
    slopeParam: 'Rynghang',
    probParam: 'Jingma',

    environmentalRiskIndicators: 'Ki dak jingma mariang',
    clickToDiagnose: 'Khnap ban wad bniah',
    environmentalTelemetryDesc: 'Data ba lum na ki 1,284 tylli ki sensor IoT ha kylleng ka NER.',
    syncMinAgo: 'Sync: 5 minit mynshuwa',
    rainfall24h: 'U slap 24 kynta',
    rainfallThresholdExceeded: 'Jingthew: 120 mm • La palat lypa',
    soilMoisture: 'Ka jingsngem ka khyndew',
    criticalSaturation: 'Ka jingsngem ba shyrkhei',
    porePressureHigh: 'Pore Pressure: 48 kPa • Jingma ba jur',
    slopeStability: 'Ka jingskhem u lum',
    meanIncline: 'jingran u lum',
    unstable: 'Um skhem',
    shearStrainRate: 'Shear Strain: 4.2 mm/hr • Dang khih mardor',
    weatherForecast: 'Jingpyntip ka suinbneng',
    heavyRain: 'Slap bah',
    next6Hours: 'Ki 6 kynta ban wan',
    imdWarningOrange: 'IMD Maham: Orange Alert (45-65 mm/hr)',
    viewLiveTelemetryDiagnostics: 'Peit ia ka Telemetry ba mar ya kumta',

    aiLandslidePrediction: 'Jingiohi lypa da ka AI',
    aiModelBadge: 'Model: LandslideRisk-v1',
    aiPredictionDesc: 'Ki AI model ki bishar bniah ia ka mariang ban lap ia ki jingma kiba lah ban jia.',
    viewAiAnalysis: 'Peit jingbishar AI',
    riskProbability24h: 'Jinglah ban twad khyndew — 24 kynta ban wan',
    probLegendCritical: 'Shyrkhei (85%)',
    probLegendHigh: 'Jur (75%)',
    probLegendModerate: 'Pdeng (50%)',
    confidenceScore: 'Jingshisha: 94.2%',
    peakDangerWindow: 'Por ba ma tam: 14:00 - 18:00 Mynta',
    whyHighRisk: 'Balei kane ka jaka ka ma?',

    liveAlerts: 'Ki jingmaham ba mar ya kumta',
    viewAllAlerts: 'Peit baroh ki jingmaham',
    responseRequired: 'Donkam ban leh eiei',
    viewDetails: 'Peit bniah',
    alertId: 'ID:',
    alertUrgentCount: 'Kloi',

    roadConnectivity: 'Ka jingiaid ki surok',
    allCorridors: 'Baroh ki surok',
    recentFieldReports: 'Ki kaiphod na madan kiba dang shen',
    submitReportBtn: 'Phah kaiphod',
    allReportsBtn: 'Baroh ki kaiphod',
    emergencyPriorities: 'Ki jaka ba donkam ban leit kloi',
    highestRiskLocations: 'Ki jaka ba shyrkhei tam',
    districtRiskAnalysis: 'Ka jingbishar ia ka District',
    infrastructureStatus: 'Ka jinglong ki surok bad ki jingtei',

    footerDescription: 'Ka kor AI kaba peit bniah ia ka jingtwad khyndew ha thain shatei lam mihngi jong ka India.',
    poweredBy: 'La pyntrei da:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'Satellite Data',
    sensorIntelligence: 'Sensor Telemetry',
    platformCol: 'Ka Kor',
    monitoringCol: 'Jingpeit bniah',
    resourcesCol: 'Ki lad jingiarap',
    supportCol: 'Jingiarap',
    landslideRiskNav: 'Jingtwad khyndew',
    weatherRadarNav: 'Suinbneng & Radar',
    soilMoistureNav: 'Jingsngem khyndew',
    terrainInSarNav: 'InSAR u lum',
    roadConnectivityNav: 'Jingiaid surok',
    emergencyGuidelines: 'Ki adong ha ka por jingma',
    disasterManagement: 'Jingpynkhreh ia ka jingshyrkhei',
    userGuideSop: 'Kot jingbatai & SOP',
    apiDocs: 'API Documentation',
    systemStatus: 'Ka jingtrei ka kor',
    helpCenter: 'Jaka iarap',
    contactSupport: 'Kren bad ki nongiarap',
    reportIssue: 'Pynpaw jingeh',
    emergencyHotline: 'Emergency Helpline: 1070 / 112',
    organizationLabel: 'Seng',
    organizationName: 'Ministry of Development of North Eastern Region (MDoNER)',
    departmentLabel: 'Tnat',
    departmentName: 'North Eastern Space Applications Centre (NESAC) & NDMA',
    categoryLabel: 'Jait',
    categoryName: 'Ka kor sorkar ban iada na ka jingshyrkhei',
    coverageLabel: 'Jaka ba peit',
    coverageName: '8 Tylli ki Jylla Shatei Lam Mihngi',
    copyrightText: '© 2026 NER Landslide Early Warning System. Sorkar India. Baroh ki hok la kynshew.',
    privacyPolicy: 'Ain ri jingtip',
    termsOfUse: 'Ki kyndon pyndonkam',
    accessibility: 'Jingsuk ban pyndonkam',
    disclaimer: 'Jingpynshai'
  },
  Garo: {
    systemTitle: 'NER A·a Be·ani Mikkangchi U·iatani System',
    systemSubtitle: 'AI-chi A·a Be·ani A·selrangko Sandiani aro Nambatgipa Chanchiani',
    systemOperational: 'System Nama',
    signedInAs: 'Napgipa:',
    roleOfficer: 'Kam: District Collector',
    myProfile: 'Angni Profile',
    systemSettings: 'System Settings',
    signOut: 'Ong·katbo',
    notifications: 'U·iatanirang',
    selectLanguage: 'Ku·sik',
    sessionAuthenticated: 'Sorkarini NIC-chi name tik ka·aha.',

    navDashboard: 'Dashboard',
    navRiskMap: 'Risk Map',
    navAiPredictions: 'AI-chi Chanchisamsoni',
    navAlerts: 'Mikrakatani',
    navFieldReports: 'A·baoni Report',
    navInfrastructure: 'Rama aro Nokrangni Obosta',
    navAnalytics: 'Analytics',

    regionalAlertLevel: 'Bialni Mikrakatani Gadin:',
    alertLevelOrange: 'GITCHAK-RANG·TANG — A·A BE·ANI KENGNIBEGIPA',
    alertLevelOrangeDesc: 'Sikkim aro Arunachal Pradesh-o mikka jimbe waani a·sel a·dok a·gilsak sosretaha.',
    reportHazard: 'Kenchakaniko U·iatbo',
    emergencyResponse: 'Ta·rake Jakskani',
    exportTelemetry: 'Telemetry Data Watbo',
    regionalRiskOverview: 'Salgro Saliram A·dokni Kenchakani',
    overviewSubtitle: 'Salgro Saliram a·dokrango a·a be·ani bidingo mikkangchi u·iatna sandiani.',
    lastUpdated: 'Bon·kame Taritaia: Minit 2-na skang',
    refreshData: 'Gital Gat·taibo',

    highRiskZones: 'Kenchakani Bang·gipa Damrang',
    criticalZones: 'Kenchakbegipa Damrang',
    roadsAffected: 'Nangdikgimin Ramarang',
    activeAlerts: 'Da·ororo Mikrakatanirang',
    monitoredLocations: 'Ni·rokenggipa Damrang',
    increasing: 'Baridapenga',
    immediateAttention: 'Ta·rake dakna nanga • NDRF-ko u·iataha',
    highways: 'Mikkangchi Ramarang',
    active: 'Nama',
    urgent: 'Nangchongmota',
    viewRiskMap: 'Risk Map-ko Nibo',
    filterCriticalSites: 'Kenchakgipako Seokbo',
    viewRouteBreakdown: 'Ramani Obostako Nibo',
    openAlertConsole: 'Alert Console-ko Kulibo',
    viewTelemetryGrid: 'Telemetry Grid-ko Nibo',
    highRiskSubtitle: 'Mejalo bate +6 bang·bata • 14 automated alerts',
    criticalSubtitle: 'Ta·rake dakna nanga • NDRF tarie donga',
    roadsSubtitle: 'Dal·gipa rama 5 champengaha • NH-10 & NH-29',
    alertsSubtitle: 'Gari 1-o 3 • 8 Bilgipa, 4 Mikrakatani',
    monitoredSubtitle: 'Salgro-saliramni a·dok 8 gimiko',

    liveLandslideRiskMap: 'A·a Be·ani Live Map',
    mapEngineBadge: 'OpenStreetMap & Leaflet Engine',
    mapSubtitle: 'Mikka waani, a·ani so·ani, chongolo ong·ani aro sensor data-o pangchake u·iatani.',
    filterLabel: 'Filter:',
    filterAll: 'PILAK',
    filterCritical: 'KENCHAKBEGIPA',
    filterHigh: 'CHU·GIPA',
    filterModerate: 'JATANTO',
    filterLow: 'KA·SIN',
    zoomIn: 'Dal·atbo (+)',
    zoomOut: 'Chon·atbo (−)',
    resetMap: 'NER Bijangchio Donaibo',
    mapLayers: 'Map-ni Gadangrang',
    gisLayerControls: 'GIS Layer Controls',
    baseMapTiles: 'Base Map Tiles',
    street: 'Rama',
    satellite: 'Satellite',
    terrain: 'A·brirang',
    telemetryOverlays: 'Telemetry Overlays',
    roadsAndLifelines: 'Dal·gipa Ramarang',
    rainfallIsohyets: 'Mikka Waani Chin',
    soilMoistureZones: 'A·ani So·ani Damrang',
    historicalLandslides: 'Skang Be·gimin Biaprang',
    openLocationInspector: 'Damko Ni·sengbo',
    rainfallParam: 'Mikka',
    moistureParam: 'So·a',
    slopeParam: 'Chongolo',
    probParam: 'Kenchak',

    environmentalRiskIndicators: 'A·gilsakni Kenchakani Chinrang',
    clickToDiagnose: 'Sandina Nelbo',
    environmentalTelemetryDesc: 'NER-ni sensor 1,284 IoT stations-oni chimonggimin live telemetry.',
    syncMinAgo: 'Sync: Minit 5-na skang',
    rainfall24h: 'Kynta 24-ni Mikka',
    rainfallThresholdExceeded: 'Simano: 120 mm • Bate re·angaha',
    soilMoisture: 'A·ani So·ani',
    criticalSaturation: 'Sosretbegipa Obosta',
    porePressureHigh: 'Pore Pressure: 48 kPa • Kenchaka',
    slopeStability: 'A·bri Kimkim Ong·ani',
    meanIncline: 'a·bri chongolo',
    unstable: 'Kimkim ong·ja',
    shearStrainRate: 'Shear Strain: 4.2 mm/hr • Moenggipa',
    weatherForecast: 'Sal-Buringni Obosta',
    heavyRain: 'Jimbe Mikka Waa',
    next6Hours: 'Kynta 6-ni gisepo',
    imdWarningOrange: 'IMD Mikrakatani: Orange Alert (45-65 mm/hr)',
    viewLiveTelemetryDiagnostics: 'Live Telemetry-ko Nibo',

    aiLandslidePrediction: 'AI-chi A·a Be·na Chanchisamsoni',
    aiModelBadge: 'Model: LandslideRisk-v1',
    aiPredictionDesc: 'Machine-learning models a·a be·na amgipako ta·rake sandina u·iatanirangko nina sandia.',
    viewAiAnalysis: 'AI Analysis-ko Nibo',
    riskProbability24h: 'A·a Be·ani Kenchakani — Kynta 24-ni Gisepo',
    probLegendCritical: 'Kenchakbegipa (85%)',
    probLegendHigh: 'Chu·gipa (75%)',
    probLegendModerate: 'Jatanto (50%)',
    confidenceScore: 'Ka·dongani: 94.2%',
    peakDangerWindow: 'Kenani Somoi: Da·alo 14:00 - 18:00',
    whyHighRisk: 'Maini gimin ia biap kenchakani bang·a?',

    liveAlerts: 'Live Mikrakatanirang',
    viewAllAlerts: 'Pilu Mikrakataniko Nibo',
    responseRequired: 'Ta·rake dakna nanga',
    viewDetails: 'Bata Nibo',
    alertId: 'ID:',
    alertUrgentCount: 'Ta·rakbegipa',

    roadConnectivity: 'Ramarangni Obosta',
    allCorridors: 'Pilak Ramarang',
    recentFieldReports: 'A·baoni Gital Report-rang',
    submitReportBtn: 'Report Gatbo',
    allReportsBtn: 'Pilak Report-rang',
    emergencyPriorities: 'Ta·rake Re·angani Biaprang',
    highestRiskLocations: 'Kenchakbatgipa Damrang',
    districtRiskAnalysis: 'District-ni Obostako Sandiani',
    infrastructureStatus: 'Rama aro Nok-jamni Obosta',

    footerDescription: 'India Salgro Saliramni a·a be·ani a·selrangko champengna AI-chi rikbagimin platform.',
    poweredBy: 'Dakchakangpaa:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'Satellite Data',
    sensorIntelligence: 'Sensor Telemetry',
    platformCol: 'Platform',
    monitoringCol: 'Ni·rokani',
    resourcesCol: 'Hmanrawrang',
    supportCol: 'Dakchakanirang',
    landslideRiskNav: 'A·a Be·ani',
    weatherRadarNav: 'Sal-Buring aro Radar',
    soilMoistureNav: 'A·ani So·a',
    terrainInSarNav: 'Terrain InSAR',
    roadConnectivityNav: 'Ramarangni Obosta',
    emergencyGuidelines: 'Kenchakani Somoio Dakanirang',
    disasterManagement: 'A·selko Champengani',
    userGuideSop: 'Kitap & SOP',
    apiDocs: 'API Documentation',
    systemStatus: 'System Obosta',
    helpCenter: 'Dakchakani Hmun',
    contactSupport: 'Agangrikbo',
    reportIssue: 'Neng·nikaniko U·iatbo',
    emergencyHotline: 'Emergency Hotline: 1070 / 112',
    organizationLabel: 'Organization',
    organizationName: 'Ministry of Development of North Eastern Region (MDoNER)',
    departmentLabel: 'Department',
    departmentName: 'North Eastern Space Applications Centre (NESAC) & NDMA',
    categoryLabel: 'Category',
    categoryName: 'Sorkarini A·sel Champengani Platform',
    coverageLabel: 'Coverage',
    coverageName: 'Salgro Saliram A·dok 8',
    copyrightText: '© 2026 NER Landslide Early Warning System. India Sorkari. Man·gimin bilrangko rakkia.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Jakolani Niamrang',
    accessibility: 'Jakolna Altua',
    disclaimer: 'U·iatani'
  },
  Tripuri: {
    systemTitle: 'NER Haphang Bai Ha-Buhkrukna Chengnani Swngkwr',
    systemSubtitle: 'AI Rwchapmung Bai Haphangni Ha-Buhkrukna Naikolna',
    systemOperational: 'System kaham tongo',
    signedInAs: 'Habpai tongo:',
    roleOfficer: 'Fom: District Collector',
    myProfile: 'Ani Profile',
    systemSettings: 'System Settings',
    signOut: 'Ongkhorla',
    notifications: 'Swngkwrrog',
    selectLanguage: 'Kok',
    sessionAuthenticated: 'Haphangni NIC khorok bai thwngjakha.',

    navDashboard: 'Dashboard',
    navRiskMap: 'Risk Map',
    navAiPredictions: 'AI Prediction',
    navAlerts: 'Alerts',
    navFieldReports: 'Field Reports',
    navInfrastructure: 'Infrastructure',
    navAnalytics: 'Analytics',

    regionalAlertLevel: 'Dophani Alert Level:',
    alertLevelOrange: 'ORANGE — HA-BUHKRUKNA KWRWNG BELAI KANG',
    alertLevelOrangeDesc: 'Sikkim bai Arunachal Pradesh-o watui belai phainani bagwi ha sokbeleng khe khukluk tongo.',
    reportHazard: 'Kwrwng Kok Sa',
    emergencyResponse: 'Emergency Response',
    exportTelemetry: 'Telemetry Export Khwlai',
    regionalRiskOverview: 'Twipra Bai Salba-Salno Dophani Kok',
    overviewSubtitle: 'Salba-Salno dophani bisingo ha-buhkrukna phano khwlaina naikolna.',
    lastUpdated: 'Nwngkhe kwtal: Minit 2-ni sakngo',
    refreshData: 'Data Kwtal Khwlai',

    highRiskZones: 'Kwrwng Kwbang Biap',
    criticalZones: 'Kwrwng Belai Kwbang',
    roadsAffected: 'Lama Kaphlang',
    activeAlerts: 'Alerts Tongo',
    monitoredLocations: 'Naikol Tongo Biaprog',
    increasing: 'Kwbang tongkhlai',
    immediateAttention: 'Ta-raki nangjak • NDRF-no swngkwr rijakha',
    highways: 'Lama Achwng',
    active: 'Active',
    urgent: 'Ta-raki',
    viewRiskMap: 'Risk Map Nai',
    filterCriticalSites: 'Belai Kwrwng Biap Nai',
    viewRouteBreakdown: 'Lama Kok Nai',
    openAlertConsole: 'Alert Console Pheta',
    viewTelemetryGrid: 'Telemetry Grid Nai',
    highRiskSubtitle: 'Miya nukhung +6 kwbang • 14 automated alerts',
    criticalSubtitle: 'Ta-raki nangjak • NDRF kwrwm tongo',
    roadsSubtitle: 'Lama 5-ra kaphlangha • NH-10 & NH-29',
    alertsSubtitle: 'Ganta 1-o 3 • 8 Kwbang, 4 Alert',
    monitoredSubtitle: 'Salba-Salno-ni 8-ra State-o',

    liveLandslideRiskMap: 'Live Ha-Buhkrukna Map',
    mapEngineBadge: 'OpenStreetMap & Leaflet Engine',
    mapSubtitle: 'Watui, ha sokbeleng, hathai kholombai sensor data naiwi live geospatial map.',
    filterLabel: 'Filter:',
    filterAll: 'CHUBAMO',
    filterCritical: 'BELAI KWRWNG',
    filterHigh: 'KWRWNG',
    filterModerate: 'MAJHAR',
    filterLow: 'KOM',
    zoomIn: 'Bari-ri (+)',
    zoomOut: 'Kom-ri (−)',
    resetMap: 'NER Bisingo Phai',
    mapLayers: 'Map Layers',
    gisLayerControls: 'GIS Layer Controls',
    baseMapTiles: 'Base Map Tiles',
    street: 'Lama',
    satellite: 'Satellite',
    terrain: 'Hathai',
    telemetryOverlays: 'Telemetry Overlays',
    roadsAndLifelines: 'Lama Kwbang',
    rainfallIsohyets: 'Watui Phai Chin',
    soilMoistureZones: 'Ha Twi Tongo Biap',
    historicalLandslides: 'Swkango Buhkruk Biap',
    openLocationInspector: 'Biap Kok Nai',
    rainfallParam: 'Watui',
    moistureParam: 'Sokbeleng',
    slopeParam: 'Kholom',
    probParam: 'Prob.',

    environmentalRiskIndicators: 'Hathai Kwrwng Chinrog',
    clickToDiagnose: 'Naina Thang',
    environmentalTelemetryDesc: 'NER-ni 1,284-ra IoT weather sensor biaprog nukhung live telemetry.',
    syncMinAgo: 'Sync: Minit 5-ni sakngo',
    rainfall24h: 'Ganta 24-ni Watui',
    rainfallThresholdExceeded: 'Threshold: 120 mm • Lang khlaiha',
    soilMoisture: 'Ha Twi Tongo',
    criticalSaturation: 'Twi Belai Kwbang',
    porePressureHigh: 'Pore Pressure: 48 kPa • Kwrwng',
    slopeStability: 'Hathai Kholom Kaphang',
    meanIncline: 'hathai kholom',
    unstable: 'Tong-ya',
    shearStrainRate: 'Shear Strain: 4.2 mm/hr • Buhkruk tongkhlai',
    weatherForecast: 'Nokha Kok',
    heavyRain: 'Watui Kwbang',
    next6Hours: 'Ganta 6-ni bisingo',
    imdWarningOrange: 'IMD Alert: Orange Alert (45-65 mm/hr)',
    viewLiveTelemetryDiagnostics: 'Live Telemetry Nai',

    aiLandslidePrediction: 'AI Ha-Buhkrukna Prediction',
    aiModelBadge: 'Model: LandslideRisk-v1',
    aiPredictionDesc: 'Machine-learning models data naikolwi kwrwng biaprogno rwchappho.',
    viewAiAnalysis: 'AI Analysis Nai',
    riskProbability24h: 'Ha-Buhkrukna Kwrwng — Ganta 24-ni Bisingo',
    probLegendCritical: 'Belai Kwrwng (85%)',
    probLegendHigh: 'Kwrwng (75%)',
    probLegendModerate: 'Majhar (50%)',
    confidenceScore: 'Confidence: 94.2%',
    peakDangerWindow: 'Peak Danger: Tini 14:00 - 18:00',
    whyHighRisk: 'Tamo nangkhe o biap kwrwng?',

    liveAlerts: 'Live Alerts',
    viewAllAlerts: 'Chubamo Alerts Nai',
    responseRequired: 'Khlaina Nangjak',
    viewDetails: 'Bising Kok Nai',
    alertId: 'ID:',
    alertUrgentCount: 'Ta-raki',

    roadConnectivity: 'Lama Connectivity',
    allCorridors: 'Chubamo Lama',
    recentFieldReports: 'Recent Field Reports',
    submitReportBtn: 'Report Ri',
    allReportsBtn: 'Chubamo Reports',
    emergencyPriorities: 'Emergency Priorities',
    highestRiskLocations: 'Kwrwng Belai Kwbang Biaprog',
    districtRiskAnalysis: 'District Risk Analysis',
    infrastructureStatus: 'Infrastructure Status',

    footerDescription: 'North Eastern Region-ni bagwi AI-powered disaster management platform.',
    poweredBy: 'Rwchap Tongnani:',
    aiPowered: 'AI',
    gisMapping: 'GIS',
    satelliteData: 'Satellite Data',
    sensorIntelligence: 'Sensor Telemetry',
    platformCol: 'Platform',
    monitoringCol: 'Naikolna',
    resourcesCol: 'Resources',
    supportCol: 'Support',
    landslideRiskNav: 'Ha-Buhkrukna',
    weatherRadarNav: 'Watui & Radar',
    soilMoistureNav: 'Ha Twi',
    terrainInSarNav: 'InSAR Hathai',
    roadConnectivityNav: 'Lama Connectivity',
    emergencyGuidelines: 'Emergency Guidelines',
    disasterManagement: 'Disaster Management',
    userGuideSop: 'User Guide & SOP',
    apiDocs: 'API Documentation',
    systemStatus: 'System Status',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    reportIssue: 'Report an Issue',
    emergencyHotline: 'Emergency Hotline: 1070 / 112',
    organizationLabel: 'Organization',
    organizationName: 'Ministry of Development of North Eastern Region (MDoNER)',
    departmentLabel: 'Department',
    departmentName: 'North Eastern Space Applications Centre (NESAC) & NDMA',
    categoryLabel: 'Category',
    categoryName: 'Government Disaster Management Platform',
    coverageLabel: 'Coverage',
    coverageName: '8 North Eastern States of India',
    copyrightText: '© 2026 NER Landslide Early Warning System. Government of India. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    accessibility: 'Accessibility',
    disclaimer: 'Disclaimer'
  }
};

// Language Context and Hook definition
export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  translations: Translations;
}

const STORAGE_LANG_KEY = 'ner_selected_language';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY) as SupportedLanguage | null;
    if (saved && TRANSLATIONS[saved]) {
      return saved;
    }
    return 'English';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_LANG_KEY, lang);
      } catch (e) {
        console.warn('Could not save language to localStorage', e);
      }
    }
  };

  const currentTranslations = TRANSLATIONS[language] || TRANSLATIONS.English;

  const t = (key: string, fallback?: string): string => {
    const activeDict = TRANSLATIONS[language] as unknown as Record<string, string>;
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    const englishDict = TRANSLATIONS.English as unknown as Record<string, string>;
    if (englishDict && englishDict[key]) {
      return englishDict[key];
    }
    return fallback || key;
  };

  return React.createElement(
    LanguageContext.Provider,
    {
      value: {
        language,
        setLanguage,
        t,
        translations: currentTranslations
      }
    },
    children
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if component is rendered outside Provider
    return {
      language: 'English',
      setLanguage: () => {},
      t: (key: string, fallback?: string) => {
        const dict = TRANSLATIONS.English as unknown as Record<string, string>;
        return dict[key] || fallback || key;
      },
      translations: TRANSLATIONS.English
    };
  }
  return context;
};

// Static helper function for non-React contexts
export const getTranslation = (lang: SupportedLanguage, key: string, fallback?: string): string => {
  const dict = (TRANSLATIONS[lang] || TRANSLATIONS.English) as unknown as Record<string, string>;
  return dict[key] || (TRANSLATIONS.English as unknown as Record<string, string>)[key] || fallback || key;
};
