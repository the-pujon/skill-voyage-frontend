import React,{useEffect,useState} from "react";
import {useUser} from "../../../../Hooks/useUser";
import {useNavigate} from "react-router-dom";
import upImage from "../../../../assets/upImage.svg";
import useApi from "../../../../Hooks/useApi";

const AddCourse=() => {
  const {loggedUser}=useUser();
  const navigate=useNavigate();
  const {get,post}=useApi()

  const [upLoadedImages,setUpLoadedImages]=useState(null);
  const [instructor,setInstructor]=useState({});

  const [category,setCategory]=useState([]);
  const [subcategory,setSubcategory]=useState([]);

  const [classData,setClassData]=useState({
    name: "",
    classImage: "",
    instructor: "", // You need to select an instructor from a list
    whyYouNeedThisCourse: "",
    description: "",
    requirements: "",
    curriculum: "",
    price: 0,
    duration: 0,
    totalLessons: 0,
    totalQuizzes: 0,
    approved: false,
    rating: 0,
    tags: "",
    learningObjectives: "",
    targetAudience: "",
    classCategory: "",
  });

  useEffect(() => {
    loggedUser&&
      get(`instructors/singleInstructor?email=${loggedUser?.email}`)
        .then((data) => {
          setInstructor(data);
        });

    get("categories")
      .then((data) => {
        setCategory(data);
        //setSubcategory(data[0].subcategory);
      });
  },[loggedUser]);

  const handleChange=(e) => {
    const {name,value}=e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const handleSubmit=(e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const apiUrl = import.meta.env.VITE_IMGBB_API_URL;

    const formData=new FormData();
    formData.append("image",upLoadedImages);

    fetch(`${apiUrl}?key=${apiKey}`,{
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to upload image");
        }
      })
      .then((d) => {

        const classDataWithArray={
          ...classData,
          classImage: d.data.url,
          instructor: instructor,
          tags: classData.tags.split(",").map((tag) => tag.trim()),
          learningObjectives: classData.learningObjectives
            .split(",")
            .map((obj) => obj.trim()),
          targetAudience: classData.targetAudience
            .split(",")
            .map((audience) => audience.trim()),
          requirements: classData.requirements
            .split(",")
            .map((requirement) => requirement.trim()),
        };

        post("courses", classDataWithArray,'addCourse')
          .then((res) => {
            navigate("/courses");
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        console.error("Error uploading image:",error);
      });
  };

  const handleCategory=(e) => {
    const {name,value}=e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
    const sub=category.find((c) => {
      return c.CategoryName===value;
    });
    const sc=sub.subcategory;
    setSubcategory(sc);
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row wrapper min-h-screen pt-16 items-center justify-center">
        <div className="flex-1 pt-5 sm:pt-0 flex items-center justify-center ">
          {upLoadedImages? (
            <img
              src={URL.createObjectURL(upLoadedImages)}
              alt=""
              className="w-full rounded-3xl"
            />
          ):(
            <div className="border border-primary w-44 sm:w-80 h-44 sm:h-80 rounded-full flex items-center justify-center">
              {" "}
              <img src={upImage} alt="" className="  p-5 w-32 sm:w-52" />
            </div>
          )}
        </div>
        <form
          className="flex-1 p-5 mt-16 mb-4 rounded-3xl bg-primary/20 "
          style={{
            background:
              "conic-gradient(from 270deg at 0% 0%, rgba(255, 255, 255, 1) 20%,#213555  100% )",
          }}
          onSubmit={handleSubmit}
        >
          {/* name */}
          <div className="form-control relative my-6">
            <input
              autoComplete="off"
              id="name"
              name="name"
              type="name"
              className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="name"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Name
            </label>
          </div>

          {/* Class Image */}
          <div className="form-control relative my-6 ">
            <label htmlFor="instructorImage" className="text-secondary">
              Class Image
            </label>
            <input
              accept="image/*"
              type="file"
              name="classImage"
              className="file-input file-input-ghost w-full file:border-r-2 file:border-r-secondary/50   border-t-0 border-l-0 border-r-0 rounded-none border-b-2 text-secondary text-sm border-b-secondary/50"
              onChange={(e) => {
                setUpLoadedImages(e.target.files[0]);
              }}
            />
          </div>

          {/* Why You need this course */}
          <div className="form-control relative my-6 mt-12">
            <textarea
              autoComplete="off"
              id="whyYouNeedThisCourse"
              name="whyYouNeedThisCourse"
              type="text"
              className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="whyYouNeedThisCourse"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="whyYouNeedThisCourse"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Why you need this class
            </label>
          </div>

          {/*Description */}
          <div className="form-control relative my-6 mt-12">
            <textarea
              autoComplete="off"
              id="description"
              name="description"
              type="text"
              className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="description"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="description"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Description
            </label>
          </div>

          <div className="flex items-center gap-2">
            {/* category */}
            <div className="form-control relative my-6 w-full">
              <select
                onChange={handleCategory}
                id="classCategory"
                name="classCategory"
                className="select select-ghost w-full max-w-xs border-t-0 border-l-0 border-r-0 rounded-none border-b-2 text-secondary text-sm border-b-secondary/50 outline-none  focus:text-secondary focus:outline-none"
              >
                <option disabled selected>
                  Category
                </option>
                {category.map((c) => (
                  <option
                    value={c.CategoryName}
                    key={c._id}
                    className="bg-primary text-secondary"
                  >
                    {c.CategoryName}
                  </option>
                ))}
              </select>
            </div>
            {/* subcategory */}
            <div className="form-control relative my-6 w-full">
              <select
                id="classSubCategory"
                name="classSubCategory"
                onChange={handleChange}
                className="select select-ghost w-full max-w-xs border-t-0 border-l-0 border-r-0 rounded-none border-b-2 text-secondary text-sm border-b-secondary/50 outline-none focus:text-secondary focus:outline-none"
              >
                <option disabled selected>
                  Subcategory
                </option>
                {subcategory.map((c) => (
                  <option
                    value={c.SubCategoryName}
                    key={c._id}
                    className="bg-primary text-secondary"
                  >
                    {c.SubCategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Price */}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="price"
                name="price"
                type="number"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="price"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="price"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Price
              </label>
            </div>
            {/* duration */}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="duration"
                name="duration"
                type="text"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="duration"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="duration"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Duration (in hour)
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Total Lesson */}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="totalLessons"
                name="totalLessons"
                type="number"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="totalLessons
                "
                onChange={handleChange}
                required
              />
              <label
                htmlFor="totalLessons"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Total Lessons
              </label>
            </div>

            {/* Total Quizzes */}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="totalQuizzes"
                name="totalQuizzes"
                type="number"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="totalQuizzes"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="totalQuizzes"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Total Quizzes
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tags */}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="tags"
                name="tags"
                type="text"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="tags"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="tags"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Tags
              </label>
            </div>

            {/* requirements*/}
            <div className="form-control relative my-6 w-full">
              <input
                autoComplete="off"
                id="requirements"
                name="requirements"
                type="text"
                className="peer placeholder-transparent h-10 w-full   bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
                placeholder="requirements"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="requirements"
                className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
              >
                Requirements
              </label>
            </div>
          </div>

          {/* learningObjectives */}
          <div className="form-control relative my-6">
            <textarea
              autoComplete="off"
              id="learningObjectives"
              name="learningObjectives"
              type="text"
              className="peer placeholder-transparent h-10 w-full bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="learningObjectives"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="learningObjectives"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Learning Objectives
            </label>
          </div>

          {/* curriculum */}
          <div className="form-control relative my-6 mt-12">
            <textarea
              autoComplete="off"
              id="curriculum"
              name="curriculum"
              type="text"
              className="peer placeholder-transparent h-10 w-full bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="curriculum"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="curriculum"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Curriculum
            </label>
          </div>

          {/* targetAudience */}
          <div className="form-control relative my-6 mt-12">
            <textarea
              autoComplete="off"
              id="targetAudience"
              name="targetAudience"
              type="text"
              className="peer placeholder-transparent h-10 w-full bg-transparent text-secondary focus:outline-none focus:borer-rose-600 border-b-secondary/50 border-b-2"
              placeholder="targetAudience"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="targetAudience"
              className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
            >
              Target Audience
            </label>
          </div>

          <button type="submit" className="SVButton-2 py-2 px-3 -mt-10 ">
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
