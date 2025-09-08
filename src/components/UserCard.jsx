import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, skills, age, about, photoUrl } = user;

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
              {firstName} {lastName}, {age}
            </h2>
            <p className="text-sm text-gray-200 mt-1 line-clamp-2">
              {about || "No description available."}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3 bg-white">
          <p className="text-gray-700 text-sm">
            <p className="font-semibold">Gender:</p> {gender}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Skills:</span> {skills}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button className="btn btn-error w-1/2 mr-2 hover:bg-red-600 transition duration-200">
              Ignore
            </button>
            <button className="btn btn-success w-1/2 ml-2 hover:bg-green-600 transition duration-200">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
