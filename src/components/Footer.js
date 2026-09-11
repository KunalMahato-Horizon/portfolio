import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/kunal-mahato-bb7551384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    color: "hover:text-[#3B82F6]",
    label: "LN",
    name: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/KunalMahato-Horizon",
    color: "hover:text-[#F97316]",
    label: "GH",
    name: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/code_with_horizon?igsh=MTUzYTdxajJtNDJ2Nw==",
    color: "hover:text-[#3B82F6]",
    label: "IG",
    name: "Instagram",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="relative h-[600px] w-full bg-[#1a1a1a] text-[#e3e3e3] flex flex-col justify-between p-8 md:p-20"
      style={{
        clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* --------------------------------------------- */}
      {/* Top Section - CTA */}
      {/* --------------------------------------------- */}

      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-2xl">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.5em] text-gray-500 mb-6 block"
            aria-hidden="true"
          >
            End_of_Transmission
          </span>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Let's create something{" "}
            <br />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent italic">
              unforgettable.
            </span>
          </h2>
        </div>

        {/* Back to top */}

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to the top of the page"
          className="group flex flex-col items-center gap-4 cursor-none self-end md:self-auto"
        >
          <div
            className="w-[1px] h-20 bg-white/10 relative overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [-80, 80] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3B82F6] to-[#F97316]"
            />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-[#3B82F6] transition-colors">
            Top
          </span>
        </button>
      </div>

      {/* --------------------------------------------- */}
      {/* Middle Section - Branding */}
      {/* --------------------------------------------- */}

      <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-10">
        {/* Decorative branding */}

        <div
          className="text-[15vw] md:text-[10vw] font-black tracking-tighter uppercase leading-[0.7] opacity-5 select-none"
          aria-hidden="true"
        >
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
            HORIZON.
          </span>
        </div>

        {/* Social links */}

        <nav
          aria-label="Social media profiles"
          className="flex flex-col items-start md:items-end gap-4"
        >
          <p
            className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2"
            aria-hidden="true"
          >
            Connect_
            <span className="text-[#3B82F6]">Channels</span>
          </p>

          <ul className="flex gap-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Kunal Mahato on ${social.name}`}
                    className={`text-xl text-white/40 ${social.color} transition-all duration-500 flex items-center gap-2 group cursor-none`}
                  >
                    <Icon aria-hidden="true" />

                    <span
                      className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    >
                      {social.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* --------------------------------------------- */}
      {/* Bottom Section - Metadata */}
      {/* --------------------------------------------- */}

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[9px] font-mono text-gray-600 uppercase tracking-[0.4em] gap-4 md:gap-0">
        <div className="flex gap-8">
          <span>
            Design:{" "}
            <span className="text-[#3B82F6]">
              Horizon
            </span>{" "}
            Build
          </span>

          <span className="hidden md:block">
            Dev:{" "}
            <span className="text-[#F97316]">
              React
            </span>{" "}
            + Framer
          </span>
        </div>

        <p>
          © {currentYear}{" "}
          <span className="text-[#3B82F6]">
            Kunal Mahato
          </span>
          . All rights reserved.
        </p>

        <div className="hidden md:block">
          Available for{" "}
          <span className="text-[#F97316]">
            worldwide sync
          </span>{" "}
          {"//"} {currentYear}
        </div>
      </div>
    </footer>
  );
}