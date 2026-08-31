'use client';

import { useState, useMemo } from 'react';
import CircularGallery, { GalleryItem } from '@/components/reactbits/CircularGallery';
import ProjectDrawer from '@/components/portfolio/ProjectDrawer';
import { PROJECTS } from '@/data/projects';

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex - 1 + PROJECTS.length) % PROJECTS.length);
  };

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

    const allProjects = [...orderedProjects, ...remainingProjects];

    // Map to CircularGallery data structure
    return allProjects.map((proj): GalleryItem => {
      return {
        image: proj.image,
        title: proj.title,
        subtitle: proj.tagline,
      };
    });
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[500px] bg-transparent">

      {/* Screen Reader & Keyboard Accessibility Layer */}
      <div className="sr-only">
        <h2>Selected Engineering Projects</h2>
        <ul>
          {PROJECT_ORDER.map((title, index) => {
            const proj = PROJECTS.find((p) => p.title === title || p.title.includes(title));
            if (!proj) return null;
            return (
              <li key={proj.index}>
                <button
                  onClick={() => setSelectedProjectIndex(index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                >
                  {proj.title} - {proj.tagline}. Built with {proj.stack.join(', ')}.
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* WebGL Rendering Engine */}
      <div className={`absolute inset-0 z-0 ${selectedProjectIndex !== null ? 'pointer-events-none' : ''}`}>
        <CircularGallery
          items={mappedProjects}
          bend={1.5}
          textColor="#ffffff"      // zinc-100
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          paused={selectedProjectIndex !== null}
          selectedIndex={selectedProjectIndex}
          focusedIndex={focusedIndex}
          onItemClick={(index) => setSelectedProjectIndex(index)}
        />
      </div>

      {/* Editorial Drawer */}
      <ProjectDrawer
        project={selectedProjectIndex !== null ? (PROJECTS.find(p => p.title.includes(PROJECT_ORDER[selectedProjectIndex])) || PROJECTS.filter(p => !PROJECT_ORDER.some(title => p.title.includes(title)))[selectedProjectIndex - PROJECT_ORDER.length] || null) : null}
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={selectedProjectIndex}
        totalCount={PROJECTS.length}
      />

    </div>
  );
}
