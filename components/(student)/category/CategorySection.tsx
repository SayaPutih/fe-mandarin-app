import CategoryCard from "./CategoryCard";

import {
  BookOpen,
  Languages,
  RotateCcw,
  SquareCheck,
  NotebookPen,
  School
} from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      label: "Class",
      href: "/student/class",
      icon: School,
    },
    {
      label: "Flashcard",
      href: "/student/flashcard",
      icon: BookOpen,
    },
    {
      label : "Schedule",
      href : "/student/schedule",
      icon : NotebookPen,
    },
    {
      label: "Words",
      href: "/student/words",
      icon: Languages,
    },
    {
      label : "Recommeded Words",
      href : "/student/recommended",
      icon : SquareCheck,
    },
    {
      label: "Review",
      href: "/student/review",
      icon: RotateCcw,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-4
      "
    >
      {categories.map((item) => (
        <CategoryCard
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default CategorySection;