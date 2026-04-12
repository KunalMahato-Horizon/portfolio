import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import heroKyro1 from '../images/hero-kyro-1.png';
import heroKyro2 from '../images/hero-kyro-2.png';
import heroKyro3 from '../images/hero-kyro-3.png';

export default function Hero() {
  const [hoverState, setHoverState] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  
  const heroImages = [heroKyro1, heroKyro2, heroKyro3];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Cursor motion values with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle cursor movement
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isMobile]);

  // Memoized cursor variants
  const cursorVariants = useMemo(() => ({
    default: { 
      width: 16, 
      height: 16, 
      backgroundColor: "#3B82F6", 
      mixBlendMode: "difference" 
    },
    image: { 
      width: isMobile ? 16 : 120, 
      height: isMobile ? 16 : 120, 
      backgroundColor: "#F97316", 
      mixBlendMode: "difference" 
    },
    link: { 
      width: isMobile ? 16 : 50, 
      height: isMobile ? 16 : 50, 
      backgroundColor: "#3B82F6", 
      mixBlendMode: "difference" 
    }
  }), [isMobile]);

  const handleImageHover = useCallback(() => setHoverState("image"), []);
  const handleLinkHover = useCallback(() => setHoverState("link"), []);
  const handleDefaultHover = useCallback(() => setHoverState("default"), []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  // Unique transition effect: staggered corners
  const cornerVariants = {
    initial: { 
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
    },
    animate: { 
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: { 
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: { 
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      transition: { 
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Reveal from center
  const centerRevealVariants = {
    initial: { 
      clipPath: "circle(0% at 50% 50%)"
    },
    animate: { 
      clipPath: "circle(100% at 50% 50%)",
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: { 
      clipPath: "circle(0% at 50% 50%)",
      transition: { 
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  // Staggered stripes
  const stripesVariants = {
    initial: { 
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
    },
    animate: { 
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: { 
        duration: 0.6,
        delay: 0.2
      }
    },
    exit: { 
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      transition: { 
        duration: 0.4
      }
    }
  };

  // Choose random transition on each change
  const [transitionStyle, setTransitionStyle] = useState("corner");
  
  useEffect(() => {
    const styles = ["corner", "center", "stripes"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setTransitionStyle(randomStyle);
  }, [currentImageIndex]);

  const getTransitionVariants = () => {
    switch(transitionStyle) {
      case "center": return centerRevealVariants;
      case "stripes": return stripesVariants;
      default: return cornerVariants;
    }
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#e3e3e3] overflow-x-hidden md:overflow-hidden cursor-none"
    >
      {/* Custom cursor - hidden on mobile */}
      {!isMobile && (
        <motion.div
          variants={cursorVariants}
          animate={hoverState}
          style={{ 
            left: smoothX, 
            top: smoothY, 
            x: "-50%", 
            y: "-50%" 
          }}
          className="fixed z-[9999] pointer-events-none rounded-full flex items-center justify-center overflow-hidden hidden md:flex backdrop-blur-sm"
        >
          <motion.span 
            animate={{ 
              opacity: hoverState === "image" ? 1 : 0,
              scale: hoverState === "image" ? 1 : 0.5
            }}
            className="text-black font-bold text-sm tracking-widest uppercase whitespace-nowrap"
          >
            Explore
          </motion.span>
        </motion.div>
      )}

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen md:h-screen flex flex-col md:block max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-0">
        
        {/* Hero title */}
        <div className="relative md:absolute z-10 left-0 md:left-[4%] lg:left-[6%] top-0 md:top-[18%] lg:top-[15%] w-full md:w-auto pt-8 md:pt-0">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[18vw] md:text-[15vw] lg:text-[11vw] font-black leading-[0.8] tracking-[-0.03em] text-[#1a1a1a] md:text-white md:mix-blend-difference"
          >
            KUNAL
          </motion.h1>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[18vw] md:text-[15vw] lg:text-[11vw] font-black leading-[0.8] tracking-[-0.03em] text-[#1a1a1a] md:text-white md:mix-blend-difference md:pl-[4vw] lg:pl-[5vw]"
          >
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent md:text-white md:mix-blend-difference">
              MAHATO
            </span>
          </motion.h1>
          
          {/* Title descriptor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden md:flex absolute -bottom-12 left-1 items-center gap-3"
          >
            <div className="w-12 h-px bg-gradient-to-r from-[#3B82F6] to-[#F97316] opacity-50"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-current opacity-60">
              Frontend Developer
            </span>
          </motion.div>
        </div>

        {/* Hero image with unique transitions */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          onMouseEnter={handleImageHover}
          onMouseLeave={handleDefaultHover}
          className="relative z-0 w-full md:w-[45vw] lg:w-[32vw] mx-auto md:mx-0 md:absolute md:right-[5%] lg:right-[8%] mt-8 md:mt-0 md:top-[12%] lg:top-[10%]"
        >
          <div className="relative group">
            {/* Image frame */}
            <div className="absolute -inset-4 border border-[#1a1a1a]/10 rounded-sm hidden md:block"></div>
            <div className="absolute -inset-2 border border-[#1a1a1a]/5 rounded-sm hidden md:block"></div>
            
            {/* Image with parallax effect */}
            <motion.div 
              className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-lg md:rounded-sm"
              animate={!isMobile ? {
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
              } : {}}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  variants={getTransitionVariants()}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <img 
                    src={heroImages[currentImageIndex]} 
                    alt={`Kunal Mahato`}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Minimalist navigation dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 cursor-none ${
                      idx === currentImageIndex 
                        ? 'w-6 h-1.5 bg-[#3B82F6]' 
                        : 'w-1.5 h-1.5 bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60'
                    } rounded-full`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1a1a1a] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-none z-20 shadow-md"
                aria-label="Previous image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1a1a1a] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-none z-20 shadow-md"
                aria-label="Next image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </motion.div>

            {/* Image counter */}
            <div className="absolute -bottom-8 right-0 items-center gap-3 text-[#1a1a1a]/40 text-xs hidden md:flex">
              <span>—</span>
              <span className="text-[#3B82F6]">{String(currentImageIndex + 1).padStart(2, '0')}</span>
              <span className="w-4 h-px bg-[#1a1a1a]/20"></span>
              <span>{String(heroImages.length).padStart(2, '0')}</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative md:absolute z-20 w-full md:w-auto left-0 md:left-[4%] lg:left-[6%] right-0 md:right-[4%] lg:right-[6%] bottom-0 md:bottom-12 mt-12 md:mt-0"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
            {/* Description */}
            <div className="max-w-md">
              <p className="text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed">
                Building modern, high-performing websites that help businesses grow.
                <span className="block mt-1 font-medium text-[#1a1a1a]/90">that help brands lead.
                <div><span className="text-[#3B82F6]">React</span> • 
                <span className="text-[#F97316]"> Node.js</span> • 
                <span className="text-[#3B82F6]"> Tailwind</span> • 
                <span className="text-[#F97316]"> MongoDB</span></div></span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-30">
              <a 
                href="#contact"
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleDefaultHover}
                className="group relative px-6 py-3 bg-[#1a1a1a] text-[#e3e3e3] rounded-full overflow-hidden w-full sm:w-auto text-center cursor-none"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 font-medium text-sm group-hover:text-black transition-colors duration-500">
                  Start Project
                </span>
              </a>
              
              <a 
                href="#work" 
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleDefaultHover}
                className="px-6 py-3 bg-[#1a1a1a] text-[#e3e3e3] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-all duration-300 w-full sm:w-auto text-center cursor-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                View Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="inline-block text-[#3B82F6] group-hover:text-[#F97316] transition-colors"
                >
                  →
                </motion.span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "30%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-[2%] top-[15%] w-px bg-gradient-to-b from-transparent via-[#3B82F6]/30 to-transparent hidden md:block"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/30">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#3B82F6]/30 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}