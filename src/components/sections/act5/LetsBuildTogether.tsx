'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/data/content';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedButton from '@/components/ui/AnimatedButton';
import emailjs from '@emailjs/browser';

export default function LetsBuildTogether() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormState('sending');

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      setFormState('sent');
      formRef.current.reset();
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      {/* Lens flares */}
      <div className="lens-flare top-1/4 left-1/3 w-[400px] h-[400px]" />
      <div className="lens-flare bottom-1/4 right-1/3 w-[300px] h-[300px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <SectionHeading
          act="ACT V — Final Frame"
          title={content.contact.heading}
          subtitle={content.contact.subheading}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {formState === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-[#f59e0b]/30 bg-[#0a0a0a] text-center"
              >
                <span className="text-4xl block mb-4">✨</span>
                <p className="text-lg text-[#f5f5f5] font-serif">
                  {content.contact.form.sent}
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-xs tracking-[0.2em] uppercase text-[#525252] hover:text-[#f59e0b] transition-colors font-mono"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2">
                    {content.contact.form.name}
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] text-[#f5f5f5] text-sm focus:border-[#f59e0b] focus:outline-none transition-colors placeholder:text-[#363636]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2">
                    {content.contact.form.email}
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] text-[#f5f5f5] text-sm focus:border-[#f59e0b] focus:outline-none transition-colors placeholder:text-[#363636]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#525252] font-mono mb-2">
                    {content.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] text-[#f5f5f5] text-sm focus:border-[#f59e0b] focus:outline-none transition-colors resize-none placeholder:text-[#363636]"
                    placeholder={content.contact.form.message}
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  variant="primary"
                  disabled={formState === 'sending'}
                  className="w-full justify-center"
                >
                  {formState === 'sending' ? 'Sending...' : content.contact.form.submit}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </AnimatedButton>

                {formState === 'error' && (
                  <p className="text-xs text-red-400 text-center">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Contact info & social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Direct contact */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono block mb-4">
                Reach Out Directly
              </span>
              <a
                href={`mailto:${content.contact.social.email}`}
                className="text-lg md:text-xl text-[#a3a3a3] hover:text-[#f59e0b] transition-colors font-light"
              >
                {content.contact.social.email}
              </a>
            </div>

            {/* Social links */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono block mb-4">
                Find Me Online
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href={content.contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm">GitHub</span>
                  <span className="text-xs text-[#363636] group-hover:text-[#525252] transition-colors">→</span>
                </a>
                <a
                  href={content.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                  <span className="text-xs text-[#363636] group-hover:text-[#525252] transition-colors">→</span>
                </a>
              </div>
            </div>

            {/* Resume download */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#525252] font-mono block mb-4">
                Download Resume
              </span>
              <AnimatedButton variant="secondary" href="/resume.pdf" download>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume (PDF)
              </AnimatedButton>
            </div>

            {/* Back to top */}
            <button
              onClick={() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#525252] hover:text-[#f59e0b] transition-colors font-mono mt-8"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top
            </button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-[#1a1a1a] text-center"
        >
          <p className="text-xs text-[#363636] tracking-wide">
            © {new Date().getFullYear()} {content.name}. Built with intention.
          </p>
          <p className="text-[10px] text-[#242424] mt-2 font-mono">
            Cinematic Engineering Portfolio
          </p>
        </motion.div>
      </div>
    </section>
  );
}
