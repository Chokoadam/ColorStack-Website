"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Variants } from "motion/react";

// Define the 5 text stages with both text AND alignment
// Each stage represents a distinct scroll range with its own text and alignment
const textStages = [
  {
    text: "Learn how to break into the tech industry",
    alignment: "left" as const,
    threshold: 0,
  },
  {
    text: "Join a community of students in tech",
    alignment: "center" as const,
    threshold: 0.2,
  },
  {
    text: "Gain access to exclusive resources",
    alignment: "right" as const,
    threshold: 0.4,
  },
  {
    text: "Increase your technical skillset",
    alignment: "center" as const,
    threshold: 0.6,
  },
  {
    text: "Expand your opportunities",
    alignment: "left" as const,
    threshold: 0.8,
  },
];

function FloatingPillBar({ children }: { children: React.ReactNode }) {
  const [viewportHeight, setViewportHeight] = useState(900);
  const { scrollY, scrollYProgress } = useScroll();
  const startY = Math.max(32, viewportHeight * 0.18);
  const endY = Math.max(startY, viewportHeight - 78 - 28);
  const targetY = useTransform(scrollYProgress, [0, 1], [startY, endY]);
  const pillY = useSpring(targetY, {
    stiffness: 94,
    damping: 15,
    mass: 1.08,
  });
  const pillOpacity = useTransform(scrollY, [0, 120], [0.92, 1]);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={overlayContainer}>
      <div style={barFrame}>
        <motion.div
          style={{
            ...barSurface,
            y: pillY,
            opacity: pillOpacity,
          }}
          initial={false}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default function DynamicBar() {
  // State to track the current text index (0-4)
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    // Calculate scroll progress and update text index
    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        // Get total scrollable height: document height minus viewport height
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;

        // Calculate scroll progress as a percentage (0 to 1)
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

        // Determine which text stage to display based on scroll progress
        // Find the stage with the highest threshold that doesn't exceed current scroll progress
        let newIndex = 0;
        for (let i = textStages.length - 1; i >= 0; i--) {
          if (progress >= textStages[i].threshold) {
            newIndex = i;
            break;
          }
        }

        setCurrentTextIndex(newIndex);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current stage's alignment from textStages array
  const currentAlignment = textStages[currentTextIndex].alignment;

  return (
    <FloatingPillBar>
      <AnimatePresence mode="wait">
        {/* Fade in/out text when index changes (text and alignment change together) */}
        <motion.div
          key={currentTextIndex}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ ...textContent, textAlign: currentAlignment }}
        >
          {textStages[currentTextIndex].text}
        </motion.div>
      </AnimatePresence>
    </FloatingPillBar>
  );
}

// Text fade in/out animation variants
// Uses opacity transitions for smooth fade effect (0.4s duration)
const textVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

/**
 * ==============   Styles   ================
 */

const overlayContainer: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 60,
  pointerEvents: "none",
};

const barFrame: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(100vw, 1200px)",
  display: "flex",
  justifyContent: "center",
};

// The pill itself carries the scroll-following spring motion.
const barSurface: React.CSSProperties = {
  width: "min(96vw, 1240px)",
  minHeight: "78px",
  padding: "18px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "999px",
  background: "rgba(80, 0, 0, 0.86)",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  boxShadow: "0 16px 44px rgba(24, 6, 6, 0.22)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  willChange: "transform",
};

// Text styling - make it white and easily readable with dynamic text alignment
const textContent: React.CSSProperties = {
  color: "white",
  fontSize: "clamp(1rem, 2vw, 1.5rem)",
  fontWeight: "600",
  textAlign: "center",
  letterSpacing: "0.4px",
  width: "100%",
  textWrap: "balance",
};
