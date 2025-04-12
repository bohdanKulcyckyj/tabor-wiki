import React, { JSX } from 'react';
import { BlockElement, InlineElement } from '../types/entry/content';

const ContentViewer = ({ content }: { content: BlockElement[] }) => {
  const renderInline = (
    inline: InlineElement,
    index: number,
  ): React.ReactNode => {
    switch (inline.type) {
      case 'text':
        return inline.text;
      case 'bold':
        return (
          <strong key={index} className="font-bold">
            {inline.children[0].text}
          </strong>
        );
      case 'italic':
        return (
          <em key={index} className="italic">
            {inline.children[0].text}
          </em>
        );
      case 'span':
        return (
          <span key={index} className={inline.className}>
            {inline.children[0].text}
          </span>
        );
      case 'link':
        return (
          <a
            key={index}
            href={inline.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {inline.children[0].text}
          </a>
        );
      default:
        return null;
    }
  };

  const renderBlock = (block: BlockElement, index: number): React.ReactNode => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-base leading-relaxed">
            {block.children.map(renderInline)}
          </p>
        );

      case 'heading': {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index}>
            {block.children.map(renderInline)}
          </HeadingTag>
        );
      }

      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4"
          >
            {block.children.map(renderInline)}
            {block.author && (
              <footer className="mt-2 text-sm text-gray-500">
                — {block.author}
              </footer>
            )}
          </blockquote>
        );

      case 'image': {
        const src =
          block.subtype === 'base64'
            ? `data:image/*;base64,${block.source}`
            : block.source;
        return (
          <figure key={index} className="mb-6">
            <img
              src={src}
              alt={block.alt || ''}
              className="w-full max-w-full rounded"
            />
            {block.caption && (
              <figcaption className="text-sm text-gray-500 mt-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="content-viewer prose prose-neutral max-w-none">
      {content.map(renderBlock)}
    </div>
  );
};

export default ContentViewer;
