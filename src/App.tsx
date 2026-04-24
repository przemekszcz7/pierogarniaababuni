/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Facebook, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  Star,
  Info,
  UtensilsCrossed,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MENU = {
  zupy: [
    { name: "Koperkowa", price: "12 zł" },
    { name: "Botwinka z ziemniakami", price: "16 zł" },
    { name: "Rosół", price: "12 zł" },
    { name: "Pielmieni w rosole", price: "16 zł" },
    { name: "Barszcz z uszkami", price: "16 zł" },
    { name: "Barszcz w kubku", price: "7 zł" },
  ],
  dzisiaj: [
    { name: "Placek po węgiersku", price: "32 zł" },
    { name: "Roladka drobiowa ze szparagami, ziemniaki, bukiet surówek", price: "42 zł" },
    { name: "Mięsko z udka kurczaka z mini marchewką, pieczarkami, szparagami i groszkiem, ziemniaki", price: "35 zł" },
    { name: "Karkówka, kluski śląskie, bukiet surówek", price: "36 zł" },
    { name: "De Volaille, frytki, bukiet surówek", price: "38 zł" },
    { name: "Sznycel z indyka z jajkiem sadzonym, ziemniaki, bukiet surówek", price: "40 zł" },
    { name: "Filet z kurczaka, ziemniaki, mizeria lub bukiet surówek", price: "33 zł" },
    { name: "Kotlet schabowy, ziemniaki, bukiet surówek", price: "33 zł" },
    { name: "Schabowy z jajkiem, ziemniaki, bukiet surówek", price: "36 zł" },
    { name: "Kotlety mielone 2szt., ziemniaki, buraczki zasmażane", price: "29 zł" },
    { name: "Kalafior, ziemniaki, jajka sadzone", price: "26 zł" },
    { name: "Sałata ze śmietaną, ziemniaki, jajka sadzone", price: "23 zł" },
    { name: "Kopytka, sos pieczarkowy, bukiet surówek", price: "23 zł" },
    { name: "Smażony camembert z żurawiną, frytki, bukiet surówek", price: "32 zł" },
    { name: "Kluski leniwe", price: "18 zł" },
    { name: "Pyzy z mięsem, bukiet surówek", price: "29 zł" },
  ],
  pierogi_porcja: [
    { name: "Pierogi z truskawkami", price: "28.00 zł" },
    { name: "Pierogi ruskie z okrasą", price: "24.00 zł" },
    { name: "Pierogi babuni z okrasą", price: "25.00 zł" },
    { name: "Pierogi ze szpinakiem", price: "26.00 zł" },
    { name: "Pierogi z kapustą", price: "26.00 zł" },
    { name: "Pierogi z mięsem z okrasą", price: "28.00 zł" },
    { name: "Pierogi pieczarka mozarella zapiekane", price: "28.00 zł" },
    { name: "Pierogi z serem na słodko i słodką śmietaną", price: "26.00 zł" },
  ],
  pierogi_waga: [
    { name: "Ruskie", price: "46 zł / kg" },
    { name: "Babuni", price: "47 zł / kg" },
    { name: "Z mięsem", price: "50 zł / kg" },
    { name: "Z kapustą", price: "48 zł / kg" },
    { name: "Ze szpinakiem", price: "48 zł / kg" },
    { name: "Z serem na słodko", price: "48 zł / kg" },
    { name: "Z owocami", price: "60 zł / kg" },
  ],
  nalesniki: [
    { name: "Z białym serem na słodko", price: "22 zł" },
    { name: "Z dżemem truskawkowym", price: "20 zł" },
    { name: "Z dżemem jabłkowym", price: "20 zł" },
    { name: "Z nutellą", price: "22 zł" },
    { name: "A la ruskie, sos czosnkowy", price: "23 zł" },
    { name: "Ze szpinakiem, sos czosnkowy", price: "25 zł" },
  ],
  pozostale: [
    { name: "Makaron świderki z pulpecikami w sosie pomidorowym", price: "28 zł" },
  ],
  dzieci: [
    { name: "Filecik z kurczaka, ziemniaki, surówka", price: "22 zł" },
    { name: "Nugetsy, fryteczki, suróweczka", price: "22 zł" },
  ]
};

const EXTRA_FEES = [
  { label: "Opakowanie duże (2 danie)", price: "2 zł" },
  { label: "Opakowanie na wynos (zupa, krokiety, surówka)", price: "1.50 zł" },
  { label: "Kubek kawa, kompot", price: "0.35 gr" },
  { label: "Reklamówka", price: "0.50 gr" },
];

