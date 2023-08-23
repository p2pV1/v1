export function Category({ category }) {
  return (
    <li>
      <img className="round-border" src={category.image} alt={category.name} />
      <h5>{category.name}</h5>
    </li>
  );
}
