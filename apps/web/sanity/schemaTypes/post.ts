import { defineField, defineType } from "sanity";

const categories = [
  { title: "Turizm", value: "turizm" },
  { title: "Eğitim", value: "egitim" },
  { title: "Kültür", value: "kultur" },
  { title: "Girişimcilik", value: "girisimcilik" },
  { title: "Genel", value: "genel" },
];

export default defineType({
  name: "post",
  title: "Blog yazısı",
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
      title: "Özet",
      type: "text",
      rows: 3,
      validation: (r) => r.max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak görseli",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt metin" }],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: categories, layout: "dropdown" },
      initialValue: "genel",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "blockContent",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Yayın tarihi (yeni)",
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
