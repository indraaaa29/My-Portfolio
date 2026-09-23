'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import SectionSeam from './SectionSeam';
import { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';


const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvXeaRIiiORMX16Y_ikfAJLKGRUibbWhLmacGuCnsBkYlZ7Du15CHRQj89ZdOxSIaAhg/exec";

/* ── Animated success badge: circle fade+scale, then stroke-draw checkmark ── */
function SuccessBadge() {
  const shouldReduceMotion = useReducedMotion();

  // Circle path length ≈ 2πr where r=22 in a 48-viewBox SVG => ~138.2
  // Checkmark path from roughly (9,24) -> (19,34) -> (39,14)
  const TICK_LENGTH = 40; // approximate stroke path length for the tick

  return (
    <motion.div
      className="w-16 h-16 mx-auto relative shrink-0"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Subtle glow ring — fades in after the tick draws, then stays */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: '0 0 0 0px rgba(52, 211, 153, 0)' }}
        initial={false}
        animate={shouldReduceMotion
          ? { boxShadow: '0 0 12px 3px rgba(52, 211, 153, 0.18)' }
          : { boxShadow: [
              '0 0 0 0px rgba(52, 211, 153, 0)',
              '0 0 14px 4px rgba(52, 211, 153, 0.22)',
              '0 0 10px 2px rgba(52, 211, 153, 0.14)',
            ]
          }
        }
        transition={shouldReduceMotion ? { duration: 0 } : {
          delay: 0.75,
          duration: 0.6,
          ease: 'easeOut',
          times: [0, 0.5, 1],
        }}
      />

      {/* SVG: circle border + stroke-animated checkmark */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Circle background fill */}
        <circle cx="32" cy="32" r="31" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" />

        {/* Animated checkmark stroke */}
        <motion.path
          d="M20 32 L28 40 L44 22"
          stroke="rgb(52, 211, 153)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={shouldReduceMotion ? false : {
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            pathLength: {
              delay: 0.3,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              delay: 0.3,
              duration: 0.15,
            },
          }}
        />
      </svg>
    </motion.div>
  );
}


const playSuccessTone = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    
    // Very quiet: 0.1 keeps it subtle and unobtrusive
    masterGain.gain.value = 0.1;
    masterGain.connect(ctx.destination);
    
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine'; // Sine waves produce a clean, soft digital chime
      osc.frequency.setValueAtTime(freq, startTime);
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      // Smooth attack and soft decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(1, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    };
    
    const now = ctx.currentTime;
    // Premium minimalistic two-note chime (E5 -> G#5)
    playNote(659.25, now, 0.4);
    playNote(830.61, now + 0.15, 0.6);
    
    // Clean up to prevent AudioContext memory leaks
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1500);
  } catch (e) {
    // Silently fail if browser blocks audio
  }
};

export default function ContactSection() {
  const { location } = PORTFOLIO_DATA.personal;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });
      
      if (response.ok) {
        setStatus('success');
        if (!shouldReduceMotion) {
          playSuccessTone();
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden contact-section">
      <SectionSeam />
      
      {/* Subtle ambient illumination */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-zinc-950/0 to-zinc-950/0" />

      <div className="max-w-7xl mx-auto relative z-10 contact-layout">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left Side: Editorial Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE }}
            className="lg:col-span-5 space-y-12 py-4 contact-intro"
          >
            <div className="space-y-6">
              <h3 className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                Start A Conversation
              </h3>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-100 tracking-tight leading-[1.1]">
                Let&apos;s build<br />
                something<br />
                <span className="font-serif italic font-medium text-amber-400">exceptional.</span>
              </h2>
              
              <p className="text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed pt-2">
                I am currently available for select freelance opportunities, full-time roles, and meaningful collaborations.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-zinc-900/50">
              <div className="group">
                <div className="text-[10px] font-semibold text-zinc-500 mb-2 tracking-[0.15em] uppercase">Email</div>
                <a
                  href="mailto:indranil7001@gmail.com"
                  className="text-base font-light text-zinc-200 hover:text-amber-400 transition-colors"
                >
                  indranil7001@gmail.com
                </a>
              </div>

              <div className="group">
                <div className="text-[10px] font-semibold text-zinc-500 mb-2 tracking-[0.15em] uppercase">Location</div>
                <div className="text-base font-light text-zinc-200">
                  {location}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-zinc-900/50">
              <div className="text-[10px] font-semibold text-zinc-500 mb-4 tracking-[0.15em] uppercase">
                Follow & Connect
              </div>
              <div className="flex flex-col items-start gap-5">
                <a
                  href="https://github.com/indraaaa29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center text-zinc-400 hover:text-amber-400 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5 shrink-0" />
                  <span className="absolute left-full ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium pointer-events-none">
                    Github
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/indranil-paul-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center text-zinc-400 hover:text-amber-400 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5 shrink-0" />
                  <span className="absolute left-full ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium pointer-events-none">
                    Linkedin
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/indraaaa.19/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center text-zinc-400 hover:text-amber-400 transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 shrink-0" />
                  <span className="absolute left-full ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium pointer-events-none">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.1 }}
            className="lg:col-span-7 relative contact-form"
          >
            <motion.div
              className="relative p-8 md:p-10 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-[2px]"
              whileHover={{
                borderColor: 'rgba(245, 181, 50, 0.35)',
                boxShadow: '0 0 0 1px rgba(245, 181, 50, 0.12), 0 8px 40px -8px rgba(245, 181, 50, 0.1)',
                backgroundColor: 'rgba(20, 18, 12, 0.38)',
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {status === 'success' ? (
                <div className="py-20 text-center space-y-6">
                  <SuccessBadge />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-zinc-100">Message sent successfully ✓</h3>
                    <p className="text-zinc-400 max-w-sm mx-auto text-sm leading-relaxed">
                      Thank you for reaching out. I will respond to your inquiry within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-medium hover:bg-zinc-800 hover:text-zinc-100 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3 contact-field">
                      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-3 contact-field">
                      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 contact-field">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or inquiry..."
                      className="w-full px-4 py-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    {status === 'error' && (
                      <p className="text-red-400 text-sm mb-4 text-center">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="relative overflow-hidden w-full h-[54px] rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-between px-6 group disabled:opacity-100 disabled:cursor-not-allowed"
                    >
                      {/* Gold energy sweep — visible only while loading */}
                      {status === 'loading' && (
                        <span
                          className="btn-energy-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
                            filter: 'blur(6px)',
                            animation: 'btn-energy-sweep 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                          }}
                          aria-hidden="true"
                        />
                      )}

                      {/* Button label — fixed width to prevent layout shift */}
                      <span className="relative z-10">
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                      </span>

                      {/* Right side: arrow (idle) or three-dot indicator (loading) */}
                      <span className="relative z-10 flex items-center">
                        {status === 'loading' ? (
                          <span className="flex items-center gap-[3px]" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="btn-dot block w-[3px] h-[3px] rounded-full bg-zinc-950"
                                style={{
                                  animation: `btn-dot-fade 1.2s ease-in-out ${i * 0.2}s infinite`,
                                }}
                              />
                            ))}
                          </span>
                        ) : (
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
