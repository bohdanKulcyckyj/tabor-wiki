import { ReactNode } from 'react';

const PdaSectionBase = ({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={`pda-section ${className}`}>
      <h3
        className={`pda-section__title ${className ? `${className}__title` : ''}`}
      >
        {title}
      </h3>
      <div className="pda-section__content">{children}</div>
    </section>
  );
};

export default PdaSectionBase;
