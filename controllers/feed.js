const Post = require("../models/Post");

module.exports = {
  // @desc    Get feed page
  getFeed: async (req, res) => {
    console.log("feed");
    try {
      // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const posts = await Post.find().sort({ category: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // @desc    Get categorized feed page
  getCategory: async (req, res) => {
    console.log("get category");
    try {
      // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const posts = await Post
        .find({ categoryId: +(req.params.id) })
        .sort({ category: "desc" })
        .lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
}

      // getPost: async (req, res) => {
    //     try {
    //       const post = await Post.findById(req.params.id);
    //       const comments = await Comment
    //         .find({ post: req.params.id })
    //         .sort({ createdAt: "desc" })
    //         .lean();
    //       res.render("post.ejs", { post: post, comments: comments, user: req.user });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
