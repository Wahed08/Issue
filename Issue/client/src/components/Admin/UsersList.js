import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import { Button } from "@material-ui/core";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../Auth/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "../BodyComponent/IssueBody.module.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const ac = new AbortController();
    const fetchUsers = async () => {
      try {
        const userData = await fetch(
          "http://localhost:5000/api/accounts/admin/users-list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await userData.json();
        setUsers(responseData.usersList);

        if (!userData.ok) {
          setError(responseData.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
      setIsLoading(false);
      return ac.abort();
    };
    fetchUsers();
  }, [users, auth]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure")) {
      await fetch(
        `http://localhost:5000/api/accounts/admin/${id}/delete-user`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const newPost = users.filter((post) => post.id !== id);
      setUsers(newPost);
      navigate("/admin/users-list");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className={Styles.issueContainer}>
        <div className={Styles.heading}>
          <h1>All Users</h1>
        </div>
        {isLoading && <CircularProgress />}
        <div className={Styles.tableContainer}>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "8%" }}>Name</th>
                <th style={{ width: "10%" }}>Email</th>
                <th style={{ width: "10%" }}>Admin</th>
                <th style={{ width: "13%" }}></th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? <CheckBoxIcon /> : <CancelIcon />}</td>
                    <td>
                      <Button variant="contained" size="small" color="primary">
                        {<EditIcon />}
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        {<DeleteIcon />}
                      </Button>
                    </td>
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

export default UsersList;