'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const WORDS = ["Wisdom", "Knowledge", "OCR", "Teachings", "Scriptures", "Manuscripts", "Texts", "Pecha", "Buddhism", "Annotation"] as const;

const TypewriterText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
          }
        } else if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
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
  }, [currentText, isDeleting, isPaused, currentWordIndex]);

  return (
    <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--primary)]">
      #{currentText}
      <span className="animate-pulse text-[var(--primary)]">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section
      className="relative flex flex-col bg-transparent overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
            <TypewriterText />
             
              <h1
                id="hero-heading"
                className="text-4xl flex justify-center items-end font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[var(--foreground)]"
              >
                Building Buddhist AI.   
                
               
              </h1>
              <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mt-4 leading-relaxed">
                Preserving wisdom through technology—tools for translation, annotation, and study.
              </p>
              <div className="mt-6">
            
              </div>
            </>
          }
        >
          <Image
            src="/img/screen_tool.png"
            alt="Buddhist heritage—temple and tradition"
            height={720}
            width={1400}
            className="mx-auto rounded-3xl object-contain h-full bg-gray-100"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default Hero;
