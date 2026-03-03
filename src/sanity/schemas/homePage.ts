import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuresHeading",
      title: "Features Section Heading",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name (e.g. 'file-text', 'credit-card', 'bar-chart-3')",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "description", title: "Description", type: "text" },
        { name: "buttonText", title: "Button Text", type: "string" },
        { name: "buttonLink", title: "Button Link", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
