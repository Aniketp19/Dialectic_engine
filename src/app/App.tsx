import React, { useState, useEffect } from 'react';
import { Info, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';

const ClaudeStar = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="M5.636 5.636l12.728 12.728" />
    <path d="M18.364 5.636L5.636 18.364" />
  </svg>
);

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPushingBack, setIsPushingBack] = useState(false);
  const [isRevised, setIsRevised] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  // Chat sequence state
  const [chatState, setChatState] = useState<'idle' | 'user' | 'thinking' | 'responded' | 'banner'>('idle');
  const [inputValue, setInputValue] = useState("Write a market analysis for B2B SaaS");
  const [sentMessage, setSentMessage] = useState("");

  const handleSend = () => {
    if (!inputValue.trim() || chatState !== 'idle') return;
    setSentMessage(inputValue);
    setInputValue("");
    setChatState('user');
    
    // Animation sequence
    setTimeout(() => setChatState('thinking'), 400);
    setTimeout(() => setChatState('responded'), 1500);
    setTimeout(() => setChatState('banner'), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Mock Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <ClaudeStar className="w-6 h-6 text-primary" />
          <span className="font-serif text-xl tracking-tight">Claude</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
            A
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          
          {/* User Message */}
          {chatState !== 'idle' && (
            <div className="flex justify-end animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="bg-secondary text-secondary-foreground px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-sm">
                <p className="text-[15px] leading-relaxed">
                  {sentMessage}
                </p>
              </div>
            </div>
          )}

          {/* AI Thinking State */}
          {chatState === 'thinking' && (
            <div className="flex gap-4 items-start max-w-[90%] sm:max-w-[85%] animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <ClaudeStar className="w-4 h-4 text-primary" />
              </div>
              <div className="flex gap-1.5 items-center h-8">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* AI Response Container */}
          {(chatState === 'responded' || chatState === 'banner') && (
            <div className="flex flex-col gap-3 max-w-[90%] sm:max-w-[85%] animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* AI Output Card */}
              <div 
                className={`bg-card border border-white/5 rounded-2xl shadow-sm transition-all duration-300 ${
                  isExpanded && !isResolved ? 'p-5 md:p-6 opacity-70 hover:opacity-100 cursor-pointer' : 'p-6 md:p-8'
                }`}
                onClick={() => isExpanded && !isResolved && setIsExpanded(false)}
              >
                <div className={`flex gap-4 items-start ${isExpanded && !isResolved ? '' : 'mb-6'}`}>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ClaudeStar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      <h2 className={`font-serif text-foreground font-medium tracking-tight ${isExpanded && !isResolved ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                        {isResolved ? "B2B SaaS Analytics — Market Analysis" : "B2B SaaS Market Analysis: 2024–2028"}
                      </h2>
                      {isRevised && !isResolved && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider">REVISED</span>
                      )}
                    </div>
                    {isExpanded && !isResolved && (
                      <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1 pr-4">
                        Total Addressable Market: The B2B SaaS analytics market is valued at approximately $68B...
                      </p>
                    )}
                  </div>
                </div>
                
                {(!isExpanded || isResolved) && (
                  <div className="flex flex-col gap-5 text-[15px] text-muted-foreground leading-relaxed pl-12 animate-in fade-in duration-300">
                    <p>
                      <strong className="text-foreground font-medium">Total Addressable Market:</strong> {isRevised && !isResolved ? "The B2B SaaS analytics market comprises two distinct segments: legacy BI tools ($42B, declining at ~3% annually) and AI-native analytics ($26B, growing at 24% CAGR). The blended market growth is approximately 15-17%..." : "The B2B SaaS analytics market is valued at approximately $68B in 2026, growing at 18% CAGR driven by enterprise digital transformation and AI-native analytics adoption."}
                    </p>
                    <p>
                      <strong className="text-foreground font-medium">Key Competitors:</strong> {isRevised && !isResolved ? "Horizontal: Amplitude, Mixpanel, Heap, Pendo, PostHog. Vertical-specific (new): Veeva Vault (life sciences), nCino (banking), Innovaccer (healthcare). Embedded: Salesforce Einstein, HubSpot Breeze..." : "Amplitude, Mixpanel, Heap, and Pendo dominate product analytics. Looker (Google) and Tableau (Salesforce) lead BI. Emerging players include PostHog and June.so targeting PLG startups."}
                    </p>
                    <p>
                      <strong className="text-foreground font-medium">Growth Drivers:</strong> Product-led growth adoption, AI-powered insight automation, real-time data requirements, and consolidation pressure reducing tool sprawl in enterprise stacks.
                    </p>
                  </div>
                )}
              </div>

              {chatState === 'banner' && (
                <>
                  {isResolved ? (
                    <div className="ml-12 mr-0 sm:mr-12 flex animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-medium shadow-sm">
                        <Check className="w-3.5 h-3.5" strokeWidth="3" />
                        Reviewed — evaluation engaged
                      </div>
                    </div>
                  ) : isRevised ? (
                    <div className="ml-12 mr-0 sm:mr-12 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-card border border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
                          <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="18" r="3"></circle>
                            <circle cx="6" cy="6" r="3"></circle>
                            <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                            <line x1="6" y1="9" x2="6" y2="21"></line>
                          </svg>
                          <h3 className="text-sm font-semibold text-foreground">What changed and why</h3>
                        </div>
                        
                        <div className="p-5 flex flex-col font-mono text-[13px]">
                          <div className="px-3 py-1.5 bg-red-500/10 text-red-300/80 line-through rounded-sm mb-1">
                            - Market valued at $68B, growing at 18% CAGR
                          </div>
                          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-sm mb-1">
                            + Segmented: Legacy BI ($42B, -3%) + AI-native ($26B, +24%)
                          </div>
                          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-sm mb-5">
                            + Blended growth: 15-17% (more defensible)
                          </div>

                          <div className="px-3 py-1.5 bg-red-500/10 text-red-300/80 line-through rounded-sm mb-1">
                            - Competitors: Amplitude, Mixpanel, Heap, Pendo, Looker, Tableau
                          </div>
                          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-sm mb-1">
                            + Added vertical-specific players: Veeva, nCino, Innovaccer
                          </div>
                          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-sm mb-5">
                            + Added embedded analytics trend: Einstein, Breeze
                          </div>
                          
                          <div className="pt-4 border-t border-white/5 text-muted-foreground font-sans text-[14px]">
                            <strong className="text-foreground font-medium">Reason:</strong> User pushback provided proprietary data (24% in AI-native). Dialectic challenge added vertical and embedded competitors.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2 text-emerald-400 text-[13px] font-medium px-2 py-1">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-400" strokeWidth="3" />
                          </div>
                          Reviewed — 2 challenges addressed, 1 refined via dialogue
                        </div>
                        <button 
                          onClick={() => setIsResolved(true)}
                          className="flex items-center justify-center gap-1.5 px-5 py-2 bg-white text-black hover:bg-white/90 transition-colors rounded-lg text-sm font-semibold shadow-sm group"
                        >
                          <span>Proceed</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  ) : !isExpanded ? (
                    <div className="ml-12 mr-0 sm:mr-12 group flex items-center justify-between p-3.5 rounded-xl border border-yellow-500/30 bg-yellow-500/5 transition-colors hover:bg-yellow-500/10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                          <Info className="w-4 h-4 text-yellow-500" />
                        </div>
                        <span className="text-[14px] font-medium text-yellow-100/90 tracking-wide">
                          2 assumptions identified
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => setIsExpanded(true)} 
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors rounded-lg text-sm font-semibold shadow-sm"
                      >
                        <span>Expand</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  ) : isPushingBack ? (
                    <div className="ml-12 mr-0 sm:mr-12 bg-card border border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
                      {/* Header */}
                      <div className="px-6 py-5 bg-white/[0.02] flex items-center gap-3 border-b border-white/5">
                        <h3 className="text-lg font-serif font-medium text-foreground tracking-tight">Push Back</h3>
                      </div>

                      {/* Chat Thread */}
                      <div className="p-6 flex flex-col gap-6 bg-background/30">
                        
                        {/* YOU 1 */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] font-bold tracking-widest text-blue-400 ml-1">YOU</span>
                          <div className="bg-blue-500/10 border border-blue-500/20 p-4.5 rounded-2xl rounded-tl-sm text-[14px] text-blue-50/90 leading-relaxed">
                            The 18% CAGR is actually conservative for our segment. We have proprietary client data from 14 accounts showing 24% growth in AI-native analytics specifically. The legacy BI tools are declining but the new category is accelerating.
                          </div>
                        </div>

                        {/* CLAUDE 1 */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] font-bold tracking-widest text-red-400 ml-1">CLAUDE</span>
                          <div className="bg-red-500/10 border border-red-500/20 p-4.5 rounded-2xl rounded-tl-sm text-[14px] text-red-50/90 leading-relaxed">
                            <p className="mb-3">That's a strong data point. With 14 enterprise accounts showing 24% growth in AI-native analytics, the segment-specific rate is well-supported.</p>
                            <p>However, consider: does this 24% apply to your full TAM, or only the AI-native sub-segment? If the overall market includes legacy BI (which you note is declining), blending these rates would give a more defensible composite number — perhaps 15-20% blended rather than a single 18% or 24%.</p>
                          </div>
                        </div>

                        {/* YOU 2 */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] font-bold tracking-widest text-blue-400 ml-1">YOU</span>
                          <div className="bg-blue-500/10 border border-blue-500/20 p-4.5 rounded-2xl rounded-tl-sm text-[14px] text-blue-50/90 leading-relaxed">
                            Good point. I'll segment the TAM into legacy BI (declining 3%) and AI-native (growing 24%) and show both.
                          </div>
                        </div>

                        {/* CLAUDE 2 */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] font-bold tracking-widest text-red-400 ml-1">CLAUDE</span>
                          <div className="bg-red-500/10 border border-red-500/20 p-4.5 rounded-2xl rounded-tl-sm text-[14px] text-red-50/90 leading-relaxed">
                            That's a much stronger approach — it shows analytical rigor. I'll update the challenge: ✅ TAM growth concern resolved through segmented analysis.
                          </div>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center justify-end gap-3">
                        <button 
                          onClick={() => { setIsResolved(true); setIsPushingBack(false); setIsExpanded(false); setIsRevised(false); }}
                          className="px-4 py-2 text-sm font-medium text-foreground bg-transparent hover:bg-white/5 border border-white/10 rounded-lg transition-colors"
                        >
                          Proceed with original
                        </button>
                        <button 
                          onClick={() => { setIsRevised(true); setIsPushingBack(false); setIsExpanded(false); }}
                          className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
                        >
                          Revise output with this context
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-12 mr-0 sm:mr-12 bg-card border border-red-500/20 rounded-2xl shadow-lg overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
                      {/* Header */}
                      <div className="px-6 py-5 bg-gradient-to-r from-red-500/10 to-transparent flex items-center gap-3 border-b border-white/5">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-red-400" />
                        </div>
                        <h3 className="text-lg font-serif font-medium text-red-100 tracking-tight">Dialectic Challenge</h3>
                      </div>
                      
                      {/* Section 1: Assumptions */}
                      <div className="px-6 py-5 border-b border-white/5">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Your output assumes:</h4>
                        <ul className="space-y-3 text-[14px] text-muted-foreground list-none">
                          <li className="flex gap-2">
                            <span className="text-red-400/70 mt-1">•</span>
                            <span>Market growth continues linearly at 18% CAGR. However, recent consolidation in enterprise SaaS (22% M&A increase in 2025) suggests mature segments may be plateauing.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-400/70 mt-1">•</span>
                            <span>Your competitor list focuses on horizontal tools. Vertical-specific players (healthcare analytics, fintech analytics) are capturing growing share but aren't represented.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Section 2: Counter-argument */}
                      <div className="px-6 py-5 border-b border-white/5">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Strongest counter-argument:</h4>
                        <p className="text-[14px] text-muted-foreground leading-relaxed">
                          Three recent analyst reports suggest enterprise analytics budgets are shifting from net-new tools to AI features within existing platforms (Salesforce Einstein, HubSpot Breeze). This would reduce TAM for standalone analytics providers significantly.
                        </p>
                      </div>

                      {/* Section 3: Alternative approach not explored */}
                      <div className="px-6 py-5 border-b border-white/5">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Alternative approach not explored:</h4>
                        <p className="text-[14px] text-muted-foreground leading-relaxed">
                          A bottom-up sizing from customer segments (SMB vs mid-market vs enterprise) would give a more defensible estimate than top-down CAGR extrapolation.
                        </p>
                      </div>

                      {/* Section 4: Risk assessment */}
                      <div className="px-6 py-5 border-b border-white/5">
                        <h4 className="text-sm font-semibold text-foreground mb-4">Risk assessment</h4>
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-3 items-start">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 text-red-400 text-[11px] font-medium shrink-0 mt-0.5 w-[72px] justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                              High
                            </div>
                            <p className="text-[14px] text-muted-foreground leading-snug"><strong className="text-foreground font-medium">TAM estimate</strong> — relies on a single growth rate across heterogeneous segments</p>
                          </div>
                          
                          <div className="flex gap-3 items-start">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-[11px] font-medium shrink-0 mt-0.5 w-[72px] justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                              Medium
                            </div>
                            <p className="text-[14px] text-muted-foreground leading-snug"><strong className="text-foreground font-medium">Competitor landscape</strong> — missing vertical players and embedded analytics trend</p>
                          </div>

                          <div className="flex gap-3 items-start">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/10 text-green-400 text-[11px] font-medium shrink-0 mt-0.5 w-[72px] justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Low
                            </div>
                            <p className="text-[14px] text-muted-foreground leading-snug"><strong className="text-foreground font-medium">Growth drivers</strong> — well-established industry trends with strong consensus</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Actions */}
                      <div className="px-6 py-4 bg-white/[0.02] flex flex-wrap items-center justify-end gap-3">
                        <button 
                          onClick={() => { setIsExpanded(false); setIsPushingBack(false); }} 
                          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Dismiss
                        </button>
                        <button 
                          onClick={() => setIsPushingBack(true)}
                          className="px-4 py-2 text-sm font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors shadow-sm"
                        >
                          Push back
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mock Input Area Context */}
      <div className="max-w-3xl w-full mx-auto p-4 pb-8">
        <div className="bg-secondary/50 border border-white/5 rounded-2xl p-2 pl-4 flex items-center gap-3 text-muted-foreground transition-all focus-within:bg-secondary/80 focus-within:border-white/10">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="How can I help you today?"
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-foreground placeholder:text-muted-foreground py-2"
            disabled={chatState !== 'idle'}
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || chatState !== 'idle'}
            className={`p-2 rounded-lg transition-colors ${
              inputValue.trim() && chatState === 'idle' 
                ? 'bg-white text-black hover:bg-white/90 shadow-sm' 
                : 'bg-white/5 text-muted-foreground'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}