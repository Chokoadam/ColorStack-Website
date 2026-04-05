import Image from "next/image";

export default function Sponsor() {
  return (
    <section className="bg-[#Fdfaf2] text-[#333] py-12 font-sans overflow-x-hidden">
      
      {/* Section Header */}
      <div className="mb-12 flex justify-left px-8 md:px-24">
        <h2 className="text-xl md:text-2xl font-medium border-b-[3px] border-[#500000] text-[#500000] inline-block pb-2 px-4 tracking-wide">
          Sponsor Us
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 pl-8 md:pl-24">
        <div className="flex-1 flex items-center justify-center w-full pr-8 md:pr-0">
          <p className="text-2xl md:text-3xl lg:text-4xl text-center font-light leading-loose px-4">
            Ready to invest in the next<br className="hidden lg:block"/> generation of diverse tech leaders?
          </p>
        </div>
        <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-l-3xl overflow-hidden shadow-md">
          <Image 
            src="/CSGroupPhoto1.jpg" 
            alt="ColorStack group" 
            fill 
            className="object-cover object-bottom" 
          />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16 pr-8 md:pr-24">
        <div className="flex-1 relative h-80 md:h-[450px] w-full rounded-r-3xl overflow-hidden shadow-md">
          <Image 
            src="/CSGroupPhoto2.jpg" 
            alt="Students talking" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex-1 flex items-center justify-center w-full pl-8 md:pl-0">
          <p className="text-2xl md:text-3xl lg:text-4xl text-center font-light leading-relaxed px-4">
            Build a strong community of<br className="hidden lg:block"/> motivated students with<br className="hidden lg:block"/> technical skills and career-ready<br className="hidden lg:block"/> experience!
          </p>
        </div>
      </div>

      <div className="px-8 md:px-24">
        <div className="relative h-[750px] w-full rounded-3xl overflow-hidden group shadow-lg">
          
          {/* Background Image & Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/DuoPic1.jpg" 
              alt="Officers Posing" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300"></div>
          </div>

          {/* Final Image Text */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-light text-center px-6 drop-shadow-md leading-relaxed">
              Host targeted recruiting events on<br/> campus or virtually
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}