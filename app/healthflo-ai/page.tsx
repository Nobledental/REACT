'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Bot, Send, AlertCircle, CreditCard, ExternalLink, 
  ArrowLeft, Activity, Info, Mic, MicOff, Plus, 
  Image as ImageIcon, RefreshCcw, Microscope, FileText, UserCircle2,
  Sparkles, MessageSquare, ChevronRight
} from 'lucide-react';
import { sendMessageToAssistant } from '@/services/geminiService';
import { ChatMessage } from '@/types';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const HealthfloAiPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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

  const resetChat = () => {
    setMessages([]);
    setInput('');
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
        text: "I'm sorry, I'm experiencing a high load. Please try again or call our clinic directly.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] ai-bg text-[#E3E3E3] flex font-sans overflow-hidden">
      <style jsx global>{`
        .ai-bg { 
          background-color: #09090b; 
          background-image: 
            radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%), 
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
          background-attachment: fixed;
        }
        
        .glass-sidebar {
          background: rgba(18, 18, 20, 0.6);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .glass-input {
          background: rgba(30, 30, 35, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-input:focus-within {
          background: rgba(35, 35, 40, 0.9);
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.2), 0 8px 40px rgba(0, 0, 0, 0.2);
        }

        .user-bubble {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .ai-bubble {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
        }

        .suggestion-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }
        .suggestion-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes subtle-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        .ai-loading-glow {
          animation: subtle-pulse 2s infinite ease-in-out;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Left Sidebar - Glass Style */}
      <aside className="hidden md:flex w-72 flex-col glass-sidebar z-20">
        <div className="p-6 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
               <ArrowLeft size={18} />
            </div>
            <span className="font-bold text-sm tracking-wide">Back to Clinic</span>
          </Link>
          
          <button 
            onClick={resetChat} 
            className="flex items-center gap-3 px-4 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 font-medium group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span>New Consultation</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
          <div className="px-2 mb-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">History</h3>
          </div>
          <div className="space-y-1">
            {messages.length > 0 ? (
              <div className="group flex items-center gap-3 px-3 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-slate-300 cursor-pointer hover:border-blue-500/30 transition-all">
                <MessageSquare size={14} className="text-blue-400" />
                <span className="truncate">Active Session</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto animate-pulse"></div>
              </div>
            ) : (
              <div className="px-4 py-8 text-center border border-dashed border-white/5 rounded-xl">
                 <p className="text-[11px] text-slate-600">No recent chats</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
           <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                 AI
              </div>
              <div>
                 <div className="text-xs font-bold text-white">Healthflo v2.1</div>
                 <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Online
                 </div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 z-50">
           <button onClick={onBack} className="p-2"><ArrowLeft size={20}/></button>
           <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-400" />
              <span className="font-bold text-sm tracking-tight">Healthflo OS</span>
           </div>
           <button onClick={resetChat} className="p-2"><RefreshCcw size={18}/></button>
        </header>

        {/* Message Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-8 pb-32">
           <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
              {messages.length === 0 ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700 pt-10">
                   <div className="w-20 h-20 mb-8 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3)]">
                      <Bot size={40} className="text-white" />
                   </div>
                   
                   <RevealOnScroll>
                      <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight text-white">
                         Hello, Noble Patient
                      </h1>
                      <h2 className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
                         I am your personal dental assistant. Ask me about symptoms, treatments, or pricing.
                      </h2>
                   </RevealOnScroll>

                   {/* Suggestion Grid */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                      {[
                        { text: "Analyze my sharp tooth pain", icon: AlertCircle, color: "text-rose-400", label: "Triage" },
                        { text: "Explain Micro-RCT procedure", icon: Microscope, color: "text-blue-400", label: "Education" },
                        { text: "Estimate Invisalign treatment cost", icon: CreditCard, color: "text-emerald-400", label: "Finance" },
                        { text: "Post-extraction care instructions", icon: FileText, color: "text-amber-400", label: "Recovery" }
                      ].map((item, i) => (
                        <button 
                           key={i} 
                           onClick={() => handleSend(item.text)}
                           className="text-left p-5 suggestion-card rounded-2xl group flex flex-col justify-between h-32"
                        >
                           <div className="flex justify-between items-start mb-2">
                              <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                                 <item.icon size={18} />
                              </div>
                              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all text-slate-500" />
                           </div>
                           <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{item.label}</div>
                              <p className="text-sm text-slate-300 group-hover:text-white transition-colors line-clamp-2">{item.text}</p>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="space-y-8 pb-10">
                   {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                        <div className={`
                            shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg
                            ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'}
                        `}>
                           {msg.role === 'user' ? <UserCircle2 size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`
                            max-w-[85%] md:max-w-[75%] p-5 md:p-6 rounded-3xl text-[15px] md:text-base leading-relaxed shadow-sm
                            ${msg.role === 'user' ? 'user-bubble text-white rounded-tr-sm' : 'ai-bubble text-slate-200 rounded-tl-sm'}
                        `}>
                           <div className="whitespace-pre-wrap">{msg.text}</div>
                           {msg.sources && msg.sources.length > 0 && (
                             <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                                {msg.sources.map((s: any, j: number) => (
                                  <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-black/20 hover:bg-black/40 border border-white/10 rounded-lg text-[11px] font-medium text-blue-300 hover:text-blue-200 transition-colors">
                                     <ExternalLink size={10} />
                                     {s.title}
                                  </a>
                                ))}
                             </div>
                           )}
                        </div>
                      </div>
                   ))}
                   {isLoading && (
                      <div className="flex gap-4 md:gap-6 animate-in fade-in duration-300">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                           <Bot size={20} />
                        </div>
                        <div className="ai-bubble p-5 rounded-3xl rounded-tl-sm flex items-center gap-1.5">
                           <div className="typing-dot"></div>
                           <div className="typing-dot"></div>
                           <div className="typing-dot"></div>
                        </div>
                      </div>
                   )}
                   <div ref={messagesEndRef} className="h-4" />
                </div>
              )}
           </div>
        </div>

        {/* Input Control Center - Floating Glass Style */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-40 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent">
           <div className="max-w-3xl mx-auto">
              <div className="glass-input p-2 flex flex-col relative">
                 <textarea 
                    rows={Math.min(5, input.split('\n').length)}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your health query..."
                    className="bg-transparent w-full outline-none text-base text-[#E3E3E3] placeholder-slate-500 resize-none px-4 py-3 mb-1 no-scrollbar rounded-xl"
                 />
                 <div className="flex items-center justify-between px-2 pb-1">
                    <div className="flex items-center gap-1">
                       <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors" title="Upload Image">
                          <ImageIcon size={18} />
                       </button>
                       <button 
                          onClick={toggleListening} 
                          className={`p-2 rounded-full transition-all duration-300 ${isListening ? 'bg-rose-500/20 text-rose-500 animate-pulse' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                          title="Voice Input"
                       >
                          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                       </button>
                    </div>
                    <button 
                       onClick={() => handleSend()} 
                       disabled={!input.trim() || isLoading}
                       className={`
                          p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center
                          ${input.trim() && !isLoading 
                             ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95' 
                             : 'bg-white/5 text-slate-500 cursor-not-allowed'}
                       `}
                    >
                       <Send size={18} className={input.trim() ? "ml-0.5" : ""} />
                    </button>
                 </div>
              </div>
              <p className="mt-4 text-[10px] text-center text-slate-500 flex items-center justify-center gap-1.5 opacity-60">
                <ShieldCheck size={10} /> Encrypted Healthflo HIPAA-Compliant Session
              </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default HealthfloAiPage;
