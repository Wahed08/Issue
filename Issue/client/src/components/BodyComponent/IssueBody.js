import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../BodyComponent/IssueBody.module.css";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

const IssueBody = ({ admin }) => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  let index = 1;
 
  let value = admin === "admin" ? "api/posts/admin/issues-list" : "api/posts";

  useEffect(() => {
    setIsloading(true);
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
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        throw err;
      }
      return () => ac.abort();
    };
    fetchPost();
  }, [auth, value]); 

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure")) {
      await fetch(`http://localhost:5000/api/posts/admin/${id}/delete-issue`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      const newPost = posts.filter((post) => post.id !== id);
      setPosts(newPost);
      navigate("/admin/issues-list");
    }
  };

    return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.issueContainer}>
        <div className={Styles.heading}>
          <h1>All Issues</h1>
        </div>
        {isLoading && <CircularProgress />}
        <div className={Styles.tableContainer}>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>No.</th>
                <th>Issue Details</th>
                <th style={{ width: "12%" }}>Date</th>
                <th style={{ width: "10%" }}>Status</th>
                {admin === "admin" && <th style={{ width: "13%" }}>Changes</th>}
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => (
                  <tr key={index}>
                    <td>{index++}</td>
                    <td>
                      <Link to={auth.isLoggedIn ? `/${post._id}/issue-details`: "/auth/login"}>
                        {post.title}
                      </Link>
                    </td>
                    <td>{post.date}</td>
                    {post.status === "Processing" && (
                      <td style={{ color: "#1b5e20", fontWeight: "bold" }}>
                        {post.status}
                      </td>
                    )}
                    {post.status === "Pending" && <td>{post.status}</td>}
                    {post.status === "Finished" && (
                      <td style={{ color: "red", fontWeight: "bold" }}>
                        {post.status}
                      </td>
                    )}
                    {admin === "admin" && (
                      <td>
                        <Link to={`/admin/${post._id}/edit-issue`}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {<EditIcon />}
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(post._id)}
                        >
                          {<DeleteIcon />}
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              <div className={Styles.gap}></div>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IssueBody;
