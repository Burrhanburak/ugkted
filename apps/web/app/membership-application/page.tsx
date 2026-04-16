import { permanentRedirect } from "next/navigation";

/** Eski / üyelik başvurusu URL’i kayıt sayfasına yönlendirilir. */
export default function MembershipApplicationPage() {
  permanentRedirect("/register");
}
