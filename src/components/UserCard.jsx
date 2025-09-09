import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice.js";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, skills, age, about, photoUrl, _id } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-80 max-w-sm overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
        {/* Image Section */}
        <div className="relative h-96 bg-gray-200">
          <img
            src={
              photoUrl || "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt="User"
            className="w-full h-full object-cover"
          />

          {/* Overlay with Name, Age, About */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-3 rounded-md">
            <h2 className="text-xl font-bold text-white">
              {firstName} {lastName}, age:{age}
            </h2>
            <p className="text-sm text-gray-200 mt-1 line-clamp-2">
              {about || "No description available."}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3 bg-white">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Gender:</span> {gender}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Skills:</span>{" "}
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mr-1 mb-1"
              >
                {skill}
              </span>
            ))}
          </p>
          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-error w-1/2 mr-2 hover:bg-red-600 transition duration-200"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success w-1/2 ml-2 hover:bg-green-600 transition duration-200"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
