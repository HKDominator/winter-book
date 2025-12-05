import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, Sparkles, Heart, Music, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- COMPONENTS ---

// 1. Optimized Snow Component (Memoized to prevent flickering)
const Snowflakes = React.memo(() => {
  // Use state and effect to generate snowflakes on client-side only
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Wrap in setTimeout to avoid "synchronous setState in effect" warning
    const timer = setTimeout(() => {
      const generatedSnowflakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 5 + 5, 
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 0.5 + 0.5 
      }));
      setSnowflakes(generatedSnowflakes);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `-${flake.animationDelay}s`, // Negative delay starts animation immediately
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0px); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
});

// --- PAGES ---

// Page 0: Cover
const CoverPage = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative z-10">
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="mb-8 relative"
    >
      <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
      <Sparkles className="w-20 h-20 text-yellow-200 relative z-10" />
    </motion.div>
    
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-100 mb-4 font-display drop-shadow-lg">
      Cartea lui Cărluț
    </h1>
    
    <h2 className="text-2xl md:text-3xl text-pink-200/80 mb-12 font-serif italic">
      O poveste de iarnă
    </h2>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full text-xl font-serif shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:bg-white/20 hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]"
    >
      <span className="relative z-10 flex items-center gap-2">
        Deschide Cartea <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
      </span>
    </motion.button>
    
    <p className="absolute bottom-10 text-white/40 text-sm font-serif animate-pulse">
      (Te rog să pornești sunetul 🔊)
    </p>
  </div>
);

