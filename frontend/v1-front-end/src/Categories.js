import { Link } from "react-router-dom";
import { categories } from "./App";
import { Category } from "./Category";

export function Categories() {
  return (
    <ul className="categories">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="category-link"
        >
          <Category category={category} />
        </Link>
      ))}
    </ul>
  );
}
