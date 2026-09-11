import { motion } from "framer-motion";
import PropTypes from "prop-types";

import SEO from "../components/SEO";
import profileImage from "../images/hero.JPG";
import Navbar from "../components/Navbar";
import GlobalCursor from "../components/GlobalCursor";

const skills = [
  { name: "React", level: "Learning & Building", color: "#3B82F6" },
  { name: "Tailwind CSS", level: "Comfortable", color: "#3B82F6" },
  { name: "JavaScript", level: "Building Fundamentals", color: "#3B82F6" },
  { name: "Framer Motion", level: "Exploring", color: "#F97316" },
  { name: "Git / GitHub", level: "Comfortable", color: "#F97316" },
  { name: "Figma", level: "Basic Layouts", color: "#3B82F6" },
  { name: "Responsive Design", level: "Focused", color: "#3B82F6" },
  { name: "Problem Solving", level: "Always Learning", color: "#F97316" },
];

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  },
};

export default function About() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEO
        title="About Kunal Mahato | Frontend Developer"
        description="Learn about Kunal Mahato, a frontend developer focused on React, modern web technologies, responsive design, and interactive user experiences."
        path="/about"
      />

      <GlobalCursor />
      <Navbar />

      <main className="relative bg-[#e3e3e3] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-[#e3e3e3] cursor-none">
        <motion.div {...pageTransition}>
          {/* Hero */}
          <HeroSection />

          {/* Bio */}
          <BioSection />

          {/* Skills */}
          <SkillsSection />

          {/* Contact */}
          <ContactFooter currentYear={currentYear} />
        </motion.div>
      </main>
    </>
  );
}

/* =========================================================
   Hero Section
========================================================= */

function HeroSection() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-24 md:pt-32"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <h1
            id="about-heading"
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8"
          >
            KUNAL
            <br />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
              MAHATO
            </span>
          </h1>

          <div className="flex gap-4 items-center">
            <span
              className="w-12 h-[1px] bg-gradient-to-r from-[#3B82F6] to-[#F97316]"
              aria-hidden="true"
            />

            <p className="text-sm font-mono uppercase tracking-widest opacity-60">
              Frontend Developer —{" "}
              <span className="text-[#3B82F6]">Learning</span>{" "}
              &{" "}
              <span className="text-[#F97316]">Building</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="hidden md:flex justify-end"
        >
          <div className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm max-w-xs">
            <p className="text-[10px] font-mono uppercase opacity-40 mb-3 tracking-widest">
              / <span className="text-[#3B82F6]">Progress</span> Report
            </p>

            <p className="text-base font-medium leading-relaxed opacity-80">
              Currently improving my{" "}
              <span className="text-[#3B82F6]">React</span> skills and
              exploring modern frontend tools to build{" "}
              <span className="text-[#F97316]">
                better user experiences
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   Bio Section
========================================================= */

function BioSection() {
  return (
    <section
      className="py-24 px-6 md:px-12 border-t border-[#1a1a1a]/5"
      aria-labelledby="bio-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <motion.div
            className="aspect-square bg-neutral-200 overflow-hidden rounded-3xl"
            whileInView={{
              opacity: [0, 1],
              scale: [0.98, 1],
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
          >
            <img
              src={profileImage}
              alt="Portrait of Kunal Mahato, frontend developer"
              loading="lazy"
              className="w-full h-full object-cover grayscale brightness-110 contrast-110 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            className="space-y-8"
          >
            <h2
              id="bio-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              I'm a frontend developer who enjoys turning ideas into{" "}
              <span className="opacity-40 italic font-light text-4xl">
                <span className="text-[#3B82F6]">interactive</span> interfaces.
              </span>
            </h2>

            <div className="space-y-6 text-lg text-[#1a1a1a]/70 leading-relaxed max-w-xl">
              <p>
                My journey in web development started with a curiosity for how
                things work on the screen. Today, I focus on{" "}
                <strong className="text-[#3B82F6]">clean layouts</strong> and{" "}
                <strong className="text-[#F97316]">
                  attention to detail
                </strong>
                , ensuring that the code I write is as organized as the design
                it represents.
              </p>

              <p>
                I'm currently deepening my understanding of{" "}
                <span className="text-[#3B82F6]">React</span> and exploring how
                subtle animations with{" "}
                <span className="text-[#F97316]">Framer Motion</span> can
                improve the way people interact with websites.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Skills Section
========================================================= */

function SkillsSection() {
  return (
    <section
      className="py-24 px-6 md:px-12 bg-[#1a1a1a] text-[#e3e3e3] rounded-t-[3rem]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span
              className="font-mono text-[10px] opacity-40 uppercase tracking-[0.3em] block mb-2"
              aria-hidden="true"
            >
              Technical
            </span>

            <h2
              id="skills-heading"
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic"
            >
              The{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
                Toolkit
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.article
              key={skill.name}
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                delay: i * 0.05,
              }}
              className="p-6 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/5 transition-colors group"
            >
              <h3
                className={`text-xl font-bold tracking-tight mb-4 transition-colors ${
                  skill.color === "#3B82F6"
                    ? "group-hover:text-[#3B82F6]"
                    : skill.color === "#F97316"
                    ? "group-hover:text-[#F97316]"
                    : ""
                }`}
              >
                {skill.name}
              </h3>

              <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                {skill.level}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Contact Footer
========================================================= */

function ContactFooter({ currentYear }) {
  return (
    <section
      className="py-32 px-6 text-center"
      aria-labelledby="connect-heading"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: true,
          margin: "-100px",
        }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-sm font-medium opacity-50 mb-6">
          Want to talk about a project or just{" "}
          <span className="text-[#3B82F6]">say hi</span>?
        </p>

        <h2 id="connect-heading" className="sr-only">
          Contact Kunal Mahato
        </h2>

        <a
          href="mailto:horizonhub666@gmail.com"
          aria-label="Email Kunal Mahato"
          className="text-4xl md:text-7xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity inline-block border-b-4 border-[#1a1a1a] hover:border-[#3B82F6] transition-all duration-300 cursor-none"
        >
          Let's{" "}
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
            connect
          </span>
        </a>

        <div className="mt-20 flex flex-wrap justify-center gap-8 text-[10px] font-mono uppercase tracking-widest opacity-30">
          <span>
            Based in <span className="text-[#3B82F6]">India</span>
          </span>

          <span>
            {currentYear} — Portfolio v
            <span className="text-[#F97316]">1</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}

ContactFooter.propTypes = {
  currentYear: PropTypes.number.isRequired,
};