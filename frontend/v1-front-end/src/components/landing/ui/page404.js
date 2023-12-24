import React from "react";
import { Link } from "react-router-dom";

const image =
  "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif";

const Page404 = () => {
  return (
    <section className="flex items-center justify-center py-10 bg-white">
      <div className="col-sm-10 col-sm-offset-1 text-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-4xl font-semibold sm:text-6xl">404</p>
          <img src={image} className="sm:max-w-lg mx-auto" alt="" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-medium sm:text-4xl">
            Look like you're lost
          </h3>

          <p className="text-md sm:text-lg">
            The page you are looking for not available!
          </p>

          <Link
            to="/"
            className=" bg-purple-700 rounded-lg text-white py-2 px-4 inline-block mt-5"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
