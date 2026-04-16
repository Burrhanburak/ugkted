export type ServiceFaqItem = {
  question: string;
  answer: string;
};

/** Ana hizmetler sayfası — genel sorular (fiyat iddiası yok, iletişim yönlendirmeli). */
export const servicesIndexFaq: ServiceFaqItem[] = [
  {
    question: "UGKTED hangi alanlarda hizmet sunuyor?",
    answer:
      "Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED) olarak; girişimcilik ve proje danışmanlığı, mentorluk ve kapasite geliştirme, kültür–sanat ve topluluk programları, turizm ve yerel kalkınma ile uluslararası iş birliği ve ağ geliştirme başlıklarında program tasarımı ve paydaş koordinasyonu yürütüyoruz. Her başlığın detayı ilgili hizmet sayfasında açıklanır.",
  },
  {
    question: "Hizmet almak için üye olmak zorunlu mu?",
    answer:
      "Çoğu programda öncelik üyeler ve iş birliği içindeki kurumlardadır; ancak proje bazında açılan çağrılar ve ortak etkinliklerde paydaş statüsüyle katılım da mümkün olabilir. Kurumunuz veya ekibinizin durumuna göre en doğru yol için iletişim formu üzerinden ön görüşme talep edebilirsiniz.",
  },
  {
    question: "Teklif ve süreç nasıl işliyor?",
    answer:
      "İlk adımda ihtiyaç özeti ve hedefler netleştirilir; ardından kapsam, zaman çizelgesi ve sorumluluklar yazılı özetlenir. Onay sonrası program uygulaması ve ara çıktılar planlanır. Kesin süre ve içerik kapsamı her proje için ayrıca tanımlanır.",
  },
  {
    question: "Eğitim ve danışmanlık çevrim içi yapılabiliyor mu?",
    answer:
      "Evet. Oturumların bir bölümü veya tamamı çevrim içi yürütülebilir; hibrit ve yüz yüze formatlar da etkinlik takvimine göre düzenlenir. Format seçimi hedef kitle ve içerik yapısına bağlıdır.",
  },
  {
    question: "Hangi hizmetin bize uyduğunu nasıl seçeriz?",
    answer:
      "Birden fazla hizmet alanını bir arada değerlendirmeniz gerekiyorsa /services/compare sayfasındaki tablo; odak, hedef kitle ve çıktı sütunlarıyla hızlı bir özet sunar. Detay için her başlığın kendi sayfasına gidebilirsiniz.",
  },
];

