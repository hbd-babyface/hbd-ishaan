import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { playMagicalSound } from '../utils/audio';
import { letters } from '../data';

interface EnvelopeProps {
  year: string;
  autoOpen?: boolean;
  onFullyOpen?: () => void;
  onClick?: () => void;
}

export default function Envelope({ year, autoOpen, onFullyOpen, onClick }: EnvelopeProps) {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const confetti = useMemo(
    () => Array.from({ length: 16 }, (_, index) => ({
      id: index,
      left: 10 + index * 5,
      color: ['#f8b500', '#ff4d6d', '#7be3ff', '#c67dff'][index % 4],
      delay: (index % 4) * 0.08,
      rotate: 45 + (index * 22),
    })),
    []
  );

  const stars = useMemo(
    () => Array.from({ length: 6 }, (_, index) => ({
      id: index,
      left: 15 + index * 12,
      delay: 0.2 + (index % 3) * 0.1,
      scale: 0.8 + (index % 2) * 0.4,
    })),
    []
  );

  const balloons = useMemo(
    () => [
      { id: 'left', left: '22%', color: '#ff9f9f', delay: 0.15 },
      { id: 'right', left: '72%', color: '#8bc34a', delay: 0.25 },
    ],
    []
  );

  useEffect(() => {
    if (autoOpen) {
      const t1 = setTimeout(() => {
         setOpen(true);
         setBurst(true);
         setCelebrate(true);
         playMagicalSound();
      }, 600); // Flap opens
      
      const t2 = setTimeout(() => {
        setCelebrate(false);
        setBurst(false);
      }, 1600);
      
      const t3 = setTimeout(() => {
        if (onFullyOpen) onFullyOpen();
      }, 2000); // Trigger transition to full letter
      
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [autoOpen, onFullyOpen]);

  return (
    <motion.div 
      className="relative w-72 h-48 md:w-96 md:h-64 cursor-pointer group select-none shadow-[0_25px_50px_rgba(0,0,0,0.8)] rounded-md"
      onClick={onClick}
      whileHover={!autoOpen ? { scale: 1.03, y: -5 } : {}}
      whileTap={!autoOpen ? { scale: 0.98 } : {}}
      layoutId={`envelope-${year}`}
    >
      {/* Back layer (inside of envelope) */}
      <div className="absolute inset-0 bg-[#8c6b45] rounded-md shadow-inner overflow-hidden border border-[#5c4021]">
         <div className="absolute inset-0 bg-black/10 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]" />
      </div>

      {burst && celebrate && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_35%)]" />

          {confetti.map((item) => (
            <motion.div
              key={`confetti-${item.id}`}
              className="absolute w-2 h-5 rounded-sm"
              style={{ left: `${item.left}%`, background: item.color, top: `${30 + item.id * 2}%` }}
              initial={{ opacity: 0, y: 0, rotate: item.rotate, scale: 0.8 }}
              animate={{ opacity: [1, 1, 0], y: [0, 180], rotate: item.rotate + 360 }}
              transition={{ duration: 1.4, delay: item.delay, ease: 'easeOut' }}
            />
          ))}

          {stars.map((item) => (
            <motion.div
              key={`star-${item.id}`}
              className="absolute w-4 h-4 text-[#fdf3c8]"
              style={{ left: `${item.left}%`, top: `${25 + item.id * 8}%` }}
              initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -80, -120, -140], scale: [0.2, item.scale, item.scale * 1.1, 0.2], rotate: 360 }}
              transition={{ duration: 1.4, delay: item.delay, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon points="12,2 14.4,8.5 21.5,9.2 16,13.8 17.7,20.7 12,17.3 6.3,20.7 8,13.8 2.5,9.2 9.6,8.5" fill="currentColor" />
              </svg>
            </motion.div>
          ))}

          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              className="absolute flex flex-col items-center"
              style={{ left: balloon.left, top: '55%' }}
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -200, -240, -280], scale: [0.7, 1, 1, 0.9] }}
              transition={{ duration: 1.6, delay: balloon.delay, ease: 'easeOut' }}
            >
              <div className="w-10 h-12 rounded-full" style={{ background: balloon.color, boxShadow: `0 0 30px ${balloon.color}` }} />
              <div className="w-[2px] h-16 bg-white/90" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* The Letter inside pops out */}
      <motion.div 
         className="absolute left-4 right-4 bg-parchment-texture shadow-[0_-5px_15px_rgba(0,0,0,0.4)] rounded-t-sm z-10 flex items-start justify-center pt-6"
         initial={{ top: 10, bottom: 10 }}
         animate={
           autoOpen && open 
             ? { top: -160, bottom: 160, opacity: [1, 1, 0] } 
             : { top: 15, bottom: 10 }
         }
         transition={{ duration: 1.2, delay: 0.2, times: [0, 0.8, 1], ease: "easeInOut" }}
      >
         <div className="flex flex-col items-center opacity-80 backdrop-blur-sm px-4 py-2 bg-white/20 rounded border border-gold-dark/20">
            <div className="w-16 h-[2px] border-b-[2px] border-double border-gold-dark mb-2" />
            <div className="font-handwriting text-[#5c4021] text-xl md:text-2xl overflow-hidden truncate">
              {letters[year].title}
            </div>
         </div>
      </motion.div>

      {/* SVG for front flaps - darker/richer gradients */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] z-20 rounded-md" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,100 50,45 100,100" fill="#d09f5a" stroke="#7a552e" strokeWidth="0.5" />
        <polygon points="0,0 45,50 0,100" fill="#c4924c" stroke="#7a552e" opacity="0.98" strokeWidth="0.5" />
        <polygon points="100,0 55,50 100,100" fill="#c4924c" stroke="#7a552e" opacity="0.98" strokeWidth="0.5" />
      </svg>
      

      {/* Top Animated Flap */}
      <motion.svg 
        className="absolute top-0 left-0 w-full h-full origin-top z-30 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
        viewBox="0 0 100 100" preserveAspectRatio="none"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: autoOpen && open ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <polygon points="0,0 100,0 50,55" fill="#deaf68" stroke="#7a552e" strokeWidth="0.5" />
      </motion.svg>

      {/* Wax Seal */}
      <motion.div 
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full wax-seal z-40 flex items-center justify-center text-[#ffeedd] font-bold"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          autoOpen && open 
           ? { scale: 0, opacity: 0 } 
           : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-1 rounded-full border-[1.5px] border-dotted border-white/20 flex items-center justify-center">
            <span className="font-royal text-2xl md:text-3xl tracking-tighter drop-shadow-md">
               {year.substring(2)}
            </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
