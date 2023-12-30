import { Link } from "react-router-dom";
import { activities } from "../../data";
import Activity from "./activity";

export function Activities() {
  return (
    <ul className="flex flex-col justify-center flex-1 md:flex-row md:flex-wrap">
      {activities.map((activity) => (
        <Link key={activity.id} to={`/activity/${activity.id}`}>
          <Activity activity={activity} />
        </Link>
      ))}
    </ul>
  );
}
