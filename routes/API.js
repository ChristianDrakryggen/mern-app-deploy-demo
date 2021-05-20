const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/newpost", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save((err) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Post successfully created",
          msgError: false,
        },
      });
    }
  });
});

router.get("/getposts", (req, res) => {
  Post.find({}).exec((err, document) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      res.status(200).json({ posts: document });
    }
  });
});

router.put("/updatepost", (req, res) => {
  const { _id, title, content } = req.body;
  Post.findByIdAndUpdate(_id, { title, content }, (err, document) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Post successfully created",
          msgError: false,
        },
      });
    } else {
      res.status(200).json({
        message: { msgBody: "Post successfully updated", msgError: false },
      });
    }
  });
});

router.delete("/deletepost", (req, res) => {
  Post.findByIdAndDelete(req.body._id, (err) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      res.status(200).json({
        message: { msgBody: "Post successfully deleted", msgError: false },
      });
    }
  });
});

module.exports = router;
