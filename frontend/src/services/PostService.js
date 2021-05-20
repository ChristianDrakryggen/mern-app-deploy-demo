export default {
  newPost: (post) => {
    return fetch("api/newpost", {
      method: "post",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      return res.json().then((data) => data);
    });
  },
  getPosts: () => {
    return fetch("api/getposts").then((res) => {
      return res.json().then((data) => data);
    });
  },
  updatePost: (post) => {
    return fetch("api/updatepost", {
      method: "put",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => data);
    });
  },
  deletePost: (id) => {
    return fetch("api/deletepost", {
      method: "delete",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => data);
    });
  },
};
