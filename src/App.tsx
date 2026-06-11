import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { letters } from './data';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import AmbientParticles from './components/AmbientParticles';

export default function App() {
  useEffect(() => {
    const prevent = (event: Event) => event.preventDefault();

    document.addEventListener('contextmenu', prevent);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('copy', prevent);

    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('selectstart', prevent);
      document.removeEventListener('copy', prevent);
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden p-4 md:p-8 font-serif">
      {/* Cinematic Spotlight */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] md:w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(212,167,106,0.12)_0%,transparent_70%)] pointer-events-none mix-blend-screen z-0" />
      
      <AmbientParticles />
      
      <AnimatePresence mode="wait">
        {!selectedYear ? (
          <motion.div 
            key="selection-menu"
            className="flex flex-col items-center justify-center gap-16 md:gap-24 z-20 pointer-events-auto w-full max-w-5xl"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
               <h1 className="font-handwriting text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff5d6] via-[#d4a76a] to-[#8b6f47] drop-shadow-[0_4px_12px_rgba(212,167,106,0.2)] mb-8 pb-2">Birthday Letters for BabyFace</h1>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#d4a76a]/60" />
                  <p className="text-[#e8d5b5] font-royal tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-md">Which year is it?</p>
                  <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#d4a76a]/60" />
               </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row gap-16 md:gap-28 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {Object.keys(letters).map((year, index) => (
                <motion.div 
                  key={year} 
                  className="flex flex-col items-center gap-8 relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.2), duration: 0.8, type: "spring" }}
                >
                  <div className="font-royal text-[#e8d5b5] text-xl md:text-2xl tracking-[0.3em] flex items-center gap-3 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(212,167,106,0.8)] group-hover:text-[#fff5d6]">
                    <span className="opacity-40 text-sm">✦</span>
                    {year}
                    <span className="opacity-40 text-sm">✦</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#d4a76a] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full scale-150 pointer-events-none" />
                    <Envelope 
                      year={year} 
                      onClick={() => setSelectedYear(year)} 
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key={`opened-${selectedYear}`}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {!isOpened && (
              <motion.h2 
                className="font-royal text-[#e8d5b5] text-2xl md:text-4xl tracking-[0.4em] drop-shadow-[0_0_15px_rgba(212,167,106,0.4)] absolute top-20 text-center w-full z-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 1 }}
              >
                {selectedYear}
              </motion.h2>
            )}
            
            {!isOpened && (
              <div className="pointer-events-auto mt-10">
                <Envelope 
                  year={selectedYear} 
                  autoOpen={true}
                  onFullyOpen={() => setIsOpened(true)}
                />
              </div>
            )}

            {isOpened && (
              <Letter 
                year={selectedYear} 
                onClose={() => {
                  setIsOpened(false);
                  setSelectedYear(null);
                }} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
