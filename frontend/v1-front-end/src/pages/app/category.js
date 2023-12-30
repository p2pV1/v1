export default function Category({ category }) {
  return (
    <li className="flex flex-col justify-center text-purple-600 hover:text-purple-800 transition duration-150 ease-in-out">
      <img
        className="h-56 w-56 object-cover mx-auto my-4 rounded-lg md:mx-4 md:my-3"
        src={category.image}
        alt={category.name}
      />
      <h5 className="text-center font-bold text-2xl ">{category.name}</h5>
    </li>
  );
}
