"use client";

import Image from "next/image";
import { Inter, Lora } from "next/font/google";
import { useState as useReactState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Mission() {

    const [isNational, setIsNational] = useReactState([true, true, true]);
    const [isVisible, setIsVisible] = useReactState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const togglePanel = (index: number) => {
        setIsNational((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const panels = [
        {
            titleStr: "Mission",
            nationalText: "Increase the number of Black and Latinx Computer Science graduates that go on to launch rewarding technical careers.",
            localText: "Empower local students at Texas A&M with a community-driven safety net that cultivates academic and professional success.",
            image: "/club_images/54942457360_b113afef10_b.jpg",
        },
        {
            titleStr: "Strategy",
            nationalText: "Organizing a portfolio of tools, resources, and opportunities to ensure that every member is equipped to complete their degree and land a full-time, technical job.",
            localText: "Providing weekly workshops, personalized resume reviews, and direct networking events with top tech companies specific to our chapter.",
            image: "/club_images/Screenshot 2026-02-21 at 11.51.04 AM.png",
        },
        {
            titleStr: "Vision",
            nationalText: "A future where Black and Latinx technologists are at the forefront of innovation.",
            localText: "A thriving pipeline of diverse leaders emerging from Texas A&M and redefining the landscape of the tech industry.",
            image: "/club_images/Screenshot 2026-02-21 at 11.52.33 AM.png",
        },
    ];

    return (
        <section ref={sectionRef} id="mission" className={`${inter.className} w-full bg-[#0E1524] py-20 px-6 sm:px-12 flex flex-col items-center justify-center relative overflow-hidden`}>
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center">

                {/* Header Section */}
                <h2 className={`${lora.className} text-white text-4xl md:text-5xl font-bold mb-4 ${isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`} style={{ animationFillMode: "forwards" }}>
                    National
                </h2>
                <p className={`text-gray-200 text-lg md:text-xl md:w-2/3 text-center mb-16 ${isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`} style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
                    A nation-wide community built on a virtual support network
                </p>

                {/* Flipping Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mb-16 perspective-1000">
                    {panels.map((panel, idx) => (
                        <div
                            key={idx}
                            className={`relative w-full aspect-[4/5] cursor-pointer group ${isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
                            onClick={() => togglePanel(idx)}
                            style={{ perspective: "1000px", animationDelay: `${300 + idx * 150}ms`, animationFillMode: "forwards" }}
                        >
                            {/* Inner animated wrapper */}
                            <div
                                className={`relative w-full h-full transition-all duration-700`}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: isNational[idx] ? "rotateY(0deg)" : "rotateY(180deg)"
                                }}
                            >
                                {/* --- FRONT FACE (NATIONAL / TEAL) --- */}
                                <div
                                    className={`absolute inset-0 w-full h-full shadow-outline overflow-hidden rounded-2xl bg-[#3eb1a4] shadow-2xl transition-opacity duration-300 ${!isNational[idx] ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
                                >
                                    {/* Content (Solid Color Background) */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white z-10">
                                        <h3 className={`${lora.className} text-2xl font-bold mb-6`}>{panel.titleStr}</h3>
                                        <p className="text-sm md:text-base leading-relaxed font-medium text-white/90">
                                            {panel.nationalText}
                                        </p>
                                    </div>
                                </div>

                                {/* --- BACK FACE (LOCAL / MAROON) --- */}
                                <div
                                    className={`absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-2xl transition-opacity duration-300 ${isNational[idx] ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg) translateZ(1px)"
                                    }}
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image src={panel.image} alt="Background" fill className="object-cover" />
                                    </div>
                                    {/* Maroon Tint Overlay */}
                                    <div className="absolute inset-0 bg-[#500000]/85 mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-[#500000]/70" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white z-10">
                                        <h3 className={`${lora.className} text-2xl font-bold mb-6`}>{panel.titleStr} (Local)</h3>
                                        <p className="text-sm md:text-base leading-relaxed font-medium text-white/90">
                                            {panel.localText}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd7XhHese9Nl5zMt3_j6fbc_5f-KT7UIxPFH2HF5cJDGDqJ2A/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-8 py-4 bg-[#E8A820] text-[#0E1524] text-lg font-bold rounded-lg hover:bg-[#d4991c] hover:scale-105 transition-all duration-300 shadow-xl ${isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
                    style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                    Become a National Member!
                </a>

            </div>
        </section>
    );
}