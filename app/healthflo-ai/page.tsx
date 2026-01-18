'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, Send, ArrowLeft, Mic, MicOff, Sparkles, 
  ExternalLink, Plus, Flame, Zap,
  FileText, Calendar, ShieldAlert, X, ChevronRight
} from 'lucide-react';
import { sendMessageToAssistant } from '@/services/geminiService';
import { ChatMessage } from '@/types';

export default function NeoCompanionPage() {
  const router = useRouter();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
   
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fullIntroText = "Hello. I am Neo, your dental architect.";

  // -- Navigation --
  const handleBack = () => {
    if (window.history.length > 2) router.back();
    else router.push('/');
  };

  // -- Typewriter Effect --
  useEffect(() => {
    if (messages.length === 0) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(fullIntroText.slice(0, i + 1));
        i++;
        if (i > fullIntroText.length) clearInterval(timer);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [messages.length]);

  // -- Speech Recognition --
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-IN';
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev + (prev ? ' ' : '') + transcript);
          setIsListening(false);
        };
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  // -- Auto Scroll --
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading, input]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;
    
    setShowMenu(false);

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-10).map(m => ({ 
        role: m.role, 
        parts: [{ text: m.text }] 
      }));
      
      const response = await sendMessageToAssistant(textToSend, history);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        sources: response.sources,
        timestamp: Date.now() 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Connection interrupted. Please re-engage.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // -- Quick Actions Configuration --
  const quickActions = [
    { label: "Post-Op Guide", query: "Show me post-operation care instructions for tooth extraction and root canal", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Cost Estimate", query: "What are the approximate costs for dental implants and veneers?", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Book Visit", query: "I would like to schedule an appointment", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Emergency", query: "I have a dental emergency, what should I do?", icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="relative min-h-screen bg-[#020202] text-slate-200 font-sans overflow-hidden selection:bg-red-500/30">
      
      {/* --- STYLES & ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap');
        
        .font-gemini { font-family: 'Outfit', sans-serif; }
        
        /* Moving Spotlight Gradient */
        .cinematic-bg {
          background: radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.15), transparent 70%);
          animation: spotlight-move 10s infinite alternate ease-in-out;
        }
        @keyframes spotlight-move {
          0% { background-position: 40% 0%; opacity: 0.8; }
          100% { background-position: 60% 0%; opacity: 1; }
        }
        
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        .glass-panel {
          background: rgba(18, 18, 18, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .glass-input {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
        }

        /* Avatar Breathing Pulse */
        .neo-avatar {
          animation: breathe 4s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.15);
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(220, 38, 38, 0.15); }
          50% { transform: scale(1.03); box-shadow: 0 0 50px rgba(220, 38, 38, 0.3); }
        }

        /* Typing Dots */
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10"></div>
      <div className="absolute inset-0 cinematic-bg pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div onClick={handleBack} className="flex items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-all">
           <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
              <ArrowLeft size={18} />
           </div>
           <span className="font-gemini font-bold text-xs tracking-[0.2em] uppercase text-slate-300 group-hover:text-white transition-colors">Exit</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/20 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
           <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
           <span className="font-gemini text-[10px] font-bold text-red-400 uppercase tracking-widest">System Online</span>
        </div>
      </nav>

      {/* --- MAIN INTERFACE --- */}
      <main className="relative z-20 w-full h-screen flex flex-col items-center justify-center pt-20 pb-28 px-4">
        
        {messages.length === 0 ? (
          /* HERO STATE */
          <div className="text-center flex flex-col items-center max-w-3xl w-full animate-in fade-in zoom-in duration-1000">
             
             {/* The "Neo" Avatar */}
             <div className="mb-12 relative group cursor-pointer transition-transform duration-500 hover:scale-105" onClick={() => handleSend("Hello")}>
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-zinc-800 to-black relative z-10 flex items-center justify-center border border-white/10 neo-avatar">
                   <Flame size={48} className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" strokeWidth={1.5} />
                </div>
                {/* Orbital Rings - purely decorative */}
                <div className="absolute inset-0 rounded-full border border-white/5 scale-[1.3] animate-spin duration-[25s] opacity-40"></div>
                <div className="absolute inset-0 rounded-full border border-red-500/10 scale-[1.6] animate-spin duration-[35s] direction-reverse opacity-60"></div>
             </div>

             {/* Dynamic Intro */}
             <h1 className="font-gemini text-4xl md:text-6xl font-medium mb-6 tracking-tight text-white drop-shadow-2xl min-h-[4rem]">
               {typedText}<span className="animate-pulse text-red-500">_</span>
             </h1>
             
             <p className="font-gemini text-base md:text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed mb-12 opacity-0 animate-in fade-in slide-in-from-bottom-4 delay-700 fill-mode-forwards">
               I am designed to analyze symptoms, explain procedures, and guide your recovery.
             </p>

             {/* Quick Actions Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl opacity-0 animate-in fade-in slide-in-from-bottom-8 delay-1000 fill-mode-forwards">
                {quickActions.map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(action.query)}
                    className="flex flex-col items-center justify-center gap-4 p-5 rounded-2xl glass-panel hover:bg-white/5 hover:border-red-500/30 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className={`p-3 rounded-xl ${action.bg} group-hover:scale-110 transition-transform duration-300`}>
                       <action.icon size={20} className={action.color} />
                    </div>
                    <span className="font-gemini text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">{action.label}</span>
                  </button>
                ))}
             </div>
          </div>
        ) : (
          /* CHAT STREAM */
          <div className="flex-1 w-full max-w-4xl overflow-y-auto no-scrollbar px-2 space-y-8 pb-4">
             {messages.map((msg, i) => (
                <div key={i} className={`flex gap-5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                   
                   {msg.role !== 'user' && (
                     <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 shrink-0 mt-1 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
                        <Flame size={16} className="text-red-500" />
                     </div>
                   )}
                   
                   <div className={`max-w-[85%] p-6 rounded-3xl backdrop-blur-xl ${
                      msg.role === 'user' 
                      ? 'bg-red-600/90 text-white rounded-tr-md shadow-[0_5px_20px_rgba(220,38,38,0.25)]' 
                      : 'glass-panel text-zinc-200 rounded-tl-md'
                   }`}>
                      {msg.role !== 'user' && (
                        <div className="flex items-center gap-2 mb-3 opacity-60">
                           <span className="text-[10px] font-gemini font-bold uppercase tracking-widest text-red-400">Neo System</span>
                           <div className="h-[1px] flex-1 bg-red-500/20"></div>
                        </div>
                      )}
                      
                      <p className="font-gemini text-sm md:text-[1.05rem] leading-relaxed whitespace-pre-wrap font-normal">
                        {msg.text}
                      </p>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                           {msg.sources.map((s: any, j: number) => (
                             <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider text-zinc-400 border border-transparent hover:border-white/10">
                                <ExternalLink size={10} /> {s.title}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>
                </div>
             ))}
             
             {isLoading && (
               <div className="flex gap-5 items-center animate-in fade-in">
                 <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 shrink-0">
                    <Flame size={16} className="text-red-500 animate-pulse" />
                 </div>
                 <div className="glass-panel px-5 py-4 rounded-2xl rounded-tl-md flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} className="h-6" />
          </div>
        )}

        {/* --- FLOATING COMMAND BAR --- */}
        <div className="fixed bottom-8 w-full px-4 z-40 max-w-3xl">
           
           {/* Pop-up Quick Menu */}
           {showMenu && (
             <div className="absolute bottom-full left-4 mb-4 glass-input rounded-2xl p-2 animate-in slide-in-from-bottom-4 fade-in zoom-in duration-300 flex flex-col gap-1 min-w-[240px] border border-white/10">
                {quickActions.map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(action.query)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-left transition-colors group"
                  >
                    <action.icon size={16} className={`${action.color}`} />
                    <span className="font-gemini text-sm font-medium text-zinc-300 group-hover:text-white">{action.label}</span>
                    <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-zinc-500 transition-opacity" />
                  </button>
                ))}
             </div>
           )}

           <div className="glass-input w-full p-2 rounded-full flex items-center transition-all duration-300 focus-within:border-red-500/40 focus-within:shadow-[0_0_40px_rgba(220,38,38,0.15)] relative">
              
              {/* Menu Toggle */}
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`p-3 rounded-full transition-all duration-300 ${showMenu ? 'bg-zinc-800 text-white rotate-45' : 'hover:bg-white/5 text-zinc-400 hover:text-white'}`}
              >
                <Plus size={22} strokeWidth={2.5} />
              </button>
              
              <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Ask your companion..."
                 className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 font-gemini font-medium h-12 px-2 text-lg"
              />
              
              <button 
                 onClick={toggleListening} 
                 className={`p-3 rounded-full transition-all duration-300 mr-2 ${
                    isListening ? 'bg-red-600 text-white animate-pulse' : 'hover:bg-white/5 text-zinc-500 hover:text-red-400'
                 }`}
              >
                 {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button 
                 onClick={() => handleSend()}
                 disabled={!input.trim()}
                 className={`p-3 rounded-full transition-all duration-500 ${
                    input.trim() 
                    ? 'bg-red-600 text-white hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.4)] rotate-0' 
                    : 'bg-zinc-900 text-zinc-700 cursor-not-allowed rotate-90'
                 }`}
              >
                 <Send size={18} fill="currentColor" />
              </button>
           </div>
        </div>

      </main>
    </div>
  );
}
