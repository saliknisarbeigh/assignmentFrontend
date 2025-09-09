import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const RequestReceived = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const removeRequestFromState = (_id) => {
    dispatch(removeRequest(_id));
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      removeRequestFromState(_id);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchRequestReceived = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequestReceived();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <h1 className="text-center mt-10 text-gray-500">No Requests Found</h1>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-center mb-4">
        Request Received
      </h1>
      <div className="space-y-4">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            gender,
            age,
            about,
            skills,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={photoUrl || "/default-profile.png"}
                alt={`${firstName} ${lastName}`}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {firstName} {lastName}
                </h2>
                {(age || gender) && (
                  <p className="text-sm text-gray-500">
                    {age ? `${age} years` : ""} {age && gender ? "•" : ""}
                    {gender || ""}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {about || "No additional information"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
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
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestReceived;
