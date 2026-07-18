import ClassDetail from "@/components/(teacher)/class/detail/ClassDetailPage";

export default async function TeacherClassPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return (
    <ClassDetail
      classId={id}
    />
  );
}