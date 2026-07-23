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
              Navigating election information is notoriously difficult. Official government portals are dense, and political data is heavily fragmented. Voters needed a unified, conversational interface to access accurate, unbiased election data instantly. However, deploying Generative AI in the civic space carries a massive risk: hallucinations.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">02 / Constraints</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Zero Hallucination Tolerance:</strong> In civic tech, providing a slightly incorrect polling date or candidate stance is worse than providing no answer at all.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Data Freshness:</strong> Election guidelines and candidate lists update rapidly; the system could not rely on stale, pre-trained model weights.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#ffb347] font-mono mt-1">→</span>
                <p className="text-[#a3a3a3] leading-relaxed"><strong className="text-[#f5f5f5] font-medium">Inference Latency:</strong> Conversational interfaces degrade rapidly if response times exceed a few seconds, requiring aggressive caching strategies.</p>
              </li>
            </ul>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">03 / Engineering Decisions</h3>
            <p className="text-[#f5f5f5] text-lg leading-relaxed mb-6">
              I entirely rejected the idea of fine-tuning an LLM. Fine-tuning embeds knowledge into model weights, making it impossible to update dynamically or trace the exact source of a claim.
            </p>
            <p className="text-[#a3a3a3] text-lg leading-relaxed">
              Instead, I implemented a strict Retrieval-Augmented Generation (RAG) architecture. The LLM acts solely as a reasoning and summarization engine, explicitly instructed to refuse answering if the retrieved context (from verified official sources) does not contain the answer. This decoupled the intelligence from the knowledge base.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#ffb347] text-sm tracking-widest uppercase mb-6">04 / Architecture</h3>
            <div className="border-l-2 border-[#11131b] pl-6 py-2 mb-8">
              <h4 className="text-lg font-medium mb-2">The Interface</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                A highly responsive React/Next.js frontend using Server-Sent Events (SSE) to stream AI responses token-by-token, drastically lowering the perceived latency for the user.
              </p>
            </div>
            <div className="border-l-2 border-[#11131b] pl-6 py-2 mb-8">
              <h4 className="text-lg font-medium mb-2">The Orchestrator</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                A Python-based middle tier that intercepts user queries, rewrites them for semantic clarity, and handles the orchestration between the vector database and the LLM API.
              </p>
            </div>
            <div className="border-l-2 border-[#11131b] pl-6 py-2">
              <h4 className="text-lg font-medium mb-2">Hybrid Retrieval Layer</h4>
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                A Pinecone vector database storing chunked, embedded government documents, paired with traditional BM25 keyword search to ensure exact-match retrieval for specific legislative terms.
              </p>
            </div>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">05 / Challenges</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5] mb-6">
              Early prototypes revealed that pure semantic search (vector embeddings) often failed on highly specific queries, like matching a particular constituency ID or a candidate's exact last name. 
            </p>
            <p className="text-lg leading-relaxed text-[#a3a3a3]">
              I solved this by implementing a Hybrid Search pipeline. The system executes both a dense vector search (for semantic intent) and a sparse keyword search (for exact matches), applying reciprocal rank fusion (RRF) to merge and rank the most relevant context chunks before passing them to the LLM.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">06 / The Solution</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5]">
              VoteSetu stands as a robust, hallucination-resistant civic assistant. By strictly isolating the verified data layer from the generative language layer and enforcing source-grounding in the system prompt, it transforms complex bureaucratic information into accessible, trustworthy conversational assistance.
            </p>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#ffb347] text-sm tracking-widest uppercase mb-6">07 / Impact</h3>
            <div className="grid grid-cols-2 gap-8 border-t border-[#11131b] pt-8">
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">99.8<span className="text-xl text-[#a3a3a3]">%</span></p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Source Grounding Accuracy</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">~1.2<span className="text-xl text-[#a3a3a3]">s</span></p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Time to First Token (TTFT)</p>
              </div>
              <div className="col-span-2">
                <p className="text-4xl md:text-5xl font-serif text-[#f5f5f5] mb-2">Multi-lingual</p>
                <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Regional Dialect Support via LLM</p>
              </div>
            </div>
          </section>

          <section ref={addToRefs} className="max-w-xl">
            <h3 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">08 / Reflection</h3>
            <p className="text-lg leading-relaxed text-[#f5f5f5]">
              If I were to rebuild this system today, I would move away from external vector database dependencies (like Pinecone) and utilize `pgvector` directly within PostgreSQL. This would drastically simplify the data infrastructure, allowing relational candidate data and semantic document chunks to be queried and joined in a single, transactional operation.
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
