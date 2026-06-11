import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const DustMote = ({ delay, x, y, duration, size, opacity }: { delay: number, x: number, y: number, duration: number, size: number, opacity: number }) => (
  <motion.div
    className="absolute rounded-full bg-[#e8d5b5] pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, filter: `blur(${size/2}px)` }}
    initial={{ opacity: 0, y: 0, x: 0 }}
    animate={{ 
      opacity: [0, opacity, 0], 
      y: -150,
      x: (Math.random() - 0.5) * 100 
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

export default function AmbientParticles() {
  const [motes, setMotes] = useState<{ id: number, x: number, y: number, delay: number, duration: number, size: number, opacity: number }[]>([]);

  useEffect(() => {
    const newMotes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 80 + Math.random() * 40, // start lower
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20, // slow float
      size: 1 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.4
    }));
    setMotes(newMotes);
  }, []);

  const noiseSvg = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {motes.map(m => (
        <DustMote key={m.id} {...m} />
      ))}
      <div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: `url("${noiseSvg}")` }} 
      />
    </div>
  );
}
