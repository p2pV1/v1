export default function Activity({ activity }) {
  return (
    <li className="p-5 m-4 flex flex-col justify-center md:h-96 md:w-72 md:mx-4 md:flex-wrap md:flex-row text-purple-600 hover:text-purple-800 transition duration-150 ease-in-out shadow-md  ">
      <img
        src={activity.image}
        alt={activity.name}
        className="h-56 w-56 object-cover mx-auto my-4 rounded-lg md:mx-4 md:my-3"
      />
      <h5 className="text-center font-bold text-2xl">{activity.name}</h5>
    </li>
  );
}
