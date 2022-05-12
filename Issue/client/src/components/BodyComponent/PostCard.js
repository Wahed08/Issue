import React from "react";
import "../BodyComponent/PostCard.css";

const PostCard = ({ title, description }) => {
  return (
    <div className="card-container">
      <div className="title-container">
        <h1>{title}</h1>
      </div>
      <div className="description-container">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
