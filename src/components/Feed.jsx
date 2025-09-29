import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user); // ✅ get the logged-in user
  const dispatch = useDispatch();

  console.log(feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      // ✅ fetch only when user is available
      getFeed();
    }
  }, [user]);

  if (!feed || feed.length <= 0)
    return <h1 className="text-center mt-10">NO New Users Found</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
