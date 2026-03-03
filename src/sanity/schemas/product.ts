import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description for product cards",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "blockContent",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (e.g. 'file-text', 'credit-card')",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Feature Title", type: "string" },
            { name: "description", title: "Feature Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
