import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Upload,
  Send,
  Cpu,
  Zap,
  Shield,
  Terminal,
  Command,
  Loader2,
  Activity,
  Box,
  ChevronRight,
  Database,
  Globe
} from "lucide-react";

const PdfPlayground = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_PDF_URL = import.meta.env.VITE_BASE_URL+'/public/uploadedpdf.pdf';
  const [pdfUrl, setPdfUrl] = useState(BASE_PDF_URL);

  const [rightWidth, setRightWidth] = useState(450);
  const resizing = useRef(false);

  const startResize = () => { resizing.current = true; document.body.style.cursor = "col-resize"; };
  const stopResize = () => { resizing.current = false; document.body.style.cursor = "default"; };
  const resize = (e) => {
    if (!resizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    setRightWidth(Math.min(Math.max(newWidth, 350), 800));
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      await axios.post(import.meta.env.VITE_BASE_URL+'/pdf-scrap/upload/pdf', formData);
      setPdfUrl(`${BASE_PDF_URL}?t=${Date.now()}`);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handelquery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("query", query);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/pdf-scrap/query', formData);
      setAnswer(res.data.answer);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div
      className="h-screen flex flex-col bg-[#010101] text-white font-mono overflow-hidden relative"
      onMouseMove={resize}
      onMouseUp={stopResize}
      onMouseLeave={stopResize}
    >
      {/* --- QUANTUM CORE LOADING OVERLAY --- */}
      {loading && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202]/60 backdrop-blur-[50px] transition-all duration-700">
          <div className="relative flex flex-col items-center">
            {/* Pulsing Aura */}
            <div className="absolute w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" />
            
            {/* Orbital HUD */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-[1px] border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border-t-2 border-cyan-500/40 rounded-full animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-8 border-b-2 border-white/10 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
              <Box className="w-12 h-12 text-cyan-400 animate-bounce" strokeWidth={1.5} />
            </div>

            {/* Status Stream */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                <span className="text-[14px] tracking-[0.6em] font-black text-cyan-500 uppercase">
                  Analyzing_Stream
                </span>
              </div>
              <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="h-5 overflow-hidden text-[9px] text-white/40 uppercase tracking-[0.3em] font-bold">
                <div className="flex flex-col items-center animate-[logMove_4s_infinite]">
                  <span className="h-5">Pulling Vector Context...</span>
                  <span className="h-5">Cross-referencing Nodes...</span>
                  <span className="h-5">Decrypting Semantic Layers...</span>
                  <span className="h-5">Finalizing Neural Link...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TOP NAV BAR --- */}
      <header className="h-14 shrink-0 px-8 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <Cpu className="text-cyan-400 w-5 h-5" />
            </div>
            <h1 className="text-sm font-black tracking-[0.2em] uppercase">
              Summ_Core<span className="text-cyan-500">.AI</span>
            </h1>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black tracking-widest text-white/20">
            <div className="flex items-center gap-2">
              <Globe size={12} /> <span>SERVER_STATUS: OPTIMAL</span>
            </div>
          </div>
        </div>
        <Shield size={18} className="text-white/10" />
      </header>

      {/* --- CONTROL DOCK --- */}
      <div className="h-14 shrink-0 px-8 flex items-center justify-between border-b border-white/5 bg-[#050505]">
        <div className="flex gap-4">
          <label className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white/60 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter cursor-pointer hover:bg-cyan-500 hover:text-black transition-all duration-300">
            <Upload size={14} />
            {file ? file.name : "Inject_Document.pdf"}
            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
          </label>
          {file && (
            <button
              onClick={handleUpload}
              className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              <Zap size={14} /> SCAN_MATRIX
            </button>
          )}
        </div>
        <div className="text-[10px] font-black text-white/10 flex items-center gap-2 tracking-[0.4em]">
           <Database size={12} /> SECURE_ENCLAVE_ACTIVE
        </div>
      </div>

      {/* --- MAIN OPERATIONAL AREA --- */}
      <main className="flex flex-1 min-h-0 bg-[#080808]">
        {/* VIEWPORT AREA */}
        <div className="flex-1 min-h-0 relative flex flex-col bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-30" />
          <iframe
            src={pdfUrl}
            title="PDF"
            className="w-full h-full border-none opacity-90 invert-[0.93] hue-rotate-180 contrast-[1.05]"
          />
        </div>

        {/* RESIZER BEAM */}
        <div
          onMouseDown={startResize}
          className="w-[4px] cursor-col-resize bg-black border-x border-white/5 hover:bg-cyan-500/50 transition-all group relative"
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-cyan-500/0 group-hover:bg-cyan-500 shadow-[0_0_10px_cyan] transition-all" />
        </div>

        {/* COPILOT SIDEBAR */}
        <aside
          style={{ width: rightWidth }}
          className="shrink-0 bg-[#030303] flex flex-col min-h-0 border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="h-12 shrink-0 px-6 flex items-center justify-between border-b border-white/5 bg-black/40">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-cyan-500" />
              <span className="text-[10px] tracking-[0.4em] font-black text-white/40 uppercase">Intelligence_Output</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-cyan-500/20 animate-pulse" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-8 space-y-6">
            {answer ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/40" />
                  <div className="flex items-center gap-2 mb-4 opacity-40">
                    <Activity size={12} className="text-cyan-400" />
                    <span className="text-[8px] font-black tracking-[0.3em] uppercase">Verified_Response</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-cyan-50/90 font-medium selection:bg-cyan-500 selection:text-black">
                    {answer}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-10">
                <Command size={48} strokeWidth={1} />
                <span className="text-[10px] tracking-[0.8em] font-black">SYSTEM_IDLE</span>
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* --- INFINITY GLASS FOOTER --- */}
      <footer className="h-28 shrink-0 flex items-center justify-center px-12 relative z-50 overflow-visible">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[40px] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]" />
        
        <div className="w-full max-w-5xl relative group">
          {/* Neon Pulse */}
          <div className="absolute -inset-1 bg-cyan-500/10 blur-[30px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />

          <div className="relative flex items-center bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[24px] p-2.5 transition-all duration-500 group-focus-within:border-cyan-500/40 group-focus-within:bg-white/[0.05]">
            <div className="pl-6 pr-4 text-cyan-500/30">
              <ChevronRight size={24} strokeWidth={3} />
            </div>
            <input
              className="flex-1 bg-transparent outline-none text-[15px] font-bold tracking-tight text-white placeholder:text-white/10"
              placeholder="Query the internal document intelligence matrix..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handelquery()}
            />
            <button
              onClick={handelquery}
              className="w-16 h-16 bg-cyan-500 text-black rounded-[18px] hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95"
            >
              <Send size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </footer>

      {/* --- KEYFRAME ANIMATIONS --- */}
      <style>{`
        @keyframes logMove {
          0%, 20% { transform: translateY(0); }
          25%, 45% { transform: translateY(-20px); }
          50%, 70% { transform: translateY(-40px); }
          75%, 95% { transform: translateY(-60px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PdfPlayground;