import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import GlobalCursor from "../components/GlobalCursor";

// Import project images
import anojPortfolio from "../images/Anoj_portfolio.png";
import sonvitriFoundation from "../images/Sonvitri_Foundation-Template.png";
import videoEditorTemplate from "../images/Video_Editor-Template.png";
import photographerPortfolio from "../images/photographer-portfolio.png";
import anjaliKumariPortfolio from "../images/Anjali_kumari_makeup-artist_portfolio.png";
import chandanPortfolio from "../images/Chandan_Portfolio_Video-Editor.png";

// Commissioned/Friends Projects (Work done for others)
const commissionedProjects = [
  {
    id: 1,
    title: "Travel PORTFOLIO",
    category: "Friend's Project",
    year: "2024",
    img: anojPortfolio,
    description: "Minimal portfolio website designed for a designer friend.",
    focus: "Mastering layout shifts & typography",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#3B82F6",
    liveLink: "https://travel-portfolio-peach.vercel.app/",
    client: "Friend - Designer"
  },
  {
    id: 2,
    title: "CHANDAN PORTFOLIO",
    category: "Friend's Project",
    year: "2025",
    img: chandanPortfolio,
    description: "Video editor portfolio website designed for a creative professional friend.",
    focus: "Visual storytelling & dynamic animations",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#8B5CF6",
    liveLink: "https://chandan-portfolio-gilt.vercel.app/",
    client: "Friend - Video Editor"
  },
  {
    id: 3,
    title: "ANJALI KUMARI",
    category: "Commissioned Work",
    year: "2025",
    img: anjaliKumariPortfolio,
    description: "Professional portfolio website for a makeup artist showcasing beauty services.",
    focus: "Visual branding & responsive design",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#EC4899",
    liveLink: "https://anjali-kumari-portfolio.vercel.app/",
    client: "Makeup Artist"
  },
];

// Practice Projects (Your personal practice work)
const practiceProjects = [
  {
    id: 4,
    title: " NGO TEMPLATE",
    category: "Practice Project",
    year: "2024",
    img: sonvitriFoundation,
    description: "Clean template for non-profit organizations - built for practice.",
    focus: "Accessibility & semantic HTML",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#F97316",
    liveLink: "https://ngo-virid-xi.vercel.app/",
  },
  {
    id: 5,
    title: "PHOTOGRAPHER PORTFOLIO",
    category: "Practice Project",
    year: "2024",
    img: photographerPortfolio,
    description: "Elegant portfolio website for photographers - personal practice project.",
    focus: "Visual storytelling & image optimization",
    stack: ["React", "Tailwind", "Framer Motion", "Masonry Grid"],
    accent: "#8B5CF6",
    liveLink: "https://photographer-portfolio-theta.vercel.app/",
  },
  {
    id: 6,
    title: "VIDEO EDITOR",
    category: "Practice Project",
    year: "2024",
    img: videoEditorTemplate,
    description: "Portfolio template for video editors - built for skill development.",
    focus: "Component-based styling",
    stack: ["React", "CSS Modules"],
    accent: "#3B82F6",
    liveLink: "https://video-editor-portfolio-vert.vercel.app/",
  },
];

export default function Portfolio() {
  const pageTransition = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }), []);

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
        
        <motion.div {...pageTransition}>
          
          {/* Header section */}
          <HeaderSection />
          
          {/* Commissioned Projects Section - Now on top */}
          <SectionDivider 
            title="Commissioned & Friends Work" 
            subtitle="Projects for clients & friends"
            icon="✨"
          />
          <ProjectsGrid projects={commissionedProjects} type="commissioned" />
          
          {/* Practice Projects Section - Now below */}
          <SectionDivider 
            title="Practice Work" 
            subtitle="Personal projects & experiments"
            icon="⚡"
          />
          <ProjectsGrid projects={practiceProjects} type="practice" />
          
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

// Section Divider Component
function SectionDivider({ title, subtitle, icon }) {
  return (
    <div className="max-w-7xl mx-auto mb-12 mt-20 first:mt-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <span className="text-3xl">{icon}</span>
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
            {title}
          </h2>
          <p className="text-sm opacity-50 font-mono tracking-wider mt-1">
            {subtitle}
          </p>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a]/20 to-transparent ml-4"></div>
      </motion.div>
    </div>
  );
}

// Projects Grid Component
function ProjectsGrid({ projects, type }) {
  return (
    <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            type={type}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, index, type }) {
  const getTechColor = (tech) => {
    if (tech === "React" || tech === "Tailwind") return "text-[#3B82F6]";
    if (tech === "Framer Motion") return "text-[#F97316]";
    return "opacity-40";
  };

  // Different badge styles based on project type
  const getBadgeStyle = () => {
    if (type === "practice") {
      return {
        bg: "bg-[#3B82F6]/10",
        text: "text-[#3B82F6]",
        label: "Practice"
      };
    } else {
      return {
        bg: "bg-[#EC4899]/10",
        text: "text-[#EC4899]",
        label: "Commission"
      };
    }
  };

  const badge = getBadgeStyle();

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

        {/* Project type badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[8px] font-mono uppercase shadow-lg ${badge.bg} ${badge.text}`}>
          {badge.label}
        </div>

        {/* Client badge for commissioned work */}
        {project.client && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[8px] font-mono uppercase">
            {project.client}
          </div>
        )}
      </div>

      {/* Project info */}
      <div className="mt-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            {project.title}
          </h3>
          
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
        </div>

        <p className="text-sm opacity-60 leading-relaxed max-w-md">
          {project.description}
        </p>

        <div className="pt-4 border-t border-[#1a1a1a]/5 flex justify-between items-center">
          <div className="flex gap-4 flex-wrap">
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