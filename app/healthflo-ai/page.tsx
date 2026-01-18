'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Bot, Send, AlertCircle, CreditCard, ExternalLink, 
  ArrowLeft, Activity, Info, Mic, MicOff, Plus, 
  Image as ImageIcon, RefreshCcw, Microscope, FileText, UserCircle2
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
    <div className="fixed inset-0 z-[150] bg-[#131314] text-[#E3E3E3] flex font-sans overflow-hidden">
      <style jsx>{`
        .gemini-gradient {
          background: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, #131314 100%);
        }
        .gemini-sidebar {
          background: #1e1f20;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
        .gemini-input-wrapper {
          background: #1e1f20;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          transition: all 0.2s ease;
        }
        .gemini-input-wrapper:focus-within {
          background: #282a2d;
          border-color: #4b90ff;
        }
        .message-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
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
      `}</style>

      {/* Left Sidebar - Gemini Style */}
      <aside className="hidden md:flex w-64 flex-col gemini-sidebar">
        <div className="p-4 flex flex-col gap-4">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-full w-fit transition-colors">
            <ArrowLeft size={20} />
          </Link>
          
          <button onClick={resetChat} className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-sm font-medium">
            <Plus size={20} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4 no-scrollbar">
          <div className="px-4 mb-4">
            <h3 className="text-[11px] font-bold text-[#8E918F] uppercase tracking-wider">Recent Analysis</h3>
          </div>
          <div className="space-y-1">
            {messages.length > 0 ? (
              <div className="px-4 py-2 bg-white/5 rounded-lg text-sm truncate text-[#C4C7C5] cursor-pointer">
                Current Dental Case
              </div>
            ) : (
              <p className="px-4 py-2 text-[11px] text-[#8E918F] italic">Logs populate as you chat...</p>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-full transition-colors text-sm text-[#C4C7C5]">
            <Info size={18} />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-full transition-colors text-sm text-[#C4C7C5]">
            <Activity size={18} />
            <span>Activity</span>
          </button>
          <div className="pt-2 border-t border-white/5">
              <div className="flex items-center gap-3 px-4 py-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">PT</div>
                <span>Patient Guest</span>
              </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative bg-[#131314]">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#1e1f20]">
           <Link href="/" className="p-2"><ArrowLeft size={20}/></Link>
           <span className="font-bold text-sm tracking-tight">Healthflo OS</span>
           <button onClick={resetChat} className="p-2"><RefreshCcw size={18}/></button>
        </header>

        {/* Message Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-12 pb-32">
           <div className="max-w-3xl mx-auto px-6 w-full">
              {messages.length === 0 ? (
                <div className="pt-20 flex flex-col">
                   <RevealOnScroll>
                      <h1 className="text-4xl md:text-5xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#4b90ff] to-[#ff5546]">
                        Hello, Noble Patient
                      </h1>
                      <h2 className="text-3xl md:text-4xl font-medium text-[#444746] mb-12">
                        How can I assist with your dental health today?
                      </h2>
                   </RevealOnScroll>

                   {/* Suggestion Grid */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                      {[
                        { text: "Analyze my sharp tooth pain", icon: AlertCircle, color: "text-red-400" },
                        { text: "Explain Micro-RCT procedure", icon: Microscope, color: "text-blue-400" },
                        { text: "Estimate Invisalign treatment cost", icon: CreditCard, color: "text-teal-400" },
                        { text: "Post-extraction care instructions", icon: FileText, color: "text-purple-400" }
                      ].map((item, i) => (
                        <button 
                           key={i} 
                           onClick={() => handleSend(item.text)}
                           className="text-left p-6 bg-[#1e1f20] hover:bg-[#282a2d] rounded-2xl transition-all group flex flex-col justify-between h-48 border border-white/5"
                        >
                           <p className="text-base text-[#C4C7C5] group-hover:text-white leading-relaxed">{item.text}</p>
                           <div className={`w-10 h-10 rounded-full bg-black/20 flex items-center justify-center ${item.color}`}>
                              <item.icon size={20} />
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="space-y-10 pb-10">
                   {messages.map((msg, i) => (
                      <div key={i} className="flex gap-6 items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className={`message-icon shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#37393b]' : 'bg-transparent text-blue-400'}`}>
                           {msg.role === 'user' ? <UserCircle2 size={24} /> : <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#69b1ff] flex items-center justify-center text-white"><Bot size={18} /></div>}
                        </div>
                        <div className="flex-1">
                           <div className="text-[17px] leading-relaxed text-[#E3E3E3] font-normal whitespace-pre-wrap">
                              {msg.text}
                           </div>
                           {msg.sources && msg.sources.length > 0 && (
                             <div className="flex flex-wrap gap-2 mt-6">
                                {msg.sources.map((s: any, j: number) => (
                                  <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1f20] border border-white/10 rounded-lg text-[11px] font-medium text-[#C4C7C5] hover:bg-[#282a2d] transition-colors">
                                     <ExternalLink size={12} />
                                     {s.title}
                                  </a>
                                ))}
                             </div>
                           )}
                        </div>
                      </div>
                   ))}
                   {isLoading && (
                      <div className="flex gap-6 items-start">
                        <div className="message-icon shrink-0 mt-1 text-blue-400 ai-loading-glow">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#69b1ff] flex items-center justify-center text-white"><Bot size={18} /></div>
                        </div>
                        <div className="flex-1 pt-2">
                           <div className="flex flex-col gap-2">
                              <div className="h-4 w-3/4 bg-[#1e1f20] rounded animate-pulse"></div>
                              <div className="h-4 w-1/2 bg-[#1e1f20] rounded animate-pulse"></div>
                           </div>
                        </div>
                      </div>
                   )}
                   <div ref={messagesEndRef} />
                </div>
              )}
           </div>
        </div>

        {/* Input Control Center - Floating Gemini Style */}
        <div className="absolute bottom-0 left-0 w-full gemini-gradient pb-8 pt-4">
           <div className="max-w-3xl mx-auto px-6">
              <div className="gemini-input-wrapper flex flex-col p-4 shadow-xl">
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
                    placeholder="Enter a prompt here..."
                    className="bg-transparent w-full outline-none text-base text-[#E3E3E3] placeholder-[#8E918F] resize-none px-2 mb-2 no-scrollbar"
                 />
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                       <button className="p-2 hover:bg-white/5 rounded-full text-[#C4C7C5] transition-colors"><ImageIcon size={18} /></button>
                       <button onClick={toggleListening} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'hover:bg-white/5 text-[#C4C7C5]'}`}>
                          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                       </button>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                          onClick={() => handleSend()} 
                          disabled={!input.trim() || isLoading}
                          className={`p-2 rounded-full transition-all ${input.trim() && !isLoading ? 'text-blue-400 hover:bg-white/5' : 'text-[#444746] cursor-not-allowed'}`}
                       >
                          <Send size={20} />
                       </button>
                    </div>
                 </div>
              </div>
              <p className="mt-3 text-[11px] text-center text-[#8E918F]">
                Healthflo Dental OS may display inaccurate clinical info. Verify critical diagnoses with Noble Dental surgeons.
              </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default HealthfloAiPage;
