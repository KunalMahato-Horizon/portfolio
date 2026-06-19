import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import your local images
import anojPortfolio from "../images/Anoj_portfolio.png";
import sonvitriFoundation from "../images/Sonvitri_Foundation-Template.png";
import videoEditorTemplate from "../images/Video_Editor-Template.png";

const projects = [
  { 
    id: "01", 
    title: "ANOJ", 
    cat: "Portfolio Design", 
    img: anojPortfolio,
    liveLink: "https://travel-portfolio-peach.vercel.app/",
  },
  { 
    id: "02", 
    title: "NGO", 
    cat: "Foundation Template", 
    img: sonvitriFoundation,
    liveLink: "https://ngo-virid-xi.vercel.app/",
  },
  { 
    id: "03", 
    title: "VIDEO ED.", 
    cat: "Creative Portfolio", 
    img: videoEditorTemplate,
    liveLink: "https://video-editor-portfolio-vert.vercel.app/",
  },
];

export default function Projects() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    enabled: !isMobile // Disable scroll tracking on mobile
  });

  // Only calculate scroll for desktop/tablet
  const totalCards = projects.length + 1;
  const cardWidth = isTablet ? 80 : 50;
  const totalScrollDistance = -(totalCards * cardWidth);
  
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0vw", `${totalScrollDistance}vw`]);
  const x = useSpring(xRaw, { stiffness: 80, damping: 30, mass: 0.8 });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Mobile: Simple vertical layout
  if (isMobile) {
    return (
      <section id="projects" className="bg-[#e3e3e3] py-12 px-4">
        <div className="max-w-sm mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tighter">
              Projects
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#F97316] mt-2"></div>
          </div>

          {/* Project Cards - Vertical Layout */}
          <div className="space-y-8">
            {projects.map((project) => (
              <MobileProjectCard key={project.id} project={project} />
            ))}
            
            {/* View All Card */}
            <MobileViewAllCard projects={projects} />
          </div>
        </div>
      </section>
    );
  }

  // Desktop/Tablet: Horizontal scroll layout
  return (
    <section 
      id="projects" 
      ref={targetRef} 
      className="relative bg-[#e3e3e3] cursor-none"
      style={{ height: isTablet ? '250vh' : '250vh' }}
    >
      
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Massive Dynamic Background Text - Hidden on tablet */}
        {!isTablet && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
            <motion.h2 
              style={{ x: bgTextX }}
              className="text-[30vw] font-black text-[#1a1a1a]/5 leading-none uppercase select-none whitespace-nowrap"
            >
              Archive Archive
            </motion.h2>
          </div>
        )}

        {/* Horizontal Moving List */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-16 lg:gap-32 px-[5vw] md:px-[10vw] relative z-10 w-max"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              progress={scrollYProgress} 
              index={index} 
              isTablet={isTablet}
            />
          ))}
          
          {/* View All Projects Card */}
          <ViewAllCard 
            projects={projects} 
            scrollYProgress={scrollYProgress} 
            isTablet={isTablet}
          />
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-6 md:bottom-12 left-4 md:left-6 right-4 md:right-12 flex justify-between items-end z-30 pointer-events-none">
          <div className="flex flex-col text-[#1a1a1a]">
            <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-50 mb-1 md:mb-2">
              {isTablet ? "Scroll" : "Scroll / Explore"}
            </span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-[10px] md:text-xs font-mono font-bold">01</span>
            <div className="w-20 md:w-32 lg:w-64 h-[2px] bg-[#1a1a1a]/10 relative overflow-hidden pointer-events-auto">
              <motion.div 
                style={{ scaleX: scrollYProgress }} 
                className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#F97316] origin-left"
              />
            </div>
            <span className="text-[10px] md:text-xs font-mono font-bold">0{projects.length + 1}</span>
          </div>
        </div>

        {/* Floating Portfolio Link - Hidden on tablet */}
        {!isTablet && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute top-32 right-12 z-40 hidden lg:block"
          >
            <Link 
              to="/portfolio"
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest hover:opacity-50 transition-opacity cursor-none group"
            >
              <span>Full Portfolio</span>
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-[#F97316] group-hover:w-12 transition-all"></div>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}

// Mobile Project Card Component
function MobileProjectCard({ project }) {
  const getColor = () => {
    if (project.id === "01") return "from-[#3B82F6] to-[#3B82F6]/70";
    if (project.id === "02") return "from-[#F97316] to-[#F97316]/70";
    return "from-[#1a1a1a] to-[#1a1a1a]/70";
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={project.img} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${getColor()} opacity-40`}></div>
        
        {/* Overlay with Preview Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-[#1a1a1a] font-bold uppercase tracking-wider rounded-full text-sm hover:scale-105 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            Live Preview →
          </a>
        </div>

        {/* Project ID Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
            project.id === "01" ? "bg-[#3B82F6] text-white" :
            project.id === "02" ? "bg-[#F97316] text-white" :
            "bg-[#1a1a1a] text-white"
          }`}>
            {project.id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tighter">
            {project.title}
          </h3>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-bold uppercase tracking-wider ${
              project.id === "01" ? "text-[#3B82F6]" :
              project.id === "02" ? "text-[#F97316]" :
              "text-[#1a1a1a]"
            }`}
          >
            Live →
          </a>
        </div>
        <p className="text-sm text-[#1a1a1a]/60 font-medium">
          {project.cat}
        </p>
      </div>
    </div>
  );
}

// Mobile View All Card
function MobileViewAllCard({ projects }) {
  return (
    <Link to="/portfolio" className="block">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-8 text-center">
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-6xl font-black text-[#e3e3e3]/20">✦</span>
          <h3 className="text-3xl font-black text-white mt-4 tracking-tighter">
            VIEW ALL
            <span className="block text-transparent bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text">
              PROJECTS
            </span>
          </h3>
          <p className="text-white/60 text-sm mt-2">
            {projects.length}+ Projects Available
          </p>
          <div className="mt-4 px-6 py-2 bg-white text-[#1a1a1a] font-bold uppercase tracking-wider rounded-full text-sm hover:scale-105 transition-transform">
            Explore All →
          </div>
        </div>
      </div>
    </Link>
  );
}

// Desktop/Tablet Project Card
function ProjectCard({ project, progress, index, isTablet }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const imageX = useTransform(progress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      className="group relative flex flex-col justify-center w-[60vw] lg:w-[50vw] h-screen flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Grid-Breaking Typography */}
      <div className="absolute top-[10%] md:top-[15%] lg:top-[20%] left-0 md:-left-8 lg:-left-12 z-20 pointer-events-none px-4 md:px-0">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-1 md:mb-2 lg:mb-4">
          <span className={`text-[8px] md:text-[10px] lg:text-xs font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em] uppercase ${
            project.id === "01" ? "text-[#3B82F6]" : 
            project.id === "02" ? "text-[#F97316]" : 
            "text-[#1a1a1a]"
          }`}>
             {project.id}
          </span>
          <div className={`h-[1px] w-6 md:w-8 ${
            project.id === "01" ? "bg-[#3B82F6]" : 
            project.id === "02" ? "bg-[#F97316]" : 
            "bg-[#1a1a1a]"
          }`}></div>
          <span className={`text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider md:tracking-widest ${
            project.id === "01" ? "text-[#3B82F6]" : 
            project.id === "02" ? "text-[#F97316]" : 
            "text-[#1a1a1a]"
          }`}>
             {project.cat}
          </span>
        </div>

        <h3 className="text-6xl lg:text-8xl xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.85] text-[#1a1a1a] drop-shadow-2xl mix-blend-difference text-white">
          {project.title.split(' ').map((word, i) => (
            <span key={i} className="block">
              {word}
              {project.id === "03" && i === 0 && (
                <span className="text-[#F97316] text-sm md:text-base lg:text-xl ml-1 align-top">✦</span>
              )}
            </span>
          ))}
        </h3>
      </div>

      {/* The Image Frame */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-[#dcdcdc] border border-[#1a1a1a]/5 shadow-2xl z-10 mt-8 md:mt-12">
        <motion.img
          style={{ x: imageX, scale: 1.15 }}
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover grayscale-[40%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[0.25,1,0.5,1]"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none"></div>
        
        {/* Live Link Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 to-[#1a1a1a]/80 backdrop-blur-sm flex items-center justify-center z-30"
        >
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className={`px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest rounded-full transition-all duration-300 cursor-none ${
              project.id === "01" ? "bg-[#3B82F6] hover:bg-[#3B82F6]/80" :
              project.id === "02" ? "bg-[#F97316] hover:bg-[#F97316]/80" :
              "bg-white hover:bg-[#e3e3e3] text-[#1a1a1a]"
            } text-white`}
            onClick={(e) => e.stopPropagation()}
          >
            Live Preview →
          </motion.a>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-20 flex justify-between items-center w-full mt-4 md:mt-6 lg:mt-8">
        <motion.a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className={`group/live flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 pointer-events-auto ${
            project.id === "01" ? "text-[#3B82F6]" :
            project.id === "02" ? "text-[#F97316]" :
            "text-[#1a1a1a]"
          }`}
        >
          <span>Live Demo</span>
          <svg className="w-2 h-2 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </motion.a>
      </div>

      {/* Tooltip */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-[15%] left-[5%] z-40 hidden md:block pointer-events-none"
      >
        <div className={`text-white text-[8px] px-2 py-1 rounded-full uppercase tracking-widest ${
          project.id === "01" ? "bg-[#3B82F6]" :
          project.id === "02" ? "bg-[#F97316]" :
          "bg-[#1a1a1a]"
        }`}>
          Hover image for live preview
        </div>
      </motion.div>
    </div>
  );
}

// Desktop/Tablet View All Card
function ViewAllCard({ projects, scrollYProgress, isTablet }) {
  return (
    <div className="group relative flex flex-col justify-center w-[60vw] lg:w-[50vw] h-screen flex-shrink-0">
      <div className="absolute top-[10%] md:top-[15%] lg:top-[20%] left-0 md:-left-8 lg:-left-12 z-20 pointer-events-none px-4 md:px-0">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-1 md:mb-2 lg:mb-4">
          <span className="text-[8px] md:text-[10px] lg:text-xs font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em] text-[#1a1a1a] uppercase">
            04
          </span>
          <div className="h-[1px] w-6 md:w-8 bg-[#1a1a1a]"></div>
          <span className="text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider md:tracking-widest text-[#1a1a1a]">
            Explore More
          </span>
        </div>

        <h3 className="text-6xl lg:text-8xl xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.85] text-[#1a1a1a] drop-shadow-2xl mix-blend-difference text-white">
          VIEW
          <span className="block">ALL</span>
          <span className="block text-[#3B82F6]">WORK</span>
        </h3>
      </div>

      {/* Image Frame */}
      <Link to="/portfolio" className="cursor-pointer">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-[#dcdcdc] border border-[#1a1a1a]/5 shadow-2xl z-10 mt-8 md:mt-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl md:text-8xl font-black text-[#e3e3e3]/20">✦</span>
              <div className="grid grid-cols-3 gap-1 md:gap-2 mt-3 md:mt-4 opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#e3e3e3] rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/90 to-[#F97316]/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 md:gap-4 p-4">
              <span className="px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-white text-[#1a1a1a] text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest rounded-full active:scale-95 transition-transform">
                View Full Portfolio →
              </span>
              <span className="text-white text-[10px] md:text-xs uppercase tracking-wider">
                {projects.length}+ Projects
              </span>
            </div>
          </motion.div>
        </div>
      </Link>

      {/* Bottom Link */}
      <div className="relative z-20 flex justify-end w-full mt-4 md:mt-6 lg:mt-8">
        <Link 
          to="/portfolio"
          className="group/btn flex items-center gap-2 md:gap-3 lg:gap-4 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#1a1a1a] transition-all duration-300 pointer-events-auto"
        >
          Explore All Work
          <div className="w-6 md:w-8 lg:w-12 h-[1px] bg-gradient-to-r from-[#3B82F6] to-[#F97316] group-hover/btn:w-8 md:group-hover/btn:w-12 lg:group-hover/btn:w-16 transition-all duration-300"></div>
          <span className="text-xs opacity-50 group-hover/btn:translate-x-1 md:group-hover/btn:translate-x-2 transition-all">→</span>
        </Link>
      </div>
    </div>
  );
}