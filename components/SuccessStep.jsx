export default function SuccessStep({ createdQuizId, handleDeleteQuiz, isDeleting, baseUrl, copyToClipboard, copiedLink }) {
  return (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/10 blur-[100px] pointer-events-none" />
      
      
      <h2 className="text-4xl font-black mb-3 text-white relative z-10">Your Quiz is LIVE!</h2>
      <p className="text-slate-400 font-medium text-lg mb-10 relative z-10">Time to expose which of your friends <br className="hidden sm:block" /> actually knows you.</p>

      <div className="space-y-6 relative z-10 text-left w-full">
        {/* Share Section */}
        <div className="bg-black/40 p-6 rounded-3xl border border-white/10 shadow-inner">
          <p className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-2">
            <span>Send to friends</span>
            <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md text-xs text-emerald-300">Public Link</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input 
              readOnly 
              value={`${baseUrl}/quiz/${createdQuizId}`} 
              className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-500/50 transition-colors"
            />
            <button 
              onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'share')}
              className="bg-emerald-500 text-emerald-950 px-6 py-4 rounded-xl font-black hover:bg-emerald-400 transition-colors whitespace-nowrap active:scale-95 shadow-lg"
            >
              {copiedLink === 'share' ? 'Copied! ✔' : 'Copy Link'}
            </button>
          </div>
          {/* Social Share Row */}
  <div className="flex items-center gap-2 sm:gap-3">
    {/* WhatsApp */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(`Take my ultimate quiz to see how well you know me! 👀 ${baseUrl}/quiz/${createdQuizId}`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline">Share</span>
    </a>

    {/* Snapchat */}
    <a
      href={`https://snapchat.com/scan?attachmentUrl=${encodeURIComponent(`${baseUrl}/quiz/${createdQuizId}`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-[#FFFC00]/10 hover:bg-[#FFFC00]/20 text-[#FFFC00] border border-[#FFFC00]/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.864 16.71c-1.391 0-2.433-.679-2.909-1.921-.137-.36.035-.747.388-.863.355-.118.723.076.852.428.243.64.836.938 1.669.938 1.189 0 2.025-.562 2.025-1.536 0-.877-.665-1.341-1.893-1.669l-1.04-.277c-1.879-.501-2.915-1.423-2.915-3.082 0-1.849 1.423-3.238 3.523-3.238 1.439 0 2.457.576 2.946 1.668.163.363-.008.761-.371.884-.363.123-.74-.067-.905-.427-.234-.512-.861-.741-1.67-.741-1.286 0-1.99.645-1.99 1.488 0 .891.685 1.258 1.95 1.597l1.047.28c1.801.481 2.856 1.349 2.856 3.09 0 1.986-1.584 3.381-3.559 3.381zm7.42-3.136c-.198.544-.657.904-1.218 1.002-.061.011-.122.016-.184.016-1.127 0-1.758-1.246-1.758-1.246v1.171c0 .408-.332.74-.74.74h-.001c-.409 0-.741-.332-.741-.74v-6.95c0-.408.332-.74.741-.74h.001c.408 0 .74.332.74.74v2.79s.631-1.256 1.758-1.256c.062 0 .123.005.184.016.562.098 1.02.458 1.218 1.002.327.903.327 2.551 0 3.454z"/>
      </svg>
      <span className="hidden sm:inline">Snap</span>
    </a>

    {/* Instagram */}
    <button
      onClick={() => {
        copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'ig');
        alert('Link copied! Open Instagram and paste it in your Story sticker or Bio.');
      }}
      className="flex-1 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 text-[#E1306C] border border-[#E1306C]/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
         <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
      <span className="hidden sm:inline">Insta</span>
    </button>
  </div>
        </div>

        {/* Dashboard Button */}
        <div className="bg-emerald-900/20 p-6 rounded-3xl border border-emerald-500/30 shadow-inner text-center">
          <p className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
            <span>Track Your Results</span>
            <span className="bg-amber-500/20 px-2 py-0.5 rounded-md text-xs text-amber-300">Secret</span>
          </p>
          <p className="text-xs font-medium text-slate-400 mb-6">This is your personal dashboard to see who scored the highest on your quiz.</p>
          <button
            onClick={() => window.location.href = `/quiz/${createdQuizId}/results`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 text-amber-950 font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-lg"
          >
            Go to my Dashboard now →
          </button>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 w-full relative z-10">
        <button
          onClick={handleDeleteQuiz}
          disabled={isDeleting}
          className="text-xs font-bold text-rose-400/70 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-lg">🗑️</span>
          )}
          {isDeleting ? "Deleting..." : "Delete current quiz & start over"}
        </button>
      </div>
    </>
  );
}