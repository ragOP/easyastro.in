// src/app/workshop/page.tsx
import { redirect } from "next/navigation";

export default function WorkshopRedirectPage() {
  const TARGET =
    "https://chat.whatsapp.com/ImMzsSD1gg2H9TbBMnAn5D?mode=ems_copy_c";

  // Server-side redirect to external URL
  redirect(TARGET);
}
