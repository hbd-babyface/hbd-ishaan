export const playMagicalSound = () => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const audioContext = new AudioCtx();
        
        const createChime = (freq: number, startTime: number, duration: number) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + startTime);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + startTime);
            gain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.start(audioContext.currentTime + startTime);
            osc.stop(audioContext.currentTime + startTime + duration);
        };
  
        // Magical ascending chimes
        createChime(523.25, 0, 1.0);    // C
        createChime(659.25, 0.15, 1.0); // E
        createChime(783.99, 0.3, 1.2);  // G
        createChime(1046.50, 0.45, 1.5); // C (higher)
    } catch (e) {
        console.warn("Audio not supported or blocked", e);
    }
  };
