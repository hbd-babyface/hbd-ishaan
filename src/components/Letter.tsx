import { motion } from 'motion/react';
import { letters } from '../data';

interface LetterProps {
  year: string;
  onClose: () => void;
}

export default function Letter({ year, onClose }: LetterProps) {
  const data = letters[year];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-4 py-8 md:p-12 z-50 pointer-events-auto"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl h-full max-h-[90vh] bg-parchment-texture rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Frame borders */}
        <div className="absolute inset-4 md:inset-6 gold-border pointer-events-none z-20" />
        <div className="absolute inset-x-0 top-1 h-12 pointer-events-none flex justify-center z-20">
            <span className="text-gold-dark text-4xl -translate-y-2 drop-shadow-sm">❦</span>
        </div>
        <div className="absolute inset-x-0 bottom-1 h-12 pointer-events-none flex justify-center z-20">
            <span className="text-gold-dark text-4xl translate-y-3 rotate-180 drop-shadow-sm">❦</span>
        </div>
        
        {/* Scrollable Content */}
        <div className="parchment-scroll scroll-smooth w-full h-full overflow-y-auto px-8 py-20 md:px-20 md:py-24 flex flex-col relative z-10">
            
            <span className="absolute top-10 left-10 text-gold-dark/30 text-3xl md:text-5xl rotate-0 select-none">❦</span>
            <span className="absolute top-10 right-10 text-gold-dark/30 text-3xl md:text-5xl rotate-90 select-none">❦</span>
            <span className="absolute bottom-10 left-10 text-gold-dark/30 text-3xl md:text-5xl -rotate-90 select-none">❦</span>
            <span className="absolute bottom-10 right-10 text-gold-dark/30 text-3xl md:text-5xl rotate-180 select-none">❦</span>

            <motion.p 
              className="font-serif italic text-gold-dark/80 text-sm md:text-base mb-10 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {data.date}
            </motion.p>

            {data.image && (
              <motion.div 
                className="mx-auto w-36 h-44 md:w-48 md:h-60 border-[3px] border-[#8b6f47] rounded-sm overflow-hidden shadow-xl mb-12 bg-[#f9f3e9] p-1.5 -rotate-2 flex items-center justify-center shrink-0"
                initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -2, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              >
                  <img src={data.image} alt="Memory" className="w-full h-full object-cover rounded-sm grayscale-[20%] sepia-[30%] contrast-[1.1]" />
              </motion.div>
            )}

            <motion.h1 
              className="font-handwriting text-5xl md:text-7xl text-royal-red text-center mb-12 drop-shadow-sm px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {data.title}
            </motion.h1>

            <motion.div 
              className="font-serif text-lg md:text-xl leading-loose text-ink text-justify space-y-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              {data.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            <motion.div 
              className="mt-20 text-right mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
                <p className="font-handwriting text-3xl md:text-4xl text-gold-dark/90">
                  {data.signature}
                </p>
            </motion.div>
        </div>

        <motion.button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-parchment-texture text-gold-dark hover:text-royal-red border border-gold-dark/30 shadow-md transition-colors duration-300 backdrop-blur-lg cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            title="Close Letter"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
