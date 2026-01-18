'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, Send, ArrowLeft, Mic, MicOff, Sparkles, 
  ExternalLink, Plus, UserCircle2, Flame, Zap
} from 'lucide-react';
import { sendMessageToAssistant } from '@/services/geminiService';
import { ChatMessage } from '@/types';

export default function HealthfloAiPage() {
  const router = useRouter();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [typedText, setTypedText] = useState(''); // For Neo's typewriter effect
   
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fullIntroText = "I am Neo. Your dental intelligence architect.";

  // -- Navigation --
  const handleBack = () => {
    if (window.history.length > 2) router.back();
    else router.push('/');
  };

  // -- Typewriter Effect for Intro --
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

  // -- Auto Scroll --
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
        text: "System overload. Please re-engage shortly.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-500">
      
      {/* --- CINEMATIC STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');
        
        .font-neo { font-family: 'Montserrat', sans-serif; }
        
        /* Netflix-like Background Gradient */
        .cinematic-bg {
          background: radial-gradient(circle at 50% -20%, rgba(220, 38, 38, 0.15), rgba(0, 0, 0, 0) 50%);
        }
        .dark .cinematic-bg {
          background: radial-gradient(circle at 50% -20%, rgba(229, 9, 20, 0.25), rgba(0, 0, 0, 0) 60%);
        }

        /* Animated Grain for Texture */
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .neo-glow {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .dark .glass-panel {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* Hide scrollbar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10"></div>
      <div className="absolute inset-0 cinematic-bg pointer-events-none z-0"></div>

      {/* --- TOP NAV --- */}
      <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <div onClick={handleBack} className="flex items-center gap-3 cursor-pointer group opacity-80 hover:opacity-100 transition-opacity">
           <div className="p-2 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/20 transition-colors">
              <ArrowLeft size={20} />
           </div>
           <span className="font-neo font-bold text-sm tracking-[0.2em] uppercase">Return</span>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
           <span className="font-neo text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">Live</span>
        </div>
      </nav>

      {/* --- MAIN STAGE --- */}
      <main className="relative z-20 w-full h-screen flex flex-col items-center justify-center pt-20 pb-28 px-4">
        
        {messages.length === 0 ? (
          /* NEO HERO STATE */
          <div className="text-center flex flex-col items-center max-w-3xl animate-in fade-in zoom-in duration-1000">
             
             {/* The "Neo" Avatar - Abstract Glowing Orb */}
             <div className="animate-float mb-12 relative group cursor-pointer" onClick={() => handleSend("Hello Neo")}>
                <div className="w-40 h-40 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 dark:from-zinc-800 dark:to-black relative z-10 flex items-center justify-center border border-white/50 dark:border-white/10 shadow-2xl neo-glow transition-transform duration-500 group-hover:scale-105">
                   <Flame size={64} className="text-slate-800 dark:text-red-600 transition-colors duration-500" strokeWidth={1} />
                </div>
                {/* Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-slate-300 dark:border-red-900/30 scale-125 animate-spin duration-[10s]"></div>
                <div className="absolute inset-0 rounded-full border border-slate-300 dark:border-red-900/20 scale-150 animate-spin duration-[15s] direction-reverse"></div>
             </div>

             {/* Typewriter Headline */}
             <h1 className="font-neo text-4xl md:text-6xl font-black mb-6 tracking-tight min-h-[4rem]">
               {typedText}<span className="cursor-blink text-red-600">_</span>
             </h1>
             
             {/* Cinematic Subtext */}
             <p className="font-neo text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed opacity-0 animate-in fade-in slide-in-from-bottom-4 delay-1000 fill-mode-forwards">
               Ask me about your symptoms, treatment costs, or the future of your smile.
             </p>

             {/* Quick Actions (Netflix Style Buttons) */}
             <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-8 delay-[1500ms] fill-mode-forwards">
                {[
                  { label: "Analyze Pain", icon: Zap },
                  { label: "Cost Estimate", icon: Sparkles },
                  { label: "My History", icon: ExternalLink }
                ].map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(action.label)}
                    className="flex items-center gap-3 px-6 py-3 rounded-md bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/20 transition-all font-bold text-sm tracking-wide"
                  >
                    <action.icon size={16} className="text-red-600" />
                    {action.label}
                  </button>
                ))}
             </div>
          </div>
        ) : (
          /* CHAT STREAM */
          <div className="flex-1 w-full max-w-5xl overflow-y-auto no-scrollbar px-2 space-y-8">
             {messages.map((msg, i) => (
                <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                   
                   {msg.role !== 'user' && (
                     <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-black shrink-0">
                        <Flame size={20} className="text-red-600" />
                     </div>
                   )}
                   
                   <div className={`max-w-[85%] md:max-w-[70%] p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-md ${
                      msg.role === 'user' 
                      ? 'bg-slate-900 dark:bg-red-600 text-white rounded-tr-sm' 
                      : 'glass-panel text-slate-800 dark:text-slate-200 rounded-tl-sm'
                   }`}>
                      {msg.role !== 'user' && (
                        <div className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 opacity-80">
                           Neo Intelligence
                        </div>
                      )}
                      
                      <p className="text-base md:text-lg leading-relaxed font-medium whitespace-pre-wrap">
                        {msg.text}
                      </p>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                           {msg.sources.map((s: any, j: number) => (
                             <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/10 rounded-sm text-[10px] font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-colors uppercase tracking-wider">
                                <ExternalLink size={10} /> {s.title}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>

                   {msg.role === 'user' && (
                     <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <UserCircle2 size={24} className="text-slate-500 dark:text-white/50" />
                     </div>
                   )}
                </div>
             ))}
             
             {isLoading && (
               <div className="flex gap-6">
                 <div className="w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center bg-black shrink-0 animate-pulse">
                    <Flame size={20} className="text-red-600" />
                 </div>
                 <div className="glass-panel px-8 py-6 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-200"></span>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>
        )}

        {/* --- INPUT BAR (The "Netflix Search" feel) --- */}
        <div className="fixed bottom-0 left-0 w-full p-6 z-40 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent pt-20">
           <div className="max-w-3xl mx-auto relative">
              <div className="glass-panel w-full p-1.5 rounded-full flex items-center transition-all duration-300 focus-within:ring-2 focus-within:ring-red-500/50 shadow-2xl">
                 
                 <div className="pl-4 pr-2">
                   <Plus size={20} className="text-slate-400 cursor-pointer hover:text-red-500 transition-colors" />
                 </div>
                 
                 <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Neo..."
                    className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium h-12 px-2 text-lg"
                 />
                 
                 <button 
                    onClick={toggleListening} 
                    className={`p-3 rounded-full transition-all duration-300 mr-1 ${
                       isListening ? 'bg-red-600 text-white animate-pulse' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400'
                    }`}
                 >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                 </button>

                 <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className={`p-3 rounded-full transition-all duration-300 ${
                       input.trim() 
                       ? 'bg-red-600 text-white hover:scale-105 shadow-lg shadow-red-600/30' 
                       : 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-white/20 cursor-not-allowed'
                    }`}
                 >
                    <Send size={18} fill="currentColor" />
                 </button>
              </div>
              
              <div className="text-center mt-3">
                 <span className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
                   Neo System V2.0 • Encryption Active
                 </span>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
