import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "UGKTED blogu - Girişimcilik, kültür, turizm ve eğitim alanında içgörüler, makaleler ve güncel gelişmeler.",
  openGraph: {
    title: "Blog",
    description: "Girişimcilik, kültür, turizm ve eğitim alanında içgörüler ve makaleler.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
