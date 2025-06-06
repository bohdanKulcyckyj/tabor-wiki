import { z } from 'zod';

export const TextContentSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
});

export const InlineElementSchema = z.discriminatedUnion('type', [
  TextContentSchema,
  z.object({
    type: z.literal('bold'),
    children: z.array(TextContentSchema).length(1),
  }),
  z.object({
    type: z.literal('italic'),
    children: z.array(TextContentSchema).length(1),
  }),
  z.object({
    type: z.literal('span'),
    className: z.string().optional(),
    children: z.array(TextContentSchema).length(1),
  }),
  z.object({
    type: z.literal('link'),
    href: z.string().url(),
    children: z.array(TextContentSchema).length(1),
  }),
]);

export const paragraphSchema = z.object({
  type: z.literal('paragraph'),
  children: z.array(InlineElementSchema),
});

export const headingSchema = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(4), z.literal(5), z.literal(6)]),
  children: z.array(InlineElementSchema),
});

export const imageSchema = z.object({
  type: z.literal('image'),
  subtype: z.enum(['url', 'base64']),
  source: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const BlockElementSchema = z.discriminatedUnion('type', [paragraphSchema, headingSchema, imageSchema]);
export type BlockElement = z.infer<typeof BlockElementSchema>;
export type InlineElement = z.infer<typeof InlineElementSchema>;
