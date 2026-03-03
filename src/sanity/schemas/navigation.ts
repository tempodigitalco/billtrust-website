import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
            {
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "href", title: "Link", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Navigation" };
    },
  },
});
