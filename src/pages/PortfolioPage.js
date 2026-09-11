import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import GlobalCursor from "../components/GlobalCursor";

import SEO from "../components/SEO";

// Project images
import anojPortfolio from "../images/Anoj_portfolio.png";
import sonvitriFoundation from "../images/Sonvitri_Foundation-Template.png";
import videoEditorTemplate from "../images/Video_Editor-Template.png";
import photographerPortfolio from "../images/photographer-portfolio.png";
import anjaliKumariPortfolio from "../images/Anjali_kumari_makeup-artist_portfolio.png";
import chandanPortfolio from "../images/Chandan_Portfolio_Video-Editor.png";

/* =========================================================
   Commissioned / Friends Projects
========================================================= */

const commissionedProjects = [
  {
    id: 1,
    title: "Travel Portfolio",
    category: "Friend's Project",
    year: "2024",
    img: anojPortfolio,
    description:
      "Minimal portfolio website designed for a designer friend.",
    focus: "Mastering layout shifts & typography",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#3B82F6",
    liveLink: "https://travel-portfolio-peach.vercel.app/",
    client: "Friend - Designer",
  },
  {
    id: 2,
    title: "Chandan Portfolio",
    category: "Friend's Project",
    year: "2025",
    img: chandanPortfolio,
    description:
      "Video editor portfolio website designed for a creative professional friend.",
    focus: "Visual storytelling & dynamic animations",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#8B5CF6",
    liveLink: "https://chandan-portfolio-gilt.vercel.app/",
    client: "Friend - Video Editor",
  },
  {
    id: 3,
    title: "Anjali Kumari",
    category: "Commissioned Work",
    year: "2025",
    img: anjaliKumariPortfolio,
    description:
      "Professional portfolio website for a makeup artist showcasing beauty services.",
    focus: "Visual branding & responsive design",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "#EC4899",
    liveLink: "https://anjali-kumari-portfolio.vercel.app/",
    client: "Makeup Artist",
  },
];

/* =========================================================
   Practice Projects
========================================================= */

const practiceProjects = [
  {
    id: 4,
    title: "NGO Template",
    category: "Practice Project",
    year: "2024",
    img: sonvitriFoundation,
    description:
      "Clean template for non-profit organizations, built as a frontend practice project.",
    focus: "Accessibility & semantic HTML",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#F97316",
    liveLink: "https://ngo-virid-xi.vercel.app/",
  },
  {
    id: 5,
    title: "Photographer Portfolio",
    category: "Practice Project",
    year: "2024",
    img: photographerPortfolio,
    description:
      "Elegant portfolio website for photographers, created as a personal practice project.",
    focus: "Visual storytelling & image optimization",
    stack: ["React", "Tailwind", "Framer Motion", "Masonry Grid"],
    accent: "#8B5CF6",
    liveLink: "https://photographer-portfolio-theta.vercel.app/",
  },
  {
    id: 6,
    title: "Video Editor",
    category: "Practice Project",
    year: "2024",
    img: videoEditorTemplate,
    description:
      "Portfolio template for video editors, built to improve component-based frontend development skills.",
    focus: "Component-based styling",
    stack: ["React", "CSS Modules"],
    accent: "#3B82F6",
    liveLink: "https://video-editor-portfolio-vert.vercel.app/",
  },
];

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  },
};

/* =========================================================
   Portfolio Page
========================================================= */

export default function Portfolio() {
  return (
    <>
      <SEO
        title="Portfolio | Kunal Mahato — Selected Works"
        description="Explore selected web projects by Kunal Mahato, including commissioned websites, creative portfolios, NGO templates, and frontend practice projects."
        path="/portfolio"
      />

      <GlobalCursor />
      <Navbar />

      <main className="min-h-screen bg-[#e3e3e3] text-[#1a1a1a] pt-32 pb-20 px-6 md:px-12 selection:bg-[#1a1a1a] selection:text-[#e3e3e3] cursor-none">
        <motion.div {...pageTransition}>
          {/* Header */}
          <HeaderSection />

          {/* Commissioned Work */}
          <section aria-labelledby="commissioned-heading">
            <SectionDivider
              id="commissioned-heading"
              title="Commissioned & Friends Work"
              subtitle="Projects for clients & friends"
              icon="✨"
            />

            <ProjectsGrid
              projects={commissionedProjects}
              type="commissioned"
            />
          </section>

          {/* Practice Work */}
          <section aria-labelledby="practice-heading">
            <SectionDivider
              id="practice-heading"
              title="Practice Work"
              subtitle="Personal projects & experiments"
              icon="⚡"
            />

            <ProjectsGrid
              projects={practiceProjects}
              type="practice"
            />
          </section>

          {/* Footer */}
          <FooterSection />
        </motion.div>
      </main>
    </>
  );
}

