import AssignmentDetailPage from "@/components/(teacher)/class/detail/assignment/AssignmentDetailPage";

export default async function TeacherClassPage({
  params,
}: {
  params: Promise<{
    assignmentId: string;
  }>;
}) {
  const { assignmentId } = await params;

  return (
    <AssignmentDetailPage
      assignmentId={assignmentId}
    />
  );
}