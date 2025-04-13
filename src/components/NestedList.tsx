import { useRef, useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { Entry } from '../types/entry/entry';

const NestedListItem = ({
  label,
  url,
  children,
}: {
  label: string;
  url: string;
  children?: ReactNode;
}) => {
  const contentRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 0,
        translateY: `${1}px`,
        display: 'none',
      });
    }
  }, []);

  const toggleContent = () => {
    if (contentRef.current) {
      if (active) {
        gsap.to(contentRef.current, {
          opacity: 0,
          translateY: `${1}px`,
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
    }
  };

  return (
    <li className="nested-list__item">
      <div
        className="nested-list__collapsible"
        onClick={(e) => {
          e.stopPropagation();
          setActive((prev) => !prev);
          toggleContent();
        }}
      >
        <Link to={url}>
          {`${children ? (active ? '- ' : '+ ') : ''}` + label}
        </Link>
      </div>
      {children && (
        <ul className="nested-list__content" ref={contentRef}>
          {children}
        </ul>
      )}
    </li>
  );
};

const NestedList = ({ data, prefix }: { data: Entry[]; prefix: string }) => {
  const itemMapper =
    (currentPath: string = '') =>
    (item: Entry): ReactNode => {
      const newPath = `/${currentPath}/${item.slug}`;
      if (!item.container.isEncrypted && item.container.content.contentType === "children") {
        return (
          <NestedListItem key={item.slug} label={item.title} url={newPath}>
            {item.container.content.children.map(itemMapper(newPath))}
          </NestedListItem>
        );
      }

      return (
        <NestedListItem key={item.slug} label={item.title} url={newPath} />
      );
    };

  return <ul className="nested-list">{data.map(itemMapper(prefix))}</ul>;
};

export default NestedList;
