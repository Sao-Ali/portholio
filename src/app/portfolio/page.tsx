import { redirect } from "next/navigation";
import { profile } from "@/lib/portfolio-data";

export const metadata = {
  title: "Resume PDF | Ali Sao",
  description: "Ali Sao resume PDF.",
};

export default function PortfolioPdfPage() {
  redirect(profile.resumeUrl);
}
