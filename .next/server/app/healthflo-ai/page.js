(()=>{var e={};e.id=256,e.ids=[256],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1310:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d}),a(5618),a(1506),a(5866);var r=a(3191),s=a(8716),i=a(7922),n=a.n(i),o=a(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["healthflo-ai",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,5618)),"C:\\Users\\Dhivakaran\\Desktop\\CORE\\NOBLE-WEBSITE\\NOBLE-WEBSITE-main\\noble-landing-v2\\app\\healthflo-ai\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"C:\\Users\\Dhivakaran\\Desktop\\CORE\\NOBLE-WEBSITE\\NOBLE-WEBSITE-main\\noble-landing-v2\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\Dhivakaran\\Desktop\\CORE\\NOBLE-WEBSITE\\NOBLE-WEBSITE-main\\noble-landing-v2\\app\\healthflo-ai\\page.tsx"],p="/healthflo-ai/page",x={require:a,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/healthflo-ai/page",pathname:"/healthflo-ai",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3861:(e,t,a)=>{Promise.resolve().then(a.bind(a,6447))},6447:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>y});var r=a(326),s=a(7577),i=a(5047),n=a(6283),o=a(1572),l=a(7358),d=a(851);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,d.Z)("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);var p=a(6333);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,d.Z)("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);var m=a(7027),u=a(9183),h=a(3855),g=a(7061),b=a(8775),f=a(9436),v=a(7586);function y(){let e=(0,i.useRouter)(),[t,a]=(0,s.useState)([]),[d,y]=(0,s.useState)(""),[w,j]=(0,s.useState)(!1),[k,N]=(0,s.useState)(!1),[E,z]=(0,s.useState)(""),[_,C]=(0,s.useState)(!1),S=(0,s.useRef)(null),B=(0,s.useRef)(null),Z=async e=>{let r=e||d;if(!r.trim()||w)return;C(!1);let s={role:"user",text:r,timestamp:Date.now()};a(e=>[...e,s]),y(""),j(!0);try{let e=t.slice(-10).map(e=>({role:e.role,parts:[{text:e.text}]})),s=await (0,v._)(r,e);a(e=>[...e,{role:"model",text:s.text,sources:s.sources,timestamp:Date.now()}])}catch(e){a(e=>[...e,{role:"model",text:"Connection interrupted. Please re-engage.",timestamp:Date.now()}])}finally{j(!1)}},O=[{label:"Post-Op Guide",query:"Show me post-operation care instructions for tooth extraction and root canal",icon:n.Z,color:"text-blue-400",bg:"bg-blue-500/10"},{label:"Cost Estimate",query:"What are the approximate costs for dental implants and veneers?",icon:o.Z,color:"text-amber-400",bg:"bg-amber-500/10"},{label:"Book Visit",query:"I would like to schedule an appointment",icon:l.Z,color:"text-emerald-400",bg:"bg-emerald-500/10"},{label:"Emergency",query:"I have a dental emergency, what should I do?",icon:c,color:"text-rose-500",bg:"bg-rose-500/10"}];return(0,r.jsxs)("div",{className:"relative min-h-screen bg-[#020202] text-slate-200 font-sans overflow-hidden selection:bg-red-500/30",children:[r.jsx("style",{children:`
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
      `}),r.jsx("div",{className:"absolute inset-0 bg-grain pointer-events-none z-10"}),r.jsx("div",{className:"absolute inset-0 cinematic-bg pointer-events-none z-0"}),(0,r.jsxs)("nav",{className:"absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-700",children:[(0,r.jsxs)("div",{onClick:()=>{window.history.length>2?e.back():e.push("/")},className:"flex items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-all",children:[r.jsx("div",{className:"p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all",children:r.jsx(p.Z,{size:18})}),r.jsx("span",{className:"font-gemini font-bold text-xs tracking-[0.2em] uppercase text-slate-300 group-hover:text-white transition-colors",children:"Exit"})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/20 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]",children:[r.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"}),r.jsx("span",{className:"font-gemini text-[10px] font-bold text-red-400 uppercase tracking-widest",children:"System Online"})]})]}),(0,r.jsxs)("main",{className:"relative z-20 w-full h-screen flex flex-col items-center justify-center pt-20 pb-28 px-4",children:[0===t.length?(0,r.jsxs)("div",{className:"text-center flex flex-col items-center max-w-3xl w-full animate-in fade-in zoom-in duration-1000",children:[(0,r.jsxs)("div",{className:"mb-12 relative group cursor-pointer transition-transform duration-500 hover:scale-105",onClick:()=>Z("Hello"),children:[r.jsx("div",{className:"w-32 h-32 rounded-full bg-gradient-to-b from-zinc-800 to-black relative z-10 flex items-center justify-center border border-white/10 neo-avatar",children:r.jsx(x,{size:48,className:"text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]",strokeWidth:1.5})}),r.jsx("div",{className:"absolute inset-0 rounded-full border border-white/5 scale-[1.3] animate-spin duration-[25s] opacity-40"}),r.jsx("div",{className:"absolute inset-0 rounded-full border border-red-500/10 scale-[1.6] animate-spin duration-[35s] direction-reverse opacity-60"})]}),(0,r.jsxs)("h1",{className:"font-gemini text-4xl md:text-6xl font-medium mb-6 tracking-tight text-white drop-shadow-2xl min-h-[4rem]",children:[E,r.jsx("span",{className:"animate-pulse text-red-500",children:"_"})]}),r.jsx("p",{className:"font-gemini text-base md:text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed mb-12 opacity-0 animate-in fade-in slide-in-from-bottom-4 delay-700 fill-mode-forwards",children:"I am designed to analyze symptoms, explain procedures, and guide your recovery."}),r.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl opacity-0 animate-in fade-in slide-in-from-bottom-8 delay-1000 fill-mode-forwards",children:O.map((e,t)=>(0,r.jsxs)("button",{onClick:()=>Z(e.query),className:"flex flex-col items-center justify-center gap-4 p-5 rounded-2xl glass-panel hover:bg-white/5 hover:border-red-500/30 transition-all duration-300 group hover:-translate-y-1",children:[r.jsx("div",{className:`p-3 rounded-xl ${e.bg} group-hover:scale-110 transition-transform duration-300`,children:r.jsx(e.icon,{size:20,className:e.color})}),r.jsx("span",{className:"font-gemini text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors",children:e.label})]},t))})]}):(0,r.jsxs)("div",{className:"flex-1 w-full max-w-4xl overflow-y-auto no-scrollbar px-2 space-y-8 pb-4",children:[t.map((e,t)=>(0,r.jsxs)("div",{className:`flex gap-5 ${"user"===e.role?"justify-end":"justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`,children:["user"!==e.role&&r.jsx("div",{className:"w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 shrink-0 mt-1 shadow-[0_0_15px_rgba(220,38,38,0.1)]",children:r.jsx(x,{size:16,className:"text-red-500"})}),(0,r.jsxs)("div",{className:`max-w-[85%] p-6 rounded-3xl backdrop-blur-xl ${"user"===e.role?"bg-red-600/90 text-white rounded-tr-md shadow-[0_5px_20px_rgba(220,38,38,0.25)]":"glass-panel text-zinc-200 rounded-tl-md"}`,children:["user"!==e.role&&(0,r.jsxs)("div",{className:"flex items-center gap-2 mb-3 opacity-60",children:[r.jsx("span",{className:"text-[10px] font-gemini font-bold uppercase tracking-widest text-red-400",children:"Neo System"}),r.jsx("div",{className:"h-[1px] flex-1 bg-red-500/20"})]}),r.jsx("p",{className:"font-gemini text-sm md:text-[1.05rem] leading-relaxed whitespace-pre-wrap font-normal",children:e.text}),e.sources&&e.sources.length>0&&r.jsx("div",{className:"flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5",children:e.sources.map((e,t)=>(0,r.jsxs)("a",{href:e.uri,target:"_blank",rel:"noreferrer",className:"flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider text-zinc-400 border border-transparent hover:border-white/10",children:[r.jsx(m.Z,{size:10})," ",e.title]},t))})]})]},t)),w&&(0,r.jsxs)("div",{className:"flex gap-5 items-center animate-in fade-in",children:[r.jsx("div",{className:"w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 shrink-0",children:r.jsx(x,{size:16,className:"text-red-500 animate-pulse"})}),(0,r.jsxs)("div",{className:"glass-panel px-5 py-4 rounded-2xl rounded-tl-md flex items-center gap-1.5",children:[r.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"}),r.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"}),r.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full typing-dot"})]})]}),r.jsx("div",{ref:S,className:"h-6"})]}),(0,r.jsxs)("div",{className:"fixed bottom-8 w-full px-4 z-40 max-w-3xl",children:[_&&r.jsx("div",{className:"absolute bottom-full left-4 mb-4 glass-input rounded-2xl p-2 animate-in slide-in-from-bottom-4 fade-in zoom-in duration-300 flex flex-col gap-1 min-w-[240px] border border-white/10",children:O.map((e,t)=>(0,r.jsxs)("button",{onClick:()=>Z(e.query),className:"flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-left transition-colors group",children:[r.jsx(e.icon,{size:16,className:`${e.color}`}),r.jsx("span",{className:"font-gemini text-sm font-medium text-zinc-300 group-hover:text-white",children:e.label}),r.jsx(u.Z,{size:14,className:"ml-auto opacity-0 group-hover:opacity-100 text-zinc-500 transition-opacity"})]},t))}),(0,r.jsxs)("div",{className:"glass-input w-full p-2 rounded-full flex items-center transition-all duration-300 focus-within:border-red-500/40 focus-within:shadow-[0_0_40px_rgba(220,38,38,0.15)] relative",children:[r.jsx("button",{onClick:()=>C(!_),className:`p-3 rounded-full transition-all duration-300 ${_?"bg-zinc-800 text-white rotate-45":"hover:bg-white/5 text-zinc-400 hover:text-white"}`,children:r.jsx(h.Z,{size:22,strokeWidth:2.5})}),r.jsx("input",{value:d,onChange:e=>y(e.target.value),onKeyDown:e=>"Enter"===e.key&&Z(),placeholder:"Ask your companion...",className:"flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 font-gemini font-medium h-12 px-2 text-lg"}),r.jsx("button",{onClick:()=>{k?B.current?.stop():(N(!0),B.current?.start())},className:`p-3 rounded-full transition-all duration-300 mr-2 ${k?"bg-red-600 text-white animate-pulse":"hover:bg-white/5 text-zinc-500 hover:text-red-400"}`,children:k?r.jsx(g.Z,{size:20}):r.jsx(b.Z,{size:20})}),r.jsx("button",{onClick:()=>Z(),disabled:!d.trim(),className:`p-3 rounded-full transition-all duration-500 ${d.trim()?"bg-red-600 text-white hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.4)] rotate-0":"bg-zinc-900 text-zinc-700 cursor-not-allowed rotate-90"}`,children:r.jsx(f.Z,{size:18,fill:"currentColor"})})]})]})]})]})}},6333:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(851).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},7358:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(851).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},9183:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(851).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},3855:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(851).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},1572:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(851).Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},5618:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});var r=a(8570);let s=(0,r.createProxy)(String.raw`C:\Users\Dhivakaran\Desktop\CORE\NOBLE-WEBSITE\NOBLE-WEBSITE-main\noble-landing-v2\app\healthflo-ai\page.tsx`),{__esModule:i,$$typeof:n}=s;s.default;let o=(0,r.createProxy)(String.raw`C:\Users\Dhivakaran\Desktop\CORE\NOBLE-WEBSITE\NOBLE-WEBSITE-main\noble-landing-v2\app\healthflo-ai\page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[709,220],()=>a(1310));module.exports=r})();