import React, { useState } from 'react';
import { 
  Activity, 
  Upload, 
  Target, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  FileVideo,
  FileImage,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SimulateEvent: React.FC = () => {
  const [objectType, setObjectType] = useState('person');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Simulation of API call to /simulate-event
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setResult({
        status: 'success',
        detection: {
          object: objectType,
          confidence: (Math.random() * 15 + 85).toFixed(2),
          timestamp: new Date().toISOString(),
          eventId: `EVT-${Math.floor(Math.random() * 9000 + 1000)}`,
          blockchainHash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')
        }
      });
    } catch (err) {
      setResult({ status: 'error', message: 'Detection engine failed to process the request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Simulate Security Event</h1>
        <p className="text-slate-400 mt-2">Test the AI detection engine and blockchain logging by uploading media.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Simulation Parameters
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Object Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['person', 'vehicle', 'weapon', 'intrusion'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setObjectType(type)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold capitalize transition-all border ${
                      objectType === type 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Upload Media</label>
              {!file ? (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center group-hover:border-emerald-500/50 transition-colors bg-white/5">
                    <Upload className="w-10 h-10 text-slate-500 mx-auto mb-4 group-hover:text-emerald-400 transition-colors" />
                    <p className="text-sm text-slate-300 font-semibold">Click or drag to upload</p>
                    <p className="text-xs text-slate-500 mt-1">MP4, MOV, JPG, PNG (Max 50MB)</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {file.type.startsWith('video') ? (
                      <FileVideo className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <FileImage className="w-6 h-6 text-emerald-400" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white truncate max-w-[150px]">{file.name}</p>
                      <p className="text-[10px] text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFile(null)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !file}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing AI Detection...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Trigger Detection</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-8 border border-white/10 h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Detection Results
            </h2>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {!result && !loading && (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                      <Activity className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm">Waiting for simulation trigger...</p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 w-full"
                  >
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <Activity className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-emerald-400 font-bold">Analyzing Frames</p>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3 }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {result && result.status === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full space-y-6 text-left"
                  >
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Detection Successful</span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Object</p>
                          <p className="text-lg font-bold text-white capitalize">{result.detection.object}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
                          <p className="text-lg font-bold text-emerald-400">{result.detection.confidence}%</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Event ID</p>
                        <p className="text-sm font-mono text-white">{result.detection.eventId}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Blockchain Hash</p>
                        <p className="text-[10px] font-mono text-emerald-400 break-all">{result.detection.blockchainHash}</p>
                      </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-white transition-colors">
                      View in History
                    </button>
                  </motion.div>
                )}

                {result && result.status === 'error' && (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto border border-red-500/30">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-red-500 font-bold">Simulation Failed</h3>
                    <p className="text-slate-400 text-sm">{result.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulateEvent;