/** Slug bazlı SSS — her hizmet detayında kullanılır. */
export const serviceDetailFaqBySlug: Record<string, ServiceFaqItem[]> = {
  "girisimcilik-ve-proje-danismanligi": [
    {
      question: "Bu danışmanlık kime yönelik?",
      answer:
        "STK’lar, kooperatifler, kültür ve turizm odaklı girişimler, eğitim içerik üreten ekipler ve uluslararası ölçekte proje hazırlayan kuruluşlar için uygundur. Henüz fikir aşamasında olanlar ile pilotu tamamlamış ve ölçeklemek isteyen ekipler farklı modüllerle desteklenir.",
    },
    {
      question: "Çıktılarda neler yer alıyor?",
      answer:
        "Tipik olarak problem–çözüm çerçevesi, paydaş haritası, risk ve varsayımlar, yol haritası ile ölçülebilir hedefler (KPI önerileri) yer alır. Kurumun hukuki statüsüne özel resmi belge hazırlığı bu paketin dışındadır; gerektiğinde uzman yönlendirmesi yapılır.",
    },
    {
      question: "Gizlilik ve fikri mülkiyet nasıl korunuyor?",
      answer:
        "Ön görüşme öncesi taraflarca onaylanan gizlilik ve kullanım esaslarına uyulur. Üretilen içeriklerin mülkiyeti sözleşmede açıkça tanımlanır; dernek içi paylaşımlı öğrenme materyalleri anonimleştirilmiş özetlerle sınırlı kalır.",
    },
    {
      question: "Mentorluk hizmetiyle farkı nedir?",
      answer:
        "Proje danışmanlığı yapı, plan ve teslim odaklıdır; mentorluk ise birey ve ekip gelişimi, düzenli geri bildirim ve beceri transferi ağırlıklıdır. İki hizmet bir programda birleştirilebilir.",
    },
  ],
  "mentorluk-ve-kapasite-gelistirme": [
    {
      question: "Mentorlar kimlerdir?",
      answer:
        "Program konusuna göre; girişimcilik, kültür–turizm, eğitim tasarımı ve uluslararası proje yazımı alanlarında deneyimli gönüllü veya sözleşmeli uzmanlarla eşleştirme yapılır. Mentor profilleri oturum öncesinde katılımcıyla paylaşılır.",
    },
    {
      question: "Kapasite geliştirme eğitimleri sertifikalı mı?",
      answer:
        "Program tasarımına bağlı olarak katılım belgesi veya iç eğitim tamamlama kaydı verilebilir. Resmi akreditasyon gerektiren mesleki sertifikasyonlar bu hizmet kapsamında sunulmaz; ihtiyaç halinde ilgili kurumlara yönlendirme yapılır.",
    },
    {
      question: "Ekip içi eğitim mi yoksa bireysel mentorluk mu?",
      answer:
        "Her iki model de mümkündür. Kurumsal ekipler için modüler eğitim + uygulama atölyesi; bireyler veya küçük ekipler için düzenli mentorluk seansları planlanır.",
    },
  ],
  "kultur-sanat-ve-topluluk-programlari": [
    {
      question: "Programlar yalnızca İstanbul’da mı?",
      answer:
        "Hayır. Çevrim içi, hibrit ve farklı şehirlerde yüz yüze etkinlik formatları mümkündür. Yerel paydaş ağı ve mekân koşulları birlikte değerlendirilir.",
    },
    {
      question: "Topluluk katılımı nasıl ölçülüyor?",
      answer:
        "Kayıt, geri bildirim formları, gönüllü saatleri ve (uygunsa) anket özetleri gibi birleşik göstergeler kullanılır. Her program için başlangıçta ölçüm planı netleştirilir.",
    },
    {
      question: "Telif ve içerik hakları kimde?",
      answer:
        "Ortak üretilen içeriklerde haklar sözleşmeyle tanımlanır. Kamuya açık etkinlik kayıtları için ayrıca izin ve atıf kuralları önceden belirlenir.",
    },
  ],
  "turizm-ve-yerel-kalkinma-programlari": [
    {
      question: "Yerel kalkınma derken neyi kastediyorsunuz?",
      answer:
        "Yerel üreticiler, kültürel miras unsurları, sürdürülebilir turizm ilkeleri ve toplulukların ekonomiye katılımını birlikte ele alan programları kastediyoruz. Tekil tanıtım kampanyasından ziyade paydaşlarla uzun soluklu planlama hedeflenir.",
    },
    {
      question: "Belediye veya DMO ile çalışılabiliyor mu?",
      answer:
        "Evet, kamu ve özel sektör paydaşlarıyla ortak programlar mümkündür. Rol dağılığı ve iletişim protokolü proje başında yazılı hale getirilir.",
    },
  ],
  "uluslararasi-is-birligi-ve-ag-gelistirme": [
    {
      question: "Hangi ülkelerle bağlantı kurulabiliyor?",
      answer:
        "Derneğin mevcut ağı ve program ortakları doğrultusunda eşleştirme yapılır. Belirli bir ülke garantisi verilmez; ancak hedef pazar veya bölge tanımı talep üzerine ön araştırmaya dahil edilir.",
    },
    {
      question: "Ortaklık geliştirme süreci ne kadar sürer?",
      answer:
        "İlk temas ve güven oluşturma aşaması birkaç haftadan aylara kadar uzayabilir. Hızlandırılmış eşleştirme oturumları kısa süreli; kurumsal ortaklıklar ise ayrı müzakere döngüsü gerektirir.",
    },
    {
      question: "Hibe veya proje başvurusu yazımı dahil mi?",
      answer:
        "Program kapsamına göre başvuru metinlerinin yapılandırılması ve paydaş mektuplarının uyumu desteklenebilir. Nihai hukuki ve mali sorumluluk başvuru sahibi kuruma aittir.",
    },
  ],
};

/** Karşılaştırma sayfası — tablo ve seçim odaklı kısa sorular. */
export const servicesCompareFaq: ServiceFaqItem[] = [
  {
    question: "Tablodaki ‘tipik süre’ garanti midir?",
    answer:
      "Hayır. Süreler gösterge niteliğindedir; kurumunuzun kapsamı, onay süreçleri ve paydaş sayısı süreyi değiştirir. Kesin takvim teklif aşamasında yazılır.",
  },
  {
    question: "Birden fazla hizmeti aynı anda seçebilir miyiz?",
    answer:
      "Evet. Özellikle proje danışmanlığı ile mentorluk veya uluslararası iş birliği sık birlikte planlanır. Ön görüşmede tek sözleşme altında paketleme veya fazlı ilerleme değerlendirilir.",
  },
  {
    question: "Detay için nereye tıklamalıyım?",
    answer:
      "Tabloda her hizmet satırı ilgili detay sayfasına link içerir. Kapak görseli ve tam metin için o sayfayı açmanız yeterlidir.",
  },
];

export function faqJsonLd(items: ServiceFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
