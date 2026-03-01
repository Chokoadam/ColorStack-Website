"use client";
import {useState, useEffect } from "react";
import Image from "next/image"
import "@fontsource/inter"
import '@/app/globals.css';
export default function Navbar() {
    const [isScrolled, setisScrolled] = useState(false);
    useEffect (()=> {
        const handleScroll = () => {
            setisScrolled(window.scrollY > 50)
        };
        window.addEventListener("scroll",  handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[]);

    return (
    <nav className ="fixed top-0 w-full bg-[#500000] items-center flex gap-16 justify-center">
        <a href = "#Mission" >About Us</a>
        <a href = "#Joinus" > Get Involved</a>
        <div className = "flex gap-3">
            <Image src="/tamucolorstacklogo.png"width ={50} height = {50}alt="colorstack info"/>
            <div className={` flex font-bold text-2xl items-center gap-1 ${isScrolled ? "max-w-0 opacity-0" : "max-w-sm opacity-100"}`}>
                <h1>TAMU</h1><h1 className = "text-[#FCB432]">ColorStack</h1>
             </div>
        </div>
        <a href = "#Officers" >Officers</a>
        <a href = "Sponsor">Sponsorship</a>
    </nav>
    ) 
}