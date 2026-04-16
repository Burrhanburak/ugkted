/**
 * Galeri — public altındaki görseller.
 * İleride R2 / Sanity ile değiştirilebilir.
 */
export type GalleryImageItem = {
  title: string;
  excerpt: string;
  category: string;
  /** public köküne göre yol, örn. /cdn/gallery/foo.webp */
  src: string;
  alt: string;
};

export const GALLERY_IMAGE_ITEMS: GalleryImageItem[] = [
  {
    title: "Kurumsal iletişim ve şeffaflık",
    excerpt: "STK iletişimi ve üyelerle şeffaf bilgi paylaşımı örnekleri.",
    category: "Kurumsal",
    src: "/cdn/gallery/kurumsal-iletisim.webp",
    alt: "Kurumsal iletişim görseli",
  },
  {
    title: "Yardım kuruluşları rehberi",
    excerpt: "Güvenilir kuruluşları değerlendirme ve seçim süreçleri.",
    category: "Rehber",
    src: "/cdn/gallery/yardim-rehberi.webp",
    alt: "Yardım kuruluşları rehberi görseli",
  },
  {
    title: "Dernek ve vakıf karşılaştırması",
    excerpt: "Yasal çerçeve ve operasyonel farklar.",
    category: "Bilgi",
    src: "/cdn/gallery/dernek-vakif.webp",
    alt: "Dernek ve vakıf karşılaştırması",
  },
  {
    title: "Dernek kuruluşu",
    excerpt: "Temel adımlar ve 2026 güncel gereklilikler.",
    category: "Rehber",
    src: "/cdn/gallery/dernek-kurulus.webp",
    alt: "Dernek kuruluşu rehberi",
  },
  {
    title: "Haber merkezi",
    excerpt: "Duyurular ve web sitesi geçişi.",
    category: "Haber",
    src: "/cdn/gallery/haber-merkezi.webp",
    alt: "UGKTED haber görseli",
  },
];
