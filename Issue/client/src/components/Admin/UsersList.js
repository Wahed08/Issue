import React, { useEffect, useState, useContext } from "react";
import ErrorModal from "../BodyComponent/ShowError/ErrorModal";
import { Button } from "@material-ui/core";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {AuthContext} from "../Auth/auth-context";

const UsersList = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
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
      } catch (err) {
        throw err;
      }
      return ac.abort();
    };
    fetchUsers();
  }, [users, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} />
      <div className="issue-container">
        <div className="heading">
          <h1>All Users</h1>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
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
                      <Button variant="contained" size="small" color="error">
                        {<DeleteIcon />}
                      </Button>
                    </td>
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

export default UsersList;
