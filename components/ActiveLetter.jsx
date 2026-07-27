"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { slideVariants } from "./LetterForm"; // Assuming you still export this from your form component

// Helper for the Bot Chat Bubbles
const BotMessage = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.4, type: "spring", bounce: 0.4 }}
    className="flex items-end gap-3 w-full"
  >
    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-sm shadow-inner border border-white/5">
      💌
    </div>
    <div className={`bg-white/10 backdrop-blur-md p-4 rounded-3xl rounded-bl-none text-slate-200 max-w-[90%] text-sm leading-relaxed border border-white/10 shadow-lg ${className}`}>
      {children}
    </div>
  </motion.div>
);

export default function ActiveLetter({
  activeTheme,
  recipientNameDisplay,
  senderName, // NEW PROP: Pass this from the parent if available
  createdLetterId,
  handleDeleteLetter,
  isDeleting,
}) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/letter/${createdLetterId}`);
    }
  }, [createdLetterId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- SOCIAL SHARING HANDLERS ---
  const shareMessage = `I wrote a secret letter for you. Open it here: `;
  
  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + url)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const shareInstagram = () => {
    // Instagram doesn't have a direct text-sharing web link, so we copy it to clipboard for them
    copyToClipboard();
    alert("Link copied! You can now paste it in your Instagram DMs.");
  };

  return (
    <motion.div
      key="step-1"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="bg-[#13151f]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col h-[750px] max-h-[85vh] w-full max-w-xl mx-auto"
    >
      {/* Background Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 ${activeTheme?.glow || 'bg-purple-500/30'} blur-[120px] pointer-events-none`} />

      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <span className="text-2xl drop-shadow-md"></span>
          <div>
            <h3 className={`font-black bg-gradient-to-r ${activeTheme?.text || 'from-white to-gray-300'} bg-clip-text text-transparent`}>
              Letter Sealed
            </h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Digital Envelope Ready
            </p>
          </div>
        </div>
      </div>

      {/* Chat History Area */}
      <div className="flex-grow p-5 md:p-8 overflow-y-auto custom-scrollbar space-y-5 relative z-10">
        
        <BotMessage delay={0.2}>
          Hi <strong className="text-white">{senderName || "there"}</strong>! 👋
        </BotMessage>

        <BotMessage delay={0.8}>
          Great news. Your envelope for <strong className="text-white border-b border-white/30">{recipientNameDisplay}</strong> has been successfully sealed and encrypted. 🔒
        </BotMessage>

        <BotMessage delay={1.4} className="w-full">
          <p className="mb-3 font-bold text-white">Here is your unique secret link:</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              readOnly
              value={url}
              className={`w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-xs font-mono text-ellipsis focus:border-white/30 transition-colors`}
            />
            <button
              onClick={copyToClipboard}
              className={`bg-gradient-to-r ${activeTheme?.button || 'from-purple-500 to-indigo-500'} text-white px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg active:scale-95 text-sm`}
            >
              {copied ? "Copied! ✔" : "Copy"}
            </button>
          </div>
        </BotMessage>

        <BotMessage delay={2.0}>
          <p className="mb-3">You can share it directly with them using these apps:</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={shareWhatsApp} className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold text-xs hover:scale-105 transition-transform shadow-md">
              💬 WhatsApp
            </button>
            <button onClick={shareInstagram} className="flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-4 py-2 rounded-lg font-bold text-xs hover:scale-105 transition-transform shadow-md">
              📸 Instagram
            </button>
            <button onClick={shareTelegram} className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-2 rounded-lg font-bold text-xs hover:scale-105 transition-transform shadow-md">
              ✈️ Telegram
            </button>
          </div>
        </BotMessage>

        <BotMessage delay={2.6}>
          I hope it makes their day! 💖 <br/><br/>
          <span className="text-amber-300 text-xs font-medium bg-amber-500/10 p-2 rounded-lg inline-block border border-amber-500/20">
            ⚠️ <strong>Note:</strong> You can only have one active letter at a time on this device.
          </span>
        </BotMessage>

      </div>

      {/* Footer Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2 }}
        className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md relative z-10 flex gap-3"
      >
        <Link href="/" className="flex-1 text-center bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-4 rounded-xl transition-colors border border-white/10 shadow-inner">
          Back Home
        </Link>
        <button
          onClick={handleDeleteLetter}
          disabled={isDeleting}
          className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-xl disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "🗑️ Shred Letter"
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}