"use client";
import {useState, useEffect } from "react";
import Image from "next/image"
import "@fontsource/inter"
import '@/app/globals.css';
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
        <a href = "#Mission" className={linkClass}>About Us</a>
        <a href = "#Joinus" className={linkClass}> Get Involved</a>
        <div className = "flex gap-3">
            <a href = "#top">
            <Image src="/tamucolorstacklogo.png"width ={50} height = {50}alt="colorstack info"/>
            </a>
            <div className={` flex font-bold text-2xl items-center gap-1 overflow-hidden ${isScrolled ? "max-w-0 opacity-0" : "max-w-sm opacity-100"}`}>
                <h1>TAMU</h1><h1 className = "text-[#FCB432]">ColorStack</h1>
             </div>
        </div>
        <a href = "#Officers" className={linkClass}>Officers</a>
        <a href = "Sponsor" className={linkClass}>Sponsorship</a>
    </nav>
    ) 
}