"use client";

interface SectionProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Section = ({ children, classes = [] }: SectionProps) => {
  const mainClass = "section"; //обов'язковий клас
  const className = [mainClass, ...classes].join(" ");

  return <section className={className}> {children} </section>;
};

export default Section;
