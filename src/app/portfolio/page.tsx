import { redirect } from "next/navigation";
import { getProfile } from "@/lib/content/portfolio";

export const metadata = {
  title: "Resume PDF | Ali Sao",
  description: "Ali Sao resume PDF.",
};

export default function PortfolioPdfPage() {
  const profile = getProfile();

  redirect(profile.resumeUrl);
}
