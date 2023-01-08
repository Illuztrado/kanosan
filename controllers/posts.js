const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
// configure file storage
const fs = require("fs");

module.exports = {
  // @desc    Get profile page
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // // @desc    Get feed page
  // getFeed: async (req, res) => {
  //   try {
  //     // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     const posts = await Post.find().sort({ category: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // // @desc    Get categorized feed page
  // getCategory: async (req, res) => {
  //   try {
  //     // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     const posts = await Post.find().sort({ category: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // @desc    Get form page
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, comments: comments, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // @desc    User submit form submit action
  createPost: async (req, res) => {
    // console.log(req.body);
    // console.log(req.body["category"].split("#")[1]);

    // Upload image to cloudinary
    try {
      let result = "";
      // check if file exists
      console.log(req.file);
      if (req.file !== undefined) {
        // upload image to cloudinary & store resulting promise to a variable
        result = await cloudinary.uploader.upload(req.file.path);
        // log image path uploaded by user
        console.log("file:", req.file.path);
      }

      await Post.create({
        category: req.body.category.split("#")[0],
        categoryId: +(req.body.category.split("#")[1]),
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        unit: req.body.unit,
        storeName: req.body.storeName,
        location: req.body.location,
        city: req.body.city,
        province: req.body.province,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        stars: 0,
        user: req.user.id,
        userName: req.user.userName
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  
  // @desc    User star post action
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { stars: 1 },
        }
      );
      console.log("Stars +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  // @desc    User delete post action
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });

      // Delete image from cloudinary
      if (post.cloudinaryId != null) {
        console.log("IMAGE ID:", post.cloudinaryId, "IMAGE URL:", post.image);
        await cloudinary.uploader.destroy(post.cloudinaryId);
      }

      // Delete post from db
      // await Post.remove({ _id: req.params.id });
      await Post.deleteOne({ _id: req.params.id });

      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};
