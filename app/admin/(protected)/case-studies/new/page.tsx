import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { createCaseStudyAction } from "../actions";

export default function NewCaseStudy() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        New case study
      </h1>
      <CaseStudyForm action={createCaseStudyAction} />
    </div>
  );
}
