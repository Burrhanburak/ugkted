import { defineField, defineType } from "sanity";

const statusList = [
  { title: "Kayıtlar başladı", value: "Kayıtlar Başladı" },
  { title: "Yakında", value: "Yakında" },
  { title: "Devam ediyor", value: "Devam Ediyor" },
  { title: "Davetiye ile", value: "Davetiye ile" },
  { title: "Planlanıyor", value: "Planlanıyor" },
  { title: "Tamamlandı", value: "Tamamlandı" },
];

export default defineType({
  name: "event",
  title: "Etkinlik",
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
      name: "status",
      title: "Durum etiketi",
      type: "string",
      options: { list: statusList, layout: "dropdown" },
    }),
    defineField({
      name: "summary",
      title: "Kısa açıklama",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt metin" }],
    }),
    defineField({
      name: "startsAt",
      title: "Başlangıç",
      type: "datetime",
    }),
    defineField({
      name: "endsAt",
      title: "Bitiş",
      type: "datetime",
    }),
    defineField({
      name: "registrationUrl",
      title: "Kayıt / detay bağlantısı",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Detaylı metin (isteğe bağlı)",
      type: "blockContent",
    }),
  ],
  preview: {
    select: { title: "title", status: "status", media: "image" },
    prepare({ title, status, media }) {
      return { title, media, subtitle: status || "" };
    },
  },
});
