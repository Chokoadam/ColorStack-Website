"use client";
import { motion } from "motion/react"
import {useState, useEffect } from "react";
import Image from "next/image"
import "@fontsource/inter"
import '@/app/globals.css';
import { animate } from "motion";
export default function Navbar() {
    const linkClass = "text-white hover:text-[#FCB432] transition-colors duration-200";
    const [isScrolled, setisScrolled] = useState(false);
    useEffect (()=> {
        const handleScroll = () => {
            setisScrolled(window.scrollY > 50)
        };
        window.addEventListener("scroll",  handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[]);

    return (
    <nav className="fixed top-0 w-full bg-[#500000] items-center flex gap-16 justify-center z-50">
        <motion.a 
            whileHover={{scale: 1.05}}
            href = "#Mission" className={linkClass}>About Us</motion.a>
        <motion.a 
            whileHover={{scale: 1.05}}
            href = "#Joinus" className={linkClass}> Get Involved</motion.a>
        <div className = "flex gap-3">
            <a href = "#top">
            <Image src="/tamucolorstacklogo.png"width ={50} height = {50}alt="colorstack info"/>
            </a>
            <motion.div 
            initial={{ maxWidth: 200, opacity: 1, scaleX: 1 }}
            className="flex font-bold text-2xl items-center gap-1 overflow-hidden"
            animate={{
                scaleX: isScrolled ? 0: 1,
                opacity: isScrolled ? 0 : 1,
                maxWidth: isScrolled ? 0: 200
            }}
            style={{ originX: -0.15}}
            transition={{
                scaleX: { duration: 0.225, ease: "easeInOut" },
                opacity: { duration: 0.15, delay: 0.2 },
                maxWidth: {duration: 0.45, ease:"easeInOut" }
            }}
            >
                <h1>TAMU</h1><h1 className = "text-[#FCB432]">ColorStack</h1>
             </motion.div>
        </div>
        <motion.a 
            whileHover={{scale: 1.05}}
            href = "#Officers" className={linkClass}>Officers</motion.a>
        <motion.a
            whileHover={{scale: 1.05}}
            href = "Sponsor" className={linkClass}>Sponsorship</motion.a>
    </nav>
    ) 
}