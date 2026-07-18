// app/(dashboard)/flashcard/[level]/page.tsx

import FlashCardRLearningPage from "@/components/(student)/learning/FlashCardLearningPage";

interface PageProps {
  params: Promise<{
    level: string;
  }>;
}

export default async function FlashCardLevelPage({
  params,
}: PageProps) {
  const { level } = await params;

  const hskLevel = Number(level);

  if (
    !Number.isInteger(hskLevel) ||
    hskLevel < 1 ||
    hskLevel > 6
  ) {
    return (
      <div className="p-6">
        Invalid HSK Level
      </div>
    );
  }

  return (
    <FlashCardRLearningPage
      hskLevel={hskLevel}
    />
  );
}