const IMAGES = [
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/671699185_1537839018345561_1196486744041549567_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6lUL4PTHiaYQ7kNvwEMzPfh&_nc_oc=Adro9n3BA6mFzkAeiPUEMIibhoSisSGUJMoPWRsjjF_eoEfx3PX3d-WJg0DPg-VM4pA&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=qraQz3lXA3TWQm_wo7IctA&oh=00_Af2QaZxZbtWrUg_RcrSmmHS1nAe5SBmUhniEYQhdjaJ_7g&oe=69F0E8FC",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/677670717_1541316864664443_6311515983462460200_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=u-mZKiQaljgQ7kNvwHFWrYJ&_nc_oc=AdrE6Rl9PbSuKZuBdmNbH4a3H9J5RkmuOEMJrr4G_qOb1U-EfJXk0u1AWTEByCgJLjs&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=Ev2nBdPsDLYgUCGoYG9heA&oh=00_Af2vwVGWvJWmNTfwihAhVb91SbLjmIGgr0kd38f046x_iQ&oe=69F0EE7C",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/677875891_1541316931331103_1237899960685730543_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=EfOD1wE1P50Q7kNvwG5CQlu&_nc_oc=Ado1CTYXV3JV4TLXudvma_hAZZyfoE41g4ctkplozGgJYPL-OoLz_5wT5PItA6xlq3Q&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=tugoAN6Fdyu-vxGoxTiH8w&oh=00_Af3F8ZVfWAxIbUIvLQETRGKH6rORgA93RGcPFFv34sVvRA&oe=69F11441",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/676057418_1541316924664437_2672087480610181680_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ZEdDa1yt7aYQ7kNvwE7a3tC&_nc_oc=AdoYUz5b2K7aaZ2e_g18Aaj0zVFrjYTECfQf8JqmXiHz9HEa6vEUZ8htY7rp1VLzdg8&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=hjfljjU_E7CAy1xdAhqIgQ&oh=00_Af2SixgURm2Mh0r8KclWUNXqH-eNxrG5vSap-npUw06c2w&oe=69F10528",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/662608692_1529028185893311_6103404183847844695_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=xydHXDsS5ZcQ7kNvwHfZoSk&_nc_oc=AdrAKgtugGGorT55pr6vvEBImmM_iR1CHARiwbScDNHeKEL4tm0T9gU3VMygzUpp5BA&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=xbatadU4IFAC9JeWJW-Dww&oh=00_Af04jdm731Q-Ak3mPDCSDay8CE4bTzy91g9VpJzqGGxQJg&oe=69F10247"
];

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-4 mb-10 group">
    <div className="relative">
      <div className="absolute -inset-2 bg-rose-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
      {Icon ? <Icon className="w-10 h-10 text-rose-800 relative z-10" /> : <Star className="w-8 h-8 text-rose-800 relative z-10" />}
    </div>
    <div className="flex-grow">
      <h2 className="text-4xl font-serif font-black text-gray-900 leading-tight">
        {children}
      </h2>
      <div className="h-1 w-full bg-rose-100 mt-2 relative overflow-hidden rounded-full">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-rose-800"
        />
      </div>
    </div>
  </div>
);

