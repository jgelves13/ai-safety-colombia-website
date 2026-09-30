import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Apply to AGI Strategy and Technical AI Safety",
  description:
    "Application form for the BlueDot Impact courses run by AI Safety Colombia: AGI Strategy and Technical AI Safety. Closes on Sunday 11 October 2026 at 11:59 pm.",
  alternates: { canonical: "/en/courses/apply", languages: alternativas("/en/courses/apply") },
};

/* Rendered on every visit so the 11 October deadline isn't frozen in a prerender. */
export const dynamic = "force-dynamic";

export default async function ApplyCourses({ searchParams }: { searchParams: Promise<{ curso?: string }> }) {
  const { curso } = await searchParams;
  return <CourseApplyPage idioma="en" curso={curso} />;
}
