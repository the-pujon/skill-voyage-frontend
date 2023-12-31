import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from 'react-router-dom';

const InstructorCard = ({ img, name, email, className, id }) => {
  console.log(img)
  return (
    <Fade delay={0} duration={500} cascade damping={1e-1}>
      <Link to={`/instructors/${id}`} className=" my-5 antialiased text-gray-900">
        <div>
          <img
            src={img}
            alt="random image"
            className="w-[30rem] h-[30rem] object-cover object-center rounded-lg shadow-md"
          />

          <div className="relative px-4 -mt-16  ">
            <div className="bg-secondary p-6 rounded-lg shadow-lg">
              {/*<div className="flex items-baseline">
                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>
                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                  2 baths &bull; 3 rooms
                </div>
              </div>*/}

              <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                {name}
              </h4>
              <p>{email}</p>

              <div className="mt-4">
                <span className="text-primary text-md font-semibold">
                  4/5 ratings{" "}
                </span>
                <span className="text-sm text-gray-600">
                  (based on 234 ratings)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Fade>
  );
};

export default InstructorCard;
