"use client";

import css from "@/components/Container/Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Container = ({ children, classes = [] }: ContainerProps) => {
  const mainClass = css.container; //обов'язковий клас

  classes.push(mainClass);

  const allClasses = classes
    .map((cl) => css[cl] ?? cl) // тягнемо з модуля, якщо є
    .join(" ");

  return <div className={allClasses}> {children} </div>;
};

export default Container;
