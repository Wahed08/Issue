import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../BodyComponent/CreateIssue.css";

const CreateIssue = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, description };

    if (title && description) {
      try {
        const response = await fetch("http://localhost:5000/api/posts/create", {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          navigate('/');
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title">
          <h1>Create An Issue?</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="context">Context</label>
              <input
                type="text"
                name="context"
                required
                placeholder="Enter Context"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="details">Details about</label>
              <textarea
                type="text"
                name="details"
                rows={3}
                required
                placeholder="Enter Details"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="footer">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateIssue;
