import { Link } from "react-router-dom";

import { categories } from "../../data";
import Category from "./category";

export function Categories() {
  return (
    <ul className="flex flex-col justify-center flex-1 md:flex-row ">
      {categories.map((category) => (
        <Link key={category.id} to={`/category/${category.id}`}>
          <Category category={category} />
        </Link>
      ))}
    </ul>
  );
}
