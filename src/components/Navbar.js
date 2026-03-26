import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// 1. MICRO-NAVIGATION: Links to components on the CURRENT page
const localSections = [
  { id: "home", label: "Intro" },
  { id: "about", label: "Mindset" },
  { id: "skills", label: "Capabilities" },
  { id: "projects", label: "Archive" },
  { id: "contact", label: "Connect" },
];

// 2. MACRO-NAVIGATION: Links to entirely DIFFERENT pages
const globalPages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Portfolio", href: "/Portfolio" },
];

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/code_with_horizon?igsh=MTUzYTdxajJtNDJ2Nw==", delay: 0.7 },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/kunal-mahato-bb7551384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", delay: 0.75 },
  { name: "GitHub", href: "https://github.com/KunalMahato-Horizon", delay: 0.8 },
  { name: "Twitter", href: "https://twitter.com", delay: 0.85 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Lock body scroll when main menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Intersection Observer for the Side Navigation (only on home page)
  useEffect(() => {
    if (!isHomePage) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } 
    );

    localSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]); 

  // Handle navigation - FIXED for proper routing
  const handleNavigation = (href) => {
    setIsOpen(false);
    
    // Handle local section links (starts with #)
    if (href.startsWith("#")) {
      // If we're on the home page, just scroll
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 500);
        }
      } else {
        // If we're on another page, navigate to home first, then scroll
        setTimeout(() => {
          window.location.href = `/${href}`;
        }, 500);
      }
    } 
    // Handle global page links
    else {
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  };

  // Determine if we're on a dark background (home page) or light background
  const isDarkBg = isHomePage;

  return (
    <>
      {/* THE VIEWFINDER UI (Main Top Nav) */}
      <div className={`fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none transition-colors duration-300 ${
        isDarkBg ? "text-white" : "text-[#1a1a1a]"
      }`}>
        
        <motion.a 
          href="/"
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavigation("/"); 
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pointer-events-auto font-black text-xl md:text-2xl tracking-tighter hover:opacity-70 transition-opacity cursor-none"
        >
          KUNAL<span className="opacity-40">.</span>
          <span className="text-[#3B82F6]">M</span>
        </motion.a>

        <motion.button
          onClick={() => setIsOpen(true)}
          animate={{ opacity: isOpen ? 0 : 1 }}
          style={{ pointerEvents: isOpen ? "none" : "auto" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-sm font-semibold uppercase tracking-widest flex items-center gap-3 hover:opacity-70 transition-opacity group cursor-none ${
            isDarkBg ? "text-white" : "text-[#1a1a1a]"
          }`}
        >
          <span className="hidden sm:block">Menu</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isDarkBg ? "border-white group-hover:border-white/70" : "border-[#1a1a1a] group-hover:border-[#1a1a1a]/70"
          }`}>
            <motion.div 
              className="w-1 h-1 bg-[#3B82F6] rounded-full group-hover:scale-125 transition-transform"
            ></motion.div>
          </div>
        </motion.button>
      </div>

      {/* THE SIDE NAV (In-Page Micro Navigation) - Only on Home Page */}
      {isHomePage && (
        <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-40 pointer-events-none hidden md:flex">
          {localSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(`#${section.id}`)}
              className="group flex items-center gap-4 pointer-events-auto cursor-none h-8"
            >
              <span 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ease-[0.76,0,0.24,1] text-white
                ${activeSection === section.id 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-4 group-hover:opacity-50 group-hover:translate-x-2"
                }`}
              >
                {section.label}
              </span>
              
              <div className="relative flex items-center justify-center w-4 h-full">
                <div 
                  className={`absolute w-[2px] transition-all duration-500 ease-[0.76,0,0.24,1] origin-right
                  ${activeSection === section.id 
                    ? "h-full scale-x-100 opacity-100 bg-[#3B82F6]" 
                    : `h-2 scale-x-50 opacity-40 bg-white group-hover:h-4 group-hover:opacity-80 ${
                        section.id === "contact" ? "group-hover:bg-[#F97316]" : ""
                      }`
                  }`}
                ></div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* THE FULLSCREEN OVERLAY (Macro Navigation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#111111]/95 backdrop-blur-md text-[#e3e3e3] flex flex-col justify-center px-6 md:px-16 lg:px-24 cursor-none"
          >
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-transparent to-white/20 rounded-full blur-3xl"
              />
            </div>

            <motion.button
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-sm font-semibold uppercase tracking-widest flex items-center gap-3 hover:opacity-70 transition-opacity z-10 cursor-none"
            >
              <span className="hidden sm:block">Close</span>
              <div className="w-8 h-8 rounded-full border border-[#e3e3e3] flex items-center justify-center relative hover:border-[#e3e3e3]/70 transition-all">
                 <span className="absolute w-3 h-[1px] bg-[#e3e3e3] rotate-45"></span>
                 <span className="absolute w-3 h-[1px] bg-[#e3e3e3] -rotate-45"></span>
              </div>
            </motion.button>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-end w-full max-w-7xl mx-auto min-h-[70vh] lg:h-[70vh]">
              
              <div className="flex-1">
                <ul className="flex flex-col space-y-2 md:space-y-4">
                  {globalPages.map((page, i) => {
                    const isCurrentPage = location.pathname === page.href;
                    
                    return (
                      <div key={page.name} className="overflow-hidden">
                        <motion.li
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "100%" }}
                          transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.76, 0, 0.24, 1] }}
                        >
                          <a
                            href={page.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(page.href);
                            }}
                            className={`group flex items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none transition-colors duration-500 cursor-none ${
                              isCurrentPage 
                                ? "text-gray-400 italic" 
                                : "text-[#e3e3e3] hover:text-gray-500"
                            }`}
                          >
                            <span className={`text-sm md:text-base lg:text-lg font-mono font-light mr-4 md:mr-6 lg:mr-8 -translate-y-2 md:-translate-y-3 lg:-translate-y-4 block ${
                              isCurrentPage 
                                ? "text-white" 
                                : i === 1 ? "text-[#3B82F6]" : "text-gray-600"
                            }`}>
                              0{i + 1}
                            </span>
                            <span className="inline-block transition-all duration-500 group-hover:translate-x-4 group-hover:tracking-tighter">
                              {page.name}
                              {i === 1 && (
                                <span className="text-[#3B82F6] text-sm ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  ✦
                                </span>
                              )}
                            </span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#F97316] group-hover:w-full transition-all duration-700 ease-out"></span>
                          </a>
                        </motion.li>
                      </div>
                    );
                  })}
                </ul>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 lg:mt-0 lg:ml-16 flex flex-col lg:items-end gap-8 lg:gap-12"
              >
                <div>
                  <motion.h4 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
                  >
                    Connect
                  </motion.h4>
                  <ul className="flex flex-col space-y-2">
                    {socials.map((social) => (
                      <motion.li
                        key={social.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: social.delay }}
                      >
                        <a 
                          href={social.href} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-base md:text-lg hover:transition-colors underline-offset-4 hover:underline group flex items-center gap-2 cursor-none ${
                            social.name === "LinkedIn" 
                              ? "text-[#3B82F6] hover:text-[#3B82F6]/80" 
                              : social.name === "GitHub" 
                              ? "text-[#F97316] hover:text-[#F97316]/80"
                              : social.name === "Instagram"
                              ? "text-[#3B82F6] hover:text-[#3B82F6]/80"
                              : "hover:text-gray-400"
                          }`}
                        >
                          <span>{social.name}</span>
                          <span className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            ↗
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <motion.h4 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
                  >
                    Resume
                  </motion.h4>
                  <motion.a 
                    href="https://drive.google.com/file/d/10AWOS32iMBrFnYqK_FOaB_NxYRmZmQCZ/view?usp=sharing" 
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center px-6 py-3 border border-[#e3e3e3] rounded-full text-sm font-semibold uppercase tracking-widest overflow-hidden cursor-none"
                  >
                    <span className="relative z-10 group-hover:text-[#111111] transition-colors duration-300">
                      Download PDF
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#F97316] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]"></div>
                  </motion.a>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs text-gray-600 mt-4 lg:mt-8 tracking-[0.2em]"
                >
                  ✦ <span className="text-[#3B82F6]">INDIA</span> / <span className="text-[#F97316]">2026</span> ✦
                </motion.p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}