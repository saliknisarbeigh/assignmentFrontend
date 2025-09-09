import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setEmailId] = useState("salik@gmail.com");
  const [password, setPassword] = useState("Salik@511");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("API response:", res.data, typeof res.data);
      dispatch(addUser(res.data.user));
      toast.success("Login successful! Welcome back!");
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      toast.error(error?.response?.data || "Login failed. Please try again.");
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      toast.success("SignUp successful! Welcome!");
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
      toast.error(error?.response?.data || "SignUp failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 flex justify-center w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "login" : "signUp"}</h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <legend className="fieldset-legend">
                    Enter your firstName
                  </legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="salik"
                  />
                  <legend className="fieldset-legend">
                    Enter your LastName
                  </legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="nisar"
                  />
                </>
              )}
              <>
                <legend className="fieldset-legend">Enter your email Id</legend>
                <input
                  type="text"
                  className="input"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="salik@xyz.com"
                />
                <legend className="fieldset-legend">Enter your password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Stong Password@511!"
                />
              </>
            </fieldset>
          </div>
          <p>{error}</p>
          <div className="card-actions justify-center">
            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className="btn btn-primary"
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            onClick={() => setIsLoginForm((value) => !value)}
            className="cursor-pointer"
          >
            {isLoginForm ? "New User SignUp Here" : "Existing User Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
