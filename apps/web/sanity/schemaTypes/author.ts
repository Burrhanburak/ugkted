import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Yazar",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ad Soyad",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / Unvan",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt metin" }],
    }),
    defineField({
      name: "bio",
      title: "Biyografi",
      type: "blockContent",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
