import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Apply to the seminars",
  description:
    "Application form for the two seminars AI Safety Colombia runs with BlueDot Impact's materials: the Seminar on the Future and Risks of AI and the Technical AI Safety Seminar. Closes on Sunday 11 October 2026 at 11:59 pm.",
  alternates: { canonical: "/en/seminars/apply", languages: alternativas("/en/seminars/apply") },
};

/* Rendered on every visit so the 11 October deadline isn't frozen in a prerender. */
export const dynamic = "force-dynamic";

export default async function ApplyCourses({ searchParams }: { searchParams: Promise<{ curso?: string }> }) {
  const { curso } = await searchParams;
  return <CourseApplyPage idioma="en" curso={curso} />;
}
