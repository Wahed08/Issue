import React, { useState, useEffect } from "react";
import "../BodyComponent/IssueBody.css";
import PostCard from "./PostCard";

const IssueBody = () => {
  const [posts, setPosts] = useState([]);
  let index = 1;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await fetch("http://localhost:5000/api/posts");
        const responseData = await postData.json();
        setPosts(responseData.All_post);

        if (!postData.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchPost();
  }, [posts]);

  return (
    <div className="issue-container">
      <div className="heading">
        <h1>All Issues</h1>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>No.</th>
              <th>Issue Details</th>
              <th style={{ width: "12%" }}>Date</th>
              <th style={{ width: "10%" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {posts &&
              posts.map((post) => (
                <tr key={post}>
                  <td>{index++}</td>
                  <td>{post.description}</td>
                  <td>{post.date}</td>
                  <td>{post.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* <div className="card-body">
        {!posts.length && <div className="no-post"><h2>
          There is no Issue!
          </h2></div>}
        {posts && posts.map((post) =>(
            <PostCard key = {post} title={post.title} description={post.description}/>
        ))}
      </div> */}
      {/* <section className="inner-container"></section> */}
    </div>
  );
};

export default IssueBody;
