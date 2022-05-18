import React, { useState, useEffect, useContext } from "react";
import "../BodyComponent/IssueBody.css";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
// import PostCard from "./PostCard";

const IssueBody = () => {
  
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  let index = 1;

  useEffect(() => {
    const ac = new AbortController();
    const fetchPost = async () => {
      try {
        const postData = await fetch("http://localhost:5000/api/posts", {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        });
        const responseData = await postData.json();
        setPosts(responseData.All_post);

        if (!postData.ok) {
          setError(responseData.message);
        }
      } catch (err) {
        throw err;
      }
      return ac.abort();
    };
    fetchPost();
  }, [posts, auth]);

  return (
    <React.Fragment>
      <ErrorModal error = {error}/>
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
                  <tr key={index}>
                    <td>{index++}</td>
                    <td>{post.description}</td>
                    <td>{post.date}</td>
                    <td>{post.status}</td>
                  </tr>
                ))}
              <div className="gap"></div>
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
      </div>
    </React.Fragment>
  );
};

export default IssueBody;
