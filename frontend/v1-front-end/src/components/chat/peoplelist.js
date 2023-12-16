import React from "react";
import { usePeopleList } from "../../hooks/useFakePeopleList";

const PeopleList = () => {
  const { loading, error, data } = usePeopleList();

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500">Error :( {error.message}</p>;

  console.log(data);

  return (
    <>
      <div className="bg-grey-lighter flex-1 overflow-auto border">
        {/* user first */}
        {data.allPeople.people.map((person, index) => (
          <div className="bg-white px-4 flex items-center hover:bg-slate-200 cursor-pointer ">
            <div className="w-10 h-10 mr-4">
              <img
                className="h-10 w-10 rounded-full "
                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                alt="Avatar of person"
              />
            </div>
            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
              <div className="flex justify-between">
                <p className="text-grey-darkest">{person.name}</p>
                <p className="text-xs text-grey-darkest">12:45 pm</p>
              </div>
              <p className="text-grey-dark mt-1 text-sm">{person.skinColor}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PeopleList;
