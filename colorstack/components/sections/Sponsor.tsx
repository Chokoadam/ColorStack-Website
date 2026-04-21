"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Sponsor() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [step, setStep] = useState(1);

  // ========================================================================
  // 1. SCROLL LENGTHS (CHECKPOINTS)
  // These decimals represent how far down the user has scrolled (0 to 1).
  // Tweak these decimals to make specific sections last longer or shorter!
  // ========================================================================
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let nextStep = 1;
    if (latest < 0.15) nextStep = 1;       // 0% - 15%: Slide 1
    else if (latest < 0.40) nextStep = 2;  // 15% - 40%: Slide 2
    else if (latest < 0.55) nextStep = 3;  // 40% - 55%: Full Screen 1
    else if (latest < 0.80) nextStep = 4;  // 55% - 80%: Full Screen 2
    else nextStep = 5;                     // 80% - 100%: Full Screen 3

    setStep((prev) => (prev !== nextStep ? nextStep : prev));
  });

  const transitionConfig = { duration: 0.8, ease: "easeInOut" } as const;

  return (
    // NOTE: If the ENTIRE sequence feels too long or short, change "h-[500vh]"
    <section ref={containerRef} className="relative h-[500vh] bg-[#Fdfaf2] text-[#333] font-sans">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ========================================================================
          2. HEADER VERTICAL POSITIONING
          Increase numbers (e.g., from md:top-32 to top-40) to push "Sponsor Us" text lower, decrease to move it up.
          ========================================================================
        */}
        <motion.div 
          animate={{ opacity: step <= 2 ? 1 : 0 }} 
          transition={transitionConfig}
          className="absolute top-24 md:top-32 left-0 right-0 z-50 flex justify-left px-8 md:px-24"
        >
          <h2 className="text-xl md:text-2xl font-medium border-b-[3px] border-[#500000] text-[#500000] inline-block pb-2 px-4 tracking-wide">
            Sponsor Us
          </h2>
        </motion.div>

        {/* ========================================================================
          3. MAIN CONTENT
          ========================================================================
        */}
        <div className="absolute inset-x-0 z-10 top-[55%] -translate-y-1/2">
          
          {/* --- Slide 1: Image Right --- */}
          <motion.div 
            animate={{ 
              x: step === 1 ? "0vw" : "50vw", 
              opacity: step === 1 ? 1 : 0 
            }}
            transition={transitionConfig}
            className="absolute inset-0 flex flex-col md:flex-row items-center gap-10 pl-8 md:pl-24"
          >
            <div className="flex-1 flex items-center justify-center w-full pr-8 md:pr-0">
              <p className="text-2xl md:text-3xl lg:text-4xl text-center font-light leading-loose px-4">
                Ready to invest in the next<br className="hidden lg:block"/> generation of diverse tech leaders?
              </p>
            </div>
            <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-l-3xl overflow-hidden shadow-md">
              <Image src="/CSGroupPhoto1.jpg" alt="ColorStack group" fill className="object-cover object-bottom" />
            </div>
          </motion.div>

          {/* --- Slide 2: Image Left --- */}
          <motion.div 
            animate={{ 
              x: step < 2 ? "-50vw" : step === 2 ? "0vw" : "50vw",
              opacity: step === 2 ? 1 : 0 
            }}
            transition={transitionConfig}
            className="absolute inset-0 flex flex-col-reverse md:flex-row items-center gap-10 pr-8 md:pr-24 pointer-events-none"
          >
            <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-r-3xl overflow-hidden shadow-md">
              <Image src="/CSGroupPhoto2.jpg" alt="Students talking" fill className="object-cover" />
            </div>
            <div className="flex-1 flex items-center justify-center w-full pl-8 md:pl-0">
              <p className="text-2xl md:text-3xl lg:text-4xl text-center font-light leading-relaxed px-4">
                Build a strong community of<br className="hidden lg:block"/> motivated students with<br className="hidden lg:block"/> technical skills and career-ready<br className="hidden lg:block"/> experience!
              </p>
            </div>
          </motion.div>

        </div>

        {/* --- Slide 3a: Full Screen 1 --- */}
        <motion.div 
          animate={{ 
            y: step < 3 ? "100vh" : "0vh",
            opacity: step > 3 ? 0 : 1 
          }}
          transition={transitionConfig}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <Image src="/DuoPic1.jpg" alt="Officers Posing" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl md:text-4xl font-light text-center px-6 drop-shadow-md leading-relaxed">
              Host targeted recruiting events on<br/> campus or virtually
            </h3>
          </div>
        </motion.div>

        {/* --- Slide 3b: Full Screen Placeholder 1 --- */}
        <motion.div 
          animate={{ opacity: step === 4 ? 1 : 0 }}
          transition={transitionConfig}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <Image src="/CSGroupPhoto1.jpg" alt="Placeholder 1" fill className="object-cover object-bottom" />
          <div className="absolute inset-0 bg-black/60 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl md:text-4xl font-light text-center px-6 drop-shadow-md leading-relaxed">
              Connect directly with rising<br/> tech talent
            </h3>
          </div>
        </motion.div>

        {/* --- Slide 3c: Full Screen Placeholder 2 --- */}
        <motion.div 
          animate={{ opacity: step === 5 ? 1 : 0 }}
          transition={transitionConfig}
          className="absolute inset-0 z-40 pointer-events-none"
        >
          <Image src="/CSGroupPhoto2.jpg" alt="Placeholder 2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl md:text-4xl font-light text-center px-6 drop-shadow-md leading-relaxed">
              Help shape the future of<br/> tech diversity
            </h3>
          </div>
        </motion.div>

      </div>
    </section>
  );
}