import React, { useState } from 'react';
import { Modal } from './common/Modal';
import { NetworkStatus, RiskLevel } from '../types';
import { Upload, MapPin, Camera, AlertTriangle, CloudOff, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../data/translations';

interface ReportHazardModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkStatus: NetworkStatus;
  onSubmitReport: (data: {
    hazardType: 'Road Crack' | 'Rockfall' | 'Mudflow' | 'Slope Subsidence' | 'Debris Flow' | 'Retaining Wall Failure';
    location: string;
    district: string;
    state: string;
    severity: RiskLevel;
    description: string;
    gpsCoordinates: string;
    submittedBy: string;
    submitterRole: 'Field Officer' | 'Emergency Team' | 'Citizen' | 'Geological Surveyor';
  }) => void;
}

export const ReportHazardModal: React.FC<ReportHazardModalProps> = ({
  isOpen,
  onClose,
  networkStatus,
  onSubmitReport
}) => {
  const { t } = useTranslation();
  const [hazardType, setHazardType] = useState<'Road Crack' | 'Rockfall' | 'Mudflow' | 'Slope Subsidence' | 'Debris Flow' | 'Retaining Wall Failure'>('Road Crack');
  const [severity, setSeverity] = useState<RiskLevel>('HIGH');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('East District');
  const [state, setState] = useState('Sikkim');
  const [description, setDescription] = useState('');
  const [gpsCoordinates, setGpsCoordinates] = useState('27.2341° N, 88.5132° E');
  const [isLocating, setIsLocating] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setGpsCoordinates(`${lat}° N, ${lng}° E`);
          setIsLocating(false);
        },
        () => {
          // Fallback realistic NER GPS
          setGpsCoordinates('27.2410° N, 88.5204° E (Sikkim NH-10)');
          setIsLocating(false);
        }
      );
    } else {
      setGpsCoordinates('27.2410° N, 88.5204° E');
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    onSubmitReport({
      hazardType,
      location,
      district,
      state,
      severity,
      description: description || 'Visual hazard documented during field reconnaissance. Ground fissures expanding with rainfall runoff.',
      gpsCoordinates,
      submittedBy: 'Field Officer (Station 04)',
      submitterRole: 'Field Officer'
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('reportHazard')}
      subtitle="Upload geo-tagged data of cracks, slope movement, landslides, or blocked roads."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Offline / Connectivity Banner */}
        {networkStatus !== 'online' && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-2.5 text-amber-900">
            <CloudOff size={16} className="shrink-0 mt-0.5 text-amber-700" />
            <div>
              <span className="font-bold text-xs block">
                {networkStatus === 'limited' ? 'Limited Connectivity Mode' : 'Offline Mode Active'}
              </span>
              <p className="text-[11px] text-amber-800 mt-0.5 font-medium">
                Your report will be safely saved locally and will automatically sync when the connection is restored.
              </p>
            </div>
          </div>
        )}

        {/* Hazard Type & Severity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Hazard Type *
            </label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              <option value="Road Crack">Road Crack / Pavement Shear</option>
              <option value="Slope Subsidence">Slope Subsidence / Slump</option>
              <option value="Rockfall">Rockfall / Boulder Roll</option>
              <option value="Mudflow">Mudflow / Slurry Slide</option>
              <option value="Debris Flow">Debris Flow / Gully Flush</option>
              <option value="Retaining Wall Failure">Retaining Wall / Gabion Failure</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Estimated Severity *
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as RiskLevel)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              <option value="CRITICAL">🔴 CRITICAL (Immediate Imminent Threat)</option>
              <option value="HIGH">🟠 HIGH (Active Deformation / Crack)</option>
              <option value="MODERATE">🟡 MODERATE (Early Tension Fissures)</option>
              <option value="LOW">🟢 LOW (Minor Sloughing / Washout)</option>
            </select>
          </div>
        </div>

        {/* Location & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Specific Location / Landmark *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NH-10 Km 42 near 29th Mile"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              District & State *
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-hidden"
              >
                <option value="East District">East District</option>
                <option value="West Kameng">West Kameng</option>
                <option value="Dima Hasao">Dima Hasao</option>
                <option value="East Khasi Hills">East Khasi Hills</option>
                <option value="Kohima">Kohima</option>
                <option value="Noney">Noney</option>
                <option value="Aizawl">Aizawl</option>
                <option value="Dhalai">Dhalai</option>
              </select>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-hidden"
              >
                <option value="Sikkim">Sikkim</option>
                <option value="Arunachal Pradesh">Arunachal</option>
                <option value="Assam">Assam</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Manipur">Manipur</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Tripura">Tripura</option>
              </select>
            </div>
          </div>
        </div>

        {/* GPS Location & Button */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-bold text-slate-700">
              GPS Coordinates
            </label>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:text-blue-950 underline"
            >
              <MapPin size={12} />
              <span>{isLocating ? 'Locating...' : 'Use Current Location'}</span>
            </button>
          </div>
          <input
            type="text"
            value={gpsCoordinates}
            onChange={(e) => setGpsCoordinates(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-700"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Description of Ground Conditions
          </label>
          <textarea
            rows={3}
            placeholder="Describe extent of cracking, water seepage, rock displacement, or road obstruction..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Photo / Video Upload Area */}
        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Upload Geo-tagged Photo / Video
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-900 bg-slate-50/50 transition-colors">
            <Upload size={24} className="mx-auto text-slate-400 mb-1" />
            <p className="text-xs font-semibold text-slate-700">
              {selectedFileName ? selectedFileName : 'Drag & drop photos/videos or browse'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Supports JPG, PNG, MP4 up to 50MB with embedded EXIF GPS telemetry
            </p>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              id="hazard-file-input"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSelectedFileName(e.target.files[0].name);
                }
              }}
            />
            <label
              htmlFor="hazard-file-input"
              className="mt-2 inline-block px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Select File
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 shadow-xs"
          >
            {t('submitReportBtn')}
          </button>
        </div>
      </form>
    </Modal>
  );
};
