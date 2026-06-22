import CategoryCard from "./CategoryCard";

import {
  BookOpen,
  Languages,
  RotateCcw,
} from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      label: "Flashcard",
      href: "/flash-card",
      icon: BookOpen,
    },
    {
      label: "Words",
      href: "/words",
      icon: Languages,
    },
    {
      label: "Review",
      href: "/review",
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