import { NextResponse } from "next/server";
import { getProjects } from "@/lib/content/portfolio";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ projects: getProjects() });
}
