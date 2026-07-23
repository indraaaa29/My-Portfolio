'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitectureDiagram from './ArchitectureDiagram';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudyMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  // Section refs for scroll tracking
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !rightColRef.current) return;

    // We only pin on desktop (md and above)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin the right column (visuals) while the left column (text) scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: rightColRef.current,
        pinSpacing: false,
      });

      // Simple reveal animations for each text block as it enters center of screen
      sectionRefs.current.forEach((secRef) => {
        if (secRef) {
          gsap.fromTo(secRef, 
            { opacity: 0.1, filter: 'blur(4px)' },
            {
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              scrollTrigger: {
                trigger: secRef,
                start: 'top 60%',
                end: 'top 30%',
                scrub: true,
              }
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <article ref={containerRef} className="relative w-full bg-[#0b0b0f] text-[#f5f5f5]">
      
      {/* 1. The Monolith Intro (Full Height) */}
      <div className="w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 border-b border-[#11131b]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <span className="font-mono text-[#ffb347] text-[10px] tracking-widest uppercase block mb-8">Engineering Design Review / Civic Tech</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] tracking-tight mb-8">
            VoteSetu:<br />Verifiable Civic Infrastructure.
          </h1>
          <p className="text-xl md:text-2xl text-[#a3a3a3] max-w-3xl leading-relaxed">
            Architecting a deterministic, high-throughput pipeline to ensure cryptographic verifiability without compromising voter anonymity during massive traffic spikes.
          </p>
        </motion.div>
      </div>

      {/* Narrative Body: Two-column layout on desktop */}
      <div className="relative flex flex-col md:flex-row px-6 md:px-12 lg:px-24 py-32">
        
        {/* Left Column: The Engineering Narrative */}
        <div ref={leftColRef} className="w-full md:w-1/2 lg:w-7/12 flex flex-col gap-[30vh] pb-[30vh] z-10 md:pr-16">
          
          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">01 / The Problem</h3>
            <p className="text-xl leading-relaxed font-serif text-[#f5f5f5]">
              Voters needed a unified, conversational interface to access accurate election data instantly. However, deploying Generative AI in the civic space carries a massive risk: hallucinations. Providing a slightly incorrect polling date or candidate stance is worse than providing no answer at all.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">02 / Constraints</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Strict Accuracy:</strong> The system had to reliably say "I don't know" rather than guess if data was missing.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Data Freshness:</strong> Election guidelines update rapidly; the app needed to instantly reflect new information without retraining a model.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Development Velocity:</strong> As a lean project, building a complex microservice architecture would severely bottleneck iteration speed.</p>
              </li>
            </ul>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">03 / Engineering Decisions</h3>
            <p className="text-[#f5f5f5] text-lg leading-relaxed mb-6">
              I rejected fine-tuning an LLM. It is expensive, hard to update dynamically, and makes it difficult to trace the exact source of a claim.
            </p>
            <p className="text-[#a3a3a3] text-lg leading-relaxed">
              Instead, I implemented a straightforward Retrieval-Augmented Generation (RAG) architecture. The LLM is given strict system prompts to act purely as a summarization engine. It only answers using the retrieved context blocks provided to it. This completely decouples the intelligence layer from the factual knowledge layer.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#ffb347] text-sm tracking-widest uppercase mb-6">04 / Architecture</h3>
            <div className="border-l-2 border-[#11131b] pl-6 py-2 mb-8">
              <h4 className="text-lg font-medium mb-2">The Monorepo (Next.js)</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                To maximize velocity, I kept everything full-stack within Next.js. The frontend handles the chat UI, while Next.js API routes securely manage the OpenAI API calls and orchestration.
              </p>
            </div>
            <div className="border-l-2 border-[#11131b] pl-6 py-2 mb-8">
              <h4 className="text-lg font-medium mb-2">The Streaming Layer</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                Utilized the Vercel AI SDK to stream responses token-by-token directly to the client, drastically improving perceived performance over standard REST requests.
              </p>
            </div>
            <div className="border-l-2 border-[#11131b] pl-6 py-2">
              <h4 className="text-lg font-medium mb-2">The Knowledge Base</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                A simple vector database holding chunked official documents. When a user asks a question, their query is embedded and matched against the closest document chunks via cosine similarity.
              </p>
            </div>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">05 / Challenges</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5] mb-6">
              A major issue was the LLM returning unstructured text when the UI needed structured data (like displaying a neat list of candidates or polling locations). 
            </p>
            <p className="text-lg leading-relaxed text-[#a3a3a3]">
              Instead of relying on fragile regex parsing on the frontend, I migrated to OpenAI's Structured Outputs (Function Calling). By forcing the model to return data matching a strict JSON schema, the frontend could reliably map the output to clean React components.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">06 / The Solution</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5]">
              VoteSetu is a lean, maintainable AI application. By avoiding premature optimization and sticking to a robust Next.js/RAG stack, the platform successfully balances generative assistance with strict factual grounding.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#ffb347] text-sm tracking-widest uppercase mb-6">07 / Impact</h3>
            <div className="grid grid-cols-2 gap-8 border-t border-[#11131b] pt-8">
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">100<span className="text-xl text-[#a3a3a3]">%</span></p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Source Traceability</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">O(1)</p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Developer Context Switching</p>
              </div>
              <div className="col-span-2">
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">Serverless</p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Zero Infrastructure Maintenance</p>
              </div>
            </div>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">08 / Reflection</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5]">
              The biggest lesson was realizing that in AI applications, the model integration is the easy part. Preparing, cleaning, and chunking the source documents effectively dictates 80% of the app's actual quality. If I rebuilt this, I would invest significantly more time in building an automated data-ingestion pipeline rather than tuning prompts.
            </p>
          </section>

        </div>

        {/* Right Column: Pinned Visuals (Desktop Only) */}
        <div className="hidden md:block w-1/2 lg:w-5/12 h-[80vh] sticky top-[10vh]">
          <div className="w-full h-full flex flex-col justify-center">
            {/* 
              Abstract Architecture Diagram acting as the technical artifact.
            */}
            <ArchitectureDiagram />
            
            <div className="mt-8 text-center">
              <p className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest">Fig 1. VoteSetu Event & Persistence Flow</p>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
