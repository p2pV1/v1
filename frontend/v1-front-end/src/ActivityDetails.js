import { useParams } from "react-router-dom";
import AIOutput from "./components/AIOutput";

export function ActivityDetails() {
  let { activityId } = useParams();
  // Fetch activity details based on activityId
  return (
    <main>
      <AIOutput />
    </main>
  );
}
