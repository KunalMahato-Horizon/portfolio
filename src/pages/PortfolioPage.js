import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import GlobalCursor from "../components/GlobalCursor";

// Import project images
import anojPortfolio from "../images/Anoj_portfolio.png";
import sonvitriFoundation from "../images/Sonvitri_Foundation-Template.png";
import videoEditorTemplate from "../images/Video_Editor-Template.png";
import photographerPortfolio from "../images/photographer-portfolio.png";
import anjaliKumariPortfolio from "../images/Anjali_kumari_makeup-artist_portfolio.png"; // NEW IMPORT

const projects = [
  {
    id: 1,
    title: "ANOJ PORTFOLIO",
    category: "Personal Portfolio",
    year: "2024",
    img: anojPortfolio,
    description: "Minimal portfolio website for a designer.",
    focus: "Mastering layout shifts & typography",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#3B82F6",
    liveLink: "https://travel-portfolio-peach.vercel.app/",
    codeLink: "https://github.com/KunalMahato-Horizon/travel-portfolio"
  },
  {
    id: 2,
    title: "SONVITRI FOUNDATION",
    category: "NGO Template",
    year: "2024",
    img: sonvitriFoundation,
    description: "Clean template for non-profit organizations.",
    focus: "Accessibility & semantic HTML",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#F97316",
    liveLink: "https://ngo-virid-xi.vercel.app/",
    codeLink: "https://github.com/KunalMahato-Horizon/NGO"
  },
  {
    id: 3,
    title: "VIDEO EDITOR",
    category: "Creative Template",
    year: "2024",
    img: videoEditorTemplate,
    description: "Portfolio template for video editors.",
    focus: "Component-based styling",
    stack: ["React", "CSS Modules"],
    accent: "#3B82F6",
    liveLink: "https://video-editor-portfolio-vert.vercel.app/",
    codeLink: "https://github.com/KunalMahato-Horizon/video-editor-portfolio"
  },
  {
    id: 4,
    title: "PHOTOGRAPHER PORTFOLIO",
    category: "Creative Portfolio",
    year: "2024",
    img: photographerPortfolio,
    description: "Elegant portfolio website for professional photographers.",
    focus: "Visual storytelling & image optimization",
    stack: ["React", "Tailwind", "Framer Motion", "Masonry Grid"],
    accent: "#8B5CF6",
    liveLink: "https://photographer-portfolio-theta.vercel.app/",
    codeLink: "https://github.com/KunalMahato-Horizon/photographer_portfolio"
  },
  {
    id: 5,  // NEW PROJECT - UPDATED ID
    title: "ANJALI KUMARI",
    category: "Makeup Artist Portfolio",
    year: "2025",  // Current year
    img: anjaliKumariPortfolio,
    description: "Professional portfolio website for a makeup artist showcasing beauty services and work gallery.",
    focus: "Visual branding & responsive design",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#EC4899",  // Pink/Makeup theme color
    liveLink: "https://anjali-kumari-portfolio.vercel.app/",
    codeLink: "https://github.com/KunalMahato-Horizon/anjali-kumari-portfolio"  // Update with actual repo if different
  },
];

// Generate categories from projects
const categories = ["All", ...new Set(projects.map(p => p.category))];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return filter === "All" 
      ? projects 
      : projects.filter(p => p.category === filter);
  }, [filter]);

  // Memoize page transition
  const pageTransition = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }), []);

  // Handle filter change
  const handleFilterChange = useCallback((category) => {
    setFilter(category);
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio | Kunal Mahato - Selected Works</title>
        <meta name="description" content="Explore my portfolio of selected works including personal portfolios, NGO templates, creative web projects, and makeup artist portfolios. Built with React, Tailwind CSS, and modern web technologies." />
        <meta name="keywords" content="portfolio, react projects, web development, frontend projects, creative templates, makeup artist portfolio" />
        <meta property="og:title" content="Portfolio | Kunal Mahato - Selected Works" />
        <meta property="og:description" content="Explore my portfolio of selected works including personal portfolios, NGO templates, creative web projects, and makeup artist portfolios." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <GlobalCursor />
      <Navbar />
      
      <div className="min-h-screen bg-[#e3e3e3] text-[#1a1a1a] pt-32 pb-20 px-6 md:px-12 selection:bg-[#1a1a1a] selection:text-[#e3e3e3] cursor-none">
        
        {/* Page transition wrapper */}
        <motion.div {...pageTransition}>
          
          {/* Header section */}
          <HeaderSection />
          
          {/* Filter bar */}
          <FilterBar 
            categories={categories} 
            activeFilter={filter} 
            onFilterChange={handleFilterChange} 
          />
          
          {/* Projects grid */}
          <ProjectsGrid projects={filteredProjects} />
          
          {/* Footer */}
          <FooterSection />
          
        </motion.div>
      </div>
    </>
  );
}

// Header Component
function HeaderSection() {
  return (
    <div className="max-w-7xl mx-auto mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40 mb-4 block">
          The Build Log — 01
        </span>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
          Selected<br />
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
            Works
          </span>
          <span className="opacity-20">.</span>
        </h1>
      </motion.div>
    </div>
  );
}

// Filter Bar Component
function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-8 border-b border-[#1a1a1a]/10 pb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`text-[10px] font-mono uppercase tracking-[0.3em] transition-all cursor-none
            ${activeFilter === cat 
              ? "opacity-100 font-bold text-[#3B82F6]" 
              : "opacity-30 hover:opacity-100 hover:text-[#3B82F6]"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// Projects Grid Component
function ProjectsGrid({ projects }) {
  return (
    <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, index }) {
  // Memoize tech color classes
  const getTechColor = useCallback((tech) => {
    if (tech === "React" || tech === "Tailwind") return "text-[#3B82F6]";
    if (tech === "Framer Motion") return "text-[#F97316]";
    return "opacity-40";
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white rounded-2xl shadow-sm border border-[#1a1a1a]/5 group">
        <img 
          src={project.img} 
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Category tag */}
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-mono uppercase text-white shadow-lg"
          style={{ backgroundColor: project.accent }}
        >
          {project.category}
        </div>
      </div>

      {/* Project info */}
      <div className="mt-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            {project.title}
          </h3>
          
          <div className="flex gap-3">
            <motion.a 
              href={project.liveLink} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all cursor-none"
              style={{ backgroundColor: project.accent }}
            >
              Live Demo
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href={project.codeLink} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all cursor-none hover:border-[#3B82F6]"
            >
              Source Code
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
              </svg>
            </motion.a>
          </div>
        </div>

        <p className="text-sm opacity-60 leading-relaxed max-w-md">
          {project.description}
        </p>

        <div className="pt-4 border-t border-[#1a1a1a]/5 flex justify-between items-center">
          <div className="flex gap-4">
            {project.stack.map((tech) => (
              <span 
                key={tech} 
                className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${getTechColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="hidden sm:block text-[9px] font-mono italic opacity-30">
            Goal: <span className="text-[#3B82F6]">{project.focus.split(' ')[0]}</span> {project.focus.split(' ').slice(1).join(' ')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Footer Component
function FooterSection() {
  return (
    <footer className="mt-40 text-center py-10 border-t border-[#1a1a1a]/5">
      <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.5em]">
        Build Log — <span className="text-[#3B82F6]">Kunal Mahato</span>
      </p>
    </footer>
  );
}