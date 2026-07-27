"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ShareScreen({ createdChallengeId, handleDeleteChallenge, isDeleting }) {
  const [copiedLink, setCopiedLink] = useState("");
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareLink = `${baseUrl}/nhie/${createdChallengeId}`;
  const shareText = `I just confessed my secrets! Can you guess what I've done? Take my Never Have I Ever quiz: ${shareLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink("share");
    setTimeout(() => setCopiedLink(""), 2000);
  };

  return (
    <motion.div
      key="step-11" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-center relative overflow-hidden flex flex-col items-center"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="text-7xl mb-6 relative z-10 animate-bounce drop-shadow-md">🔥</div>
      <h2 className="text-4xl font-black mb-3 text-slate-900 relative z-10">Challenge is LIVE!</h2>
      <p className="text-slate-500 font-medium text-lg mb-10 relative z-10">You have an active quiz running on this device. <br /> Delete it below if you want to create a brand new one.</p>

      <div className="space-y-6 relative z-10 text-left w-full">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            <span>Send to friends</span>
            <span className="bg-emerald-100 px-2 py-0.5 rounded-md text-xs text-emerald-700 border border-emerald-200">Active Link</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input readOnly value={shareLink} className="w-full bg-white border border-slate-200 text-slate-800 px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-500 transition-colors shadow-inner" />
            <button 
              onClick={copyToClipboard}
              className="bg-emerald-500 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-600 transition-all whitespace-nowrap active:scale-95 shadow-md"
            >
              {copiedLink === 'share' ? 'Copied! ✔' : 'Copy Link'}
            </button>
          </div>
          
          <div className="flex gap-3 mt-4">
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366]/10 text-[#25D366] py-3 rounded-xl font-bold border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors flex justify-center items-center">WhatsApp</a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Can you guess my secrets? Take my Never Have I Ever quiz!")}&url=${shareLink}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-200 transition-colors flex justify-center items-center">X (Twitter)</a>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 shadow-sm text-center">
          <p className="text-sm font-bold text-amber-700 mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
            <span>Track Your Results</span>
            <span className="bg-amber-100 px-2 py-0.5 rounded-md text-xs text-amber-800 border border-amber-200">Secret Scoreboard</span>
          </p>
          <button onClick={() => window.location.href = `/nhie/${createdChallengeId}/results`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-black px-8 py-4 rounded-xl hover:bg-amber-600 transition-all active:scale-95 text-lg shadow-md">
            Go to my Dashboard now →
          </button>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 w-full relative z-10">
        <button
          onClick={handleDeleteChallenge} disabled={isDeleting}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
        >
          {isDeleting ? <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div> : <span className="text-lg">🗑️</span>}
          {isDeleting ? "Deleting..." : "Delete current quiz & start over"}
        </button>
      </div>
    </motion.div>
  );
}