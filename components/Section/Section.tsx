"use client";

import css from "@/components/Section/Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Section = ({ children, classes = [] }: SectionProps) => {
  const mainClass = css.section; //обов'язковий клас

  const allClasses = classes
    .map((cl) => css[cl] ?? cl) // тягнемо з модуля, якщо є
    .join(" ");

  const className = [mainClass, allClasses].join(" ").trim();

  return <section className={className}> {children} </section>;
};

export default Section;
