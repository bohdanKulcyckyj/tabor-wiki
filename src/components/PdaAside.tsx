import { ReactNode, useEffect, useRef, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { gsap } from 'gsap';

const EXPAND_BREAKPOINT = 880;

const PdaAsideBase = ({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(width > EXPAND_BREAKPOINT);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = () => {
    if (width > EXPAND_BREAKPOINT) {
      setIsExpanded(true);
      return;
    }

    if (isExpanded) {
      console.log('isExpanded', isExpanded);
      gsap.to(contentRef.current, {
        opacity: 0,
        translateY: `${5}px`,
        duration: 0.1,
        display: 'none',
        // ease: 'power4.out',
      });
    } else {
      gsap.to(contentRef.current, {
        opacity: 1,
        translateY: '0px',
        duration: 0.3,
        delay: 0,
        display: 'block',
        ease: 'power4.out',
      });
    }
    console.log(isExpanded);
    setIsExpanded((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0,
        translateY: `${1}px`,
        display: 'none',
      });
    }
  }, []);

  return (
    <aside className={`pda-aside ${className}`}>
      <h2
        onClick={handleToggleExpand}
        className={`pda-aside__title ${className ? `${className}__title` : ''}`}
      >
        {title}
      </h2>
      <div
        ref={contentRef}
        className={`pda-aside__content ${isExpanded ? '' : 'pda-aside__content--collapsed'}`}
      >
        {children}
      </div>
    </aside>
  );
};

export default PdaAsideBase;
