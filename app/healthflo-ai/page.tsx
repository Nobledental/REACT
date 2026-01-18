'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, Send, ArrowLeft, Mic, MicOff, Image as ImageIcon, 
  Sparkles, ExternalLink, Plus, Info, Activity, UserCircle2
} from 'lucide-react';
import { sendMessageToAssistant } from '@/services/geminiService';
import { ChatMessage } from '@/types';

export default function HealthfloAiPage() {
  const router = useRouter();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
   
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // -- Navigation --
  const handleBack = () => {
    if (window.history.length > 2) router.back();
    else router.push('/');
  };

  // -- Speech Recognition Setup --
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
        text: "I'm experiencing high traffic. Please try again shortly.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#dcebf5] text-slate-800 font-sans overflow-hidden selection:bg-blue-200">
      
      {/* --- CUSTOM STYLES FOR THE "SCULPT" LOOK --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');
        
        .font-sculpt { font-family: 'Nunito', sans-serif; }
        
        .bg-cloud-gradient {
          background: radial-gradient(circle at 50% 50%, #ffffff 0%, #d6e8f5 100%);
        }
        
        .giant-text {
          font-size: 30vw;
          line-height: 0.8;
          font-weight: 900;
          color: white;
          opacity: 0.6;
          text-shadow: 0 10px 30px rgba(0,0,0,0.05);
          user-select: none;
        }

        .glass-pill {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }

        .character-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        .bot-glow {
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
        }
        
        /* Hide scrollbar for clean look */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* BACKGROUND GIANT TEXT (Like the '404') */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <span className="giant-text tracking-tighter">AI</span>
      </div>

      {/* --- TOP NAVIGATION --- */}
      <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={handleBack}>
           <Sparkles className="text-blue-500 fill-blue-500" size={24} />
           <span className="font-sculpt font-bold text-xl text-slate-700 group-hover:text-blue-600 transition-colors">Healthflo</span>
        </div>
        
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white text-sm font-bold text-slate-600 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
           Reset Chat
        </button>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center pt-10 pb-24 px-4">
        
        {messages.length === 0 ? (
          /* EMPTY STATE - REPLICATING THE IMAGE */
          <div className="text-center flex flex-col items-center max-w-2xl animate-in fade-in zoom-in duration-700">
             
             {/* The Character (Replacing the Blue Monster) */}
             <div className="character-float relative mb-8">
                <div className="w-48 h-48 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[3rem] shadow-2xl flex items-center justify-center relative z-10 border-4 border-white/20">
                    <Bot size={100} className="text-white drop-shadow-md" strokeWidth={1.5} />
                    {/* Eyes/Face Details */}
                    <div className="absolute top-14 left-12 w-3 h-3 bg-white rounded-full opacity-80 animate-pulse"></div>
                </div>
                {/* Shadow underneath */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-blue-900/20 rounded-[100%] blur-md"></div>
             </div>

             {/* Headline */}
             <h1 className="font-sculpt text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
               Oops, I think we're smart.
             </h1>
             
             {/* Subtext */}
             <p className="font-sculpt text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
               I'm your AI dental assistant. Ask me about treatments, costs, or that sharp pain you're feeling.
             </p>
          </div>
        ) : (
          /* ACTIVE CHAT STATE */
          <div className="flex-1 w-full max-w-4xl overflow-y-auto no-scrollbar px-4 pt-4 pb-4 space-y-6">
             {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                   {msg.role !== 'user' && (
                     <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-lg">
                        <Bot size={20} />
                     </div>
                   )}
                   
                   <div className={`max-w-[80%] p-5 rounded-3xl shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                   }`}>
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                        {msg.text}
                      </p>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5">
                           {msg.sources.map((s: any, j: number) => (
                             <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-lg text-xs font-bold hover:bg-black/10 transition-colors">
                                <ExternalLink size={10} /> {s.title}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>

                   {msg.role === 'user' && (
                     <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <UserCircle2 size={24} />
                     </div>
                   )}
                </div>
             ))}
             
             {isLoading && (
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white shrink-0">
                    <Bot size={20} className="animate-spin" />
                 </div>
                 <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none shadow-sm flex gap-2 items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>
        )}

        {/* --- INPUT AREA (FLOATING PILL) --- */}
        <div className="fixed bottom-8 w-full px-6 z-40 flex justify-center">
           <div className="glass-pill w-full max-w-2xl p-2 rounded-[2rem] flex items-center gap-2 transition-all duration-300 focus-within:scale-[1.01] focus-within:shadow-xl focus-within:border-blue-300">
              
              <button className="p-3 rounded-full hover:bg-slate-100 text-slate-400 hover:text-blue-500 transition-colors">
                 <Plus size={20} />
              </button>
              
              <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Type your question here..."
                 className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium h-full py-3"
              />
              
              <button 
                 onClick={toggleListening} 
                 className={`p-3 rounded-full transition-all duration-300 ${
                    isListening ? 'bg-red-50 text-red-500' : 'hover:bg-slate-100 text-slate-400'
                 }`}
              >
                 {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button 
                 onClick={() => handleSend()}
                 disabled={!input.trim()}
                 className={`p-3 rounded-full transition-all duration-300 ${
                    input.trim() 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
                    : 'bg-slate-200 text-slate-400 scale-90 cursor-not-allowed'
                 }`}
              >
                 <Send size={18} fill="currentColor" />
              </button>
           </div>
        </div>
        
        {/* Helper Footer Text */}
        <div className="fixed bottom-2 w-full text-center z-30 pointer-events-none">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
             Healthflo AI • Beta
           </span>
        </div>

      </main>
    </div>
  );
}
