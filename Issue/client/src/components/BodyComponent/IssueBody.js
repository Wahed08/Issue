import React, {useState, useEffect} from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../BodyComponent/IssueBody.css";
import PostCard from "./PostCard";

const IssueBody = () => {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPost = async () => {
        try{
          const postData = await fetch('http://localhost:5000/api/posts');
          const responseData = await postData.json();
          setPosts(responseData.All_post);

          if(!postData.ok){
            throw new Error(responseData.message);
          }
        }catch(err){
            throw err;
        }
    };
    fetchPost();
  }, [posts])

  
  return (
    <div className="container">
      <div className="card-body">
        {!posts.length && <div className="no-post"><h2>
          There is no Issue!
          </h2></div>}
        {posts && posts.map((post) =>(
            <PostCard key = {post} title={post.title} description={post.description}/>
        ))}
      </div>
      <section className="inner-container">
      </section>
    </div>
  );
};

export default IssueBody;
