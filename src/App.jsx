import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const WinterBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [starClicked, setStarClicked] = useState(false);
  const [showHug, setShowHug] = useState(false);

  // Snowflake component
  const Snowflakes = () => {
    const snowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.6 + 0.4,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white text-opacity-80"
            style={{
              left: flake.left,
              top: '-10px',
              animation: `fall ${flake.animationDuration} linear infinite`,
              animationDelay: flake.animationDelay,
              opacity: flake.opacity,
            }}
          >
            ❄
          </div>
        ))}
        <style jsx>{`
          @keyframes fall {
            to {
              transform: translateY(100vh);
            }
          }
        `}</style>
      </div>
    );
  };

  // Page 0 - Cover
  const CoverPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <Sparkles className="w-16 h-16 text-yellow-300" />
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
        The Winter Book
      </h1>
      <h2 className="text-3xl md:text-4xl text-pink-200 mb-12 font-serif italic">
        of Carla
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage(1)}
        className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Deschide Cartea ✨
      </motion.button>
      <p className="text-white text-opacity-80 mt-8 max-w-md text-lg">
        Bună, iubita mea. Moș Nicolae ți-a lăsat ceva special… ceva făcut de cineva care te iubește infinit.
      </p>
    </motion.div>
  );

  // Page 1 - Our Story
  const StoryPage = () => {
    const [heartFill, setHeartFill] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setHeartFill((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 2;
          });
        }, 30);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex flex-col items-center justify-center min-h-screen p-8"
      >
        <div className="max-w-2xl bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif text-center">
            📖 Povestea Noastră
          </h2>
          <p className="text-white text-xl leading-relaxed mb-8 text-center">
            A fost odată ca niciodată un băiat pe nume Andrei…
            <br /><br />
            Și o fată care avea cel mai frumos zâmbet din lume.
            <br /><br />
            Când s-au întâlnit, universul a știut că ei sunt destinați să fie împreună.
          </p>
          <motion.div className="flex justify-center">
            <svg width="120" height="120" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                d="M50,90 C50,90 10,60 10,35 C10,20 20,10 30,10 C40,10 45,15 50,25 C55,15 60,10 70,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z"
                fill="url(#heartGradient)"
                style={{
                  clipPath: `inset(${100 - heartFill}% 0 0 0)`,
                  transition: 'clip-path 0.1s linear',
                }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Page 2 - Little Things
  const LittleThingsPage = () => {
    const things = [
      "Felul în care râzi 😊",
      "Îmbrățișările tale calde 🤗",
      "Fața ta dimineața ☀️",
      "Glumele noastre secrete 🤫",
      "Lucrurile drăguțe pe care le faci 💕"
    ];

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex flex-col items-center justify-center min-h-screen p-8"
      >
        <div className="max-w-2xl bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-8 font-serif text-center">
            💖 Lucruri Mici Care Mă Fac Fericit
          </h2>
          <div className="space-y-4">
            {things.map((thing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white bg-opacity-20 rounded-xl p-4 text-white text-lg"
              >
                {thing}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Page 3 - Interactive Star
  const InteractiveStarPage = () => {
    const handleStarClick = () => {
      setStarClicked(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex flex-col items-center justify-center min-h-screen p-8"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl text-white mb-12 font-serif">
            {starClicked ? "" : "✨ Atinge steaua ✨"}
          </h2>
          <AnimatePresence mode="wait">
            {!starClicked ? (
              <motion.button
                key="star"
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStarClick}
                className="text-yellow-300 cursor-pointer"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-32 h-32 fill-current" />
              </motion.button>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-yellow-200 to-pink-200 rounded-3xl p-12 shadow-2xl"
              >
                <p className="text-3xl text-purple-900 font-serif italic">
                  "Mi-ai luminat viața mai frumos decât orice stea."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  // Page 4 - Code Page
  const CodePage = () => (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center min-h-screen p-8"
    >
      <div className="max-w-3xl bg-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-pink-400">
        <h2 className="text-3xl font-bold text-pink-400 mb-6 font-mono text-center">
          💻 Moș Nicolae în Script.js
        </h2>
        <pre className="text-green-400 font-mono text-sm md:text-base overflow-x-auto">
          <code>{`const love = Infinity;
const girlfriend = "Carla";
const happiness = girlfriend + " + " + love;

function mosNicolae() {
  console.log("La mulți ani de Moș Nicolae,");
  console.log("iubirea mea!");
  return "❤️".repeat(love);
}

// Running forever...
while (true) {
  mosNicolae();
}`}</code>
        </pre>
      </div>
    </motion.div>
  );

  // Page 5 - Final Gift
  const FinalPage = () => {
    const handleHug = () => {
      setShowHug(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ec4899', '#8b5cf6', '#f472b6']
      });
      setTimeout(() => setShowHug(false), 3000);
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex flex-col items-center justify-center min-h-screen p-8"
      >
        <div className="max-w-3xl text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif">
              🎁 Cadoul Tău
            </h2>
          </motion.div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-12 shadow-2xl mb-8">
            <p className="text-2xl md:text-3xl text-white leading-relaxed mb-6">
              Cadoul meu de Moș Nicolae e simplu:
            </p>
            <p className="text-3xl md:text-4xl text-pink-300 font-bold mb-6">
              iubirea mea pentru tine.
            </p>
            <div className="space-y-4 text-xl md:text-2xl text-white">
              <p>Nu expiră niciodată.</p>
              <p>Nu scade.</p>
              <p className="text-3xl text-yellow-300">Crește. ✨</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHug}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 rounded-full text-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            ❤️ Apasă pentru o îmbrățișare virtuală
          </motion.button>
          {showHug && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              className="mt-8 text-8xl"
            >
              🤗
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const pages = [
    <CoverPage />,
    <StoryPage />,
    <LittleThingsPage />,
    <InteractiveStarPage />,
    <CodePage />,
    <FinalPage />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Snowflakes />
      
      {/* Candle glow effect */}
      <div className="fixed bottom-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30 blur-3xl animate-pulse pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {pages[currentPage]}
      </AnimatePresence>

      {/* Navigation */}
      {currentPage > 0 && currentPage < pages.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="fixed bottom-10 right-10 bg-white bg-opacity-20 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-opacity-30 transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
      )}

      {/* Page indicator */}
      {currentPage > 0 && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          {pages.slice(1).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === index + 1
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WinterBook;