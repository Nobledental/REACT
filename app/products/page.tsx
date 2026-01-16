'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Info, X, CheckCircle2, 
  Trash2, Plus, Minus, Lock, Phone, ArrowRight, HelpCircle, ListChecks, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { nobleProducts, ProductData } from '@/data/products';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import BookingModal from '@/components/BookingModal';

// Styles for the 3D card effect
const effectStyles = `
  .product-3d-card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    perspective: 2500px;
    height: 320px;
    width: 100%;
    border-radius: 2rem;
    overflow: visible;
  }

  .product-3d-wrapper {
    transition: all 0.5s;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 2rem;
    overflow: hidden;
  }

  .product-3d-card:hover .product-3d-wrapper {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.4);
  }

  .product-3d-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-3d-wrapper::after {
    content: "";
    opacity: 1;
    width: 100%;
    height: 120px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    background-image: linear-gradient(to bottom, transparent 46%, rgba(12, 13, 19, 0.4) 68%, rgba(12, 13, 19, 0.8) 97%);
  }

  .product-3d-title {
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.5s;
    z-index: 3;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
    pointer-events: none;
  }

  .product-3d-card:hover .product-3d-title {
    transform: translate(-50%, -100px) translate3d(0%, 0, 100px);
  }

  .product-3d-character {
    width: 75%;
    height: 85%;
    object-fit: contain;
    opacity: 0;
    transition: all 0.5s;
    position: absolute;
    z-index: 4;
    bottom: 0;
    pointer-events: none;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
  }

  .product-3d-card:hover .product-3d-character {
    opacity: 1;
    transform: translate3d(0%, -15%, 150px) scale(1.3);
  }
`;

interface CartItem extends ProductData {
  quantity: number;
}

