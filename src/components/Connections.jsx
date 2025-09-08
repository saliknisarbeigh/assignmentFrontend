import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="text-center mt-10 text-gray-500">No Connections Found</h1>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-center mb-4">Connections</h1>
      <div className="space-y-3">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            gender,
            age,
            about,
            skills,
          } = connection;

          return (
            <div
              key={_id}
              className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-800">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-xs text-gray-500">
                    {age + " , " + gender}
                  </p>
                )}

                <p className="text-xs text-gray-500">{about}</p>
              </div>
              {/* <button className="btn btn-sm btn-primary hover:bg-blue-600">
                Add Friend
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
