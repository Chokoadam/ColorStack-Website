import Image from "next/image";

export default function Sponsor() {
  return (
    <section className="bg-[#Fdfaf2] text-[#333] py-12 px-8 md:px-24 font-sans">
      
      {/* Section Header */}
      <div className="mb-12 flex justify-center">
        <h2 className="text-2xl md:text-3xl font-medium border-b-[3px] border-[#500000] text-[#500000] inline-block pb-2 px-4 tracking-wide">
          Sponsor Us
        </h2>
      </div>

      {/* Row 1: Text Left, Image Right */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-3xl md:text-4xl lg:text-5xl text-center font-light leading-snug px-4">
            Ready to invest in the next<br className="hidden lg:block"/> generation of diverse tech leaders?
          </p>
        </div>
        <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-md">
          {/* Added object-bottom here to shift focus downward */}
          <Image 
            src="/CSGroupPhoto1.jpg" 
            alt="ColorStack group" 
            fill 
            className="object-cover object-bottom" 
          />
        </div>
      </div>

      {/* Row 2: Image Left, Text Right */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16">
        <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-md">
          <Image 
            src="/CSGroupPhoto2.jpg" 
            alt="Students talking" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-3xl md:text-4xl lg:text-5xl text-center font-light leading-snug px-4">
            Build a strong community of<br className="hidden lg:block"/> motivated students with<br className="hidden lg:block"/> technical skills and career-ready<br className="hidden lg:block"/> experience!
          </p>
        </div>
      </div>

      {/* Bottom Section: Hover to Reveal */}
      <div className="relative h-[350px] w-full rounded-3xl overflow-hidden group shadow-lg border-b-8 border-[#500000]">
        
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/NickCoolPhoto.jpg" 
            alt="Students posing" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-[#500000]/85"></div>
        </div>

        {/* Default View: Static Text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-white text-3xl md:text-4xl font-light text-center px-6 drop-shadow-md leading-tight">
            Host targeted recruiting events on<br/> campus or virtually
          </h3>
        </div>

        {/* Hover View: Static Content */}
        <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-8 flex flex-col items-center justify-center">
          <h3 className="text-white text-2xl md:text-3xl font-medium mb-6 text-center border-b-2 border-white pb-2">
            Recruiting Options
          </h3>
          <ul className="text-white font-light text-lg md:text-xl space-y-3 max-w-3xl list-disc pl-6">
            <li>On-campus info sessions and tech talks</li>
            <li>Virtual resume reviews and mock interviews</li>
            <li>Direct access to our talent pool for summer internships</li>
            <li>Um something idk</li>
            <li>Um something idk</li>
          </ul>
        </div>

      </div>
    </section>
  );
}