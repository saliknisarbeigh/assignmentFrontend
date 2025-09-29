import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || []); // Array
  const [skillsInput, setSkillsInput] = useState(
    (user.skills || []).join(", ")
  ); // String for input
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const skillsArray = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          skills: skillsArray,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setSkills(skillsArray); // Update local skills state
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data || error.message);
      toast.error(
        error.response?.data || "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6 bg-base-300 gap-6">
      {/* Form Section */}
      <div className="flex-1 max-w-md bg-base-300 shadow-md rounded-md p-4 overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Photo URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Skills separated by commas"
            />
          </div>
        </fieldset>

        <p className="text-red-500 mt-2">{error}</p>

        <div className="mt-4">
          <button className="btn btn-primary w-full" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>

      {/* User Card Preview Section */}
      <div className="flex-1 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <UserCard
          user={{ firstName, lastName, about, gender, age, skills, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
