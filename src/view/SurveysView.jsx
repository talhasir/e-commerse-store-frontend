import React, { useRef, useState } from "react";
import PageComponent from "../core/PageComponent";
import { MdAddAPhoto } from "react-icons/md";
import TButton from "../core/TButton";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export default function SurveysView() {
  const [errors, setErrors] = React.useState();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSurvey({
        ...survey,
        image: e.target.result,
        // image_url:
      });
    };
    reader.readAsDataURL(file);
  };

  const onSurveySubmit = (ev) => {
    ev.preventDefault();
    axiosClient
      .post("survey", survey)
      .then(() => {
        setErrors(null);
        navigate("/surveys");
      })
      .catch(({ response }) => setErrors(response.data.errors));
    console.log(survey);
  };
  return (
    <PageComponent heading="Create New Survey">
      <form onSubmit={onSurveySubmit} method="POST">
        <div className="shadow sm:overflew-hidden sm:rounded">
          <div className="space-y-6 bg-white px-6 py-6 sm:p-6">
            {/* image */}
            <div>
              <label className="block font-medium text-sm text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                {survey.image_url ? (
                  <img
                    src={survey.image_url}
                    className="w-32 h-32 object-cover"
                  />
                ) : (
                  <span className="flex justify-center items-center overflow-hidden h-12 w-12 text-gray-400 bg-gray-100 rounded-full ">
                    <MdAddAPhoto className="w-8 h-8" />
                  </span>
                )}
                <button
                  type="button"
                  className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-6 text-gray-700 shadow-sm hover:bg-gray-50 hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <input
                    type="file"
                    name="imageFile"
                    className="absolute top-0 right-0 bottom-0 left-0 opacity-0 hover:cursor-pointer "
                    ref={imageRef}
                    onChange={onImageChoose}
                  />
                  Change
                </button>
              </div>
            </div>
            {/* image */}

            {/* title */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Survey Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(ev) =>
                  setSurvey({ ...survey, title: ev.target.value })
                }
                value={survey.title}
                placeholder="Survey Title"
                className="bg-gray-100 mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:offset-ring-2 focus:ring-indigo-500 sm:text-sm"
              />
              {errors?.title &&
                errors.title.map((errOfTitle) => (
                  <small className="bg-red-500 text-white block px-2 rounded-sm">
                    {errOfTitle}
                  </small>
                ))}
            </div>
            {/* title */}

            {/* Discription */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Discription"
                className="text-sm font-medium text=gray-700"
              >
                Survey Discription
              </label>
              <textarea
                type="text"
                name="discription"
                id="discription"
                onChange={(ev) =>
                  setSurvey({ ...survey, description: ev.target.value })
                }
                value={survey.description}
                placeholder="Survey description"
                className="bg-gray-100 mt-1 w-full rounded-md shadow-sm focus:ring-2 focus:offset-ring-2 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Discription */}

            {/* expire_date */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="expire_date"
                className=" text-sm font-medium text=gray-700"
              >
                Expire Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                onChange={(ev) =>
                  setSurvey({ ...survey, expire_date: ev.target.value })
                }
                value={survey.expire_date}
                placeholder="Survey Title"
                className="bg-gray-100 mt-1 w-full rounded-md shadow-sm focus:ring-2 focus:offset-ring-2 focus:ring-indigo-500 sm:text-sm"
              />
              {errors?.expire_date &&
                errors.expire_date.map((errOfExpireDate) => (
                  <small className="bg-red-500 text-white block px-2 rounded-sm">
                    {errOfExpireDate}
                  </small>
                ))}
            </div>
            {/* expire_date */}

            {/* Active */}
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  name="status"
                  id="status"
                  checked={survey.status}
                  onChange={() =>
                    setSurvey({ ...survey, status: !survey.status })
                  }
                  value={survey.status}
                  className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm ">
                <label
                  htmlFor="comments"
                  className="font-medium text-gray-700 "
                >
                  Active
                </label>
                <p className="text-gray-500">
                  whether to make survey publicity available
                </p>
              </div>
            </div>
            {/* Active */}

            {/* button */}
            <div className="bg-gray-50 px-6 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
            {/* button */}
          </div>
        </div>
      </form>
    </PageComponent>
  );
}
