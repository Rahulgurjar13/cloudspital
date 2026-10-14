import { notFound } from "next/navigation";
import { getCaseStudyById } from "@/lib/db/case-studies";
import { isValidId } from "@/lib/db/serialize";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { updateCaseStudyAction } from "../actions";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditCaseStudy({ params }: Params) {
  const { id } = await params;
  if (!isValidId(id)) notFound();

  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Edit case study
      </h1>
      <CaseStudyForm
        action={updateCaseStudyAction.bind(null, id)}
        caseStudy={caseStudy}
      />
    </div>
  );
}
