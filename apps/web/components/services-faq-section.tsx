import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import type { ServiceFaqItem } from "@/lib/services-faq";
import { faqJsonLd } from "@/lib/services-faq";

type Props = {
  title?: string;
  items: ServiceFaqItem[];
  className?: string;
};

export function ServicesFaqSection({
  title = "Sık sorulan sorular",
  items,
  className = "",
}: Props) {
  if (items.length === 0) return null;

  const jsonLd = faqJsonLd(items);

  return (
    <div className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed md:text-base">
        Aşağıdaki yanıtlar genel bilgilendirme içindir; kesin kapsam ve sözleşme şartları her proje için ayrıca netleştirilir.
      </p>
      <Accordion type="single" collapsible className="mt-8 w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border/80">
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline md:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-sm md:text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
