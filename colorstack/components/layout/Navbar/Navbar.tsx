import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-[#500000] h-20 flex items-center justify-between px-8 md:px-16 shadow-md relative z-50">
        
        {/* Left side: Logos (Linking externally) */}
        <div className="flex items-center space-x-4">
            
            {/* TAMU ColorStack Logo */}
            {/* Change w-[60px] and h-[60px] to make the circle bigger or smaller! */}
            <a 
              href="https://tamucolorstack.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative block w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-white bg-white hover:scale-105 transition-transform shadow-sm flex-shrink-0"
            >
                <Image 
                  src="/colorstack_tamu.png" 
                  alt="TAMU ColorStack" 
                  fill 
                  className="object-cover" 
                />
            </a>

            <a 
              href="https://www.colorstack.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative block w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-white bg-white hover:scale-105 transition-transform shadow-sm flex-shrink-0"
            >
                 <Image 
                   src="/colorstack_national.jpg" 
                   alt="ColorStack National" 
                   fill 
                   className="object-cover" 
                 />
            </a>
            
        </div>
    </nav>
  );
};

export default Navbar;