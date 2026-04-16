import { listServicesMdxMeta } from "@/lib/mdx";

/** Tablo satırı — karşılaştırma sayfası. */
export type ServiceCompareRow = {
  slug: string;
  title: string;
  focus: string;
  audience: string;
  outputs: string;
  typicalDuration: string;
};

const compareExtras: Record<
  string,
  Omit<ServiceCompareRow, "slug" | "title">
> = {
  "girisimcilik-ve-proje-danismanligi": {
    focus: "Fikir doğrulama, iş modeli, yol haritası, risk ve paydaş analizi",
    audience: "Girişim ekipleri, STK proje birimleri, kültür–turizm girişimleri",
    outputs: "Uygulama planı, KPI önerileri, paydaş haritası",
    typicalDuration: "4–12 hafta (kapsama göre)",
  },
  "mentorluk-ve-kapasite-gelistirme": {
    focus: "Birebir mentorluk, modüler eğitim, uygulamalı atölyeler",
    audience: "Üyeler, gönüllü koordinatörler, proje liderleri",
    outputs: "Gelişim planı, eğitim özeti, geri bildirim döngüsü",
    typicalDuration: "8 hafta – 6 ay (pakete göre)",
  },
  "kultur-sanat-ve-topluluk-programlari": {
    focus: "Etkinlik serileri, topluluk katılımı, içerik kürasyonu",
    audience: "Sanatçılar, dernekler, yerel topluluk temsilcileri",
    outputs: "Program takvimi, iletişim planı, etki ölçümü özeti",
    typicalDuration: "Tek etkinlikten çok aylık programa kadar",
  },
  "turizm-ve-yerel-kalkinma-programlari": {
    focus: "Yerel potansiyel, sürdürülebilir turizm, paydaş koordinasyonu",
    audience: "Yerel yönetimler, DMO, kooperatifler, STK’lar",
    outputs: "Paydaş modeli, proje taslağı, görünürlük önerileri",
    typicalDuration: "3–9 ay",
  },
  "uluslararasi-is-birligi-ve-ag-gelistirme": {
    focus: "Ortaklık eşleştirme, ağ genişletme, program koordinasyonu",
    audience: "Uluslararası ilişki birimleri, dernekler, eğitim kurumları",
    outputs: "Paydaş haritası, iş birliği yol haritası, iletişim çerçevesi",
    typicalDuration: "Sürekli ilişki veya proje bazlı",
  },
};

const slugOrder = [
  "girisimcilik-ve-proje-danismanligi",
  "mentorluk-ve-kapasite-gelistirme",
  "kultur-sanat-ve-topluluk-programlari",
  "turizm-ve-yerel-kalkinma-programlari",
  "uluslararasi-is-birligi-ve-ag-gelistirme",
] as const;

export function getServiceCompareRows(): ServiceCompareRow[] {
  const meta = listServicesMdxMeta();
  const bySlug = new Map(meta.map((m) => [m.slug, m]));
  const rows: ServiceCompareRow[] = [];

  for (const slug of slugOrder) {
    const m = bySlug.get(slug);
    const extra = compareExtras[slug];
    if (!m || !extra) continue;
    rows.push({
      slug,
      title: m.title ?? slug,
      ...extra,
    });
  }

  return rows;
}
