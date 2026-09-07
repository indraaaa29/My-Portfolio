'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import ProjectDrawer from '@/components/portfolio/ProjectDrawer';
import { PROJECTS } from '@/data/projects';
import styles from './ProjectGallery.module.css';

// The strictly mandated order
const PROJECT_ORDER = [
  'CarbWiser',
  'FlowSync',
  'VoteSetu',
  'Enervia',
  'Sentinel',
  'AI Face Recognition',
];

export default function ProjectGallery() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1440);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mappedProjects = useMemo(() => {
    // Filter and sort according to requested order
    const orderedProjects = PROJECT_ORDER.map((title) => {
      const proj = PROJECTS.find((p) => p.title === title || p.title.includes(title));
      if (!proj) {
        throw new Error(`Project ${title} not found in PROJECTS data source.`);
      }
      return proj;
    });

    const remainingProjects = PROJECTS.filter(
      (p) => !PROJECT_ORDER.some((title) => p.title === title || p.title.includes(title))
    );

    return [...orderedProjects, ...remainingProjects];
  }, []);

  const totalCount = mappedProjects.length;

  const handleNext = () => {
    if (selectedProjectIndex !== null) {
      // Drawer is open
      setSelectedProjectIndex((selectedProjectIndex + 1) % totalCount);
    } else {
      // Carousel is active
      if (activeIndex < totalCount - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null) {
      // Drawer is open
      setSelectedProjectIndex((selectedProjectIndex - 1 + totalCount) % totalCount);
    } else {
      // Carousel is active
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const DRAG_BUFFER = 50;
    if (info.offset.x < -DRAG_BUFFER && activeIndex < totalCount - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (info.offset.x > DRAG_BUFFER && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, selectedProjectIndex, totalCount]);

  return (
    <div className={styles.container}>
      {/* Screen Reader & Keyboard Accessibility Layer */}
      <div className="sr-only">
        <h2>Selected Engineering Projects</h2>
        <ul>
          {mappedProjects.map((proj, index) => (
            <li key={proj.index}>
              <button onClick={() => setSelectedProjectIndex(index)}>
                {proj.title} - {proj.tagline}. Built with {proj.stack.join(', ')}.
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.carouselArea}>
        <div className={styles.carouselTrack}>
          {mappedProjects.map((proj, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;

            // Responsive dynamic values
            const xOffsetMultiplier = windowWidth < 768 ? 160 : windowWidth < 1024 ? 220 : 320;
            const zOffsetMultiplier = windowWidth < 768 ? 80 : 150;
            const maxVisible = windowWidth < 768 ? 1 : 2;

            let x = offset * xOffsetMultiplier;
            let rotateY = offset * -15; // cards face inward
            let scale = 1 - Math.abs(offset) * 0.15;
            let z = -Math.abs(offset) * zOffsetMultiplier;
            let opacity = Math.abs(offset) > maxVisible ? 0 : (1 - Math.abs(offset) * 0.25);

            return (
              <motion.div
                key={proj.title}
                className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                animate={{ x, rotateY, scale, z, opacity }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => isActive ? setSelectedProjectIndex(i) : setActiveIndex(i)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{ zIndex: totalCount - Math.abs(offset) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={proj.image} alt={proj.title} className={styles.cardImage} draggable={false} />
                
                <div className={styles.cardOverlay}>
                  <h3 className={styles.cardTitle}>{proj.title}</h3>
                  <p className={styles.cardSubtitle}>{proj.tagline}</p>
                  
                  <div className={styles.skillsWrapper}>
                    {proj.stack.slice(0, 3).map(skill => (
                      <span key={skill} className={styles.skillPill}>{skill}</span>
                    ))}
                  </div>
                  
                  <div className={styles.arrowIcon}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handlePrev} 
          disabled={activeIndex === 0}
          className={styles.arrowButton}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>

        <div className={styles.progressContainer}>
          <span className={styles.progressNumber}>
            {(activeIndex + 1).toString().padStart(2, '0')}
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((activeIndex) / (totalCount - 1)) * 100}%` }}
            />
          </div>
          <span className={styles.progressNumber}>
            {totalCount.toString().padStart(2, '0')}
          </span>
        </div>

        <button 
          onClick={handleNext} 
          disabled={activeIndex === totalCount - 1}
          className={styles.arrowButton}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Editorial Drawer */}
      <ProjectDrawer
        project={selectedProjectIndex !== null ? mappedProjects[selectedProjectIndex] : null}
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={selectedProjectIndex}
        totalCount={totalCount}
      />
    </div>
  );
}
