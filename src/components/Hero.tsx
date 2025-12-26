'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

const TypewriterText = () => {
  const words = ["Wisdom", "Knowledge", "Heritage", "Teachings", "Scriptures", "Manuscripts", "Texts", "Pecha", "Buddhism","Annotation"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          // Deleting characters
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        } else if (currentText.length < currentWord.length) {
          // Adding characters
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setIsPaused(true);
        }
      },
      (() => {
        if (isPaused) return 2000;
        if (isDeleting) return 50;
        return 100;
      })()
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <span className="block text-2xl sm:text-3xl lg:text-4xl leading-[normal] font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent drop-shadow-lg ">
      #
      {currentText}
      <span className="animate-pulse text-primary-600 dark:text-neutral-300">|</span>
    </span>
  );
};

const Hero = () => {
  return (
      <section
        className="relative hidden md:flex md:min-h-screen   flex-col bg-transparent pt-20 "
        aria-labelledby="hero-heading"
              >
        <div className="flex flex-col text-center mt-12 gap-4 relative z-10 px-4">
         <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-neutral-900 dark:text-neutral-300">Building Buddhist AI. Together</h1>
        </div>
        <div className="flex justify-center p-4 sm:p-8 md:p-12 lg:p-20 mt-6 sm:mt-8 md:mt-10 relative z-10">
         <div className="relative w-full max-w-5xl">
           {/* Gradient blob for glowing light effect behind laptop */}
           <div className="gradient-light-blob"> </div>
          
           <Image src="/img/macframe.png" 
           width={1000}
           height={1000}
           alt="MacBook frame showcasing the platform" 
           className="w-[90%] mx-auto h-auto object-contain drop-shadow-2xl relative z-10" />
           {/* Diverse Floating Elements - Scattered Design - Hidden on mobile */}
           <div className="absolute inset-0 pointer-events-none hidden lg:block">
             
             {/* Profile Avatar 1 - Top Left */}
             <div className="absolute -top-16 -left-24 animate-float-slow z-20 ">
                <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 transform rotate-[6deg] hover:rotate-0 transition-transform duration-300">
               <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">Translation Progress</div>
               <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                 <div className="h-full w-3/4 bg-linear-to-r from-secondary-500 to-primary-500 rounded-full"></div>
               </div>
               <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">75% Complete</div>
             </div>
             </div>

             {/* Statistics Card - Top Center */}
             <div className="absolute -top-10 left-1/4 animate-float-medium z-20">
               <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 transform rotate-[8deg] hover:rotate-0 transition-transform duration-300">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-primary-600 dark:text-neutral-300">1K+</div>
                   <div className="text-xs text-neutral-600 dark:text-neutral-400">Manuscripts Processed</div>
                 </div>
               </div>
             </div>

             {/* Social Media Style Card - Top Right */}
             <div className="absolute -top-12 -right-32 animate-float-fast z-20">
               <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 max-w-xs transform rotate-[-15deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2 mb-3">
                   <Image width={32} height={32} src="https://picsum.photos/32/32?random=7" alt="@TibetanScholar" className="w-8 h-8 rounded-full object-cover" />
                   <div>
                     <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">@TibetanScholar</div>
                     <div className="text-xs text-neutral-600 dark:text-neutral-400">2m ago</div>
                   </div>
                 </div>
                 <p className="text-sm text-neutral-900 dark:text-neutral-100">&quot;Just discovered this amazing tool! 🔥&quot;
                  <TypewriterText/>
                 </p>
                 <div className="flex items-center gap-4 mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                   <span>❤️ 24</span>
                   <span>💬 8</span>
                   <span>🔄 12</span>
                 </div>
               </div>
             </div>

             {/* Interface Mockup - Left Side */}
             <div className="absolute top-1/4 -left-36 animate-float-slow z-20">
             <Image width={64} height={64} src="https://picsum.photos/64/64?random=6" alt="Tibetan Scholar Avatar" className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-primary-400 dark:border-primary-500 transform rotate-[-12deg] hover:rotate-0 transition-transform duration-300" />
             </div>

             {/* Large Profile Card - Left Center */}
             <div className="absolute top-1/3 -left-28 animate-float-medium z-20">
               <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 max-w-sm transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-3">
                   <Image width={48} height={48} src="https://picsum.photos/48/48?random=8" alt="Tenzin Kalden" className="w-12 h-12 rounded-full object-cover border-2 border-secondary-400 dark:border-secondary-500" />
                   <div>
                     <div className="font-medium text-neutral-900 dark:text-neutral-100">Tenzin Kalden</div>
                     <div className="text-xs text-neutral-600 dark:text-neutral-400">Tibetan Language Expert</div>
                     <div className="text-xs text-secondary-600 dark:text-secondary-400">● Online</div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Notification Style - Right Side */}
             <div className="absolute top-1/4 -right-40 animate-float-fast z-20">
               <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 max-w-xs transform rotate-[12deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
                   <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">New Text Analyzed</span>
                 </div>
                 <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Lotus Sutra - Chapter 3 completed</p>
               </div>
             </div>

             {/* Circular Progress - Right Center */}
             <div className="absolute top-1/2 -right-24 animate-float-slow z-20">
             <div className="floating-comment bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-neutral-200/20 dark:border-neutral-700/20 max-w-xs transform rotate-[7deg] hover:rotate-0 transition-transform duration-300">
                 <div className="space-y-2">
                   <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg px-3 py-1">
                     <div className="text-xs text-neutral-900 dark:text-neutral-100">Translate this text</div>
                   </div>
                   <div className="bg-neutral-200/50 dark:bg-neutral-700/50 rounded-lg px-3 py-1">
                     <div className="text-xs text-neutral-900 dark:text-neutral-100">ཨོཾ་མ་ཎི་པད་མེ་ཧཱུྃ།</div>
                   </div>
                   <div className="flex items-center gap-1">
                     <div className="w-1 h-1 bg-neutral-600 dark:bg-neutral-400 rounded-full animate-bounce"></div>
                     <div className="w-1 h-1 bg-neutral-600 dark:bg-neutral-400 rounded-full animate-bounce delay-100"></div>
                     <div className="w-1 h-1 bg-neutral-600 dark:bg-neutral-400 rounded-full animate-bounce delay-200"></div>
                   </div>
                 </div>
               </div>
             </div>


          

           </div>
         </div>
       </div>
       

      </section>
  );
};

export default Hero;

