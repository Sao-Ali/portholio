import { NextResponse } from "next/server";
import { getPortfolioContent } from "@/lib/content/portfolio";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getPortfolioContent());
}
