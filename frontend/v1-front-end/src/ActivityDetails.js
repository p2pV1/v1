import { useParams } from "react-router-dom";

export function ActivityDetails() {
  let { activityId } = useParams();
  // Fetch activity details based on activityId
  return (
    <main className="content">
      <h3>Hello</h3>
    </main>
  );
}