const MenuItem = ({ name, price }: any) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white/40 hover:bg-white p-4 rounded-xl border border-transparent hover:border-rose-100 hover:shadow-md transition-all group flex justify-between items-center"
  >
    <div className="flex flex-col">
      <span className="text-gray-800 font-bold group-hover:text-rose-800 transition-colors uppercase text-sm tracking-widest">{name}</span>
      <div className="w-12 h-0.5 bg-rose-50 group-hover:w-24 transition-all duration-500 mt-1" />
    </div>
    <div className="flex flex-col items-end">
      <span className="text-rose-900 font-black text-lg font-serif">{price}</span>
    </div>
  </motion.div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fdfcf8] font-body text-gray-900 overflow-x-hidden paper-texture">
      {/* Decorative Top Bar - Tablecloth pattern */}
      <div className="h-6 bg-rose-800 w-full checkered shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/fabric-plaid.png')]" />
      </div>

      {/* Header / Hero Section */}
      <header className="relative bg-white/60 backdrop-blur-sm border-b border-rose-100 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center md:text-left relative"
          >
            <div className="mb-6">
              <span className="font-script text-3xl text-rose-800 block mb-2">Zapraszamy na obiady domowe</span>
              <div className="h-0.5 w-24 bg-rose-200 mx-auto md:mx-0" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-black text-gray-900 mb-6 leading-tight">
              Pierogarnia <br/>
              <span className="text-rose-800 font-script text-7xl md:text-9xl drop-shadow-sm">Babuni</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-body italic">
              "U nas zjesz tak pysznie, jak u swojej babci na wakacjach. Codziennie lepimy dla Was świeże pierogi z sercem i tradycją."
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/pierogarnia.babuni" 
                target="_blank" 
                rel="no-referrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md"
              >
                <Facebook className="w-5 h-5" />
                Nasz Facebook
              </a>
              <a 
                href="#menu" 
                className="flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Zobacz Menu
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 w-full max-w-md relative"
          >
            <div className="absolute -inset-4 border-2 border-rose-200 rounded-2xl rotate-3 pointer-events-none" />
            <img 
              src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAG3Ojtg2xRpZhAXCvSd_LDo2gaV3ZIVSvyqL6GJ2d800fDKV8_r0VwhKZbpJ32mm-wurt11GktZvFzN7vdOEvzM2gkyBfrbH8QHHp0bShMVnE_oDTdMprtzquzBB5TtSVbzgJXmkQ=s680-w680-h510" 
              alt="Pierogi Babuni" 
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-video md:aspect-[4/5]"
            />
          </motion.div>
        </div>
      </header>

      {/* Daily Specials Banner - Checkered Background */}
      <section className="bg-white py-12 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-4 bg-rose-800/10 checkered" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-rose-800/10 checkered rotate-180" />
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-800 rounded-full animate-pulse opacity-20" />
              <div className="p-5 bg-rose-800 text-white rounded-full relative shadow-lg">
                <UtensilsCrossed className="w-10 h-10" />
              </div>
            </div>
            <div>
              <p className="text-rose-800 font-script text-2xl mb-1">Dzisiaj szczególnie polecamy:</p>
              <h3 className="text-4xl font-serif font-black text-gray-900 tracking-tight">Tradycyjny Rosół & Placki po Węgiersku</h3>
            </div>
          </div>
          <div className="flex gap-6">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-center px-8 py-4 bg-white rounded-2xl border-2 border-rose-800 shadow-xl relative overflow-hidden group"
             >
               <div className="absolute inset-0 bg-rose-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-5" />
               <div className="flex items-baseline justify-center gap-1 relative z-10">
                 <span className="text-4xl font-serif font-black text-rose-800">12</span>
                 <span className="text-lg font-bold text-rose-800/60 font-serif">zł</span>
               </div>
               <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-black mt-1">Sycący Rosół</span>
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-center px-8 py-4 bg-white rounded-2xl border-2 border-rose-800 shadow-xl relative overflow-hidden group"
             >
               <div className="absolute inset-0 bg-rose-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-5" />
               <div className="flex items-baseline justify-center gap-1 relative z-10">
                 <span className="text-4xl font-serif font-black text-rose-800">32</span>
                 <span className="text-lg font-bold text-rose-800/60 font-serif">zł</span>
               </div>
               <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-black mt-1">Placek po Węg.</span>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Recommendations & Reels Section */}
      <section className="bg-stone-100/30 py-24 border-y border-stone-200 relative overflow-hidden paper-texture">
        {/* Subtle decorative elements - Grid/Tablecloth accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-800/5 rotate-12 -translate-y-1/2 translate-x-1/2 checkered" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-800/5 -rotate-12 translate-y-1/2 -translate-x-1/3 checkered" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
               <span className="font-script text-3xl text-rose-800 block mb-4">Głos naszych gości</span>
               <h2 className="text-5xl md:text-6xl font-serif font-black text-gray-900 leading-tight">
                 Lokal Polecany przez <br/>
                 <span className="text-rose-800 relative inline-block">
                   Wrocławian
                   <svg className="absolute -bottom-2 left-0 w-full h-3 text-rose-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                   </svg>
                 </span>
               </h2>
            </div>
            
            <div className="space-y-6 text-xl text-stone-600 leading-relaxed font-body">
              <p>
                Nasza kuchnia to nie tylko jedzenie - to wspomnienia. Każdy pieróg lepiony jest tak, jak uczyły nas nasze mamy i babcie. 
              </p>
              <div className="relative p-10 bg-white shadow-xl rounded-br-[4rem] rounded-tl-[4rem] border-l-8 border-rose-800 transform -rotate-1">
                <Quote className="absolute top-4 right-6 w-12 h-12 text-rose-50" />
                <p className="italic text-gray-800 relative z-10 font-medium">
                  "Jesteśmy dumni, że możemy karmić Wrocławian już od tylu lat. Każdy uśmiech zadowolonego gościa to dla nas największa nagroda."
                </p>
                <p className="mt-4 font-script text-2xl text-rose-800">— Załoga Pierogarni</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm"
              >
                <div className="text-4xl font-serif font-black text-rose-800 mb-1">100%</div>
                <div className="text-[10px] uppercase font-black text-stone-400 tracking-widest">Naturalne składniki</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm"
              >
                <div className="text-4xl font-serif font-black text-rose-800 mb-1">4.8/5</div>
                <div className="text-[10px] uppercase font-black text-stone-400 tracking-widest">Średnia Ocena Gości</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* Elegant frame container */}
            <div className="relative group">
              <div className="absolute -inset-4 border border-rose-200 rounded-[2.5rem] rotate-2 transition-transform group-hover:rotate-0 duration-500" />
              <div className="absolute -inset-4 border border-stone-300 rounded-[2.5rem] -rotate-1 transition-transform group-hover:rotate-0 duration-500" />
              
              <div className="relative z-10 bg-black rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] aspect-[9/16] w-[280px] md:w-[320px] border-8 border-stone-100 flex items-center justify-center">
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F27140685812202259%2F&show_text=false&width=267&t=0" 
                  style={{ 
                    border: "none", 
                    overflow: "hidden", 
                    width: "100%", 
                    height: "100%",
                    transform: "scale(1.02)", /* Slightly scale up to hide any thin border gaps from FB plugin */
                    transformOrigin: "center"
                  }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-5 rounded-2xl shadow-2xl border border-stone-100 z-20 max-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-inner">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight text-gray-400">Facebook Reels</span>
                </div>
                <p className="text-sm font-bold text-gray-900 leading-tight">Obserwuj nasze kulinarne nowości!</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Menu */}
        <div className="lg:col-span-2 space-y-16" id="menu">
          
          <section>
            <SectionTitle icon={UtensilsCrossed}>Dzisiejsze Menu</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {MENU.dzisiaj.map((item, idx) => (
                <MenuItem key={idx} name={item.name} price={item.price} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={Info}>Zupy</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {MENU.zupy.map((item, idx) => (
                <MenuItem key={idx} name={item.name} price={item.price} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={Info}>Pierogi (Porcja)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {MENU.pierogi_porcja.map((item, idx) => (
                <MenuItem key={idx} name={item.name} price={item.price} />
              ))}
            </div>
          </section>

          <section className="bg-stone-100 p-8 rounded-2xl border border-stone-200">
            <SectionTitle icon={Info}>Pierogi na wagę</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {MENU.pierogi_waga.map((item, idx) => (
                <MenuItem key={idx} name={item.name} price={item.price} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <SectionTitle>Naleśniki</SectionTitle>
              <div className="space-y-2">
                {MENU.nalesniki.map((item, idx) => (
                  <MenuItem key={idx} name={item.name} price={item.price} />
                ))}
              </div>
            </section>
            <section>
                <SectionTitle>Dla Dzieci</SectionTitle>
                <div className="space-y-2 mb-8">
                  {MENU.dzieci.map((item, idx) => (
                    <MenuItem key={idx} name={item.name} price={item.price} />
                  ))}
                </div>
                <SectionTitle>Pozostałe</SectionTitle>
                <div className="space-y-2">
                  {MENU.pozostale.map((item, idx) => (
                    <MenuItem key={idx} name={item.name} price={item.price} />
                  ))}
                </div>
            </section>
          </div>

          {/* Pricing Info */}
          <section className="p-8 bg-rose-50 rounded-2xl border border-rose-100">
            <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Opakowania i dodatki
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXTRA_FEES.map((fee, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm font-medium text-rose-800">
                  <span>{fee.label}</span>
                  <span className="font-bold">{fee.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Info & Map */}
        <aside className="space-y-12">
          
          {/* Contact Details */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-stone-200 sticky top-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-800/10 checkered rounded-bl-full" />
            <h3 className="text-3xl font-serif font-black mb-10 text-gray-900 flex items-center gap-3">
              <Info className="text-rose-800" />
              Zapraszamy!
            </h3>
            
            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-rose-800 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">Tu nas znajdziesz</p>
                  <p className="text-lg text-gray-600 leading-tight">ul. Komuny Paryskiej 96</p>
                  <p className="text-gray-600">Wrocław 50-452</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <Phone className="w-6 h-6 text-rose-800 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">Zadzwoń do nas</p>
                  <a href="tel:713973876" className="text-2xl font-serif font-bold text-rose-800 hover:text-rose-900 transition-colors">71 397 38 76</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <Clock className="w-6 h-6 text-rose-800 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-1">Kiedy otwarte</p>
                  <p className="text-lg text-gray-600">Pon. - Pt.: 9:00 - 17:00</p>
                  <p className="text-gray-400 text-sm mt-1">W soboty i niedziele odpoczywamy</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 space-y-4">
              <a 
                href="https://www.facebook.com/pierogarnia.babuni/reviews/?id=100063584319607&sk=reviews"
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-between w-full p-4 bg-yellow-50 text-yellow-800 rounded-xl hover:bg-yellow-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">Opinie gości</span>
                </div>
                <ChevronDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-80 bg-gray-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.505753477808!2d17.049213912816192!3d51.09912827160541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc27d58ed77a5%3A0xc787b891d085da3e!2sPierogarnia%20Babuni!5e0!3m2!1spl!2spl!4v1777020810065!5m2!1spl!2spl" 
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Testimonial Placeholder */}
          <div className="p-8 bg-white rounded-2xl border border-gray-100 relative overflow-hidden">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 z-0" />
            <p className="italic text-gray-600 relative z-10 leading-relaxed">
              "Najlepsze pierogi jakie jadłam od lat! Smakują jak u babci na wsi. Polecam każdemu, kto tęskni za prawdziwym polskim obiadem."
            </p>
            <div className="mt-4 flex items-center gap-1 text-yellow-500 relative z-10">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
        </aside>
      </main>

      {/* Image Gallery */}
      <section className="bg-stone-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 checkered" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
             <span className="font-script text-4xl text-rose-400 block mb-4">Uwiecznione smaki</span>
             <h2 className="text-5xl md:text-7xl font-serif font-black mb-4">Galeria Babuni</h2>
             <div className="h-1.5 w-32 bg-rose-800 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {IMAGES.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 1 : -1 }}
                className={`overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10 aspect-square ${
                  idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <img src={img} alt={`Smaki Babuni ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-2 bg-rose-800 checkered opacity-30" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 relative z-10">
          <div className="space-y-8">
            <h4 className="text-4xl font-serif font-black text-white italic">
              Pierogarnia <span className="text-rose-500 font-script text-5xl">Babuni</span>
            </h4>
            <p className="text-stone-400 max-w-sm leading-relaxed font-body">
              Domowa kuchnia to nasza pasja. Zapraszamy Cię do świata smaków, które znasz i kochasz. Każdy kęs to powrót do beztroskich chwil dzieciństwa.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/pierogarnia.babuni" className="p-3 bg-white/5 rounded-full hover:bg-rose-800 transition-colors text-white">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-serif text-xl font-bold mb-10 text-white flex items-center gap-2">
              <div className="w-8 h-px bg-rose-800" />
              Nawigacja
            </h5>
            <ul className="space-y-6">
              <li><a href="#" className="hover:text-rose-400 transition-all hover:pl-2">Początek strony</a></li>
              <li><a href="#menu" className="hover:text-rose-400 transition-all hover:pl-2">Nasze Menu</a></li>
              <li><a href="https://www.facebook.com/pierogarnia.babuni/reviews" className="hover:text-rose-400 transition-all hover:pl-2">Opinie Gości</a></li>
            </ul>
          </div>

          <div>
              <h5 className="font-serif text-xl font-bold mb-10 text-white flex items-center gap-2">
                <div className="w-8 h-px bg-rose-800" />
                Kontakt
              </h5>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 group">
                   <div className="p-2 bg-rose-800/20 rounded-lg group-hover:bg-rose-800/40 transition-colors">
                    <MapPin className="w-5 h-5 text-rose-500" />
                   </div>
                   Komuny Paryskiej 96, Wrocław
                 </div>
                 <div className="flex items-center gap-4 group">
                   <div className="p-2 bg-rose-800/20 rounded-lg group-hover:bg-rose-800/40 transition-colors">
                    <Phone className="w-5 h-5 text-rose-500" />
                   </div>
                   71 397 38 76
                 </div>
                 <div className="pt-6">
                    <div className="inline-block p-4 bg-stone-800 rounded-2xl border border-stone-700">
                      <p className="text-xs uppercase tracking-widest font-black text-stone-500 mb-2">Zapraszamy w godzinach</p>
                      <p className="text-white font-serif italic text-lg">Poniedziałek — Piątek <br/> 09:00 - 17:00</p>
                    </div>
                 </div>
              </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm">
          <p>© {new Date().getFullYear()} Pierogarnia Babuni. Tradycja smaku od lat.</p>
          <p className="font-script text-xl text-stone-600">Z miłością do jedzenia...</p>
        </div>
      </footer>
    </div>
  );
}
