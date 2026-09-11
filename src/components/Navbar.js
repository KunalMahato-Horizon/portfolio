import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

// Local navigation links for the homepage
const localSections = [
  { id: "home", label: "Intro" },
  { id: "about", label: "Mindset" },
  { id: "work", label: "Archive" },
  { id: "skills", label: "Capabilities" },
  { id: "contact", label: "Connect" },
];

// Global page links
const globalPages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
];

// Social links
const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/code_with_horizon?igsh=MTUzYTdxajJtNDJ2Nw==",
    delay: 0.7,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kunal-mahato-bb7551384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    delay: 0.75,
  },
  {
    name: "GitHub",
    href: "https://github.com/KunalMahato-Horizon",
    delay: 0.8,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  // Lock page scrolling while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Intersection Observer for homepage sections
  useEffect(() => {
    if (!isHomePage) return;

    const sections = localSections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter((section) => section.element);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestMatch = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > bestRatio
          ) {
            bestRatio = entry.intersectionRatio;
            bestMatch = entry.target.id;
          }
        });

        if (bestMatch) {
          setActiveSection(bestMatch);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section.element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Scroll to a homepage section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
  }, []);

  // Navigation handler
  const handleNavigation = useCallback(
    (href, isSection = false) => {
      setIsOpen(false);

      if (isSection) {
        const sectionId = href.replace("#", "");

        if (isHomePage) {
          setTimeout(() => {
            scrollToSection(sectionId);
          }, 300);
        } else {
          navigate("/");

          setTimeout(() => {
            scrollToSection(sectionId);
          }, 500);
        }

        return;
      }

      setTimeout(() => {
        navigate(href);
      }, 300);
    },
    [isHomePage, navigate, scrollToSection]
  );

  // Logo navigation
  const handleLogoClick = useCallback(
    (event) => {
      event.preventDefault();

      if (isHomePage) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setActiveSection("home");
      } else {
        navigate("/");
      }

      setIsOpen(false);
    },
    [isHomePage, navigate]
  );

  return (
    <>
      {/* --------------------------------------------- */}
      {/* Top Navigation */}
      {/* --------------------------------------------- */}

      <header
        className={`fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none transition-colors duration-300 ${
          isHomePage ? "text-white" : "text-[#1a1a1a]"
        }`}
      >
        {/* Logo */}

        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Go to Kunal Mahato homepage"
          className="pointer-events-auto font-black text-xl md:text-2xl tracking-tighter hover:opacity-70 transition-opacity cursor-none"
        >
          KUNAL
          <span className="opacity-40">.</span>
          <span className="text-[#3B82F6]">M</span>
        </button>

        {/* Menu Button */}

        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          animate={{ opacity: isOpen ? 0 : 1 }}
          style={{
            pointerEvents: isOpen ? "none" : "auto",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          className={`text-sm font-semibold uppercase tracking-widest flex items-center gap-3 hover:opacity-70 transition-opacity group cursor-none ${
            isHomePage ? "text-white" : "text-[#1a1a1a]"
          }`}
        >
          <span className="hidden sm:block">Menu</span>

          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              isHomePage
                ? "border-white group-hover:border-white/70"
                : "border-[#1a1a1a] group-hover:border-[#1a1a1a]/70"
            }`}
          >
            <motion.div
              className="w-1 h-1 bg-[#3B82F6] rounded-full group-hover:scale-125 transition-transform"
              aria-hidden="true"
            />
          </div>
        </motion.button>
      </header>

      {/* --------------------------------------------- */}
      {/* Homepage Side Navigation */}
      {/* --------------------------------------------- */}

      {isHomePage && (
        <nav
          aria-label="Homepage sections"
          className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-40 pointer-events-none hidden md:flex"
        >
          {localSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() =>
                handleNavigation(`#${section.id}`, true)
              }
              aria-label={`Go to ${section.label} section`}
              aria-current={
                activeSection === section.id
                  ? "true"
                  : undefined
              }
              className="group flex items-center gap-4 pointer-events-auto cursor-none h-8"
            >
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ease-[0.76,0,0.24,1] text-white ${
                  activeSection === section.id
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 group-hover:opacity-50 group-hover:translate-x-2"
                }`}
              >
                {section.label}
              </span>

              <div className="relative flex items-center justify-center w-4 h-full">
                <div
                  className={`absolute w-[2px] transition-all duration-500 ease-[0.76,0,0.24,1] origin-right ${
                    activeSection === section.id
                      ? "h-full scale-x-100 opacity-100 bg-[#3B82F6]"
                      : `h-2 scale-x-50 opacity-40 bg-white group-hover:h-4 group-hover:opacity-80 ${
                          section.id === "contact"
                            ? "group-hover:bg-[#F97316]"
                            : ""
                        }`
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </nav>
      )}

      {/* --------------------------------------------- */}
      {/* Fullscreen Menu */}
      {/* --------------------------------------------- */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              clipPath:
                "circle(0% at calc(100% - 3rem) 3rem)",
            }}
            animate={{
              clipPath:
                "circle(150% at calc(100% - 3rem) 3rem)",
            }}
            exit={{
              clipPath:
                "circle(0% at calc(100% - 3rem) 3rem)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[60] bg-[#111111]/95 backdrop-blur-md text-[#e3e3e3] flex flex-col justify-center px-6 md:px-16 lg:px-24 cursor-none"
          >
            {/* Background Animation */}

            <div
              className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-transparent to-white/20 rounded-full blur-3xl"
              />
            </div>

            {/* Close Button */}

            <motion.button
              type="button"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close navigation menu"
              className="absolute top-6 right-6 md:top-10 md:right-10 text-sm font-semibold uppercase tracking-widest flex items-center gap-3 hover:opacity-70 transition-opacity z-10 cursor-none"
            >
              <span className="hidden sm:block">Close</span>

              <div className="w-8 h-8 rounded-full border border-[#e3e3e3] flex items-center justify-center relative hover:border-[#e3e3e3]/70 transition-all">
                <span
                  className="absolute w-3 h-[1px] bg-[#e3e3e3] rotate-45"
                  aria-hidden="true"
                />
                <span
                  className="absolute w-3 h-[1px] bg-[#e3e3e3] -rotate-45"
                  aria-hidden="true"
                />
              </div>
            </motion.button>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-end w-full max-w-7xl mx-auto min-h-[70vh] lg:h-[70vh]">
              {/* Main Navigation */}

              <nav
                aria-label="Main navigation"
                className="flex-1"
              >
                <ul className="flex flex-col space-y-2 md:space-y-4">
                  {globalPages.map((page, i) => {
                    const isCurrentPage =
                      location.pathname === page.href;

                    return (
                      <li
                        key={page.name}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "100%" }}
                          transition={{
                            duration: 0.6,
                            delay: 0.2 + i * 0.08,
                            ease: [0.76, 0, 0.24, 1],
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleNavigation(
                                page.href,
                                false
                              )
                            }
                            aria-current={
                              isCurrentPage
                                ? "page"
                                : undefined
                            }
                            className={`group relative flex items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none transition-colors duration-500 cursor-none w-full text-left ${
                              isCurrentPage
                                ? "text-gray-400 italic"
                                : "text-[#e3e3e3] hover:text-gray-500"
                            }`}
                          >
                            <span
                              className={`text-sm md:text-base lg:text-lg font-mono font-light mr-4 md:mr-6 lg:mr-8 -translate-y-2 md:-translate-y-3 lg:-translate-y-4 block ${
                                isCurrentPage
                                  ? "text-white"
                                  : i === 1
                                  ? "text-[#3B82F6]"
                                  : "text-gray-600"
                              }`}
                              aria-hidden="true"
                            >
                              0{i + 1}
                            </span>

                            <span className="inline-block transition-all duration-500 group-hover:translate-x-4 group-hover:tracking-tighter">
                              {page.name}

                              {i === 1 && (
                                <span
                                  className="text-[#3B82F6] text-sm ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-hidden="true"
                                >
                                  ✦
                                </span>
                              )}
                            </span>

                            <span
                              className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#F97316] group-hover:w-full transition-all duration-700 ease-out"
                              aria-hidden="true"
                            />
                          </button>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Social Links & Resume */}

              <motion.aside
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                }}
                className="mt-12 lg:mt-0 lg:ml-16 flex flex-col lg:items-end gap-8 lg:gap-12"
              >
                {/* Social Links */}

                <div>
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
                  >
                    Connect
                  </motion.h2>

                  <ul className="flex flex-col space-y-2">
                    {socials.map((social) => (
                      <motion.li
                        key={social.name}
                        initial={{
                          x: -20,
                          opacity: 0,
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                        }}
                        transition={{
                          delay: social.delay - 0.1,
                        }}
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit Kunal Mahato on ${social.name}`}
                          className={`text-base md:text-lg underline-offset-4 hover:underline group flex items-center gap-2 cursor-none ${
                            social.name === "LinkedIn"
                              ? "text-[#3B82F6] hover:text-[#3B82F6]/80"
                              : social.name === "GitHub"
                              ? "text-[#F97316] hover:text-[#F97316]/80"
                              : "text-[#3B82F6] hover:text-[#3B82F6]/80"
                          }`}
                        >
                          <span>{social.name}</span>

                          <span
                            className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Resume */}

                <div>
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
                  >
                    Resume
                  </motion.h2>

                  <motion.a
                    href="https://drive.google.com/file/d/10AWOS32iMBrFnYqK_FOaB_NxYRmZmQCZ/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Open Kunal Mahato's resume PDF"
                    className="group relative inline-flex items-center justify-center px-6 py-3 border border-[#e3e3e3] rounded-full text-sm font-semibold uppercase tracking-widest overflow-hidden cursor-none"
                  >
                    <span className="relative z-10 group-hover:text-[#111111] transition-colors duration-300">
                      Download PDF
                    </span>

                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#F97316] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]"
                      aria-hidden="true"
                    />
                  </motion.a>
                </div>

                {/* Footer Text */}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-xs text-gray-600 mt-4 lg:mt-8 tracking-[0.2em]"
                  aria-hidden="true"
                >
                  ✦{" "}
                  <span className="text-[#3B82F6]">
                    INDIA
                  </span>{" "}
                  /{" "}
                  <span className="text-[#F97316]">
                    2026
                  </span>{" "}
                  ✦
                </motion.p>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}