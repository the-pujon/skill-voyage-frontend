import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useApi from "../../../../Hooks/useApi";

const CourseRequest = () => {
  const [courses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(null);

  const { get, put } = useApi();

  useEffect(() => {
    get("courses").then((data) => {
      setAllCourses(data);
      setFilteredCourses(data);
    });
  }, [refresh]);

  //for search
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //for search
  useEffect(() => {
    let value = search.toLowerCase();
    let courseSearch = courses.filter((data) => {
      const name = data.name.toLowerCase();
      return name.startsWith(value);
    });
    setFilteredCourses(courseSearch);
  }, [search]);

  //for search
  const handleSubmit = (e) => {
    e.preventDefault();

    let value = search.toLowerCase();

    let courseSearch = courses.filter((data) => {
      const name = data.name.toLowerCase();
      return name === value;
    });

    setFilteredCourses(courseSearch);
  };

  const handleSort = (e) => {
    if (e.target.value === "price-lowest") {
      const s = [...filteredCourses].sort((a, b) => a.price - b.price);
      setFilteredCourses(s);
    }

    if (e.target.value === "price-highest") {
      const s = [...filteredCourses].sort((b, a) => a.price - b.price);
      setFilteredCourses(s);
    }
  };

  const handleApproved = (id) => {
    put(
      `Courses/${id}`,
      {approved: true},
      "courseRequest"
    )
      .then((data) => {
        console.log(data);
        setRefresh(data.approved);
      })
      .catch((err) => console.error(err));
    setRefresh(null);
  };

  return (
    <div>
      <div className="wrapper min-h-screen text-primary backdrop-blur-md">
        <div className="overflow-x-auto pt-5 sm:pt-[8rem]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-primary">
              <input
                type="text"
                placeholder="Search courses..."
                className="px-4 py-2 border border-primary text-primary bg-transparent rounded-lg focus:outline-none"
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
            <select
              className="px-4 py-2 border border-primary bg-transparent rounded-lg focus:outline-none "
              //  value="{sortOption}"
              onChange={handleSort}
            >
              <option value="" className="bg-primary text-secondary">
                Sort By
              </option>

              <option
                value="price-lowest"
                className="bg-primary text-secondary"
              >
                Price (Lowest to Highest)
              </option>
              <option
                value="price-highest"
                className="bg-primary text-secondary"
              >
                Price (Highest to Lowest)
              </option>
            </select>
          </div>

          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Description</th>
                <th>Total Lessons</th>
                <th>Total Quizzes</th>
                {/*<th>Total Students</th>*/}
                <th>Duration</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses?.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={course?.classImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>

                      <div className="font-bold">{course.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col justify-startspace-x-3">
                      <div className="font-bold">{course.instructor.name}</div>
                      <div className="font-normal">
                        {course.instructor.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="flex flex-col justify-startspace-x-3">
                      <div className="font-bold">{course.classCategory}</div>
                      <div className="font-normal">
                        {course.classSubCategory}
                      </div>
                    </div>
                  </td>
                  <td title={course?.description}>
                    {course?.description?.slice(0, 30)}...
                  </td>
                  <td> {course.totalLessons}</td>
                  <td> {course.totalQuizzes}</td>
                  <td> {course.duration}</td>
                  <td>{course.price}</td>
                  <td>
                    <div className="flex items-center">
                      <button
                        disabled={course.approved}
                        onClick={() => {
                          handleApproved(course._id);
                        }}
                        className={
                          course.approved
                            ? "border-green-600 border py-1 px-2 rounded-full text-green-600 font-normal"
                            : "border-red-600 border py-1 px-2 rounded-full text-red-600 font-normal"
                        }
                      >
                        {course.approved ? "Approved" : "Not approved"}
                      </button>
                      <Link
                        to={`/courseDetails/${course?._id}`}
                        className="ml-2 border px-2 py-1 text-primary text-xl rounded-full border-primary"
                      >
                        <FaRegEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseRequest;
