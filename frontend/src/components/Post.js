import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";

const Post = (props) => {
  const { _id, title, content } = props.post;

  const [post, setPost] = useState({ _id: null, title: "", content: "" });
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    PostService.updatePost(post).then((data) => {
      if (data.message.msgError === false) {
        PostService.getPosts().then((data) => {
          props.setPosts(data.posts);
          setEditing(false);
        });
      } else {
        alert(data.message.msgBody);
      }
    });
  };

  const deletePost = () => {
    PostService.deletePost({ _id: post._id }).then((data) => {
      if (data.message.msgError === false) {
        setDeleted(true);
        PostService.getPosts().then((data) => {
          props.setPosts(data.posts);
          setEditing(false);
        });
      } else {
        alert(data.message.msgBody);
      }
    });
  };

  useEffect(() => {
    if (!deleted) {
      setPost({ _id, title, content });
      setDeleted(false);
    }
  }, [editing]);

  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px  solid #e1e1e1",
        paddingTop: "0px",
      }}
    >
      {!editing && (
        <div style={{ margin: "20px 0px" }}>
          <p style={{ fontWeight: "bold" }}>{title}</p>
          <p>{content}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={deletePost}>Delete</button>
        </div>
      )}
      {editing && (
        <div style={{ marginBottom: "20px" }}>
          <p>{`Editing (${post.title})`}</p>
          <form onSubmit={onSubmit}>
            <input name="title" value={post.title} onChange={onChange} />
            <br />
            <br />
            <input name="content" value={post.content} onChange={onChange} />
            <br />
            <br />
            <button type="submit">Update</button>
            <button onClick={() => setEditing(false)}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
