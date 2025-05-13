import { useConfig } from "../../widgets/hooks";

interface ConfigContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const ConfigItemContainer = ({
  children,
  className,
}: ConfigContainerProps) => {
  const getClasses = (): string => {
    const classes: string[] = [];
    className && classes.push(className);
    return classes.join(" ");
  };
  const config = useConfig();

  return (
    <article className={getClasses()}>
      {!config.query.isLoading && !!config.query.data.settings
        ? children
        : null}
    </article>
  );
};
