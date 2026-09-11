import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kunal-mahato-bb7551384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    id: "01",
    color: "#3B82F6",
  },
  {
    name: "GitHub",
    href: "https://github.com/KunalMahato-Horizon",
    id: "02",
    color: "#F97316",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/code_with_horizon?igsh=MTUzYTdxajJtNDJ2Nw==",
    id: "03",
    color: "#3B82F6",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-screen bg-[#e3e3e3] text-[#1a1a1a] flex flex-col cursor-none"
    >
      {/* Structural dividers */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#1a1a1a]/5 hidden lg:block" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1a1a1a]/5 hidden lg:block" />
      </div>

      {/* Header section */}
      <header className="flex-[1.2] flex flex-col items-center justify-center p-6 md:p-20 border-b border-[#1a1a1a]/10">
        <div className="overflow-hidden">
          <motion.h2
            id="contact-heading"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[16vw] lg:text-[13vw] font-black tracking-tighter uppercase leading-[0.75]"
          >
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>
        </div>

        <div className="overflow-hidden mt-2">
          <motion.p
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[16vw] lg:text-[13vw] font-black tracking-tighter uppercase leading-[0.75] italic opacity-20"
          >
            Studio
          </motion.p>
        </div>
      </header>

      {/* Main content grid */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <InquirySection />
        <SocialSection />
      </div>
    </section>
  );
}


// --------------------------------------------------
// Inquiry Section
// --------------------------------------------------

function InquirySection() {
  return (
    <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1a1a1a]/10 group">
      <div>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-400 block mb-12"
          aria-hidden="true"
        >
          ( Inquiry_Portal )
        </span>

        <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
          Have an <span className="text-[#3B82F6]">Idea</span>?
        </h3>

        <p className="text-gray-500 max-w-sm text-sm lg:text-base leading-relaxed mb-10">
          I'm currently available for selective freelance projects
          and{" "}
          <span className="text-[#F97316]">
            creative collaborations
          </span>{" "}
          that need thoughtful design, development, and interactive
          experiences.
        </p>
      </div>

      <a
        href="mailto:Horizonhub666@gmail.com"
        aria-label="Email Kunal Mahato at Horizonhub666@gmail.com"
        className="relative inline-block text-xl lg:text-2xl font-bold tracking-tight w-fit group cursor-none"
      >
        <span className="text-[#3B82F6] group-hover:text-[#3B82F6]/80 transition-colors">
          Horizonhub666
        </span>
        @gmail.com

        <div
          className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#F97316] origin-left scale-x-100 group-hover:scale-x-50 transition-transform duration-500"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}


// --------------------------------------------------
// Social Section
// --------------------------------------------------

function SocialSection() {
  return (
    <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between">
      <div>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-400 block mb-12"
          aria-hidden="true"
        >
          ( Global_Network )
        </span>

        <h3 className="sr-only">
          Kunal Mahato on social platforms
        </h3>

        <nav aria-label="Social media profiles">
          <ul className="flex flex-col">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 15 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  aria-label={`Visit Kunal Mahato on ${link.name}`}
                  className="flex items-center justify-between py-4 border-b border-[#1a1a1a]/5 last:border-0 group cursor-none"
                >
                  <span
                    className={`text-2xl lg:text-3xl font-black uppercase tracking-tighter transition-colors ${
                      link.name === "GitHub"
                        ? "group-hover:text-[#F97316]"
                        : "group-hover:text-[#3B82F6]"
                    }`}
                  >
                    {link.name}
                  </span>

                  <span
                    className={`text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity ${
                      link.name === "GitHub"
                        ? "group-hover:text-[#F97316]"
                        : "group-hover:text-[#3B82F6]"
                    }`}
                    aria-hidden="true"
                  >
                    LINK_{link.id} ↗
                  </span>
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer metadata */}
      <footer className="mt-16 pt-8 border-t border-[#1a1a1a]/5 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
            © 2026{" "}
            <span className="text-[#3B82F6]">Horizon</span>{" "}
            Portfolio
          </span>

          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest italic">
            Designed for{" "}
            <span className="text-[#F97316]">Motion</span>
          </span>
        </div>

        <div
          className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center group"
          aria-hidden="true"
        >
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#3B82F6] to-[#F97316] rounded-full animate-pulse group-hover:scale-150 transition-transform" />
        </div>
      </footer>
    </div>
  );
}