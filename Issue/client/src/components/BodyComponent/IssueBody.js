import React, { useState, useEffect, useContext } from "react";
import "../BodyComponent/IssueBody.css";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

const IssueBody = ({ admin }) => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  let index = 1, value;

  value = admin==="admin" ? "api/posts/admin/issues-list" : "api/posts";
  

  useEffect(() => {
    const ac = new AbortController();
    const fetchPost = async () => {
      try {
        const postData = await fetch(`http://localhost:5000/${value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
      <ErrorModal error={error} />
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
                {admin ==="admin" && <th style={{ width: "13%" }}>Changes</th>}
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
                    {admin === "admin" &&
                    <td>
                      <Button variant="contained" size="small" color="primary">
                        {<EditIcon />}
                      </Button>
                      <Button variant="contained" size="small" color="error">
                        {<DeleteIcon />}
                      </Button>
                    </td>}
                  </tr>
                ))}
              <div className="gap"></div>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IssueBody;
