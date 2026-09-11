import { SensorTelemetryItem } from '../components/SensorDiagnosticModal';
import { RiskZone } from '../types';

export const getSensorTelemetryForZone = (zone: RiskZone, sensorType: 'inclinometer' | 'soil_moisture' | 'rain_gauge' | 'piezometer'): SensorTelemetryItem => {
  switch (sensorType) {
    case 'inclinometer':
      return {
        id: `sensor-incl-${zone.id}`,
        sensorCode: `SN-INCL-${zone.id.replace('zone-', '0')}`,
        name: `Sensor 01 — MEMS Slope Inclinometer Array (${zone.name})`,
        type: 'inclinometer',
        model: 'Geokon 6150 MEMS In-Place Biaxial Inclinometer',
        status: zone.riskLevel === 'CRITICAL' ? 'Unstable' : zone.riskLevel === 'HIGH' ? 'Warning' : 'Nominal',
        currentValue: (zone.slopeAngle * 0.12).toFixed(1),
        metricLabel: 'Shear Strain Velocity',
        unit: 'mm/h',
        threshold: '3.0 mm/h',
        thresholdStatus: (zone.slopeAngle * 0.12) >= 3.0 ? 'Exceeded' : 'Normal',
        locationName: zone.name,
        district: zone.district,
        state: zone.state,
        depth: '12.5m bedrock slip interface',
        batteryLevel: 94,
        signalStatus: 'LoRaWAN 868MHz (-74 dBm, SNR 9.4 dB)',
        calibrationDate: '14 Jan 2026 (CSIR-CRRI)',
        accuracy: '±0.02 mm/m (0.001°)',
        firmware: 'v4.18.2-NER-Gov',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 1.2, secondaryValue: 0.8 },
          { time: '02:00', value: 1.4, secondaryValue: 1.1 },
          { time: '04:00', value: 1.9, secondaryValue: 1.5 },
          { time: '06:00', value: 2.6, secondaryValue: 2.3 },
          { time: '08:00', value: 3.8, secondaryValue: 3.4 },
          { time: '10:00', value: Number((zone.slopeAngle * 0.12).toFixed(1)), secondaryValue: 4.5 }
        ],
        secondaryMetricLabel: 'Cumulative Shear Offset',
        secondaryUnit: 'mm'
      };

    case 'soil_moisture':
      return {
        id: `sensor-tdr-${zone.id}`,
        sensorCode: `SN-TDR-${zone.id.replace('zone-', '0')}`,
        name: `Sensor 02 — Time-Domain Reflectometry Soil Moisture (${zone.name})`,
        type: 'soil_moisture',
        model: 'Campbell Scientific CS655 Water Content Reflectometer',
        status: zone.soilMoisture >= 85 ? 'Critical' : zone.soilMoisture >= 70 ? 'Warning' : 'Nominal',
        currentValue: zone.soilMoisture.toString(),
        metricLabel: 'Volumetric Water Content',
        unit: '%',
        threshold: '80%',
        thresholdStatus: zone.soilMoisture >= 80 ? 'Exceeded' : 'Normal',
        locationName: zone.name,
        district: zone.district,
        state: zone.state,
        depth: '1.8m colluvium layer',
        batteryLevel: 91,
        signalStatus: '4G LTE-M / NB-IoT (-81 dBm)',
        calibrationDate: '08 Feb 2026 (WMO-compliant)',
        accuracy: '±1.5% VWC, ±0.5°C temp',
        firmware: 'v3.9.1-TDR',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: Math.max(20, zone.soilMoisture - 24), secondaryValue: 34 },
          { time: '02:00', value: Math.max(25, zone.soilMoisture - 19), secondaryValue: 38 },
          { time: '04:00', value: Math.max(30, zone.soilMoisture - 14), secondaryValue: 44 },
          { time: '06:00', value: Math.max(40, zone.soilMoisture - 8), secondaryValue: 49 },
          { time: '08:00', value: Math.max(50, zone.soilMoisture - 3), secondaryValue: 53 },
          { time: '10:00', value: zone.soilMoisture, secondaryValue: 56 }
        ],
        secondaryMetricLabel: 'Pore Water Pressure',
        secondaryUnit: 'kPa'
      };

    case 'rain_gauge':
      return {
        id: `sensor-rain-${zone.id}`,
        sensorCode: `SN-RAIN-${zone.id.replace('zone-', '0')}`,
        name: `Sensor 03 — Tipping Bucket Rain Gauge (${zone.name})`,
        type: 'rain_gauge',
        model: 'Texas Electronics TR-525M Aerodynamic Tipping Bucket',
        status: zone.rainfall24h >= 180 ? 'Critical' : zone.rainfall24h >= 100 ? 'Warning' : 'Nominal',
        currentValue: Math.round(zone.rainfall24h / 5).toString(),
        metricLabel: 'Peak Precipitation Intensity',
        unit: 'mm/h',
        threshold: '35 mm/h',
        thresholdStatus: Math.round(zone.rainfall24h / 5) >= 35 ? 'Exceeded' : 'Normal',
        locationName: zone.name,
        district: zone.district,
        state: zone.state,
        depth: '2.0m mast mounting AGL',
        batteryLevel: 98,
        signalStatus: 'LoRaWAN Class A (-67 dBm, SF7)',
        calibrationDate: '20 Dec 2025 (IMD Standard)',
        accuracy: '±1.0% @ 50mm/h',
        firmware: 'v2.4.0-RAIN',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 8, secondaryValue: 32 },
          { time: '02:00', value: 14, secondaryValue: 58 },
          { time: '04:00', value: 26, secondaryValue: 104 },
          { time: '06:00', value: 38, secondaryValue: 162 },
          { time: '08:00', value: 45, secondaryValue: 218 },
          { time: '10:00', value: Math.round(zone.rainfall24h / 5), secondaryValue: zone.rainfall24h }
        ],
        secondaryMetricLabel: 'Cumulative 24h Rainfall',
        secondaryUnit: 'mm'
      };

    case 'piezometer':
      return {
        id: `sensor-piezo-${zone.id}`,
        sensorCode: `SN-PIEZO-${zone.id.replace('zone-', '0')}`,
        name: `Sensor 04 — Vibrating Wire Piezometer (${zone.name})`,
        type: 'piezometer',
        model: 'Roctest Piezocone Vibrating Wire Hydraulic Sensor',
        status: zone.riskLevel === 'CRITICAL' ? 'Critical' : 'Warning',
        currentValue: '58.4',
        metricLabel: 'Hydrostatic Pore Pressure',
        unit: 'kPa',
        threshold: '50 kPa',
        thresholdStatus: 'Exceeded',
        locationName: zone.name,
        district: zone.district,
        state: zone.state,
        depth: '18.0m borehole subterranean',
        batteryLevel: 89,
        signalStatus: 'RS-485 Modbus to LoRa Node (-72 dBm)',
        calibrationDate: '12 Nov 2025 (NABL Accredited)',
        accuracy: '±0.1% Full Scale',
        firmware: 'v5.1.0-PIEZO',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 32.1, secondaryValue: 12 },
          { time: '02:00', value: 36.4, secondaryValue: 15 },
          { time: '04:00', value: 42.8, secondaryValue: 22 },
          { time: '06:00', value: 49.3, secondaryValue: 38 },
          { time: '08:00', value: 55.6, secondaryValue: 54 },
          { time: '10:00', value: 58.4, secondaryValue: 68 }
        ],
        secondaryMetricLabel: 'Acoustic Emission Rate',
        secondaryUnit: 'hits/min'
      };
  }
};

