'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, Send, ArrowLeft, Mic, MicOff, Sparkles, 
  ExternalLink, Plus, UserCircle2, Flame, Zap,
  FileText, Calendar, ShieldAlert, X
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
  const [showMenu, setShowMenu] = useState(false); // New Quick Menu State
   
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fullIntroText = "I am Neo. Your dental care companion.";

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
      }, 50);
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

  // -- Auto Scroll (Advanced) --
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading, input]); // Trigger on input too to keep focus

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
    
    // Close menu if open
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

  // -- Quick Actions --
  const quickActions = [
    { label: "Post-Op Guides", query: "Show me post-operation care instructions for tooth extraction and root canal", icon: FileText, color: "text-blue-400" },
    { label: "Cost Estimator", query: "What are the approximate costs for dental implants and veneers?", icon: Sparkles, color: "text-yellow-400" },
    { label: "Book Visit", query: "I would like to schedule an appointment", icon: Calendar, color: "text-green-400" },
    { label: "Emergency", query: "I have a dental emergency, what should I do?", icon: ShieldAlert, color: "text-red-500" },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden transition-colors duration-500">
      
      {/* --- STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
        
        .font-neo { font-family: 'Montserrat', sans-serif; }
        
        .cinematic-gradient {
          background: radial-gradient(circle at 50% -20%, rgba(220, 38, 38, 0.15), rgba(0, 0, 0, 0) 60%);
        }
        
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }

        .glass-panel {
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .glass-menu {
            background: rgba(10, 10, 10, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .orb-pulse {
          box-shadow: 0 0 40px rgba(220, 38, 38, 0.2);
          animation: orb-breathe 4s infinite ease-in-out;
        }
        @keyframes orb-breathe {
          0%, 100% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.2); transform: scale(1); }
          50% { box-shadow: 0 0 70px rgba(220, 38, 38, 0.5); transform: scale(1.02); }
        }

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

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10"></div>
      <div className="absolute inset-0 cinematic-gradient pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <div onClick={handleBack} className="flex items-center gap-3 cursor-pointer group opacity-70 hover:opacity-100 transition-all">
           <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={18} />
           </div>
           <span className="font-neo font-bold text-xs tracking-[0.2em] uppercase text-slate-300">Return</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/50">
           <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
           <span className="font-neo text-[10px] font-bold text-red-500 uppercase tracking-widest">Neo Active</span>
        </div>
      </nav>

      {/* --- MAIN INTERFACE --- */}
      <main className="relative z-20 w-full h-screen flex flex-col items-center justify-center pt-20 pb-24 px-4">
        
        {messages.length === 0 ? (
          /* HERO STATE */
          <div className="text-center flex flex-col items-center max-w-3xl animate-in fade-in duration-700 w-full">
             
             {/* The "Neo" Avatar */}
             <div className="mb-10 relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-zinc-800 to-black relative z-10 flex items-center justify-center border border-white/10 orb-pulse">
                   <Flame size={48} className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" strokeWidth={1.5} />
                </div>
                {/* Spinning Rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-spin duration-[20s] opacity-50"></div>
                <div className="absolute inset-0 rounded-full border border-red-500/10 scale-150 animate-spin duration-[30s] direction-reverse"></div>
             </div>

             {/* Dynamic Intro */}
             <h1 className="font-neo text-3xl md:text-5xl font-black mb-4 tracking-tight min-h-[3rem] text-white">
               {typedText}<span className="animate-pulse text-red-600">_</span>
             </h1>
             
             <p className="font-neo text-sm md:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-12">
               Advanced diagnostics, immediate care guides, and seamless scheduling.
             </p>

             {/* Quick Actions Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl opacity-0 animate-in fade-in slide-in-from-bottom-8 delay-500 fill-mode-forwards">
                {quickActions.map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(action.query)}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-red-500/30 hover:bg-zinc-800 transition-all group"
                  >
                    <div className={`p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform ${action.color}`}>
                       <action.icon size={20} />
                    </div>
                    <span className="font-neo text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white">{action.label}</span>
                  </button>
                ))}
             </div>
          </div>
        ) : (
          /* CHAT STREAM */
          <div className="flex-1 w-full max-w-4xl overflow-y-auto no-scrollbar px-2 space-y-6 pb-4">
             {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                   
                   {msg.role !== 'user' && (
                     <div className="w-8 h-8 rounded-full border border-red-500/20 flex items-center justify-center bg-black shrink-0 mt-1">
                        <Flame size={14} className="text-red-600" />
                     </div>
                   )}
                   
                   <div className={`max-w-[85%] p-5 rounded-2xl backdrop-blur-md ${
                      msg.role === 'user' 
                      ? 'bg-red-600/90 text-white rounded-tr-sm shadow-[0_0_20px_rgba(220,38,38,0.2)]' 
                      : 'glass-panel text-zinc-200 rounded-tl-sm'
                   }`}>
                      {msg.role !== 'user' && (
                        <div className="text-[9px] font-bold uppercase tracking-widest text-red-500 mb-2 opacity-70">
                           Neo Companion
                        </div>
                      )}
                      
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                        {msg.text}
                      </p>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
                           {msg.sources.map((s: any, j: number) => (
                             <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded text-[9px] font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-zinc-400 hover:text-white">
                                <ExternalLink size={10} /> {s.title}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>
                </div>
             ))}
             
             {isLoading && (
               <div className="flex gap-4 items-center">
                 <div className="w-8 h-8 rounded-full border border-red-500/20 flex items-center justify-center bg-black shrink-0">
                    <Flame size={14} className="text-red-600 animate-pulse" />
                 </div>
                 <div className="glass-panel px-4 py-3 rounded-xl rounded-tl-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"></div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} className="h-4" />
          </div>
        )}

        {/* --- FLOATING COMMAND BAR --- */}
        <div className="fixed bottom-6 w-full px-4 z-40 max-w-3xl">
           
           {/* Pop-up Quick Menu */}
           {showMenu && (
             <div className="absolute bottom-full left-4 mb-4 glass-menu rounded-2xl p-2 animate-in slide-in-from-bottom-2 fade-in zoom-in shadow-2xl flex flex-col gap-1 min-w-[200px]">
                {quickActions.map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(action.query)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-left transition-colors group"
                  >
                    <action.icon size={16} className={`${action.color}`} />
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{action.label}</span>
                  </button>
                ))}
             </div>
           )}

           <div className="glass-panel w-full p-2 rounded-full flex items-center transition-all duration-300 focus-within:border-red-500/50 focus-within:shadow-[0_0_30px_rgba(220,38,38,0.15)] relative">
              
              {/* Menu Toggle */}
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`p-3 rounded-full transition-all duration-300 ${showMenu ? 'bg-zinc-800 text-white rotate-45' : 'hover:bg-white/5 text-zinc-400'}`}
              >
                {showMenu ? <Plus size={20} /> : <Plus size={20} />}
              </button>
              
              <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Message Neo..."
                 className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 font-medium h-10 px-2 text-base"
              />
              
              <button 
                 onClick={toggleListening} 
                 className={`p-3 rounded-full transition-all duration-300 mr-1 ${
                    isListening ? 'bg-red-600 text-white animate-pulse' : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-300'
                 }`}
              >
                 {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button 
                 onClick={() => handleSend()}
                 disabled={!input.trim()}
                 className={`p-3 rounded-full transition-all duration-300 ${
                    input.trim() 
                    ? 'bg-red-600 text-white hover:scale-105 shadow-lg shadow-red-600/30' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
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
