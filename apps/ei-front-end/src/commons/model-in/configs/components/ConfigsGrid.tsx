interface ConfigsGridProps {
  children?: React.ReactNode;
  className?: string;
}
export const ConfigsGrid = ({ children, className }: ConfigsGridProps) => {
  const getClasses = (): string => {
    const classes: string[] = ["grid", "grid-cols-1", "gap-2", "px-6", "py-4"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return <section className={getClasses()}>{children}</section>;
};
