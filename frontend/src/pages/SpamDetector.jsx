import { useState, useEffect } from "react";
import axios from "axios";


function SpamDetector() {
  // --- Core Application States ---
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [type, setType] = useState("message"); // 'message' or 'email'
  const [history, setHistory] = useState([]);
  const [heuristicFlags, setHeuristicFlags] = useState([]);

  // --- Synchronize Local Logs Cache ---
  useEffect(() => {
    const cachedHistory = localStorage.getItem("spam_shield_v6_full_color_history");
    if (cachedHistory) setHistory(JSON.parse(cachedHistory));
  }, []);

  // --- Real-Time Threat Heuristic Matching Pipeline ---
  useEffect(() => {
    const flags = [];
    if (!text.trim()) {
      setHeuristicFlags([]);
      return;
    }

    // Checking incoming text layout patterns for instant warning triggers
    if (/https?:\/\/[^\s]+/i.test(text)) flags.push("🔗 URL Link Contained");
    if (/(win|prize|lottery|cash|reward|free|money|crypto|dollars|£|\$)/i.test(text)) flags.push("💰 Financial Bait Attached");
    if (/(urgent|immediate|action required|verify|suspend|blocked|expire|now)/i.test(text)) flags.push("🚨 High Urgency Trigger");
    if (/(dear customer|sir|madam|valued user)/i.test(text)) flags.push("👥 Generic Structural Greeting");

    setHeuristicFlags(flags);
  }, [text]);

  // --- Utility Text Counter Variables ---
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  /**
   * Injects specific target scenario data strings for evaluation checks.
   * @param {string} type - Threat scenario selector type.
   */
  const loadTestingData = (type) => {
    if (type === "spam") {
      setText("ALERT! Your personal number has won a guaranteed cash payout voucher of $2,000. Submit your secure confirmation credentials immediately at http://claim-vouchers.net.");
      setType("message");
    } else if (type === "fraud") {
      setText("Dear Customer, we identified unverified login credentials accessing your credit profile. Please log in to your dashboard portal at http://secure-profile-check.org to prevent account suspension.");
      setType("email");
    } else {
      setText("Hey! I just wrapped up editing the vector tokenizing pipeline scripts. Let me know when you want to review the updated repository on GitHub.");
      setType("message");
    }
    setResult("");
  };

  /**
   * Paces the internal model steps to simulate backend machine learning computations.
   */
  const runPacedInspectionSteps = () => {
    return new Promise((resolve) => {
      const systemSteps = [
        "Analyzing string datagram packets...",
        "Validating sparse classification tokens...",
        "Confirming matrix layout parameters..."
      ];
      let pointer = 0;
      setLoadingStep(systemSteps[0]);

      const processTimeline = setInterval(() => {
        pointer++;
        if (pointer < systemSteps.length) {
          setLoadingStep(systemSteps[pointer]);
        } else {
          clearInterval(processTimeline);
          resolve();
        }
      }, 350);
    });
  };

  /**
   * Dispatches the active text blocks to the designated API endpoint target.
   */
  const handleSystemInference = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      setResult("");

      // Trigger the interactive step notifications loader
      await runPacedInspectionSteps();

      const response = await axios.post(import.meta.env.VITE_API_URI, {
        text: text,
        type: type,
      });

      const predictionOutcome = response.data.prediction;
      setResult(predictionOutcome);

      // Construct history trace logs profile object
      const freshHistoryEntry = {
        id: Date.now(),
        preview: text.substring(0, 48) + (text.length > 48 ? "..." : ""),
        type: type,
        verdict: predictionOutcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const adjustedHistoryList = [freshHistoryEntry, ...history.slice(0, 3)];
      setHistory(adjustedHistoryList);
      localStorage.setItem("spam_shield_v6_full_color_history", JSON.stringify(adjustedHistoryList));

    } catch (error) {
      console.error("Endpoint analysis integration failed:", error);
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  // --- Dynamic Color Configurations For Premium Output Blocks ---
  const fetchDynamicAesthetics = () => {
    if (loading) return { cardGlow: "shadow-violet-200/50", border: "border-violet-300", heading: "bg-violet-100/50", badge: "bg-violet-100 text-violet-950 border-violet-300", label: "Model Optimization Running...", bar: "w-1/2 bg-violet-600 animate-pulse" };
    if (result === "ham") return { cardGlow: "shadow-purple-200/60", border: "border-purple-300", heading: "bg-purple-100/60", badge: "bg-purple-200 text-purple-950 border-purple-300", label: "Clean Stream Pattern Verified", bar: "w-[15%] bg-purple-600" };
    if (result === "spam") return { cardGlow: "shadow-fuchsia-200/60", border: "border-fuchsia-300", heading: "bg-fuchsia-100/60", badge: "bg-fuchsia-200 text-fuchsia-950 border-fuchsia-300", label: "Spam Pattern Confirmed", bar: "w-full bg-fuchsia-600" };
    if (result === "smishing") return { cardGlow: "shadow-pink-200/60", border: "border-pink-300", heading: "bg-pink-100/60", badge: "bg-pink-200 text-pink-950 border-pink-300", label: "Phishing Risk Flagged", bar: "w-[85%] bg-pink-600" };
    return { cardGlow: "shadow-slate-200/40", border: "border-slate-200", heading: "bg-slate-50", badge: "bg-slate-100 text-slate-700 border-slate-200", label: "Standby For Input Payload", bar: "w-0 bg-slate-300" };
  };

  const styleMatrix = fetchDynamicAesthetics();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#D8D0EE] via-[#E7DEF6] to-[#D2DDF4] text-slate-800 font-sans antialiased p-3 sm:p-8 flex flex-col justify-between selection:bg-purple-600/20 selection:text-purple-950 relative">
      
      {/* Decorative Blur Overlays embedded within background spectrum */}
      <div className="absolute top-[5%] left-[20%] w-[350px] h-[350px] bg-white/40 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] bg-purple-200/50 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Structured Modern Application Navbar */}
      <header className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md border border-purple-200 rounded-2xl px-6 py-4 mb-6 shadow-md shadow-purple-900/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-sm text-base">
            🛡️
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900">SpamShield AI</h1>
            <p className="text-[11px] text-purple-600/80 font-bold tracking-wide">ENTERPRISE CLASSIFICATION NODE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-extrabold px-3 py-1.5 bg-purple-100 border border-purple-200 text-purple-950 rounded-lg shadow-2xs">
            v1.2 // SECURE
          </span>
          <div className="flex items-center gap-1.5 text-xs text-purple-950 bg-white border border-purple-200 px-3 py-1.5 rounded-lg font-bold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            Matrix Synced
          </div>
        </div>
      </header>

      {/* Main Analysis Workspace Workspace Layout */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 relative z-10">
        
        {/* LEFT COMPONENT: Primary Workspace Input Card (8 Columns) */}
        <div className="lg:col-span-8 bg-white/95 backdrop-blur-md border border-purple-200/80 rounded-2xl shadow-md shadow-purple-900/5 flex flex-col justify-between overflow-hidden">
          
          {/* Lavender Accent Header Area */}
          <div className="bg-gradient-to-r from-violet-50 via-purple-50/40 to-transparent border-b border-purple-200/70 px-5 py-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-2">
              📋 Input Stream Controller Deck
            </span>
            <button 
              onClick={() => { setText(""); setResult(""); }} 
              className="text-xs font-bold text-purple-700 hover:text-pink-700 border border-purple-200/60 bg-white px-3 py-1.5 rounded-md shadow-2xs transition-colors"
            >
              Reset Stream
            </button>
          </div>

          <div className="p-5 sm:p-7 flex-1 flex flex-col">
            {/* Interactive Functional Mode Selectors */}
            <div className="grid grid-cols-2 gap-2 bg-purple-50/50 border border-purple-200/60 p-1.5 rounded-xl mb-6 shadow-2xs">
              <button
                onClick={() => setType("message")}
                className={`py-2.5 text-xs font-extrabold rounded-lg transition-all ${
                  type === "message"
                    ? "bg-white text-purple-700 border border-purple-200/60 shadow-sm"
                    : "text-purple-400 hover:text-purple-700"
                }`}
              >
                💬 SMS TEXT VECTOR
              </button>
              <button
                onClick={() => setType("email")}
                className={`py-2.5 text-xs font-extrabold rounded-lg transition-all ${
                  type === "email"
                    ? "bg-white text-purple-700 border border-purple-200/60 shadow-sm"
                    : "text-purple-400 hover:text-purple-700"
                }`}
              >
                📧 RAW EMAIL MIME
              </button>
            </div>

            {/* Managed Main Text Payload Input */}
            <div className="relative flex-1 flex flex-col">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={type === "message" ? "Provide raw SMS sentence layouts to calculate threat thresholds..." : "Provide full structured header lines of text email payloads to examine..."}
                className="w-full flex-1 min-h-[170px] bg-slate-50/40 border border-purple-200 focus:border-purple-400 rounded-xl p-4 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-purple-600/5 font-medium resize-none leading-relaxed"
              />
              {/* Specialized Analytics Vector Badge */}
              <div className="absolute bottom-3 right-4 text-[10px] font-mono font-extrabold text-purple-950 bg-white border border-purple-200 px-2.5 py-1.5 rounded-md shadow-2xs">
                METRICS: <span className="text-purple-600">{charCount} CHARS</span> | <span className="text-purple-600">{wordCount} WORDS</span>
              </div>
            </div>

            {/* Inline Pre-Scan Trigger Flag Rows */}
            <div className="mt-5 pt-4 border-t border-purple-100 flex flex-wrap items-center gap-2.5 min-h-[35px]">
              <span className="text-xs font-bold text-purple-9AP uppercase tracking-wider">Live Local Flags:</span>
              {heuristicFlags.length === 0 ? (
                <span className="text-xs text-purple-400 italic font-medium">Scanning string text patterns...</span>
              ) : (
                heuristicFlags.map((flag, index) => (
                  <span key={index} className="text-[10px] font-extrabold px-2.5 py-1 bg-purple-50 text-purple-950 border border-purple-200 rounded-md shadow-2xs animate-fade-in">
                    {flag}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Action Dispatch Layout Base */}
          <div className="bg-purple-50/30 border-t border-purple-200/80 px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-purple-500 uppercase">Load Templates:</span>
              <button onClick={() => loadTestingData("spam")} className="text-[11px] font-bold bg-white border border-purple-200 hover:bg-fuchsia-50 text-slate-700 hover:text-fuchsia-800 px-2.5 py-1.5 rounded-md transition-colors shadow-2xs">
                [+ Spam]
              </button>
              <button onClick={() => loadTestingData("fraud")} className="text-[11px] font-bold bg-white border border-purple-200 hover:bg-fuchsia-50 text-slate-700 hover:text-fuchsia-800 px-2.5 py-1.5 rounded-md transition-colors shadow-2xs">
                [+ Phish]
              </button>
              <button onClick={() => loadTestingData("safe")} className="text-[11px] font-bold bg-white border border-purple-200 hover:bg-purple-50 text-slate-700 hover:text-purple-800 px-2.5 py-1.5 rounded-md transition-colors shadow-2xs">
                [+ Safe]
              </button>
            </div>

            <button
              onClick={handleSystemInference}
              disabled={loading || !text.trim()}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-purple-700 text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 border border-purple-700"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="normal-case font-medium text-white">{loadingStep}</span>
                </>
              ) : (
                <span>Compute Threat Index</span>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COMPONENT: Output Gauge & Historical Logging Cache (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Dynamic Analysis Outcome Indicator Module */}
          <div className={`bg-white/95 backdrop-blur-md border ${styleMatrix.border} ${styleMatrix.cardGlow} rounded-2xl shadow-md overflow-hidden transition-all duration-300 flex flex-col min-h-[145px] justify-center`}>
            <div className={`px-5 py-3 border-b ${styleMatrix.border} ${styleMatrix.heading} font-bold text-xs text-purple-950 uppercase tracking-wider`}>
              📊 Classification Diagnostics
            </div>
            <div className="p-5 flex flex-col justify-center">
              {result ? (
                <div className="flex flex-col gap-1 animate-fade-in">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg border w-fit uppercase font-mono tracking-wider shadow-2xs ${styleMatrix.badge}`}>
                    {result === "ham" && "🛡️ Clean Pass Record"}
                    {result === "spam" && "❌ Spambot Intercepted"}
                    {result === "smishing" && "⚠️ Phishing Vector Found"}
                    {result === "Error" && "🛑 Request Connection Drop"}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{styleMatrix.label}</h3>
                </div>
              ) : (
                <div className="text-xs font-semibold text-purple-400 italic">
                  Awaiting classification processing streams...
                </div>
              )}

              {/* Colorful Progression Index Slider */}
              <div className="mt-4 pt-1">
                <div className="w-full bg-purple-50 border border-purple-200/80 h-3 rounded-full p-0.5 overflow-hidden shadow-2xs">
                  <div className={`h-full rounded-full transition-all duration-700 ease-out ${styleMatrix.bar}`}></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono font-bold text-purple-700 mt-2 tracking-wide">
                  <span>0.0 (SECURE)</span>
                  <span>1.0 (CRITICAL THREAT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Session Logs Record Caching Table */}
          <div className="bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl shadow-md shadow-purple-900/5 flex flex-col justify-between overflow-hidden flex-1">
            <div className="bg-purple-50/70 border-b border-purple-200 px-5 py-3.5 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-2">
                📜 Active Vector Cache Logs
              </span>
              {history.length > 0 && (
                <button 
                  onClick={() => { setHistory([]); localStorage.removeItem("spam_shield_v6_full_color_history"); }} 
                  className="text-xs font-bold text-purple-500 hover:text-pink-700 font-mono"
                >
                  [FLUSH]
                </button>
              )}
            </div>

            {/* Storage Data Array Content Maps */}
            <div className="p-4 flex-1 space-y-3 max-h-[290px] overflow-y-auto">
              {history.length === 0 ? (
                <div className="text-center py-12 text-xs font-bold text-purple-400 border border-dashed border-purple-200/80 bg-purple-50/30 rounded-xl">
                  No vectors stored in log memory bank.
                </div>
              ) : (
                history.map((record) => (
                  <div key={record.id} className="p-3 bg-purple-50/40 hover:bg-purple-50 border border-purple-200/50 rounded-xl flex flex-col gap-1 transition-colors">
                    <div className="flex justify-between items-center font-mono text-[9px] font-bold">
                      <span className="text-purple-700 uppercase">[{record.type}]</span>
                      <span className="text-purple-400 font-semibold">{record.time}</span>
                    </div>
                    <p className="text-slate-600 truncate font-semibold text-xs">"{record.preview}"</p>
                    <div className="text-right mt-0.5">
                      <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border ${
                        record.verdict === "ham" ? "text-purple-950 bg-purple-100 border-purple-300" :
                        record.verdict === "spam" ? "text-fuchsia-950 bg-fuchsia-100 border-fuchsia-300" : "text-pink-950 bg-pink-100 border-pink-300"
                      }`}>
                        {record.verdict.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-[10px] font-mono font-extrabold text-purple-600 text-center py-2.5 border-t border-purple-100 bg-purple-50/50">
              Pipeline Node Synchronized // Online
            </div>
          </div>

        </div>

      </main>

      {/* Global Framework Base Footer Diagnostics */}
      <footer className="max-w-6xl w-full mx-auto text-center mt-6 pt-4 border-t border-purple-200/60 text-xs font-bold text-purple-600/80">
        &copy; 2026 SpamShield Platform Node // Complex Multi-Matrix Core Interface
      </footer>
    </div>
  );
}

export default SpamDetector;