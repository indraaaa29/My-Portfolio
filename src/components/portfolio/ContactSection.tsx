'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import SectionSeam from './SectionSeam';
import { CINEMATIC_EASE, REVEAL_SECONDS } from './FadeUp';


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
            viewport={{ once: true }}
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
                  href="mailto:your.email@example.com"
                  className="text-base font-light text-zinc-200 hover:text-amber-400 transition-colors"
                >
                  your.email@example.com
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
              <div className="flex items-center gap-6">
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: REVEAL_SECONDS, ease: CINEMATIC_EASE, delay: 0.1 }}
            className="lg:col-span-7 relative contact-form"
          >
            <div className="relative p-8 md:p-10 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-[2px]">
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
                    <button
                      type="submit"
                      className="relative overflow-hidden w-full h-[54px] rounded-lg bg-amber-500 text-zinc-950 font-medium text-sm hover:bg-amber-400 transition-colors duration-300 flex items-center justify-between px-6 group"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
