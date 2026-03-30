import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";

const skillGroups = [
  { name: "JavaScript", x: -20, y: -15, type: "Logic", id: "js", color: "#3B82F6" },
  { name: "React", x: 10, y: -25, type: "Library", id: "react", color: "#3B82F6" },
  { name: "Blender 3D", x: -30, y: 15, type: "Motion", id: "blender", color: "#F97316" },
  { name: "Tailwind", x: 25, y: 10, type: "Design", id: "tw", color: "#3B82F6" },
  { name: "Three.js", x: 35, y: -10, type: "Spatial", id: "three", color: "#3B82F6" },
  { name: "Framer Motion", x: -5, y: 30, type: "Anim", id: "fm", color: "#F97316" },
  { name: "Figma", x: -35, y: -30, type: "UI/UX", id: "figma", color: "#3B82F6" },
  { name: "Node.js", x: 15, y: 25, type: "Backend", id: "node", color: "#F97316" },
];

export default function Skills() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  }, [mouseX, mouseY, isMobile]);

  // Memoized transforms for coordinate display
  const xCoord = useTransform(mouseX, (v) => v.toFixed(3));
  const yCoord = useTransform(mouseY, (v) => v.toFixed(3));

  return (
    <section 
      id="skills" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#e3e3e3] text-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden py-20 lg:py-0"
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]"></div>
      </div>

      {/* Coordinate display */}
      <div className="absolute top-10 right-10 hidden lg:flex flex-col items-end font-mono text-[10px] text-gray-400">
        <div className="flex gap-4">
          <span>LAT_X: <motion.span>{xCoord}</motion.span></span>
          <span>LNG_Y: <motion.span>{yCoord}</motion.span></span>
        </div>
        <span className="mt-1 uppercase tracking-widest">
          System_Status: <span className="text-[#3B82F6]">Active</span>
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[18vw] lg:text-[12vw] font-black tracking-tighter uppercase leading-[0.8] opacity-10 lg:opacity-100"
          >
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
              TOOLKIT
            </span>
          </motion.h2>
        </div>

        {/* Skill nodes container */}
        <div className="relative w-full min-h-[50vh] lg:h-screen flex flex-wrap justify-center items-center gap-4 lg:block">
          
          {/* Connection lines */}
          {!isMobile && (
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
              <line x1="50%" y1="50%" x2="35%" y2="35%" stroke="black" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="65%" y2="65%" stroke="black" strokeWidth="1" />
              <line x1="35%" y1="35%" x2="25%" y2="60%" stroke="black" strokeWidth="1" />
              <line x1="65%" y1="65%" x2="75%" y2="40%" stroke="black" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="45%" y2="75%" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="55%" y2="25%" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          )}

          {skillGroups.map((skill, i) => (
            <SkillNode 
              key={skill.id} 
              skill={skill} 
              smoothX={smoothX} 
              smoothY={smoothY} 
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-400">
            <span className="text-[#3B82F6]">Topology</span>{" // 2.6.0"}
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillNode({ skill, smoothX, smoothY, isMobile }) {
  // Parallax movement
  const moveX = useTransform(smoothX, [-0.5, 0.5], [skill.x - 30, skill.x + 30]);
  const moveY = useTransform(smoothY, [-0.5, 0.5], [skill.y - 30, skill.y + 30]);

  // Memoize color classes
  const colorStyles = useMemo(() => {
    const isBlue = skill.color === "#3B82F6";
    const isOrange = skill.color === "#F97316";
    
    return {
      isBlue,
      isOrange,
      dotColor: isBlue ? "bg-[#3B82F6]" : isOrange ? "bg-[#F97316]" : "bg-[#1a1a1a]",
      borderColor: isBlue ? "border-[#3B82F6]/20" : isOrange ? "border-[#F97316]/20" : "border-[#1a1a1a]/10",
      hoverBg: isBlue ? "group-hover:bg-[#3B82F6]" : isOrange ? "group-hover:bg-[#F97316]" : "group-hover:bg-[#1a1a1a]",
      hoverBorder: isBlue ? "group-hover:border-[#3B82F6]" : isOrange ? "group-hover:border-[#F97316]" : "group-hover:border-[#1a1a1a]",
      hoverText: isBlue ? "group-hover:text-white" : isOrange ? "group-hover:text-white" : "group-hover:text-[#e3e3e3]",
      typeColor: isBlue ? "text-[#3B82F6]" : isOrange ? "text-[#F97316]" : "text-gray-400"
    };
  }, [skill.color]);

  return (
    <motion.div
      style={!isMobile ? { 
        x: moveX, 
        y: moveY, 
        left: `${50 + skill.x}%`, 
        top: `${50 + skill.y}%`,
        position: "absolute" 
      } : {}}
      className="lg:-translate-x-1/2 lg:-translate-y-1/2 group"
    >
      <div className="relative flex items-center">
        {/* Node dot */}
        <div className={`hidden lg:block w-1.5 h-1.5 rounded-full mr-4 group-hover:scale-[2] transition-transform duration-500 ${colorStyles.dotColor}`}></div>
        
        {/* Skill card */}
        <div className={`px-4 py-2 lg:px-6 lg:py-3 border transition-all duration-500 shadow-sm group-hover:backdrop-blur-md ${colorStyles.borderColor} ${colorStyles.hoverBg} ${colorStyles.hoverBorder} bg-[#e3e3e3]/80 rounded-sm`}>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono opacity-30 group-hover:opacity-60 border-r border-current pr-2">
              {skill.id.toUpperCase()}
            </span>
            <h3 className={`text-xs lg:text-lg font-bold tracking-tight uppercase whitespace-nowrap transition-colors ${colorStyles.hoverText}`}>
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Tooltip with skill details */}
        <div className="absolute -right-16 hidden xl:group-hover:block pointer-events-none">
          <div className="flex flex-col font-mono text-[8px] leading-none">
            <span className={colorStyles.typeColor}>
              TYPE: {skill.type}
            </span>
            <span className="text-gray-400">STATUS: OK</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}