import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessStep({ 
  createdQuizId, 
  handleDeleteQuiz, 
  isDeleting, 
  baseUrl, 
  copyToClipboard, 
  copiedLink 
}) {
  // State to manage the staggered chat sequence
  const [visibleMessages, setVisibleMessages] = useState(0);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom as new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 50);
    }
  }, [visibleMessages]);

  // Sequence the final messages
  useEffect(() => {
    const sequence = async () => {
      // 1. Show celebration
      await new Promise(r => setTimeout(r, 400));
      setVisibleMessages(1);
      
      // 2. Show Share Widget
      await new Promise(r => setTimeout(r, 1000));
      setVisibleMessages(2);
      
      // 3. Show Dashboard Widget
      await new Promise(r => setTimeout(r, 1000));
      setVisibleMessages(3);
      
      // 4. Show Delete Option
      await new Promise(r => setTimeout(r, 1000));
      setVisibleMessages(4);
    };
    sequence();
  }, []);

  // Animation variants
  const bubbleVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col w-full h-[600px] max-h-[85vh] bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 relative">
      
      {/* Top Confetti / Glow Bar */}
      <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 w-full z-20" />

      {/* Chat Header */}
      <div className="bg-white px-4 md:px-6 py-4 border-b border-slate-100 flex items-center gap-3 shadow-sm z-10 shrink-0 mt-1.5">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl shadow-inner">
          🎉
        </div>
        <div>
          <h2 className="text-slate-800 font-black text-lg leading-tight">GetKnowify</h2>
          <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Mission Accomplished
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar bg-slate-50/50 pb-10"
      >
        <AnimatePresence>
          
          {/* Message 1: The Celebration */}
          {visibleMessages >= 1 && (
            <motion.div variants={bubbleVariants} initial="hidden" animate="visible" className="flex justify-start">
              <div className="max-w-[85%] px-5 py-4 shadow-sm text-[15px] leading-relaxed bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-1">Woohoo! Your quiz is LIVE! 🔥</h3>
                <p className="text-slate-500">Time to expose which of your friends actually knows you.</p>
              </div>
            </motion.div>
          )}

          {/* Message 2: The Share Widget */}
          {visibleMessages >= 2 && (
            <motion.div variants={bubbleVariants} initial="hidden" animate="visible" className="flex justify-start w-full">
              <div className="w-full max-w-md bg-white p-5 rounded-3xl rounded-tl-sm shadow-md border border-slate-200 space-y-4 relative">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Public Share Link</p>
                  <span className="bg-emerald-100 px-2 py-0.5 rounded-md text-xs font-bold text-emerald-600">Send to friends</span>
                </div>
                
                {/* Copy Link Row */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    readOnly 
                    value={`${baseUrl}/quiz/${createdQuizId}`} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-400 transition-colors"
                  />
                  <button 
                    onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'share')}
                    className="bg-emerald-500 text-white px-5 py-3 rounded-xl font-black hover:bg-emerald-400 transition-colors whitespace-nowrap active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    {copiedLink === 'share' ? 'Copied! ✔' : 'Copy'}
                  </button>
                </div>

                {/* Social Share Row */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Take my ultimate quiz to see how well you know me! 👀 ${baseUrl}/quiz/${createdQuizId}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border border-[#25D366]/20"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <span className="text-sm">WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'ig');
                      alert('Link copied! Open Instagram and paste it in your Story sticker or Bio.');
                    }}
                    className="flex-1 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 text-[#E1306C] py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border border-[#E1306C]/20"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    <span className="text-sm">Insta</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Message 3: The Dashboard Widget */}
          {visibleMessages >= 3 && (
            <motion.div variants={bubbleVariants} initial="hidden" animate="visible" className="flex justify-start w-full">
              <div className="w-full max-w-md bg-amber-50 p-5 rounded-3xl rounded-tl-sm shadow-md border border-amber-200 space-y-3 relative text-center">
                <p className="text-sm font-bold text-amber-600 uppercase tracking-wide flex items-center justify-center gap-2">
                  <span>Track Your Results</span>
                  <span className="bg-amber-200 px-2 py-0.5 rounded-md text-xs text-amber-800">Secret</span>
                </p>
                <p className="text-sm font-medium text-amber-700/80 mb-4">This is your personal dashboard. Don't share this link with anyone! 🤫</p>
                
                <button
                  onClick={() => window.location.href = `/quiz/${createdQuizId}/results`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-black px-8 py-3.5 rounded-xl hover:bg-amber-400 transition-all active:scale-95 shadow-md shadow-amber-500/30 text-base"
                >
                  Go to Dashboard →
                </button>
              </div>
            </motion.div>
          )}

          {/* Message 4: Delete Action */}
          {visibleMessages >= 4 && (
            <motion.div variants={bubbleVariants} initial="hidden" animate="visible" className="flex justify-start w-full pt-4">
               <button
                  onClick={handleDeleteQuiz}
                  disabled={isDeleting}
                  className="bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-100 font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-lg">🗑️</span>
                  )}
                  {isDeleting ? "Deleting..." : "Start over and delete this quiz"}
                </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}