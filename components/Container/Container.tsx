"use client";

interface ContainerProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Container = ({ children, classes = [] }: ContainerProps) => {
  const mainClass = "container"; //обов'язковий клас
  const className = [mainClass, ...classes].join(" ");

  return <div className={className}> {children} </div>;
};

export default Container;