// Page 1: Our Story
const StoryPage = () => {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Fill the heart over 2 seconds
    const interval = setInterval(() => {
      setFill(prev => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24 text-center">
      <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full">
        <h2 className="text-4xl text-white mb-6 font-display">Povestea Noastră</h2>
        <div className="text-lg md:text-xl text-gray-200 font-serif leading-relaxed space-y-4 mb-8 text-center">
          <p>A fost odată ca niciodată o prințesă uimitoare, ce trăia într-un castel fermecat și asculta BTS.</p>
          <p>Într-o zi a apărut la curtea palatului un prinț înfumurat, fără scop și fără direcție.</p>
          <p>Printr-un miracol neașteptat, prințesa s-a îndrăgostit de prinț.</p>
          <p>De atunci, cei doi au rămas nedespărțiți, trăind fericiți împreună până la adânci bătrâneți.</p>
        </div>
        
        {/* SVG Heart Animation */}
        <div className="relative w-32 h-32 mx-auto">
          <Heart className="w-full h-full text-white/10 absolute inset-0" strokeWidth={1} />
          <div className="absolute inset-0 overflow-hidden" style={{ height: `${fill}%`, transition: 'height 0.1s linear' }}>
             <Heart className="w-full h-full text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" fill="currentColor" strokeWidth={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page 2: Little Things
const LittleThingsPage = () => {
  const items = [
    { text: "Cele o mie de personalități 😍", color: "from-pink-500/20 to-rose-500/20" },
    { text: "Inima ta mare și plină de iubire ❤️", color: "from-purple-500/20 to-indigo-500/20" },
    { text: "Afecțiunea ta nemărginită pentru toată lumea 🤗", color: "from-blue-500/20 to-cyan-500/20" },
    { text: "Că ești cea mai bună prietenă a mea 👯", color: "from-emerald-500/20 to-teal-500/20" },
    { text: "Că ești pur și simplu TU ✨", color: "from-amber-500/20 to-orange-500/20 border-amber-500/30" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24">
      <h2 className="text-3xl md:text-4xl text-white mb-8 font-display drop-shadow-md">Lucruri mici ce te fac de neînlocuit</h2>
      <div className="w-full max-w-md space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
            className={`p-4 rounded-xl border border-white/5 bg-gradient-to-r ${item.color} backdrop-blur-md text-white font-serif text-lg shadow-sm`}
          >
            {item.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Page 3: The Star
const StarPage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent navigation
    if (!clicked) {
      setClicked(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#ffffff']
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24 text-center">
      <h2 className="text-3xl text-white mb-12 font-display">
        {clicked ? "Dorința s-a îndeplinit ✨" : "Pune-ți o dorință..."}
      </h2>
      
      <AnimatePresence mode="wait">
        {!clicked ? (
          <motion.button
            key="star-btn"
            onClick={handleClick}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ["drop-shadow(0 0 10px rgba(250,204,21,0.3))", "drop-shadow(0 0 30px rgba(250,204,21,0.8))", "drop-shadow(0 0 10px rgba(250,204,21,0.3))"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer relative z-50" // ADDED z-50 to fix tap issue
          >
            <Star className="w-40 h-40 text-yellow-300 fill-yellow-300/20" strokeWidth={1} />
          </motion.button>
        ) : (
          <motion.div
            key="star-msg"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-8 rounded-3xl max-w-sm"
          >
            <p className="text-2xl text-yellow-100 font-serif italic">
              "Mi-ai luminat viața mai frumos decât orice stea de pe cer."
            </p>
            <div className="mt-4 text-sm text-yellow-200/60 uppercase tracking-widest">Te Iubesc</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Page 4: The Code
const CodePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24">
    <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      {/* Fake Mac Toolbar */}
      <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-gray-400 font-mono">love_logic.js</span>
      </div>
      
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm md:text-base leading-relaxed">
          <code className="block">
            <span className="text-pink-400">const</span> <span className="text-blue-300">couple</span> = &#123;{'\n'}
            {'  '}him: <span className="text-green-300">"Andrei"</span>,{'\n'}
            {'  '}her: <span className="text-green-300">"Carla"</span>,{'\n'}
            {'  '}status: <span className="text-green-300">"Happily in Love"</span>,{'\n'}
            {'  '}years: <span className="text-orange-300">Almost 5</span>{'\n'}
            &#125;;{'\n\n'}

            <span className="text-pink-400">while</span> (<span className="text-blue-300">true</span>) &#123;{'\n'}
            {'  '}couple.<span className="text-yellow-300">love</span>();{'\n'}
            {'  '}couple.<span className="text-yellow-300">supportEachOther</span>();{'\n'}
            {'  '}<span className="text-gray-500">// Nu există funcție de break</span>{'\n'}
            &#125;
          </code>
        </pre>
      </div>
    </div>
    <p className="mt-6 text-gray-400 font-serif italic">Singurul cod fără bug-uri.</p>
  </div>
);

// Page 5: Final
const FinalPage = () => {
  const triggerHug = (e) => {
    e.stopPropagation(); 
    confetti({
      particleCount: 300,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#ffffff'],
      ticks: 200
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <h2 className="text-5xl font-display text-white mb-8">Cadoul Meu</h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-[0_0_40px_rgba(236,72,153,0.2)] mb-8">
          <p className="text-xl text-pink-100 font-serif mb-6">
            Cadoul meu de Moș Nicolae pentru tine nu este un obiect material, ci o promisiune din adâncul inimii mele.
          </p>
          <p className="text-3xl font-bold text-white mb-2">Iubirea mea.</p>
          <p className="text-lg text-pink-200/80 mb-6">(Și cizmele alea noi 😉)</p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6"></div>
          
          <p className="text-lg text-white font-serif">
            Te iubesc azi, te voi iubi mâine și te voi iubi pentru totdeauna.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerHug}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-5 rounded-2xl text-xl font-bold shadow-lg shadow-rose-500/40 flex items-center justify-center gap-3 relative z-50" // ADDED relative z-50
        >
          <Heart className="fill-white w-6 h-6" /> Îmbrățișare Virtuală
        </motion.button>
      </motion.div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [page, setPage] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const advancePage = (startAudio = false) => {
    if (startAudio && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(e => console.log("Audio block", e));
    }
    if (page < 5) setPage(p => p + 1);
  };

  const goBack = () => {
    if (page > 1) setPage(p => p - 1); 
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (audioPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setAudioPlaying(!audioPlaying);
    }
  };

  const pages = [
    { component: <CoverPage onStart={() => advancePage(true)} />, bg: "from-slate-900 via-purple-950 to-slate-900" },
    { component: <StoryPage />, bg: "from-indigo-950 via-slate-900 to-black" },
    { component: <LittleThingsPage />, bg: "from-slate-900 via-rose-950 to-slate-900" },
    { component: <StarPage />, bg: "from-slate-900 via-blue-950 to-slate-900" },
    { component: <CodePage />, bg: "from-gray-900 via-black to-gray-900" },
    { component: <FinalPage />, bg: "from-rose-950 via-slate-900 to-black" }
  ];

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-1000 bg-gradient-to-br ${pages[page].bg}`}>
      
      {/* 1. AUDIO ELEMENT */}
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* 2. BACKGROUND LAYERS */}
      <Snowflakes />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* 3. CONTENT AREA (AnimatePresence) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 100, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: -100, rotate: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute inset-0 w-full h-full"
        >
          {pages[page].component}
        </motion.div>
      </AnimatePresence>

      {/* 4. NAVIGATION CONTROLS */}
      {page > 0 && (
        <>
          {/* Audio Toggle */}
          <button 
            onClick={toggleAudio}
            className="fixed top-6 right-6 z-50 text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            {audioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Progress Dots */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-3 z-50 pointer-events-none">
            {pages.slice(1).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i + 1 === page ? "w-8 bg-white" : "w-2 bg-white/30"}`} 
              />
            ))}
          </div>

          {/* TAP ZONES (Instagram style) */}
          <div className="fixed inset-0 z-40 flex">
            <div className="w-1/3 h-full" onClick={goBack} />
            <div className="w-2/3 h-full cursor-pointer" onClick={() => advancePage(false)} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;