import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={user.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name:{user.firstName}</h2>

          <p>{user.age}</p>
          <p>{user.gender}</p>
          <p>{user.skills}</p>
          <p>{user.about}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
