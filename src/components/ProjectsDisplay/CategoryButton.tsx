import type Category from "@/types/projecttype"
import clsx from "clsx"

interface CategoryButtonProps {
    text: Category
    selectedCategory: Category
    setSelectedCategory: (text: Category) => void
}

const CategoryButton = ({ text, selectedCategory, setSelectedCategory }: CategoryButtonProps) => {
    return (
        <button
            className="group rounded-md px-4 py-2 border-2 border-transparent transition-all duration-100 ease-in-out hover:border-white"
            onClick={() => setSelectedCategory(text)}
        >
            {text}
            <span
                className={clsx(
                    "block h-0.5 transition-all duration-300 bg-white",
                    selectedCategory === text ? "w-full" : "w-0"
                )}
            ></span>
        </button>
    )
}

export default CategoryButton