export const getEnvironmentalIndicatorTelemetry = (type: 'rainfall' | 'soil_moisture' | 'slope' | 'forecast'): SensorTelemetryItem => {
  switch (type) {
    case 'rainfall':
      return {
        id: 'env-sensor-rain-ner',
        sensorCode: 'SN-AWS-NER-1042',
        name: 'Regional Automated Weather Station — 24h Precipitation Telemetry',
        type: 'rain_gauge',
        model: 'Vaisala AWS310 Automatic Weather Station Tipping Gauge',
        status: 'Critical',
        currentValue: '186',
        metricLabel: '24h Cumulative Precipitation',
        unit: 'mm',
        threshold: '120 mm',
        thresholdStatus: 'Exceeded',
        locationName: 'NER Regional Aggregate (Eastern Himalaya)',
        district: 'Regional Grid',
        state: 'Assam / Meghalaya / Sikkim',
        depth: 'Standard IMD Stevenson Screen Mast (2.0m)',
        batteryLevel: 96,
        signalStatus: 'INSAT-3DR Satellite Telemetry Data Collection Platform',
        calibrationDate: '15 Feb 2026 (IMD MoES)',
        accuracy: '±0.2 mm / 0.1 mm per pulse',
        firmware: 'v6.3.0-AWS-IMD',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 42, secondaryValue: 8 },
          { time: '02:00', value: 68, secondaryValue: 14 },
          { time: '04:00', value: 98, secondaryValue: 26 },
          { time: '06:00', value: 135, secondaryValue: 38 },
          { time: '08:00', value: 168, secondaryValue: 45 },
          { time: '10:00', value: 186, secondaryValue: 52 }
        ],
        secondaryMetricLabel: 'Peak Rain Intensity',
        secondaryUnit: 'mm/h'
      };

    case 'soil_moisture':
      return {
        id: 'env-sensor-soil-ner',
        sensorCode: 'SN-TDR-NER-0841',
        name: 'Subsurface Geotechnical Probe — Volumetric Water Saturation',
        type: 'soil_moisture',
        model: 'Campbell Scientific CS655 Multi-Depth TDR Array',
        status: 'Critical',
        currentValue: '91',
        metricLabel: 'Volumetric Soil Saturation',
        unit: '%',
        threshold: '85%',
        thresholdStatus: 'Exceeded',
        locationName: 'Sohra-Singtam Critical Colluvium Escarpments',
        district: 'Regional Slopes',
        state: 'Meghalaya / Sikkim / Dima Hasao',
        depth: 'Multi-level probes at 0.5m, 1.5m, 3.0m depth',
        batteryLevel: 91,
        signalStatus: 'LoRaWAN + 4G Gateway Mesh (-78 dBm)',
        calibrationDate: '10 Jan 2026 (CSIR-CRRI Certified)',
        accuracy: '±1.5% VWC',
        firmware: 'v3.9.1-TDR',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 68, secondaryValue: 32 },
          { time: '02:00', value: 72, secondaryValue: 36 },
          { time: '04:00', value: 79, secondaryValue: 41 },
          { time: '06:00', value: 85, secondaryValue: 46 },
          { time: '08:00', value: 89, secondaryValue: 50 },
          { time: '10:00', value: 91, secondaryValue: 54 }
        ],
        secondaryMetricLabel: 'Pore Water Pressure',
        secondaryUnit: 'kPa'
      };

    case 'slope':
      return {
        id: 'env-sensor-slope-ner',
        sensorCode: 'SN-INCL-NER-0294',
        name: 'Borehole Inclinometer & Acoustic Creep Telemetry System',
        type: 'inclinometer',
        model: 'Geokon 6150 In-Place MEMS Biaxial Accelerometer & Tiltmeter',
        status: 'Unstable',
        currentValue: '4.2',
        metricLabel: 'Shear Strain Velocity',
        unit: 'mm/h',
        threshold: '3.0 mm/h',
        thresholdStatus: 'Exceeded',
        locationName: 'Active Hillside Fault Cut-Slopes',
        district: 'NH-10 & NH-13 Strategic Lifelines',
        state: 'Sikkim / Arunachal Pradesh',
        depth: '14.0m Bedrock shear slip plane',
        batteryLevel: 93,
        signalStatus: 'Fiber-Optic RS-485 to Command Telemetry Node',
        calibrationDate: '28 Jan 2026 (GSI Standards)',
        accuracy: '±0.001° tilt / ±0.02 mm/m deformation',
        firmware: 'v4.18.2-NER-Gov',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 1.4, secondaryValue: 0.5 },
          { time: '02:00', value: 1.8, secondaryValue: 0.9 },
          { time: '04:00', value: 2.3, secondaryValue: 1.6 },
          { time: '06:00', value: 3.1, secondaryValue: 2.4 },
          { time: '08:00', value: 3.8, secondaryValue: 3.6 },
          { time: '10:00', value: 4.2, secondaryValue: 4.8 }
        ],
        secondaryMetricLabel: 'Cumulative Displacement',
        secondaryUnit: 'mm'
      };

    case 'forecast':
      return {
        id: 'env-sensor-radar-ner',
        sensorCode: 'SN-DWR-NER-0012',
        name: 'Doppler Weather Radar (DWR) & Cloudburst Early Warning Cell',
        type: 'rain_gauge',
        model: 'ISRO / IMD S-Band Polarimetric Doppler Weather Radar',
        status: 'Warning',
        currentValue: '58',
        metricLabel: 'Peak Echo Precipitation Rate',
        unit: 'mm/h',
        threshold: '40 mm/h',
        thresholdStatus: 'Exceeded',
        locationName: 'Cherrapunjee / Agartala Radar Observatories',
        district: 'Eastern Himalayan Radar Arc',
        state: 'NER Regional Coverage',
        depth: 'Atmospheric scan beam elevation 0.5° to 19.5°',
        batteryLevel: 99,
        signalStatus: 'Dedicated OFC High-Speed Link to IMD New Delhi',
        calibrationDate: '01 Mar 2026 (IMD Radar Division)',
        accuracy: '±1 dBZ reflectivity / 250m radial resolution',
        firmware: 'v7.4.2-DWR-NER',
        alertAcknowledged: false,
        timeSeriesData: [
          { time: '00:00', value: 18, secondaryValue: 35 },
          { time: '02:00', value: 24, secondaryValue: 40 },
          { time: '04:00', value: 36, secondaryValue: 48 },
          { time: '06:00', value: 48, secondaryValue: 55 },
          { time: '08:00', value: 54, secondaryValue: 62 },
          { time: '10:00', value: 58, secondaryValue: 65 }
        ],
        secondaryMetricLabel: 'Storm Top Height',
        secondaryUnit: 'km'
      };
  }
};
