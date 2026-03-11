import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Database, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronDown,
  Microscope, 
  MapPin, 
  Calendar, 
  Weight, 
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Info,
  Activity,
  Globe,
  Upload,
  ClipboardCheck,
  CheckCircle2,
  FileText,
  X,
  BarChart3,
  QrCode,
  Printer,
  Copy,
  ExternalLink,
  History,
  Send,
  Filter,
  Eye,
  EyeOff,
  Loader2,
  Package,
  Map,
  Pencil
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  AreaChart, 
  Area, 
  ComposedChart, 
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Cell
} from 'recharts';
import { MOCK_BATCHES, MOCK_ORIGINS } from './constants';
import { CocoaBatch, CocoaOrigin } from './types';

// --- Helpers ---
const generateId = (prefix: string) => {
  const random = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${random}`;
};

// --- Components ---

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('admin@cocoatrace.com');
  const [password, setPassword] = useState('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-cocoa-950 irms-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-cocoa-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-cocoa-800 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cocoa-200">
            <Microscope className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-cocoa-900">CocoaTrace IRMS</h1>
          <p className="text-cocoa-500 text-sm text-center">Isotope Ratio Mass Spectrometry Verification</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cocoa-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-cocoa-200 rounded-lg focus:ring-2 focus:ring-cocoa-600 focus:border-cocoa-600 outline-none transition-all"
              placeholder="admin@cocoatrace.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-cocoa-200 rounded-lg focus:ring-2 focus:ring-cocoa-600 focus:border-cocoa-600 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-cocoa-800 hover:bg-cocoa-900 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cocoa-100"
          >
            Sign In to Dashboard
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-cocoa-50 text-center">
          <p className="text-xs text-cocoa-400 uppercase tracking-widest font-semibold">Secure Laboratory Access</p>
        </div>
      </motion.div>
    </div>
  );
};

const TraceBatchPage = ({ onBack }: { onBack: () => void }) => {
  const [batchId, setBatchId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<CocoaBatch | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Blockchain address copied to clipboard!');
  };

  const handleSearch = (id: string = batchId) => {
    if (!id) return;
    setIsSearching(true);
    setScannedResult(null);
    
    // Simulate API lookup
    setTimeout(() => {
      const result = MOCK_BATCHES.find(b => b.batchNumber.toLowerCase() === id.toLowerCase());
      setScannedResult(result || null);
      setIsSearching(false);
      if (!result) {
        alert('Batch ID not found in our database.');
      }
    }, 1000);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScannedResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Pick a random batch for simulation
      const randomBatch = MOCK_BATCHES[Math.floor(Math.random() * MOCK_BATCHES.length)];
      setBatchId(randomBatch.batchNumber);
      setScannedResult(randomBatch);
    }, 2500);
  };

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Trace Batch</h2>
        <p className="text-cocoa-500">Verify product authenticity using IRMS isotopic fingerprinting.</p>
      </header>

      <div className="max-w-3xl space-y-6">
        <div className="bg-white rounded-2xl border border-cocoa-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa-400" size={20} />
              <input 
                type="text" 
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Batch ID (e.g. B-2024-PE-001)" 
                className="w-full pl-12 pr-4 py-4 bg-cocoa-50/30 border border-cocoa-100 rounded-xl outline-none focus:ring-2 focus:ring-cocoa-600 focus:bg-white transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSearch()}
                disabled={isSearching || isScanning}
                className="px-8 py-4 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                Trace
              </button>
              <button 
                onClick={handleScan}
                disabled={isScanning || isSearching}
                className="px-6 py-4 bg-white border-2 border-cocoa-800 text-cocoa-800 font-bold rounded-xl hover:bg-cocoa-50 transition-all flex items-center gap-2"
              >
                <QrCode size={20} />
                Scan
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm text-cocoa-500 italic">Scan QR code or enter manual ID to verify isotopic fingerprint.</p>
        </div>

        <AnimatePresence mode="wait">
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-cocoa-900 rounded-2xl p-12 flex flex-col items-center justify-center text-white space-y-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cocoa-400 via-transparent to-transparent"></div>
              <div className="relative w-48 h-48 border-2 border-cocoa-400/50 rounded-3xl flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-cocoa-400 rounded-3xl animate-pulse"></div>
                <div className="w-full h-1 bg-cocoa-400 absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                <QrCode size={80} className="text-cocoa-400/50" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">Initializing Scanner...</h3>
                <p className="text-cocoa-300 text-sm">Align QR code within the frame</p>
              </div>
              <style>{`
                @keyframes scan {
                  0%, 100% { top: 0%; }
                  50% { top: 100%; }
                }
              `}</style>
            </motion.div>
          )}

          {scannedResult && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl border border-cocoa-100 shadow-sm overflow-hidden">
                <div className={`p-6 flex items-center justify-between ${scannedResult.status === 'Mismatch' ? 'bg-rose-50' : 'bg-emerald-50'}`}>
                  <div className="flex items-center gap-3">
                    {scannedResult.status === 'Mismatch' ? (
                      <ShieldAlert className="text-rose-600" size={28} />
                    ) : (
                      <ShieldCheck className="text-emerald-600" size={28} />
                    )}
                    <div>
                      <h3 className={`text-lg font-bold ${scannedResult.status === 'Mismatch' ? 'text-rose-900' : 'text-emerald-900'}`}>
                        {scannedResult.status === 'Mismatch' ? 'Verification Failed' : 'Authenticity Verified'}
                      </h3>
                      <p className={`text-sm ${scannedResult.status === 'Mismatch' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {scannedResult.status === 'Mismatch' ? 'Isotopic fingerprint does not match origin.' : 'Product matches registered isotopic profile.'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-cocoa-400 mb-1">Confidence Score</div>
                    <div className={`text-2xl font-black ${scannedResult.status === 'Mismatch' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {scannedResult.status === 'Mismatch' ? '38.2%' : '98.7%'}
                    </div>
                  </div>
                </div>

                {/* Blockchain Section */}
                {!isScanning && scannedResult.status !== 'Mismatch' && (
                  <div className="px-8 py-4 bg-cocoa-50/30 border-b border-cocoa-50 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="p-2 bg-white rounded-lg border border-cocoa-100">
                        <History size={20} className="text-cocoa-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold text-cocoa-400">Blockchain Ledger Address</p>
                        <button 
                          onClick={() => setShowAuditTrail(true)}
                          className="text-sm font-mono font-bold text-cocoa-700 hover:text-cocoa-900 truncate block w-full text-left hover:underline flex items-center gap-2"
                        >
                          {scannedResult.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(scannedResult.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                      className="p-2 hover:bg-cocoa-100 rounded-lg transition-colors text-cocoa-400 hover:text-cocoa-600 ml-4"
                      title="Copy Address"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                )}

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-cocoa-900 border-b border-cocoa-50 pb-2">Sample Information</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Product Name</label>
                        <p className="text-sm font-bold text-cocoa-900">{scannedResult.productName}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Batch ID</label>
                        <p className="text-sm font-mono font-bold text-cocoa-700">{scannedResult.batchNumber}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Registered ID</label>
                        <p className="text-sm font-mono font-bold text-cocoa-700">{scannedResult.registeredId}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Manufacturer</label>
                        <p className="text-sm font-bold text-cocoa-900">{scannedResult.manufacturer}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Production Date</label>
                        <p className="text-sm font-bold text-cocoa-900">{scannedResult.harvestDate}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-cocoa-400 uppercase">Net Weight</label>
                        <p className="text-sm font-bold text-cocoa-900">{scannedResult.weight}g</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-cocoa-900 border-b border-cocoa-50 pb-2">Origin Traceability</h4>
                    {scannedResult.status !== 'Mismatch' ? (
                      <div className="flex items-start gap-4 p-4 bg-cocoa-50/50 rounded-xl border border-cocoa-100">
                        <img 
                          src={scannedResult.origin?.brandLogo} 
                          alt={scannedResult.origin?.brandName} 
                          className="w-12 h-12 rounded-lg border border-cocoa-200 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-cocoa-900">{scannedResult.origin?.estateName}</p>
                          <p className="text-xs text-cocoa-600">{scannedResult.origin?.brandName}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-cocoa-100 text-cocoa-700 rounded uppercase">
                              {scannedResult.origin?.country}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-cocoa-400">
                              {scannedResult.origin?.registeredId}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-rose-50/50 rounded-xl border border-rose-100 flex flex-col items-center justify-center text-center space-y-3">
                        <ShieldAlert className="text-rose-400" size={32} />
                        <p className="text-sm text-rose-700 font-medium italic">
                          No verified origin match found in the IRMS database for this isotopic profile.
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <button className="w-full py-3 border-2 border-cocoa-800 text-cocoa-800 font-bold rounded-xl hover:bg-cocoa-50 transition-all flex items-center justify-center gap-2">
                        <Upload size={16} />
                        View Full Laboratory Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audit Trail Modal */}
        <AnimatePresence>
          {showAuditTrail && scannedResult && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/60 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 border-b border-cocoa-100 flex justify-between items-center bg-cocoa-50/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cocoa-800 rounded-lg text-white">
                      <History size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cocoa-950">Blockchain Activity Audit Trail</h3>
                      <p className="text-xs text-cocoa-500 font-mono truncate max-w-[300px]">{scannedResult.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAuditTrail(false)}
                    className="p-2 hover:bg-cocoa-100 rounded-full transition-colors text-cocoa-400 hover:text-cocoa-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Timeline */}
                  <div className="relative space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-cocoa-100"></div>

                    {/* 1. Origin */}
                    <div className="relative flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-cocoa-800 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-cocoa-200">
                        <MapPin size={18} />
                      </div>
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="font-bold text-cocoa-900">Cocoa Beans Origin Registered</h4>
                          <p className="text-xs text-cocoa-500">Estate: {scannedResult.origin?.estateName}, {scannedResult.origin?.region}</p>
                          <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x8a2...f3e1 | 2024-01-15 09:24:12</p>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-cocoa-100 shadow-sm">
                          <img 
                            src={scannedResult.origin?.beanImage || 'https://picsum.photos/seed/beans/600/400'} 
                            alt="Cocoa Beans" 
                            className="w-full h-40 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="p-3 bg-cocoa-50/50 text-[10px] font-medium text-cocoa-600 flex justify-between">
                            <span>Harvested & Fermented</span>
                            <span>{scannedResult.origin?.cocoaType}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. IRMS Verification */}
                    <div className="relative flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-emerald-100">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-cocoa-900">IRMS Isotopic Fingerprint Verified</h4>
                        <p className="text-xs text-cocoa-500">Laboratory: Global Cocoa Standards Lab</p>
                        <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x4c1...a9b2 | 2024-01-22 14:15:05</p>
                        <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600">
                            <Activity size={14} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700">Fingerprint Match: 99.2%</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Manufacturing */}
                    <div className="relative flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-amber-100">
                        <Package size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-cocoa-900">Product Manufactured & Packaged</h4>
                        <p className="text-xs text-cocoa-500">Manufacturer: {scannedResult.manufacturer}</p>
                        <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x2d5...e7c8 | 2024-02-10 11:42:33</p>
                      </div>
                    </div>

                    {/* 4. Final Product */}
                    <div className="relative flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-cocoa-950 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-cocoa-300">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="font-bold text-cocoa-900">Final Product Released to Market</h4>
                          <p className="text-xs text-cocoa-500">Batch ID: {scannedResult.batchNumber}</p>
                          <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x9f3...d2a1 | 2024-02-15 16:05:59</p>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-cocoa-100 shadow-sm">
                          <img 
                            src={scannedResult.productImage || 'https://picsum.photos/seed/product/600/400'} 
                            alt="Finished Product" 
                            className="w-full h-40 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="p-3 bg-cocoa-50/50 text-[10px] font-medium text-cocoa-600 flex justify-between">
                            <span>{scannedResult.productName}</span>
                            <span>{scannedResult.weight}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-cocoa-100 bg-cocoa-50/30">
                  <button 
                    onClick={() => setShowAuditTrail(false)}
                    className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors"
                  >
                    Close Audit Trail
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onLogout }: { activeTab: string, setActiveTab: (t: string) => void, onLogout: () => void }) => {
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(activeTab.startsWith('database'));
  const [isDataHubOpen, setIsDataHubOpen] = useState(activeTab.startsWith('datahub'));
  const [isIRMSStatusOpen, setIsIRMSStatusOpen] = useState(activeTab.startsWith('irms-status'));
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(activeTab.startsWith('analysis'));
  const [isDataHubBeansOpen, setIsDataHubBeansOpen] = useState(activeTab.startsWith('datahub-beans') || activeTab.startsWith('datahub-irms'));
  const [isDataHubProductOpen, setIsDataHubProductOpen] = useState(activeTab.startsWith('datahub-product'));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trace', label: 'Trace Batch', icon: Search },
    { 
      id: 'datahub', 
      label: 'Data Hub', 
      icon: Activity,
      subItems: [
        { 
          id: 'datahub-beans-group', 
          label: 'Cocoa Beans',
          nestedItems: [
            { id: 'datahub-beans', label: 'Centre' },
            { id: 'datahub-irms', label: 'IRMS Centre' }
          ]
        },
        { 
          id: 'datahub-product-group', 
          label: 'Cocoa Product',
          nestedItems: [
            { id: 'datahub-product-centre', label: 'Centre' },
            { id: 'datahub-product-irms', label: 'IRMS Centre' }
          ]
        }
      ]
    },
    { 
      id: 'irms-status', 
      label: 'IRMS Status', 
      icon: ClipboardCheck,
      subItems: [
        { id: 'irms-status-beans', label: 'Status (Cocoa Beans)' },
        { id: 'irms-status-product', label: 'Status (Cocoa Product)' }
      ]
    },
    { 
      id: 'analysis', 
      label: 'Analysis', 
      icon: BarChart3,
      subItems: [
        { id: 'analysis-product', label: 'Cocoa Product' }
      ]
    },
    { 
      id: 'database', 
      label: 'Origin Database', 
      icon: Database,
      subItems: [
        { id: 'database-beans', label: 'Cocoa Beans' },
        { id: 'database-products', label: 'Cocoa Product' }
      ]
    },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-cocoa-100 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-cocoa-800 rounded-lg flex items-center justify-center">
          <Microscope className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight text-cocoa-900">CocoaTrace</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => {
                    if (item.id === 'database') setIsDatabaseOpen(!isDatabaseOpen);
                    if (item.id === 'datahub') setIsDataHubOpen(!isDataHubOpen);
                    if (item.id === 'irms-status') setIsIRMSStatusOpen(!isIRMSStatusOpen);
                    if (item.id === 'analysis') setIsAnalysisOpen(!isAnalysisOpen);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab.startsWith(item.id)
                      ? 'text-cocoa-900' 
                      : 'text-cocoa-500 hover:bg-cocoa-50 hover:text-cocoa-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  {(item.id === 'database' ? isDatabaseOpen : item.id === 'datahub' ? isDataHubOpen : item.id === 'irms-status' ? isIRMSStatusOpen : isAnalysisOpen) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <AnimatePresence>
                  {((item.id === 'database' && isDatabaseOpen) || (item.id === 'datahub' && isDataHubOpen) || (item.id === 'irms-status' && isIRMSStatusOpen) || (item.id === 'analysis' && isAnalysisOpen)) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-4 mt-1 space-y-1 border-l border-cocoa-50"
                    >
                      {item.subItems.map((sub: any) => (
                        <div key={sub.id}>
                          {sub.nestedItems ? (
                            <div className="ml-2">
                              <button
                                onClick={() => {
                                  if (sub.id === 'datahub-beans-group') setIsDataHubBeansOpen(!isDataHubBeansOpen);
                                  if (sub.id === 'datahub-product-group') setIsDataHubProductOpen(!isDataHubProductOpen);
                                }}
                                className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold text-cocoa-700 hover:bg-cocoa-50 transition-all"
                              >
                                {sub.label}
                                {(sub.id === 'datahub-beans-group' ? isDataHubBeansOpen : isDataHubProductOpen) ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                              </button>
                              <AnimatePresence>
                                {(sub.id === 'datahub-beans-group' ? isDataHubBeansOpen : isDataHubProductOpen) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden ml-4 space-y-1"
                                  >
                                    {sub.nestedItems.map((nested: any) => (
                                      <button
                                        key={nested.id}
                                        onClick={() => setActiveTab(nested.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                          activeTab === nested.id 
                                            ? 'text-cocoa-900 font-bold' 
                                            : 'text-cocoa-400 hover:text-cocoa-700'
                                        }`}
                                      >
                                        {nested.label}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <button
                              key={sub.id}
                              onClick={() => setActiveTab(sub.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                activeTab === sub.id 
                                  ? 'bg-cocoa-50 text-cocoa-900' 
                                  : 'text-cocoa-400 hover:bg-cocoa-50 hover:text-cocoa-700'
                              }`}
                            >
                              {sub.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-cocoa-100 text-cocoa-900' 
                    : 'text-cocoa-500 hover:bg-cocoa-50 hover:text-cocoa-800'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-cocoa-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ onSelectBatch, onShowProductList, onShowLocationMap, onShowOriginList }: { onSelectBatch: (b: CocoaBatch) => void, onShowProductList: () => void, onShowLocationMap: () => void, onShowOriginList: () => void }) => {
  const [showRecentBatches, setShowRecentBatches] = useState(true);
  const [drillDowns, setDrillDowns] = useState({
    registered: { level: 'yearly', year: null as number | null },
    verified: { level: 'yearly', year: null as number | null },
    category: { level: 'category', category: null as string | null },
    match: { level: 'status', status: null as string | null },
    map: { selectedOrigin: null as CocoaOrigin | null }
  });

  const stats = [
    { id: 'total-origin', label: 'Total Cocoa Single Origin', value: '1,284', icon: MapPin, color: 'text-cocoa-700', bg: 'bg-cocoa-100', clickable: true },
    { id: 'total-product', label: 'Total Product Cocoa Single Origin', value: '856', icon: Package, color: 'text-cocoa-800', bg: 'bg-cocoa-200', clickable: true },
    { id: 'total-location', label: 'Total Cocoa Single Origin Location', value: '42', icon: Map, color: 'text-amber-700', bg: 'bg-amber-50', clickable: true },
    { id: 'total-irms', label: 'Total Cocoa with IRMS', value: '1,276', icon: Microscope, color: 'text-emerald-700', bg: 'bg-emerald-50', clickable: false },
    { id: 'total-product-irms', label: 'Total Product Cocoa with IRMS', value: '156', icon: ClipboardCheck, color: 'text-cocoa-600', bg: 'bg-cocoa-50', clickable: false },
    { id: 'total-irms-mismatch', label: 'IRMS Non-Matches', value: '8', icon: ShieldAlert, color: 'text-red-700', bg: 'bg-red-50', clickable: false },
  ];

  // --- Chart 1 & 2 Data Helpers ---
  const getYearlyData = (type: 'registered' | 'verified') => {
    return [
      { year: 2022, beans: 450, products: 320 },
      { year: 2023, beans: 580, products: 410 },
      { year: 2024, beans: 620, products: 480 },
    ].map(d => type === 'verified' ? { ...d, beans: Math.floor(d.beans * 0.95), products: Math.floor(d.products * 0.92) } : d);
  };

  const getMonthlyData = (year: number, type: 'registered' | 'verified') => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, i) => ({
      month: m,
      beans: 40 + Math.floor(Math.random() * 20),
      products: 30 + Math.floor(Math.random() * 15)
    })).map(d => type === 'verified' ? { ...d, beans: Math.floor(d.beans * 0.95), products: Math.floor(d.products * 0.92) } : d);
  };

  // --- Chart 3 Data Helpers ---
  const getCategoryData = () => {
    const categories = Array.from(new Set(MOCK_BATCHES.map(b => b.productType)));
    return categories.map(cat => ({
      name: cat,
      value: MOCK_BATCHES.filter(b => b.productType === cat).length
    }));
  };

  const getProductsByCategory = (category: string) => {
    return MOCK_BATCHES.filter(b => b.productType === category).map(b => ({
      name: b.productName,
      value: b.weight
    }));
  };

  // --- Chart 4 Data Helpers ---
  const getMatchStatusData = () => {
    return [
      { name: 'Match', value: MOCK_BATCHES.filter(b => b.status !== 'Mismatch').length, color: '#10b981' },
      { name: 'Not Match', value: MOCK_BATCHES.filter(b => b.status === 'Mismatch').length, color: '#ef4444' }
    ];
  };

  const getProductsByMatchStatus = (status: string) => {
    const isMatch = status === 'Match';
    return MOCK_BATCHES.filter(b => isMatch ? b.status !== 'Mismatch' : b.status === 'Mismatch').map(b => ({
      name: b.productName,
      value: b.weight
    }));
  };

  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">System Overview</h2>
        <p className="text-cocoa-500">Monitoring global cocoa supply chain with IRMS verification.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              if (stat.id === 'total-origin') onShowOriginList();
              if (stat.id === 'total-product') onShowProductList();
              if (stat.id === 'total-location') onShowLocationMap();
            }}
            className={`p-6 bg-white rounded-xl border border-cocoa-100 shadow-sm ${stat.clickable ? 'cursor-pointer hover:border-cocoa-300 transition-all hover:shadow-md' : ''}`}
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-sm text-cocoa-500 font-medium">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-cocoa-900">{stat.value}</p>
              {stat.clickable && <ChevronRight size={18} className="text-cocoa-300" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analysis Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Registered Cocoa Beans vs Registered Cocoa Product */}
        <div className="bg-white p-6 rounded-2xl border border-cocoa-100 shadow-sm h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
              <Database size={20} className="text-cocoa-600" />
              Registered: Beans vs Products
              {drillDowns.registered.level === 'monthly' && <span className="text-cocoa-400 text-sm font-normal ml-2">({drillDowns.registered.year})</span>}
            </h3>
            {drillDowns.registered.level === 'monthly' && (
              <button 
                onClick={() => setDrillDowns(prev => ({ ...prev, registered: { level: 'yearly', year: null } }))}
                className="text-xs font-bold text-cocoa-500 hover:text-cocoa-900 flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Yearly
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={drillDowns.registered.level === 'yearly' ? getYearlyData('registered') : getMonthlyData(drillDowns.registered.year!, 'registered')}
                onClick={(data) => {
                  if (drillDowns.registered.level === 'yearly' && data?.activePayload) {
                    setDrillDowns(prev => ({ ...prev, registered: { level: 'monthly', year: data.activePayload![0].payload.year } }));
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={drillDowns.registered.level === 'yearly' ? 'year' : 'month'} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="beans" name="Cocoa Beans" fill="#5b3e31" radius={[4, 4, 0, 0]} />
                <Bar dataKey="products" name="Cocoa Products" fill="#d2b48c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Verified IRMS Cocoa Beans vs Verified IRMS Cocoa Product */}
        <div className="bg-white p-6 rounded-2xl border border-cocoa-100 shadow-sm h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-600" />
              Verified IRMS: Beans vs Products
              {drillDowns.verified.level === 'monthly' && <span className="text-cocoa-400 text-sm font-normal ml-2">({drillDowns.verified.year})</span>}
            </h3>
            {drillDowns.verified.level === 'monthly' && (
              <button 
                onClick={() => setDrillDowns(prev => ({ ...prev, verified: { level: 'yearly', year: null } }))}
                className="text-xs font-bold text-cocoa-500 hover:text-cocoa-900 flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Yearly
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={drillDowns.verified.level === 'yearly' ? getYearlyData('verified') : getMonthlyData(drillDowns.verified.year!, 'verified')}
                onClick={(data) => {
                  if (drillDowns.verified.level === 'yearly' && data?.activePayload) {
                    setDrillDowns(prev => ({ ...prev, verified: { level: 'monthly', year: data.activePayload![0].payload.year } }));
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={drillDowns.verified.level === 'yearly' ? 'year' : 'month'} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="beans" name="Verified Beans" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="products" name="Verified Products" stroke="#5b3e31" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Cocoa Product by Category */}
        <div className="bg-white p-6 rounded-2xl border border-cocoa-100 shadow-sm h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
              <Package size={20} className="text-amber-600" />
              Products by Category
              {drillDowns.category.level === 'product' && <span className="text-cocoa-400 text-sm font-normal ml-2">({drillDowns.category.category})</span>}
            </h3>
            {drillDowns.category.level === 'product' && (
              <button 
                onClick={() => setDrillDowns(prev => ({ ...prev, category: { level: 'category', category: null } }))}
                className="text-xs font-bold text-cocoa-500 hover:text-cocoa-900 flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Categories
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={drillDowns.category.level === 'category' ? getCategoryData() : getProductsByCategory(drillDowns.category.category!)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => {
                    if (drillDowns.category.level === 'category') {
                      setDrillDowns(prev => ({ ...prev, category: { level: 'product', category: data.name } }));
                    }
                  }}
                >
                  {(drillDowns.category.level === 'category' ? getCategoryData() : getProductsByCategory(drillDowns.category.category!)).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#5b3e31', '#8d6e63', '#d2b48c', '#f5f5dc', '#a0522d'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Verified Match vs Not Match */}
        <div className="bg-white p-6 rounded-2xl border border-cocoa-100 shadow-sm h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
              <Activity size={20} className="text-cocoa-600" />
              Match vs Mismatch Analysis
              {drillDowns.match.level === 'product' && <span className="text-cocoa-400 text-sm font-normal ml-2">({drillDowns.match.status})</span>}
            </h3>
            {drillDowns.match.level === 'product' && (
              <button 
                onClick={() => setDrillDowns(prev => ({ ...prev, match: { level: 'status', status: null } }))}
                className="text-xs font-bold text-cocoa-500 hover:text-cocoa-900 flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Status
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={drillDowns.match.level === 'status' ? getMatchStatusData() : getProductsByMatchStatus(drillDowns.match.status!)}
                layout="vertical"
                onClick={(data) => {
                  if (drillDowns.match.level === 'status' && data?.activePayload) {
                    setDrillDowns(prev => ({ ...prev, match: { level: 'product', status: data.activePayload![0].payload.name } }));
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {(drillDowns.match.level === 'status' ? getMatchStatusData() : getProductsByMatchStatus(drillDowns.match.status!)).map((entry: any, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || (drillDowns.match.status === 'Match' ? '#10b981' : '#ef4444')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Map: Cocoa Beans Location */}
        <div className="bg-white p-6 rounded-2xl border border-cocoa-100 shadow-sm h-[500px] flex flex-col lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
              <Globe size={20} className="text-blue-600" />
              Global Cocoa Bean Origins
            </h3>
          </div>
          <div className="flex-1 flex gap-6 overflow-hidden">
            {/* Simple Interactive SVG Map Simulation */}
            <div className="flex-1 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Globe size={300} />
              </div>
              {/* Plotting Mock Origins on a "Map" */}
              {MOCK_ORIGINS.map((origin) => {
                const x = ((origin.coordinates.lng + 180) / 360) * 100;
                const y = ((90 - origin.coordinates.lat) / 180) * 100;
                
                return (
                  <motion.button
                    key={origin.id}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setDrillDowns(prev => ({ ...prev, map: { selectedOrigin: origin } }))}
                    className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer z-10 ${
                      drillDowns.map.selectedOrigin?.id === origin.id ? 'bg-amber-500 scale-150' : 'bg-cocoa-600'
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  />
                );
              })}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur p-2 rounded-lg text-[10px] text-cocoa-500 border border-cocoa-100">
                Click dots to view origin details
              </div>
            </div>

            {/* Origin Info Panel */}
            <div className="w-80 bg-cocoa-50/50 rounded-xl p-6 border border-cocoa-100 overflow-y-auto">
              {drillDowns.map.selectedOrigin ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={drillDowns.map.selectedOrigin.brandLogo} alt="" className="w-12 h-12 rounded-full border border-cocoa-200" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-cocoa-900">{drillDowns.map.selectedOrigin.estateName}</h4>
                      <p className="text-xs text-cocoa-500">{drillDowns.map.selectedOrigin.region}, {drillDowns.map.selectedOrigin.country}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cocoa-100">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-cocoa-400">Reg ID</p>
                      <p className="text-xs font-mono font-bold text-cocoa-700">{drillDowns.map.selectedOrigin.registeredId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-cocoa-400">Altitude</p>
                      <p className="text-xs font-bold text-cocoa-700">{drillDowns.map.selectedOrigin.altitude}m</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-cocoa-400">Soil Type</p>
                      <p className="text-xs font-bold text-cocoa-700">{drillDowns.map.selectedOrigin.soilType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-cocoa-400">Cocoa Type</p>
                      <p className="text-xs font-bold text-cocoa-700">{drillDowns.map.selectedOrigin.cocoaType}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-[10px] uppercase font-bold text-cocoa-400 mb-2">IRMS Fingerprint</p>
                    <div className="space-y-1">
                      {Object.entries(drillDowns.map.selectedOrigin.irmsFingerprint).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-[10px]">
                          <span className="text-cocoa-500 font-mono">{key}</span>
                          <span className="font-bold text-cocoa-900">{val}‰</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <MapPin size={48} className="text-cocoa-300" />
                  <p className="text-sm text-cocoa-500">Select an origin on the map to see detailed information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-cocoa-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-cocoa-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-cocoa-900">Recent Batches</h3>
            <button 
              onClick={() => setShowRecentBatches(!showRecentBatches)}
              className="p-1.5 hover:bg-cocoa-50 text-cocoa-400 hover:text-cocoa-600 rounded-lg transition-colors"
              title={showRecentBatches ? "Hide List" : "Show List"}
            >
              {showRecentBatches ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button className="text-cocoa-700 text-sm font-semibold hover:underline">View All</button>
        </div>
        <AnimatePresence initial={false}>
          {showRecentBatches && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-cocoa-50 text-cocoa-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-6 py-4 font-semibold">Brand & Origin</th>
                      <th className="px-6 py-4 font-semibold">Weight</th>
                      <th className="px-6 py-4 font-semibold">Harvest Date</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cocoa-50">
                    {MOCK_BATCHES.map((batch) => (
                      <tr key={batch.id} className="hover:bg-cocoa-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-cocoa-900">{batch.productName}</div>
                          <div className="text-[10px] text-cocoa-400 font-mono">{batch.batchNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={batch.origin?.brandLogo} alt={batch.origin?.brandName} className="w-8 h-8 rounded-full border border-cocoa-100" referrerPolicy="no-referrer" />
                            <div>
                              <div className="text-sm font-bold text-cocoa-900">{batch.origin?.brandName}</div>
                              <div className="text-[10px] text-cocoa-400 uppercase tracking-wider font-semibold">{batch.origin?.estateName}, {batch.origin?.region}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-cocoa-600">{batch.weight.toLocaleString()} kg</td>
                        <td className="px-6 py-4 text-sm text-cocoa-600">{batch.harvestDate}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            batch.status === 'Verified' ? 'bg-cocoa-200 text-cocoa-800' :
                            batch.status === 'Shipped' ? 'bg-amber-100 text-amber-800' :
                            batch.status === 'Mismatch' ? 'bg-red-100 text-red-700' :
                            'bg-cocoa-100 text-cocoa-600'
                          }`}>
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => onSelectBatch(batch)}
                            className="p-2 hover:bg-cocoa-100 text-cocoa-700 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const OriginDetail = ({ batch, onBack }: { batch: CocoaBatch, onBack: () => void }) => {
  const origin = batch.origin!;
  
  // Prepare data for charts
  const irmsData = [
    { name: 'δ13C', value: origin.irmsFingerprint.delta13C, full: -30 },
    { name: 'δ15N', value: origin.irmsFingerprint.delta15N, full: 10 },
    { name: 'δ18O', value: origin.irmsFingerprint.delta18O, full: 30 },
    { name: 'δ2H', value: origin.irmsFingerprint.delta2H, full: -100 },
    { name: 'δ34S', value: origin.irmsFingerprint.delta34S, full: 20 },
  ];

  const radarData = [
    { subject: 'Carbon', A: Math.abs(origin.irmsFingerprint.delta13C), fullMark: 30 },
    { subject: 'Nitrogen', A: origin.irmsFingerprint.delta15N * 5, fullMark: 30 },
    { subject: 'Oxygen', A: origin.irmsFingerprint.delta18O, fullMark: 30 },
    { subject: 'Hydrogen', A: Math.abs(origin.irmsFingerprint.delta2H) / 2, fullMark: 30 },
    { subject: 'Sulfur', A: origin.irmsFingerprint.delta34S * 2, fullMark: 30 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-start gap-6">
          <img 
            src={origin.brandLogo} 
            alt={origin.brandName} 
            className="w-20 h-20 rounded-2xl border-2 border-cocoa-200 shadow-lg" 
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-cocoa-200 text-cocoa-800 text-[10px] font-bold rounded uppercase">Verified Origin</span>
              <span className="text-cocoa-400 text-sm font-mono">{batch.batchNumber}</span>
            </div>
            <h2 className="text-4xl font-bold text-cocoa-950">{batch.productName}</h2>
            <p className="text-cocoa-500 flex items-center gap-2 mt-1">
              <MapPin size={16} />
              {origin.estateName}, {origin.region}, {origin.country} • {origin.altitude}m Altitude
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-cocoa-200 rounded-lg text-sm font-semibold hover:bg-cocoa-50 transition-all flex items-center gap-2 text-cocoa-700">
            <Info size={16} />
            Export Report
          </button>
          <button className="px-4 py-2 bg-cocoa-800 text-white rounded-lg text-sm font-semibold hover:bg-cocoa-900 transition-all flex items-center gap-2 shadow-lg shadow-cocoa-100">
            <ShieldCheck size={16} />
            Certificate of Origin
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Batch Info */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-cocoa-100 shadow-sm">
            <h3 className="font-bold text-cocoa-900 mb-4 flex items-center gap-2">
              <Globe size={18} className="text-cocoa-600" />
              Origin Map
            </h3>
            <div className="relative h-48 w-full rounded-lg overflow-hidden border border-cocoa-50">
              <img 
                src={`https://picsum.photos/seed/${origin.region}/400/300?blur=1`} 
                alt="Map View" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-12 -left-1/2 -translate-x-1/2 bg-cocoa-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">
                    {origin.region}, {origin.country}
                  </div>
                  <div className="w-4 h-4 bg-cocoa-800 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cocoa-800/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-cocoa-600">
                {origin.coordinates.lat}, {origin.coordinates.lng}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-cocoa-100 shadow-sm">
            <h3 className="font-bold text-cocoa-900 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-cocoa-600" />
              Harvest Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-cocoa-50">
                <span className="text-cocoa-500 text-sm">Harvest Date</span>
                <span className="text-cocoa-900 font-medium">{batch.harvestDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cocoa-50">
                <span className="text-cocoa-500 text-sm">Batch Weight</span>
                <span className="text-cocoa-900 font-medium">{batch.weight.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cocoa-50">
                <span className="text-cocoa-500 text-sm">Estate Name</span>
                <span className="text-cocoa-900 font-medium">{origin.estateName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cocoa-50">
                <span className="text-cocoa-500 text-sm">Soil Type</span>
                <span className="text-cocoa-900 font-medium">{origin.soilType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-cocoa-500 text-sm">Verification ID</span>
                <span className="text-cocoa-900 font-mono text-xs">IRMS-V-9928-X</span>
              </div>
            </div>
          </section>

          <section className="bg-cocoa-950 p-6 rounded-xl text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cocoa-500/20 rounded-lg flex items-center justify-center">
                <Microscope className="text-cocoa-300" size={20} />
              </div>
              <div>
                <h3 className="font-bold">IRMS Technology</h3>
                <p className="text-cocoa-400 text-xs">Isotope Ratio Mass Spectrometry</p>
              </div>
            </div>
            <p className="text-sm text-cocoa-200 leading-relaxed mb-4">
              IRMS analyzes stable isotope ratios (C, N, O, H, S) which vary based on local environmental factors. This creates a unique "fingerprint" that cannot be falsified, ensuring 100% accurate origin tracing.
            </p>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 text-cocoa-300 text-xs font-bold uppercase mb-1">
                <ShieldCheck size={14} />
                Confidence Score
              </div>
              <div className="text-2xl font-bold">99.8%</div>
            </div>
          </section>
        </div>

        {/* Middle & Right: IRMS Data Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-cocoa-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-cocoa-900">Isotopic Fingerprint Analysis</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-cocoa-500">
                  <div className="w-2 h-2 rounded-full bg-cocoa-600"></div>
                  Measured
                </span>
                <span className="flex items-center gap-1 text-xs text-cocoa-500">
                  <div className="w-2 h-2 rounded-full bg-cocoa-200"></div>
                  Regional Baseline
                </span>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={irmsData} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f5ece3" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#6b4e3d' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#fdfaf6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {irmsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#8b5e3c' : '#4a3728'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-5 gap-4 mt-6">
              {irmsData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-[10px] font-bold text-cocoa-400 uppercase mb-1">{item.name}</div>
                  <div className="text-sm font-mono font-bold text-cocoa-900">{item.value}‰</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-cocoa-100 shadow-sm">
              <h3 className="font-bold text-cocoa-900 mb-4">Geographical Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#ebd9c8" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#8b5e3c' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 30]} tick={false} axisLine={false} />
                    <Radar
                      name="Batch"
                      dataKey="A"
                      stroke="#8b5e3c"
                      fill="#a67c52"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-cocoa-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-cocoa-900 mb-4">Traceability Chain</h3>
              <div className="flex-1 space-y-4">
                {[
                  { step: 'Farm Gate', date: 'Feb 15, 2024', location: 'San Martín, PE', icon: MapPin },
                  { step: 'Processing', date: 'Feb 18, 2024', location: 'Tarapoto Hub', icon: Activity },
                  { step: 'IRMS Lab Scan', date: 'Feb 20, 2024', location: 'Lima Central Lab', icon: Microscope },
                  { step: 'Export Ready', date: 'Feb 22, 2024', location: 'Callao Port', icon: Globe },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 relative">
                    {i < 3 && <div className="absolute left-4 top-8 bottom-0 w-px bg-cocoa-100"></div>}
                    <div className="w-8 h-8 rounded-full bg-cocoa-50 border border-cocoa-200 flex items-center justify-center z-10">
                      <item.icon size={14} className="text-cocoa-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-cocoa-900">{item.step}</div>
                      <div className="text-xs text-cocoa-500">{item.date} • {item.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductListPage = ({ onBack }: { onBack: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const productTypes = Array.from(new Set(MOCK_BATCHES.map(b => b.productType))).map(t => ({ label: t, value: t }));

  const filteredData = MOCK_BATCHES.filter(batch => {
    const matchesSearch = 
      batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.productType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === '' || batch.productType === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Product Origin Database</h2>
        <p className="text-cocoa-500">Comprehensive inventory of verified single-origin cocoa products and their isotopic fingerprints.</p>
      </header>

      <div className="bg-white rounded-xl border border-cocoa-100 shadow-sm p-6">
        <TableControls 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search by product, batch ID or manufacturer..."
          filterValue={filterType}
          onFilterChange={setFilterType}
          filterOptions={productTypes}
        />

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left">
            <thead className="bg-cocoa-50 text-cocoa-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Registered ID</th>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Batch ID</th>
                <th className="px-6 py-4 font-semibold">Manufacturer</th>
                <th className="px-6 py-4 font-semibold">Production Date</th>
                <th className="px-6 py-4 font-semibold">Net Weight</th>
                <th className="px-6 py-4 font-semibold">Packaging</th>
                <th className="px-6 py-4 font-semibold">Coordinates</th>
                <th className="px-6 py-4 font-semibold">Ingredients</th>
                <th className="px-6 py-4 font-semibold">IRMS Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa-50">
              {filteredData.length > 0 ? filteredData.map((batch, index) => (
                <tr key={batch.id} className="hover:bg-cocoa-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-cocoa-900 font-mono">{batch.registeredId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={batch.origin?.brandLogo} alt={batch.origin?.brandName} className="w-6 h-6 rounded-full border border-cocoa-100" referrerPolicy="no-referrer" />
                      <span className="text-xs font-bold text-cocoa-900 whitespace-nowrap">{batch.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-cocoa-600 font-mono">{batch.batchNumber}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-700">{batch.manufacturer || '---'}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600 font-mono">{batch.harvestDate}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600 font-mono">{batch.weight}g</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600">{batch.packagingType || '---'}</td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-cocoa-500 font-mono">
                      <div>Lat: {batch.coordinates?.lat || '---'}</div>
                      <div>Lng: {batch.coordinates?.lng || '---'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-cocoa-500 max-w-[120px] truncate" title={batch.ingredients}>
                      {batch.ingredients || '---'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 min-w-[120px]">
                      {[
                        { label: 'C13', val: batch.irmsData.delta13C },
                        { label: 'N15', val: batch.irmsData.delta15N },
                        { label: 'O18', val: batch.irmsData.delta18O },
                      ].map((iso) => (
                        <div key={iso.label} className="text-[9px] bg-cocoa-50 px-1 py-0.5 rounded border border-cocoa-100 flex items-center gap-1">
                          <span className="text-cocoa-400 font-bold uppercase">{iso.label}:</span>
                          <span className="text-cocoa-900 font-mono font-bold">{iso.val}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-cocoa-400 italic text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LocationMapPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Total Cocoa Single Origin Location</h2>
        <p className="text-cocoa-500">Geographical distribution of verified Malaysian cocoa estates.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map View */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-cocoa-100 shadow-sm overflow-hidden relative min-h-[600px]">
          <div className="absolute inset-0 bg-cocoa-50/30 irms-grid opacity-20"></div>
          
          {/* Stylized Malaysia Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full max-w-4xl max-h-[500px] bg-cocoa-100/20 rounded-3xl border-2 border-dashed border-cocoa-200 flex items-center justify-center">
              <Globe className="text-cocoa-100 w-64 h-64 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cocoa-300 font-bold text-4xl uppercase tracking-[0.2em] opacity-10">Malaysia Origin Network</span>
              </div>

              {/* Markers for Malaysian Origins */}
              {MOCK_ORIGINS.map((origin, i) => {
                // Simple mapping for visual representation in the prototype
                const positions = [
                  { top: '20%', left: '25%' }, // Raub (Pahang)
                  { top: '65%', left: '75%' }, // Tawau (Sabah)
                  { top: '75%', left: '60%' }, // Kota Samarahan (Sarawak)
                ];
                const pos = positions[i] || { top: '50%', left: '50%' };

                return (
                  <motion.div
                    key={origin.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2, type: 'spring' }}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute group cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-cocoa-800 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cocoa-800/30 rounded-full animate-ping"></div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20">
                        <div className="bg-cocoa-900 text-white p-3 rounded-lg shadow-2xl min-w-[180px]">
                          <div className="text-xs font-bold text-cocoa-300 uppercase mb-1">{origin.brandName}</div>
                          <div className="text-sm font-bold mb-1">{origin.estateName}</div>
                          <div className="text-[10px] text-zinc-400">{origin.region}, Malaysia</div>
                          <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                            <span className="text-[10px] font-mono">{origin.coordinates.lat}, {origin.coordinates.lng}</span>
                            <ChevronRight size={12} />
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-cocoa-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Map Controls Overlay */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-lg border border-cocoa-100 shadow-lg">
              <h4 className="text-xs font-bold text-cocoa-900 uppercase tracking-wider mb-3">Active Regions</h4>
              <div className="space-y-2">
                {MOCK_ORIGINS.map(origin => (
                  <div key={origin.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cocoa-800"></div>
                    <span className="text-xs font-medium text-cocoa-700">{origin.region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-cocoa-100 shadow-lg flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cocoa-800 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-cocoa-900">Live IRMS Node</span>
            </div>
            <div className="w-px h-4 bg-cocoa-100"></div>
            <span className="text-xs text-cocoa-500 font-medium">Tracking 42 Locations</span>
          </div>
        </div>

        {/* Location Sidebar List */}
        <div className="space-y-4">
          <h3 className="font-bold text-cocoa-900 flex items-center gap-2">
            <MapPin size={18} className="text-cocoa-600" />
            Estate Directory
          </h3>
          <div className="space-y-3">
            {MOCK_ORIGINS.map(origin => (
              <div key={origin.id} className="bg-white p-4 rounded-xl border border-cocoa-100 shadow-sm hover:border-cocoa-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-2">
                  <img src={origin.brandLogo} alt={origin.brandName} className="w-10 h-10 rounded-lg border border-cocoa-50" referrerPolicy="no-referrer" />
                  <div>
                    <div className="text-sm font-bold text-cocoa-900 group-hover:text-cocoa-700 transition-colors">{origin.estateName}</div>
                    <div className="text-[10px] text-cocoa-400 font-bold uppercase tracking-wider">{origin.region}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-cocoa-50">
                  <div>
                    <div className="text-[9px] text-cocoa-400 uppercase font-bold">Altitude</div>
                    <div className="text-xs font-bold text-cocoa-700">{origin.altitude}m</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-cocoa-400 uppercase font-bold">Soil Type</div>
                    <div className="text-xs font-bold text-cocoa-700">{origin.soilType.split(' ')[0]}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Placeholder for more locations */}
            <div className="p-4 bg-cocoa-50/50 rounded-xl border border-dashed border-cocoa-200 flex items-center justify-center">
              <span className="text-xs text-cocoa-400 font-medium">+ 39 More Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableControls = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search...",
  filterValue,
  onFilterChange,
  filterOptions = []
}: { 
  searchTerm: string; 
  onSearchChange: (val: string) => void; 
  placeholder?: string;
  filterValue?: string;
  onFilterChange?: (val: string) => void;
  filterOptions?: { label: string; value: string }[];
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-white border border-cocoa-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cocoa-600/20 transition-all"
        />
      </div>
      {onFilterChange && filterOptions.length > 0 && (
        <div className="relative min-w-[160px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400" size={16} />
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-white border border-cocoa-100 rounded-lg text-sm outline-none appearance-none focus:ring-2 focus:ring-cocoa-600/20 transition-all text-cocoa-700 font-medium"
          >
            <option value="">All Categories</option>
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa-400 pointer-events-none" size={14} />
        </div>
      )}
    </div>
  );
};

const OriginListPage = ({ onBack }: { onBack: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  const countries = Array.from(new Set(MOCK_ORIGINS.map(o => o.country))).map(c => ({ label: c, value: c }));

  const filteredData = MOCK_ORIGINS.filter(origin => {
    const matchesSearch = 
      origin.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.estateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.cocoaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCountry === '' || origin.country === filterCountry;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Beans Origin Database</h2>
        <p className="text-cocoa-500">Detailed overview of verified cocoa origins, isotopic fingerprints, and varieties.</p>
      </header>

      <div className="bg-white rounded-xl border border-cocoa-100 shadow-sm p-6">
        <TableControls 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search by brand, estate, region or country..."
          filterValue={filterCountry}
          onFilterChange={setFilterCountry}
          filterOptions={countries}
        />

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left">
            <thead className="bg-cocoa-50 text-cocoa-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Registered ID</th>
                <th className="px-6 py-4 font-semibold">Brand Name</th>
                <th className="px-6 py-4 font-semibold">Estate Name</th>
                <th className="px-6 py-4 font-semibold">Region</th>
                <th className="px-6 py-4 font-semibold">Country</th>
                <th className="px-6 py-4 font-semibold">Altitude</th>
                <th className="px-6 py-4 font-semibold">Soil Type</th>
                <th className="px-6 py-4 font-semibold">Coordinates</th>
                <th className="px-6 py-4 font-semibold">Cocoa Type</th>
                <th className="px-6 py-4 font-semibold">IRMS Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa-50">
              {filteredData.length > 0 ? filteredData.map((origin, index) => (
                <tr key={origin.id} className="hover:bg-cocoa-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-cocoa-900 font-mono">{origin.registeredId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={origin.brandLogo} alt={origin.brandName} className="w-6 h-6 rounded-full border border-cocoa-100" referrerPolicy="no-referrer" />
                      <span className="text-xs font-bold text-cocoa-900 whitespace-nowrap">{origin.brandName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-cocoa-700 font-medium">{origin.estateName}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600">{origin.region}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600">{origin.country}</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600 font-mono">{origin.altitude}m</td>
                  <td className="px-6 py-4 text-xs text-cocoa-600">{origin.soilType}</td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-cocoa-500 font-mono">
                      <div>Lat: {origin.coordinates.lat}</div>
                      <div>Lng: {origin.coordinates.lng}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-cocoa-100 text-cocoa-800 rounded text-[10px] font-medium whitespace-nowrap">
                      {origin.cocoaType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 min-w-[120px]">
                      {[
                        { label: 'C13', val: origin.irmsFingerprint.delta13C },
                        { label: 'N15', val: origin.irmsFingerprint.delta15N },
                        { label: 'O18', val: origin.irmsFingerprint.delta18O },
                      ].map((iso) => (
                        <div key={iso.label} className="text-[9px] bg-cocoa-50 px-1 py-0.5 rounded border border-cocoa-100 flex items-center gap-1">
                          <span className="text-cocoa-400 font-bold uppercase">{iso.label}:</span>
                          <span className="text-cocoa-900 font-mono font-bold">{iso.val}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-cocoa-400 italic text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CocoaBeansCentrePage = ({ onBack }: { onBack: () => void }) => {
  const [regId] = useState(generateId('CB'));

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Beans Centre</h2>
        <p className="text-cocoa-500">Register new cocoa bean origins and estate details.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-cocoa-100 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Registration ID</label>
            <input type="text" value={regId} readOnly className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none font-mono font-bold text-cocoa-700" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Brand Name</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. Borneo Harvest" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Estate Name</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. Quoin Hill Estate" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Region</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. Tawau, Sabah" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Country</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="Malaysia" defaultValue="Malaysia" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Altitude (m)</label>
            <input type="number" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="150" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Soil Type</label>
            <select className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600">
              <option>Volcanic Soil</option>
              <option>Granitic Soil</option>
              <option>Alluvial Soil</option>
              <option>Clay Soil</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Latitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. 4.2441" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Longitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. 117.8912" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Cocoa Type / Clone</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. PBC 123 (Trinitario)" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Note</label>
            <textarea className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600 h-24" placeholder="Additional notes about this cocoa origin..."></textarea>
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="button" className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors shadow-lg shadow-cocoa-100">
              Register Cocoa Origin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CocoaBeansIRMSCentrePage = ({ onBack }: { onBack: () => void }) => {
  const [submissionId] = useState(generateId('CB-IRMS'));

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Beans IRMS Centre</h2>
        <p className="text-cocoa-500">Submit isotopic fingerprint data for laboratory verification.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-cocoa-100 shadow-sm">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Submission ID</label>
            <input type="text" value={submissionId} readOnly className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none font-mono font-bold text-cocoa-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Batch / Origin Reference</label>
              <select className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600">
                {MOCK_ORIGINS.map(o => (
                  <option key={o.id}>{o.estateName} ({o.brandName})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Analysis Date</label>
              <input type="date" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" />
            </div>
          </div>

          <div className="p-6 bg-cocoa-50/50 rounded-xl border border-cocoa-100">
            <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-[0.2em] mb-6">Isotopic Values (δ ‰)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ13C (Carbon)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="-26.8" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ15N (Nitrogen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="4.5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ18O (Oxygen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="21.5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ2H (Hydrogen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="-52.0" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ34S (Sulfur)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="7.8" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Lab Report Attachment</label>
            <div className="border-2 border-dashed border-cocoa-100 rounded-xl p-8 flex flex-col items-center justify-center bg-cocoa-50/30 hover:bg-cocoa-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Upload className="text-cocoa-600" size={20} />
              </div>
              <p className="text-sm font-bold text-cocoa-900">Click to upload or drag and drop</p>
              <p className="text-xs text-cocoa-400 mt-1">PDF, PNG, JPG or CSV (MAX. 10MB)</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Note</label>
            <textarea className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600 h-24" placeholder="Additional notes about this IRMS submission..."></textarea>
          </div>

          <div className="pt-4">
            <button type="button" className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors shadow-lg shadow-cocoa-100">
              Submit IRMS Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CocoaProductCentrePage = ({ onBack }: { onBack: () => void }) => {
  const [regId] = useState(generateId('CP'));

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Product Centre</h2>
        <p className="text-cocoa-500">Register finished cocoa products and manufacturing details.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-cocoa-100 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Registration ID</label>
            <input type="text" value={regId} readOnly className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none font-mono font-bold text-cocoa-700" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Product Name</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. Single Origin Dark 70%" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Batch ID</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. P-2024-001" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Manufacturer</label>
            <input type="text" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. Artisanal Chocolates Ltd" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Production Date</label>
            <input type="date" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Net Weight (g)</label>
            <input type="number" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Packaging Type</label>
            <select className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600">
              <option>Foil Wrapped Paper Box</option>
              <option>Biodegradable Pouch</option>
              <option>Tin Can</option>
              <option>Plastic Wrap</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Latitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. 4.2441" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Longitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="e.g. 117.8912" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Ingredients List</label>
            <textarea className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600 h-24" placeholder="e.g. Cocoa Mass, Cocoa Butter, Cane Sugar, Vanilla Bean..."></textarea>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Note</label>
            <textarea className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600 h-24" placeholder="Additional notes about this cocoa product..."></textarea>
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="button" className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors shadow-lg shadow-cocoa-100">
              Register Cocoa Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CocoaProductIRMSCentrePage = ({ onBack }: { onBack: () => void }) => {
  const [submissionId] = useState(generateId('CP-IRMS'));

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">Cocoa Product IRMS Centre</h2>
        <p className="text-cocoa-500">Submit isotopic fingerprint data for finished cocoa products.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-cocoa-100 shadow-sm">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Submission ID</label>
            <input type="text" value={submissionId} readOnly className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none font-mono font-bold text-cocoa-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Product / Batch Reference</label>
              <select className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600">
                <option>Single Origin Dark 70% (Batch P-2024-001)</option>
                <option>Milk Chocolate 45% (Batch P-2024-002)</option>
                <option>Cocoa Powder Premium (Batch P-2024-003)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Analysis Date</label>
              <input type="date" className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" />
            </div>
          </div>

          <div className="p-6 bg-cocoa-50/50 rounded-xl border border-cocoa-100">
            <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-[0.2em] mb-6">Isotopic Values (δ ‰)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ13C (Carbon)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="-25.2" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ15N (Nitrogen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="5.1" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ18O (Oxygen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="22.8" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ2H (Hydrogen)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="-48.5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-cocoa-700">δ34S (Sulfur)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-white border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600" placeholder="8.2" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Product Lab Report Attachment</label>
            <div className="border-2 border-dashed border-cocoa-100 rounded-xl p-8 flex flex-col items-center justify-center bg-cocoa-50/30 hover:bg-cocoa-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Upload className="text-cocoa-600" size={20} />
              </div>
              <p className="text-sm font-bold text-cocoa-900">Click to upload product analysis report</p>
              <p className="text-xs text-cocoa-400 mt-1">PDF, PNG, JPG or CSV (MAX. 10MB)</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-cocoa-900 uppercase tracking-wider">Note</label>
            <textarea className="w-full px-4 py-2 bg-cocoa-50 border border-cocoa-100 rounded-lg outline-none focus:ring-2 focus:ring-cocoa-600 h-24" placeholder="Additional notes about this product IRMS submission..."></textarea>
          </div>

          <div className="pt-4">
            <button type="button" className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors shadow-lg shadow-cocoa-100">
              Submit Product IRMS Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const IRMSBeansStatusPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedResult, setSelectedResult] = useState<CocoaOrigin | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  const countries = Array.from(new Set(MOCK_ORIGINS.map(o => o.country))).map(c => ({ label: c, value: c }));

  const filteredData = MOCK_ORIGINS.filter(origin => {
    const matchesSearch = 
      origin.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.estateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.cocoaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCountry === '' || origin.country === filterCountry;

    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (id: string) => {
    setSubmittingId(id);
    setTimeout(() => {
      setSubmittingId(null);
      alert('IRMS Analysis Request submitted successfully to the laboratory.');
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">IRMS Analysis Status (Cocoa Beans)</h2>
        <p className="text-cocoa-500">Track the laboratory submission status of registered cocoa beans.</p>
      </header>

      <div className="bg-white rounded-2xl border border-cocoa-100 shadow-sm p-6">
        <TableControls 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search by estate, brand, region or country..."
          filterValue={filterCountry}
          onFilterChange={setFilterCountry}
          filterOptions={countries}
        />

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cocoa-50/50 border-b border-cocoa-100">
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Registered ID</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Estate / Brand</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Cocoa Type</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">IRMS Submission Status</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">View Result</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">Edit</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">Submit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa-50">
              {filteredData.length > 0 ? filteredData.map((origin, idx) => {
                const isResultReceived = origin.id === MOCK_ORIGINS[0].id;
                const isPending = origin.id !== MOCK_ORIGINS[0].id && origin.id !== MOCK_ORIGINS[1].id;
                return (
                  <tr key={origin.id} className="hover:bg-cocoa-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-cocoa-900 font-mono">{origin.registeredId}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-cocoa-900">{origin.estateName}</div>
                      <div className="text-xs text-cocoa-500">{origin.brandName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-cocoa-600">{origin.region}, {origin.country}</td>
                    <td className="px-6 py-4 text-sm text-cocoa-600">{origin.cocoaType}</td>
                    <td className="px-6 py-4">
                      {isResultReceived ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                          <CheckCircle2 size={14} />
                          Result Received
                        </span>
                      ) : origin.id === MOCK_ORIGINS[1].id ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <ShieldCheck size={14} />
                          Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                          <ShieldAlert size={14} />
                          Pending Submission
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-cocoa-400 font-mono">
                      {origin.id === MOCK_ORIGINS[0].id ? '2024-03-04' : origin.id === MOCK_ORIGINS[1].id ? '2024-03-01' : '---'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isResultReceived ? (
                        <button 
                          onClick={() => setSelectedResult(origin)}
                          className="p-2 text-cocoa-600 hover:bg-cocoa-50 rounded-lg transition-colors"
                          title="View IRMS Analysis Result"
                        >
                          <FileText size={18} />
                        </button>
                      ) : (
                        <span className="text-cocoa-200">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isPending ? (
                        <button 
                          className="p-2 text-cocoa-600 hover:bg-cocoa-50 rounded-lg transition-colors"
                          title="Edit Submission"
                        >
                          <Pencil size={18} />
                        </button>
                      ) : (
                        <span className="text-cocoa-200">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isPending ? (
                        <button 
                          onClick={() => handleSubmit(origin.id)}
                          disabled={submittingId === origin.id}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Submit for Analysis"
                        >
                          {submittingId === origin.id ? (
                            <Activity size={18} className="animate-pulse" />
                          ) : (
                            <Send size={18} />
                          )}
                        </button>
                      ) : (
                        <span className="text-cocoa-200">-</span>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-cocoa-400 italic text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-cocoa-100 flex justify-between items-center bg-cocoa-50/30">
                <div>
                  <h3 className="text-xl font-bold text-cocoa-950">IRMS Origin Fingerprint</h3>
                  <p className="text-sm text-cocoa-500">{selectedResult.estateName} - {selectedResult.region}</p>
                </div>
                <button 
                  onClick={() => setSelectedResult(null)}
                  className="p-2 hover:bg-cocoa-100 rounded-full transition-colors text-cocoa-400 hover:text-cocoa-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-wider">Isotopic Reference Data</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ13C (‰ VPDB)</span>
                        <span className="font-mono font-bold text-cocoa-900">-28.15</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ15N (‰ AIR)</span>
                        <span className="font-mono font-bold text-cocoa-900">+4.22</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ18O (‰ VSMOW)</span>
                        <span className="font-mono font-bold text-cocoa-900">+25.10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-wider">Database Status</h4>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
                      <div className="flex items-center gap-2 text-blue-700 font-bold">
                        <Database size={18} />
                        <span>Registered Profile</span>
                      </div>
                      <p className="text-xs text-blue-600 leading-relaxed">
                        The isotopic fingerprint for this origin has been successfully recorded in the Global Cocoa Traceability Database.
                      </p>
                    </div>
                    <div className="pt-2">
                      <div className="text-[10px] text-cocoa-400 uppercase font-bold mb-1">Data Quality Score</div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[99%]"></div>
                      </div>
                      <div className="text-right text-[10px] font-bold text-blue-600 mt-1">99.1%</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-cocoa-50">
                  <button 
                    className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload size={16} />
                    Download Origin Profile (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const IRMSProductStatusPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedResult, setSelectedResult] = useState<CocoaBatch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const productTypes = Array.from(new Set(MOCK_BATCHES.map(b => b.productType))).map(t => ({ label: t, value: t }));

  const filteredData = MOCK_BATCHES.filter(batch => {
    const matchesSearch = 
      batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.productType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === '' || batch.productType === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">IRMS Analysis Status (Cocoa Product)</h2>
        <p className="text-cocoa-500">Track the laboratory submission status of finished cocoa products.</p>
      </header>

      <div className="bg-white rounded-2xl border border-cocoa-100 shadow-sm p-6">
        <TableControls 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search by product, batch ID or manufacturer..."
          filterValue={filterType}
          onFilterChange={setFilterType}
          filterOptions={productTypes}
        />

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cocoa-50/50 border-b border-cocoa-100">
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Registered ID</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">IRMS Submission Status</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">View Result</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa-50">
              {filteredData.length > 0 ? filteredData.map((batch, idx) => {
                const hasResult = idx % 3 === 0;
                return (
                  <tr key={batch.id} className="hover:bg-cocoa-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-cocoa-900 font-mono">{batch.registeredId}</td>
                    <td className="px-6 py-4 text-sm font-bold text-cocoa-900 font-mono">{batch.batchNumber}</td>
                    <td className="px-6 py-4 text-sm text-cocoa-600">{batch.productName}</td>
                    <td className="px-6 py-4 text-sm text-cocoa-600">{batch.productType}</td>
                    <td className="px-6 py-4">
                      {hasResult ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                          <CheckCircle2 size={14} />
                          Result Received
                        </span>
                      ) : idx % 3 === 1 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <ShieldCheck size={14} />
                          Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                          <ShieldAlert size={14} />
                          Pending Submission
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-cocoa-400 font-mono">
                      {idx % 3 !== 2 ? '2024-03-04' : '---'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {hasResult ? (
                        <button 
                          onClick={() => setSelectedResult(batch)}
                          className="p-2 text-cocoa-600 hover:bg-cocoa-50 rounded-lg transition-colors"
                          title="View IRMS Analysis"
                        >
                          <FileText size={18} />
                        </button>
                      ) : (
                        <span className="text-cocoa-200">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {idx % 3 === 2 ? (
                        <button 
                          className="p-2 text-cocoa-600 hover:bg-cocoa-50 rounded-lg transition-colors"
                          title="Edit Submission"
                        >
                          <Pencil size={18} />
                        </button>
                      ) : (
                        <span className="text-cocoa-200">-</span>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-cocoa-400 italic text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-cocoa-100 flex justify-between items-center bg-cocoa-50/30">
                <div>
                  <h3 className="text-xl font-bold text-cocoa-950">IRMS Analysis Result</h3>
                  <p className="text-sm text-cocoa-500">Batch: {selectedResult.batchNumber}</p>
                </div>
                <button 
                  onClick={() => setSelectedResult(null)}
                  className="p-2 hover:bg-cocoa-100 rounded-full transition-colors text-cocoa-400 hover:text-cocoa-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-wider">Isotopic Profile</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ13C (‰ VPDB)</span>
                        <span className="font-mono font-bold text-cocoa-900">-28.42</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ15N (‰ AIR)</span>
                        <span className="font-mono font-bold text-cocoa-900">+4.15</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                        <span className="text-sm font-medium text-cocoa-700">δ18O (‰ VSMOW)</span>
                        <span className="font-mono font-bold text-cocoa-900">+24.81</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-cocoa-400 uppercase tracking-wider">Origin Verification</h4>
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold">
                        <ShieldCheck size={18} />
                        <span>Match Confirmed</span>
                      </div>
                      <p className="text-xs text-emerald-600 leading-relaxed">
                        The isotopic signature of this batch matches the registered profile for the declared origin (West Africa Region).
                      </p>
                    </div>
                    <div className="pt-2">
                      <div className="text-[10px] text-cocoa-400 uppercase font-bold mb-1">Confidence Score</div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%]"></div>
                      </div>
                      <div className="text-right text-[10px] font-bold text-emerald-600 mt-1">98.4%</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-cocoa-50">
                  <button 
                    className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload size={16} />
                    Download Official Certificate (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnalysisProductPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedQRCode, setSelectedQRCode] = useState<CocoaBatch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Blockchain address copied to clipboard!');
  };

  const productTypes = Array.from(new Set(MOCK_BATCHES.map(b => b.productType))).map(t => ({ label: t, value: t }));

  const filteredData = MOCK_BATCHES.filter(batch => {
    const matchesSearch = 
      batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.productType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === '' || batch.productType === filterType;

    return matchesSearch && matchesFilter;
  });

  const handlePrint = () => {
    const printContent = document.getElementById('qr-print-area');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ${selectedQRCode?.batchNumber}</title>
          <style>
            body { 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              font-family: sans-serif;
            }
            .qr-container { padding: 20px; border: 1px solid #eee; text-align: center; }
            .batch-info { margin-top: 20px; font-weight: bold; font-size: 1.2rem; }
            .product-info { color: #666; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            ${printContent.innerHTML}
            <div class="batch-info">Batch: ${selectedQRCode?.batchNumber}</div>
            <div class="product-info">${selectedQRCode?.productName}</div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-900 transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header>
        <h2 className="text-3xl font-bold text-cocoa-950">IRMS Analysis (Cocoa Product)</h2>
        <p className="text-cocoa-500">Isotopic fingerprint matching for finished cocoa product batches.</p>
      </header>

      <div className="bg-white rounded-2xl border border-cocoa-100 shadow-sm p-6">
        <TableControls 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search by product, batch ID or manufacturer..."
          filterValue={filterType}
          onFilterChange={setFilterType}
          filterOptions={productTypes}
        />

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cocoa-50/50 border-b border-cocoa-100">
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Product Reg ID</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">IRMS Result</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Matched Cocoa Beans</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider">Analysis Date</th>
                <th className="px-6 py-4 text-xs font-bold text-cocoa-900 uppercase tracking-wider text-center">QR Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa-50">
              {filteredData.length > 0 ? filteredData.map((batch, idx) => {
                const isMatch = batch.status !== 'Mismatch';
                return (
                  <tr key={batch.id} className="hover:bg-cocoa-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-cocoa-900 font-mono">{batch.registeredId}</td>
                    <td className="px-6 py-4 text-sm font-bold text-cocoa-900 font-mono">{batch.batchNumber}</td>
                    <td className="px-6 py-4 text-sm text-cocoa-600">{batch.productName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden w-24">
                          <div 
                            className={`h-full ${isMatch ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            style={{ width: `${isMatch ? 92 + (idx % 5) : 38}%` }}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-bold ${isMatch ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isMatch ? 92 + (idx % 5) : 38}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isMatch ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <ShieldCheck size={14} />
                          Match
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                          <ShieldAlert size={14} />
                          Mismatch
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isMatch ? (
                        <div className="flex items-center gap-2">
                          <img src={batch.origin?.brandLogo} alt={batch.origin?.brandName} className="w-6 h-6 rounded-full border border-cocoa-100" referrerPolicy="no-referrer" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-cocoa-900">{batch.origin?.estateName}</span>
                            <span className="text-[10px] text-cocoa-500">{batch.origin?.brandName}</span>
                            <span className="text-[10px] font-mono text-cocoa-400 font-bold">{batch.origin?.registeredId}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-rose-500 font-medium italic">No verified match found</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-cocoa-400 font-mono">
                      2024-03-04
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedQRCode(batch)}
                        className="p-2 text-cocoa-600 hover:bg-cocoa-50 rounded-lg transition-colors"
                        title="Generate QR Code"
                      >
                        <QrCode size={18} />
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-cocoa-400 italic text-sm">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {selectedQRCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-cocoa-100 flex justify-between items-center bg-cocoa-50/30">
                <div>
                  <h3 className="text-xl font-bold text-cocoa-950">Traceability QR Code</h3>
                  <p className="text-sm text-cocoa-500">Batch: {selectedQRCode.batchNumber}</p>
                </div>
                <button 
                  onClick={() => setSelectedQRCode(null)}
                  className="p-2 hover:bg-cocoa-100 rounded-full transition-colors text-cocoa-400 hover:text-cocoa-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 flex flex-col items-center space-y-6">
                <div id="qr-print-area" className="p-4 bg-white border-2 border-cocoa-50 rounded-xl">
                  <QRCodeSVG 
                    value={`https://cocoatrace.com/trace/${selectedQRCode.batchNumber}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="text-center space-y-1">
                  <div className="font-bold text-cocoa-900">{selectedQRCode.productName}</div>
                  <div className="text-sm text-cocoa-500">Isotopic Fingerprint Verified</div>
                </div>

                {/* Blockchain Section */}
                <div className="w-full px-6 py-4 bg-cocoa-50/50 border-y border-cocoa-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <History size={18} className="text-cocoa-600 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase font-bold text-cocoa-400">Blockchain Ledger</p>
                      <button 
                        onClick={() => setShowAuditTrail(true)}
                        className="text-xs font-mono font-bold text-cocoa-700 hover:text-cocoa-900 truncate block w-full text-left hover:underline flex items-center gap-1"
                      >
                        {selectedQRCode.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(selectedQRCode.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                    className="p-2 hover:bg-cocoa-100 rounded-lg transition-colors text-cocoa-400 hover:text-cocoa-600 ml-2"
                    title="Copy Address"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="w-full pt-4 flex gap-3 px-6 pb-6">
                  <button 
                    onClick={handlePrint}
                    className="flex-1 py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer size={18} />
                    Print Label
                  </button>
                  <button 
                    onClick={() => setSelectedQRCode(null)}
                    className="flex-1 py-3 bg-zinc-100 text-cocoa-700 font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Trail Modal */}
      <AnimatePresence>
        {showAuditTrail && selectedQRCode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-cocoa-950/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-cocoa-100 flex justify-between items-center bg-cocoa-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cocoa-800 rounded-lg text-white">
                    <History size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cocoa-950">Blockchain Activity Audit Trail</h3>
                    <p className="text-xs text-cocoa-500 font-mono truncate max-w-[300px]">{selectedQRCode.blockchainAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAuditTrail(false)}
                  className="p-2 hover:bg-cocoa-100 rounded-full transition-colors text-cocoa-400 hover:text-cocoa-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Timeline */}
                <div className="relative space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-cocoa-100"></div>

                  {/* 1. Origin */}
                  <div className="relative flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-cocoa-800 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-cocoa-200">
                      <MapPin size={18} />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h4 className="font-bold text-cocoa-900">Cocoa Beans Origin Registered</h4>
                        <p className="text-xs text-cocoa-500">Estate: {selectedQRCode.origin?.estateName}, {selectedQRCode.origin?.region}</p>
                        <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x8a2...f3e1 | 2024-01-15 09:24:12</p>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-cocoa-100 shadow-sm">
                        <img 
                          src={selectedQRCode.origin?.beanImage || 'https://picsum.photos/seed/beans/600/400'} 
                          alt="Cocoa Beans" 
                          className="w-full h-40 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-3 bg-cocoa-50/50 text-[10px] font-medium text-cocoa-600 flex justify-between">
                          <span>Harvested & Fermented</span>
                          <span>{selectedQRCode.origin?.cocoaType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. IRMS Verification */}
                  <div className="relative flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-emerald-100">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-cocoa-900">IRMS Isotopic Fingerprint Verified</h4>
                      <p className="text-xs text-cocoa-500">Laboratory: Global Cocoa Standards Lab</p>
                      <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x4c1...a9b2 | 2024-01-22 14:15:05</p>
                      <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600">
                          <Activity size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700">Fingerprint Match: 99.2%</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Manufacturing */}
                  <div className="relative flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-amber-100">
                      <Package size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-cocoa-900">Product Manufactured & Packaged</h4>
                      <p className="text-xs text-cocoa-500">Manufacturer: {selectedQRCode.manufacturer}</p>
                      <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x2d5...e7c8 | 2024-02-10 11:42:33</p>
                    </div>
                  </div>

                  {/* 4. Final Product */}
                  <div className="relative flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-cocoa-950 flex items-center justify-center text-white z-10 shrink-0 shadow-lg shadow-cocoa-300">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h4 className="font-bold text-cocoa-900">Final Product Released to Market</h4>
                        <p className="text-xs text-cocoa-500">Batch ID: {selectedQRCode.batchNumber}</p>
                        <p className="text-[10px] text-cocoa-400 font-mono mt-1">TX: 0x9f3...d2a1 | 2024-02-15 16:05:59</p>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-cocoa-100 shadow-sm">
                        <img 
                          src={selectedQRCode.productImage || 'https://picsum.photos/seed/product/600/400'} 
                          alt="Finished Product" 
                          className="w-full h-40 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-3 bg-cocoa-50/50 text-[10px] font-medium text-cocoa-600 flex justify-between">
                          <span>{selectedQRCode.productName}</span>
                          <span>{selectedQRCode.weight}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-cocoa-100 bg-cocoa-50/30">
                <button 
                  onClick={() => setShowAuditTrail(false)}
                  className="w-full py-3 bg-cocoa-800 text-white font-bold rounded-xl hover:bg-cocoa-900 transition-colors"
                >
                  Close Audit Trail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBatch, setSelectedBatch] = useState<CocoaBatch | null>(null);
  const [showProductList, setShowProductList] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showOriginList, setShowOriginList] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(t) => {
          setActiveTab(t);
          setSelectedBatch(null);
          setShowProductList(false);
          setShowLocationMap(false);
          setShowOriginList(false);
        }} 
        onLogout={() => setIsLoggedIn(false)} 
      />
      
      <main className="flex-1 h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedBatch ? (
            <motion.div
              key="origin-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OriginDetail 
                batch={selectedBatch} 
                onBack={() => setSelectedBatch(null)} 
              />
            </motion.div>
          ) : showProductList ? (
            <motion.div
              key="product-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProductListPage onBack={() => setShowProductList(false)} />
            </motion.div>
          ) : showLocationMap ? (
            <motion.div
              key="location-map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LocationMapPage onBack={() => setShowLocationMap(false)} />
            </motion.div>
          ) : showOriginList ? (
            <motion.div
              key="origin-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OriginListPage onBack={() => setShowOriginList(false)} />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  onSelectBatch={setSelectedBatch} 
                  onShowProductList={() => setShowProductList(true)}
                  onShowLocationMap={() => setShowLocationMap(true)}
                  onShowOriginList={() => setShowOriginList(true)}
                />
              )}
              {activeTab === 'trace' && (
                <TraceBatchPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'database-beans' && (
                <OriginListPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'database-products' && (
                <ProductListPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'datahub-beans' && (
                <CocoaBeansCentrePage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'datahub-irms' && (
                <CocoaBeansIRMSCentrePage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'datahub-product-centre' && (
                <CocoaProductCentrePage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'datahub-product-irms' && (
                <CocoaProductIRMSCentrePage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'irms-status-beans' && (
                <IRMSBeansStatusPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'irms-status-product' && (
                <IRMSProductStatusPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'analysis-product' && (
                <AnalysisProductPage onBack={() => setActiveTab('dashboard')} />
              )}
              {activeTab === 'settings' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-zinc-400">System Settings</h2>
                  <p>Configuration options for IRMS sensors and laboratory integration.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
