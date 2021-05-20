import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });

  const getPosts = () => {
    PostService.getPosts().then((data) => {
      if (data) {
        setPosts(data.posts);
      }
    });
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    PostService.newPost(post).then((data) => {
      if (data.message.msgError === false) {
        PostService.getPosts().then((data) => {
          setPosts(data.posts);
          setPost({ title: "", content: "" });
        });
      } else {
        alert(data.message.msgBody);
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} style={{ margin: "20px 0px" }}>
        <input name="title" value={post.title} onChange={onChange} />
        <input name="content" value={post.content} onChange={onChange} />
        <button type="submit">Add</button>
      </form>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} setPosts={setPosts} />
        ))
      ) : (
        <p>No posts...</p>
      )}
    </div>
  );
};

export default Posts;
