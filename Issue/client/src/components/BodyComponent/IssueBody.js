import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../BodyComponent/IssueBody.module.css";
import { AuthContext } from "../Auth/auth-context";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "../Header/SearchBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const IssueBody = ({ admin }) => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
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

  const handleSearch = async () => {
    navigate(`?keyword=${searchItem}`);
    const postData = await fetch(
      `http://localhost:5000/api/posts?keyword=${searchItem}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    const responseData = await postData.json();
    setPosts(responseData.All_post);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = async (value) => {
    setIsloading(true);
    navigate(`?filterBy=${value}`);
    handleClose();
    const postData = await fetch(
      `http://localhost:5000/api/posts?filterBy=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    const responseData = await postData.json();
    setPosts(responseData.All_post);
    setIsloading(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.issueContainer}>
        <div className={Styles.heading}>
          <div className={Styles.filterbtn}>
            <Button variant="contained" size="small" onClick={handleClick}>
              FilterBy
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleFilter("Pending")}>
                Pending
              </MenuItem>
              <MenuItem onClick={() => handleFilter("Processing")}>
                Processing
              </MenuItem>
              <MenuItem onClick={() => handleFilter("Finished")}>
                Finished
              </MenuItem>
            </Menu>
          </div>
          <h1>All Issues</h1>
          <div className={Styles.search}>
            <SearchBar
              change={(e) => setSearchItem(e.target.value)}
              handleKeyDown={handleKeyDown}
            />
          </div>
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
              {posts.map((post) => (
                <tr key={index}>
                  <td data-label="No.">{index++}</td>
                  <td data-label="Details:">
                    <Link
                      to={
                        auth.isLoggedIn
                          ? `/${post._id}/issue-details`
                          : "/auth/login"
                      }
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td data-label="Date">{post.date}</td>
                  {post.status === "Processing" && (
                    <td
                      data-label="Status"
                      style={{ color: "#1b5e20", fontWeight: "bold" }}
                    >
                      {post.status}
                    </td>
                  )}
                  {post.status === "Pending" && (
                    <td data-label="Status">{post.status}</td>
                  )}
                  {post.status === "Finished" && (
                    <td
                      data-label="Status"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
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
                          style={{ marginRight: "5px" }}
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