export default function ProductsPage() {
  const [inventory] = useState<ProductData[]>(nobleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredProducts = inventory.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory.toLowerCase();
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return catMatch && searchMatch;
  });

  const addToCart = (product: ProductData) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.clinicPrice * item.quantity), 0);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans transition-colors duration-500">
      <style jsx global>{effectStyles}</style>
      
      <div className="max-w-7xl mx-auto px-6">
        
        <header className="mb-12 flex justify-between items-end">
           <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Pharmacy Kit.</h2>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-1">Group Pharma Official Link</p>
           </div>
           <div className="flex gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 transition-colors">
                 <ShoppingBag size={24}/>
                 {cart.length > 0 && <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">{cart.length}</span>}
              </button>
           </div>
        </header>

        <div className="sticky top-20 z-[40] bg-[#F8FAFC]/80 dark:bg-[#020617]/80 backdrop-blur-xl py-6 flex flex-col md:flex-row gap-4 mb-12 border-b border-slate-200 dark:border-white/5">
           <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Group Pharma (Enafix, Shy-NM, Rexidine)..."
                className="w-full bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[2rem] py-4 pl-16 pr-8 text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-600/10 outline-none transition-all dark:text-white"
              />
           </div>
           <div className="flex overflow-x-auto gap-2 no-scrollbar">
             {['All', 'Dental', 'Wellness', 'Preventive', 'Ortho'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 hover:border-blue-500'}`}>{cat}</button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <RevealOnScroll key={product.id}>
               <div className="bg-white dark:bg-[#151b2b] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative overflow-visible">
                  
                  <div className="product-3d-card cursor-pointer" onClick={() => setSelectedProduct(product)}>
                     <div className="product-3d-wrapper">
                        <img src={product.bgImage} className="product-3d-cover" alt="bg" />
                     </div>
                     <img src={product.titleImage} className="product-3d-title" alt="brand" />
                     <img src={product.image} className="product-3d-character" alt={product.name} />
                     
                     <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                        {product.badges.map(b => (
                           <span key={b} className="px-3 py-1 bg-white/90 dark:bg-black/70 rounded-lg text-[8px] font-black uppercase shadow-md dark:text-white">{b}</span>
                        ))}
                     </div>
                  </div>

                  <div className="p-8 pt-6 flex flex-col flex-1">
                     <span className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest mb-1">{product.brand}</span>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{product.name}</h3>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 line-clamp-2">{product.subText}</p>
                     
                     <div className="mt-auto flex items-center justify-between">
                        <div>
                           <div className="text-2xl font-black dark:text-white">₹{product.clinicPrice}</div>
                           <p className="text-[9px] font-bold text-green-500 uppercase">Save ₹{product.saving}</p>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} className="w-10 h-10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white rounded-xl flex items-center justify-center transition-all hover:bg-slate-200">
                             <Info size={18} />
                           </button>
                           <button onClick={() => addToCart(product)} className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                              <Plus size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Product Detail Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
           <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setSelectedProduct(null)}></div>
           
           <div className="relative w-full max-w-6xl bg-white dark:bg-[#0B1019] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-500 flex flex-col lg:flex-row max-h-[90vh]">
              {/* Left Side */}
              <div className="lg:w-2/5 relative h-64 lg:h-auto bg-slate-50 dark:bg-black/20 flex items-center justify-center p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/5">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                 <img src={selectedProduct.image} alt={selectedProduct.name} className="relative z-10 w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform duration-700" />
                 
                 <div className="absolute bottom-8 left-8 right-8 flex justify-around items-center bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-4">
                    <div className="text-center">
                       <p className="text-[8px] font-black uppercase text-slate-400">MRP</p>
                       <p className="text-sm font-bold text-slate-400 line-through">₹{selectedProduct.mrp}</p>
                    </div>
                    <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
                    <div className="text-center">
                       <p className="text-[8px] font-black uppercase text-blue-600 dark:text-cyan-400">Clinic Price</p>
                       <p className="text-xl font-black text-slate-900 dark:text-white">₹{selectedProduct.clinicPrice}</p>
                    </div>
                 </div>
              </div>

              {/* Right Side */}
              <div className="lg:w-3/5 p-8 sm:p-12 md:p-16 overflow-y-auto no-scrollbar">
                 <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-full transition-all group z-50">
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                 </button>

                 <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                       <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{selectedProduct.category}</span>
                       <span className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedProduct.brand}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-4">{selectedProduct.name}</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium italic">{selectedProduct.subText}</p>
                 </header>

                 <div className="grid md:grid-cols-2 gap-10 mb-12">
                    <section>
                       <h4 className="text-[10px] font-black uppercase text-blue-600 dark:text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2"><HelpCircle size={14} /> Clinical Indications</h4>
                       <ul className="space-y-3">
                          {selectedProduct.indications.map((ind, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                                <CheckCircle2 size={16} className="text-green-500" /> {ind}
                             </li>
                          ))}
                       </ul>
                    </section>
                    <section>
                       <h4 className="text-[10px] font-black uppercase text-blue-600 dark:text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2"><ListChecks size={14} /> How to Use</h4>
                       <ul className="space-y-3">
                          {selectedProduct.usage.map((step, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 leading-snug">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></div> {step}
                             </li>
                          ))}
                       </ul>
                    </section>
                 </div>

                 {/* Actions */}
                 <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-500/40 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                       Add to Prescription Cart <ArrowRight size={18} />
                    </button>
                    <button onClick={() => setIsBookingModalOpen(true)} className="flex-1 py-5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                       <Phone size={16} /> Free Tele-Consult
                    </button>
                 </div>
                 <p className="mt-8 text-center text-[10px] font-bold uppercase text-slate-400 tracking-[0.3em]">Official Group Pharma Clinical Product</p>
              </div>
           </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[1100] flex justify-end">
           <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
           <div className="relative w-full max-w-md bg-white dark:bg-[#0B1019] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <header className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-black/20">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Prescription Cart.</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cart.length} Diagnostic Items</p>
                 </div>
                 <button onClick={() => setIsCartOpen(false)} className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={24}/></button>
              </header>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                 {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                       <ShoppingBag size={64} className="mb-6" />
                       <p className="text-lg font-bold">Your kit is empty</p>
                       <button onClick={() => setIsCartOpen(false)} className="text-blue-600 font-bold mt-4">Start browsing</button>
                    </div>
                 ) : (
                    cart.map(item => (
                       <div key={item.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 group">
                          <div className="w-20 h-20 bg-white dark:bg-black/20 rounded-2xl p-2 shrink-0">
                             <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1">
                             <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{item.name}</h4>
                             <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">{item.brand}</p>
                             <div className="flex items-center justify-between">
                                <div className="flex items-center bg-white dark:bg-black/40 rounded-lg border border-slate-200 dark:border-white/10 px-2 py-1 gap-4">
                                   <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-blue-600 transition-colors"><Minus size={14}/></button>
                                   <span className="text-xs font-black dark:text-white">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-blue-600 transition-colors"><Plus size={14}/></button>
                                </div>
                                <span className="font-black text-slate-900 dark:text-white">₹{item.clinicPrice * item.quantity}</span>
                             </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors self-start"><Trash2 size={16}/></button>
                       </div>
                    ))
                 )}
              </div>

              {cart.length > 0 && (
                 <footer className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20">
                    <div className="flex justify-between items-center mb-8">
                       <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Payable</span>
                       <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{totalCart}</span>
                    </div>
                    <div className="space-y-4">
                       <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all">
                          Finalize Prescription Order
                       </button>
                       <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          <Lock size={10} /> Secure Checkout Protected by Healthflo OS
                       </p>
                    </div>
                 </footer>
              )}
           </div>
        </div>
      )}

      {/* Re-using the BookingModal for Tele-consultation */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
