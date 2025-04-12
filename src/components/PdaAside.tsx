import { ReactNode } from 'react';

const PdaAsideBase = ({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <aside className={`pda-aside ${className}`}>
      <h2
        className={`pda-aside__title ${className ? `${className}__title` : ''}`}
      >
        {title}
      </h2>
      <div className="pda-aside__content">{children}</div>
    </aside>
  );
};

export default PdaAsideBase;
