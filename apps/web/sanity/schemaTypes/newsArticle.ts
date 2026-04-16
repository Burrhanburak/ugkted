import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsArticle",
  title: "Haber",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa özet",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "coverImage",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt metin" }],
    }),
    defineField({
      name: "body",
      title: "Metin",
      type: "blockContent",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Tarih (yeni)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString("tr-TR") : "",
      };
    },
  },
});
