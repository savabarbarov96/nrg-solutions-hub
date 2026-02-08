"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
}

function TimelineRow({
  item,
  index,
  scrollYProgress,
}: {
  item: TimelineEntry;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -16 : 20, index % 2 === 0 ? 20 : -14]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 28 : -24, index % 2 === 0 ? -24 : 22]
  );

  return (
    <div className="flex justify-start pt-10 md:pt-20 md:gap-10">
      <motion.div
        style={{ y: titleY }}
        className="sticky flex flex-col md:flex-row z-20 items-center top-24 self-start max-w-xs lg:max-w-sm md:w-full"
      >
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
          <div className="h-3 w-3 rounded-full bg-primary border border-primary/30" />
        </div>
        <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-foreground/70">{item.title}</h3>
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground/70">{item.title}</h3>
        {item.content}
      </motion.div>
    </div>
  );
}

export const Timeline = ({
  data,
  title = "Хронология на процеса",
  description = "Всяка стъпка е ясна и с конкретни действия от наша страна.",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setTimelineHeight = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    };

    setTimelineHeight();
    window.addEventListener("resize", setTimelineHeight);
    return () => window.removeEventListener("resize", setTimelineHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 55%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-6" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 text-foreground max-w-4xl">{title}</h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">{description}</p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 md:pb-16">
        {data.map((item, index) => (
          <TimelineRow key={index} item={item} index={index} scrollYProgress={scrollYProgress} />
        ))}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-border to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary-dark via-primary to-primary-light rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
