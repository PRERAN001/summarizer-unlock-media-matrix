

import React, { useState } from "react";
import axios from "axios";
import { 
  FileText, Image as ImageIcon, Video, AlignLeft, 
  Youtube, Scan, ShieldCheck, Box, Mic,
  Fingerprint, ArrowUpRight, Cpu, Layers, Loader2, Sparkles, Activity
} from "lucide-react";
import {useNavigate} from 'react-router-dom'
const Check = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [video, setVideo] = useState(null);
  const [vidres, setVidres] = useState("");
  const [audio, setAudio] = useState(null);
  const [adres, setAdres] = useState("");
  const [pdf, setPdf] = useState(null);
  const [pdfres, setPdfres] = useState("");
  const [yt_video, setYt_video] = useState(null);
  const [yt_V_res, setYt_V_res] = useState("");
  const [text, setText] = useState("");
  const [textRes, setTextRes] = useState("");


  const handleFilePdf = (e) => setPdf(e.target.files[0]);
  const handleFileYt_video = (e) => setYt_video(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleFileaudio = (e) => setAudio(e.target.files[0]);
  const hanelvideoChange = (e) => setVideo(e.target.files[0]);


  const handleTextSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/text_txt', { text: text });
      setTextRes(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleAudioSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", audio);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/audio_txt', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAdres(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handel_yt_video = async () => {
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/yt_video_txt', { yt_video: yt_video });
      setYt_V_res(res.data);
    } finally { setLoading(false); }
  }

  const handlePdfSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", pdf);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/pdf_txt', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPdfres(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleVideoSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("video", video);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/video_txt', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVidres(res.data);
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL+'/img_txt', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  // --- HELPER COMPONENTS ---
  const Module = ({ title, icon: Icon, children, resultData, resultKey, label }) => (
    <div className="relative border border-white/5 bg-[#050505] group overflow-hidden transition-all duration-500 hover:border-[#38BDF8]/30">
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#38BDF8] group-hover:h-full transition-all duration-700" />
      <div className="p-8">
        <div className="flex gap-4 mb-10">
          <div className="w-12 h-12 bg-white flex items-center justify-center text-black group-hover:bg-[#38BDF8] transition-colors shadow-[4px_4px_0px_#1E293B]">
            <Icon size={24} />
          </div>
          <div>
            <span className="text-[9px] font-black tracking-[0.4em] text-[#38BDF8] uppercase">{label}</span>
            <h3 className="text-lg font-bold text-white tracking-tighter uppercase mt-1">{title}</h3>
          </div>
        </div>

        <div className="space-y-6">{children}</div>

        {resultData && (
          <div className="mt-8 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-[#0A192F]/60 border border-[#38BDF8]/30 p-6 rounded-sm relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#38BDF8]" />
                <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.2em]">Synthesis Complete</span>
              </div>
              <p className="text-sm text-white/80 font-mono leading-relaxed max-h-60 overflow-y-auto">
                {(() => {
                  if (!resultData) return '';
                  if (typeof resultData === 'string') return resultData;
                  const candidate = resultKey && resultData[resultKey];
                  if (candidate && typeof candidate === 'string') return candidate;
                  if (resultData.text && typeof resultData.text === 'string') return resultData.text;
                  if (resultData.summary && typeof resultData.summary === 'string') return resultData.summary;
                  try { return JSON.stringify(resultData); } catch (e) { return String(resultData); }
                })()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const inputStyle = "w-full bg-transparent text-[10px] text-white/40 border border-white/10 py-3 px-4 file:bg-white file:text-black file:border-0 file:text-[9px] file:font-black file:uppercase file:px-4 file:mr-4 file:cursor-pointer hover:file:bg-[#38BDF8] transition-all font-mono";
  const btnStyle = "w-full mt-2 bg-white hover:bg-[#38BDF8] text-black font-black py-4 px-6 flex items-center justify-between uppercase text-[11px] tracking-widest transition-all active:scale-95";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#38BDF8] selection:text-black">
      
      {/* 1. THE GOATED BLUR OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[60px]" />
          <div className="relative z-10 flex flex-col items-center">
             <div className="relative mb-8">
                <Loader2 size={100} className="text-[#38BDF8] animate-spin" strokeWidth={1} />
                <Cpu size={36} className="absolute inset-0 m-auto text-white animate-pulse" />
             </div>
             <h2 className="text-4xl font-black tracking-[0.6em] uppercase text-white mb-2">Processing</h2>
             <p className="text-[#38BDF8] text-[11px] font-black uppercase tracking-[0.5em] animate-pulse">Python synthesis in progress!</p>
          </div>
        </div>
      )}

      {/* 2. STICKY GLASS HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Layers size={24} className="text-[#38BDF8]" />
            <h1 className="text-2xl font-black tracking-tighter uppercase">SUMMARIZER<span className="text-[#38BDF8]">++</span></h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex gap-6 border-r border-white/10 pr-6">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest cursor-pointer" onClick={() => navigate('/pdf')}>PDF PLAYGROUND</span>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Version 4.0.2</span>
                <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping"/> Encrypted
                </span>
             </div>
             <Fingerprint size={20} className="text-white/40" />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pt-48 pb-20">
        
        {/* HERO AREA */}
        <div className="mb-24 flex flex-col lg:flex-row justify-between items-end">
            <div className="max-w-4xl">
                <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase">
                    Unlocking <br />
                    <span className="text-[#38BDF8] inline-flex items-center gap-4">
                        Media <Scan size={60} strokeWidth={3} className="md:w-20 md:h-20" /> Matrix
                    </span>
                </h2>
                {/* RELOCATED SYSTEM STATUS */}
                <div className="inline-flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-4 rounded-sm">
                   <div className="flex items-center gap-3">
                      <Cpu size={20} className="text-[#38BDF8] animate-spin [animation-duration:10s]" />
                      <div>
                        <p className="text-[9px] text-white/40 font-black uppercase">System Core</p>
                        <p className="text-xs font-bold uppercase tracking-tighter">Ready to Process</p>
                      </div>
                   </div>
                   <div className="w-[1px] h-8 bg-white/10" />
                   <div className="flex items-center gap-3">
                      <Activity size={20} className="text-green-500" />
                      <div>
                        <p className="text-[9px] text-white/40 font-black uppercase">Latency</p>
                        <p className="text-xs font-bold uppercase tracking-tighter">0.02ms</p>
                      </div>
                   </div>
                </div>
            </div>
        </div>

        {/* TOOL GRID (6 MODULES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/5">
          
          <Module title="Static Vision" label="Image Vector" icon={ImageIcon} resultData={result} resultKey="summary">
            <input type="file" accept="image/*" onChange={handleFileChange} className={inputStyle} />
            <button onClick={handleSubmit} className={btnStyle}>Execute Scan <ArrowUpRight size={18}/></button>
          </Module>

          <Module title="Document AI" label="PDF Synthesis" icon={FileText} resultData={pdfres} resultKey="text">
            <input type="file" accept="application/pdf" onChange={handleFilePdf} className={inputStyle} />
            <button onClick={handlePdfSubmit} className={btnStyle}>Parse Ledger <ArrowUpRight size={18}/></button>
          </Module>

          <Module title="Motion Data" label="Video Frames" icon={Video} resultData={vidres} resultKey="text">
            <input type="file" accept="video/*" onChange={hanelvideoChange} className={inputStyle} />
            <button onClick={handleVideoSubmit} className={btnStyle}>Decompose MP4 <ArrowUpRight size={18}/></button>
          </Module>

          <Module title="Textual Logic" label="Text Summarization" icon={AlignLeft} resultData={textRes} resultKey="text">
            <textarea 
              placeholder="PASTE RAW TEXT DATA..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 bg-white/5 border border-white/10 p-4 text-[10px] font-mono focus:border-[#38BDF8] outline-none transition-all resize-none"
            />
            <button onClick={handleTextSubmit} className={btnStyle}>Synthesize <ArrowUpRight size={18}/></button>
          </Module>

          <Module title="Acoustic Wave" label="Audio Spectrum" icon={Mic} resultData={adres} resultKey="text">
            <input type="file" accept="audio/*" onChange={handleFileaudio} className={inputStyle} />
            <button onClick={handleAudioSubmit} className={btnStyle}>Decipher Audio <ArrowUpRight size={18}/></button>
          </Module>

          <Module title="Neural Stream" label="Network Source" icon={Youtube} resultData={yt_V_res} resultKey="text">
            <input 
              type="text" 
              placeholder="PASTE YOUTUBE PROTOCOL..." 
              onChange={handleFileYt_video} 
              className="w-full bg-white/5 border border-white/10 py-3 px-4 text-[10px] font-mono focus:border-[#38BDF8] outline-none transition-all"
            />
            <button onClick={handel_yt_video} className={btnStyle}>Ingest Stream <ArrowUpRight size={18}/></button>
          </Module>

        </div>

        {/* FOOTER */}
        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
           <div className="flex gap-12">
              <span>BIT // BENGALURU</span>
              <span>PRERAN_LABS</span>
           </div>
           <p>© 2025 Summarizer Plus Plus • Industrial Synthesis Engine</p>
           <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#38BDF8]" />
              <span>Secured Session</span>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default Check;