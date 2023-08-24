export function Activity({ activity }) {
  return (
    <li>
      <img src={activity.image} alt={activity.name} />
      <h5>{activity.name}</h5>
    </li>
  );
}
