'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playShutter: () => void;
  startAmbient: () => void;
  stopAmbient: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playShutter: () => {},
  startAmbient: () => {},
  stopAmbient: () => {},
});

export const useAudio = () => useContext(AudioContext);

export default function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  
  // Audio Elements
  const shutterAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Synthetic Fallback Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  // State to track if files failed
  const [shutterFailed, setShutterFailed] = useState(false);
  const [ambientFailed, setAmbientFailed] = useState(false);

  useEffect(() => {
    // Setup Audio Elements
    const shutter = new Audio('/sounds/shutter.mp3');
    const ambient = new Audio('/sounds/ambient.mp3');
    ambient.loop = true;
    
    shutter.onerror = () => setShutterFailed(true);
    ambient.onerror = () => setAmbientFailed(true);
    
    shutterAudioRef.current = shutter;
    ambientAudioRef.current = ambient;
    
    const initSynth = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    window.addEventListener('click', initSynth, { once: true });
    window.addEventListener('scroll', initSynth, { once: true });
    
    return () => {
      window.removeEventListener('click', initSynth);
      window.removeEventListener('scroll', initSynth);
      ambientAudioRef.current?.pause();
      if (audioCtxRef.current?.state !== 'closed') {
        audioCtxRef.current?.close();
      }
    };
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (ambientAudioRef.current && !ambientFailed) {
      if (newMuted) {
        ambientAudioRef.current.pause();
      } else {
        ambientAudioRef.current.play().catch(() => setAmbientFailed(true));
      }
    } else if (audioCtxRef.current && ambientFailed) {
      if (!newMuted) {
        audioCtxRef.current.resume();
        if (ambientGainRef.current) {
          ambientGainRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 1);
        }
      } else {
        if (ambientGainRef.current) {
          ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
        }
      }
    }
  };

  const playSyntheticShutter = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const bufferSize = ctx.sampleRate * 0.1; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
    
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    noiseSource.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  };

  const playShutter = () => {
    if (isMuted) return;
    
    if (shutterAudioRef.current && !shutterFailed) {
      shutterAudioRef.current.currentTime = 0;
      shutterAudioRef.current.play().catch(() => {
        setShutterFailed(true);
        playSyntheticShutter();
      });
    } else {
      playSyntheticShutter();
    }
  };

  const startAmbient = () => {
    if (ambientAudioRef.current && !ambientFailed) {
      if (!isMuted) {
        ambientAudioRef.current.play().catch(() => {
          setAmbientFailed(true);
          startSyntheticAmbient();
        });
      }
    } else {
      startSyntheticAmbient();
    }
  };
  
  const startSyntheticAmbient = () => {
    if (!audioCtxRef.current || ambientOscRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, ctx.currentTime); 
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    if (!isMuted) gainNode.gain.setTargetAtTime(0.05, ctx.currentTime, 2);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    ambientOscRef.current = osc;
    ambientGainRef.current = gainNode;
  }

  const stopAmbient = () => {
    if (ambientAudioRef.current && !ambientFailed) {
      ambientAudioRef.current.pause();
    } else if (ambientGainRef.current && audioCtxRef.current) {
      ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 1);
      setTimeout(() => {
        ambientOscRef.current?.stop();
        ambientOscRef.current?.disconnect();
        ambientGainRef.current?.disconnect();
        ambientOscRef.current = null;
        ambientGainRef.current = null;
      }, 1500);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playShutter, startAmbient, stopAmbient }}>
      <button 
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 p-2 rounded-full border border-[#2a2c35] bg-[#0b0b0f]/80 backdrop-blur-md text-[#a3a3a3] hover:text-[#ffb347] transition-colors flex items-center justify-center mix-blend-difference"
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      {children}
    </AudioContext.Provider>
  );
}
