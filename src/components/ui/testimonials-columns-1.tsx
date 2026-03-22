"use client";

import React from "react";
import { motion } from "framer-motion";

export type TestimonialColumnItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialColumnItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration ?? 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-[var(--background)]"
      >
        {[
          ...new Array(2).fill(0).map((_, batchIndex) => (
            <React.Fragment key={`batch-${batchIndex}`}>
              {props.testimonials.map(({ text, image, name, role }) => (
                <div
                  className="p-10 rounded-3xl border border-[var(--border)] shadow-lg shadow-[var(--primary)]/10 max-w-xs w-full bg-[var(--card)] text-[var(--foreground)]"
                  key={`${name}-${batchIndex}`}
                >
                  <div className="text-[var(--foreground)]">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-[var(--foreground)]">
                        {name}
                      </div>
                      <div className="leading-5 text-[var(--muted-foreground)] tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
