'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import SectionSeam from './SectionSeam';
import FadeUp, { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';


export default function ContactSection() {
  const { location } = PORTFOLIO_DATA.personal;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <SectionSeam />
      
      {/* Subtle ambient illumination */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-zinc-950/0 to-zinc-950/0" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* Header */}
        <FadeUp>
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
              <span className="h-px w-6 sm:w-10 bg-amber-500/50" />
              <span>Initiate Contact</span>
              <span className="h-px w-6 sm:w-10 bg-amber-500/50" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-100 tracking-tight">
              Let&apos;s Build Something <span className="font-serif italic font-medium text-amber-400">Exceptional</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base tracking-wide">
              Have a project in mind, an open role, or just want to connect? Reach out below.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-16 items-center">

          {/* Left Side: Editorial Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE }}
            className="lg:col-span-4 space-y-8 py-4"
          >
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-[0.15em] text-zinc-100 uppercase">
                Start A Conversation
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                I am currently available for select freelance opportunities, full-time roles, and meaningful collaborations.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-zinc-900/50">
              <div className="group">
                <div className="text-[10px] font-semibold text-zinc-500 mb-1 tracking-[0.15em] uppercase">Email</div>
                <a
                  href="mailto:your.email@example.com"
                  className="text-base font-light text-zinc-200 hover:text-amber-400 transition-colors"
                >
                  your.email@example.com
                </a>
              </div>

              <div className="group">
                <div className="text-[10px] font-semibold text-zinc-500 mb-1 tracking-[0.15em] uppercase">Location</div>
                <div className="text-base font-light text-zinc-200">
                  {location}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-zinc-900/50">
              <div className="text-[10px] font-semibold text-zinc-500 mb-4 tracking-[0.15em] uppercase">
                Follow & Connect
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-amber-400 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-amber-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-amber-400 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.1 }}
            className="lg:col-span-6 relative group"
          >
            {/* Soft shadow/glow behind the form */}
            <div className="absolute inset-0 bg-amber-500/5 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
            
            <div className="relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 shadow-2xl">
              {submitted ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-zinc-100">Message Received</h3>
                    <p className="text-zinc-400 max-w-sm mx-auto text-sm leading-relaxed">
                      Thank you for reaching out. I will respond to your inquiry within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-medium hover:bg-zinc-800 hover:text-zinc-100 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full px-4 py-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or inquiry..."
                      className="w-full px-4 py-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800/80 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="relative overflow-hidden w-full h-[54px] rounded-[14px] bg-gradient-to-b from-amber-400 to-amber-500 text-zinc-950 font-semibold text-sm hover:shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all duration-300 flex items-center justify-center gap-3 group hover:-translate-y-[1px] active:scale-[0.99] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                  >
                    {/* Subtle brightening overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                    
                    {/* Subtle highlight sweep on hover */}
                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-transform duration-500 ease-out motion-reduce:hidden" />
                    
                    <span className="relative">Send Message</span>
                    <Send className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 motion-reduce:transform-none" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
