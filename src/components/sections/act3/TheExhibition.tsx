import CaseStudyMonolith from "./CaseStudyMonolith";

export default function TheExhibition() {
  return (
    <div id="act-three" className="w-full bg-[#0b0b0f] pt-24 pb-32">
      {/* 
        The Exhibition Header 
        Optional, but helps separate Act II and Act III smoothly.
      */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-32">
        <h2 className="font-mono text-[#a3a3a3] text-sm tracking-widest uppercase border-b border-[#11131b] pb-4">
          Act III / Selected Engineering Works
        </h2>
      </div>

      {/* 
        In a production environment with multiple projects, we would map over an array of project data here.
        For this portfolio layout, we render the monolithic case studies directly.
      */}
      <CaseStudyMonolith />
      
      {/* 
        If there were more projects, they would stack here with massive vertical spacing.
        <CaseStudyMonolith projectData={project2} />
      */}
    </div>
  );
}
