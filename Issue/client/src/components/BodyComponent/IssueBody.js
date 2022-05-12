import React, { useState, useEffect } from "react";
import "../BodyComponent/IssueBody.css";
import PostCard from "./PostCard";

const IssueBody = () => {
  const [posts, setPosts] = useState([]);

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
              <th>Issue No.</th>
              <th>Issue</th>
              <th>Issue Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>This is an issue</td>
              <td>20 may 2022</td>
              <td>pending</td>
            </tr>

            <tr>
              <td>1</td>
              <td>This is an issue</td>
              <td>20 may 2022</td>
              <td>pending</td>
            </tr>
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
      <section className="inner-container"></section>
    </div>
  );
};

export default IssueBody;