/* =========================================================
   Header
========================================================= */

function HeaderSection() {
  return (
    <header className="max-w-7xl mx-auto mb-20">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <span
          className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40 mb-4 block"
          aria-hidden="true"
        >
          The Build Log — 01
        </span>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
          Selected
          <br />

          <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
            Works
          </span>

          <span className="opacity-20" aria-hidden="true">
            .
          </span>
        </h1>
      </motion.div>
    </header>
  );
}

/* =========================================================
   Section Divider
========================================================= */

function SectionDivider({
  id,
  title,
  subtitle,
  icon,
}) {
  return (
    <div className="max-w-7xl mx-auto mb-12 mt-20 first:mt-0">
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex items-center gap-4"
      >
        <span
          className="text-3xl"
          aria-hidden="true"
        >
          {icon}
        </span>

        <div>
          <h2
            id={id}
            className="text-3xl md:text-4xl font-black tracking-tighter"
          >
            {title}
          </h2>

          <p className="text-sm opacity-50 font-mono tracking-wider mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a]/20 to-transparent ml-4"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

/* =========================================================
   Projects Grid
========================================================= */

function ProjectsGrid({
  projects,
  type,
}) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
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
    </div>
  );
}

/* =========================================================
   Project Card
========================================================= */

function ProjectCard({
  project,
  index,
  type,
}) {
  const getTechColor = (tech) => {
    if (tech === "React" || tech === "Tailwind") {
      return "text-[#3B82F6]";
    }

    if (tech === "Framer Motion") {
      return "text-[#F97316]";
    }

    return "opacity-40";
  };

  const badge =
    type === "practice"
      ? {
          bg: "bg-[#3B82F6]/10",
          text: "text-[#3B82F6]",
          label: "Practice",
        }
      : {
          bg: "bg-[#EC4899]/10",
          text: "text-[#EC4899]",
          label: "Commission",
        };

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`flex flex-col ${
        index % 2 !== 0
          ? "md:mt-24"
          : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white rounded-2xl shadow-sm border border-[#1a1a1a]/5 group">
        <img
          src={project.img}
          alt={`${project.title} website project`}
          loading={index === 0 ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Category */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-mono uppercase text-white shadow-lg"
          style={{
            backgroundColor: project.accent,
          }}
        >
          {project.category}
        </div>

        {/* Project type */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[8px] font-mono uppercase shadow-lg ${badge.bg} ${badge.text}`}
        >
          {badge.label}
        </div>

        {/* Client */}
        {project.client && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[8px] font-mono uppercase">
            {project.client}
          </div>
        )}
      </div>

      {/* Project information */}
      <div className="mt-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            {project.title}
          </h3>

          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all cursor-none"
            style={{
              backgroundColor: project.accent,
            }}
          >
            Live Demo

            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
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
                className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${getTechColor(
                  tech
                )}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="hidden sm:block text-[9px] font-mono italic opacity-30">
            Goal:{" "}
            <span className="text-[#3B82F6]">
              {project.focus.split(" ")[0]}
            </span>{" "}
            {project.focus
              .split(" ")
              .slice(1)
              .join(" ")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   Footer
========================================================= */

function FooterSection() {
  return (
    <footer className="mt-40 text-center py-10 border-t border-[#1a1a1a]/5">
      <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.5em]">
        Build Log —{" "}
        <span className="text-[#3B82F6]">
          Kunal Mahato
        </span>
      </p>
    </footer>
  );
}