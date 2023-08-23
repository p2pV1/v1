import { Link } from "react-router-dom";
import { activities } from "./App";
import { Activity } from "./Activity";

export function Activities() {
  return (
    <main className="content">
      <h3>Activities you enjoy</h3>

      <ul className="categories">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/activity/${activity.id}`}
            className="category-link"
          >
            <Activity activity={activity} />
          </Link>
        ))}
      </ul>
    </main>
  );
}
