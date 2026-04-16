import { defineArrayMember, defineType } from "sanity";

/**
 * Zengin metin: blog, haber ve etkinlik açıklamaları için ortak Portable Text.
 */
export default defineType({
  title: "Zengin metin",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Alıntı", value: "blockquote" },
      ],
      lists: [
        { title: "Madde", value: "bullet" },
        { title: "Numara", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Kalın", value: "strong" },
          { title: "İtalik", value: "em" },
        ],
        annotations: [
          {
            title: "Bağlantı",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (r) => r.required().uri({ allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternatif metin",
        },
      ],
    }),
  ],
});
