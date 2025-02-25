import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Report from "../models/reportModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const signupAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    generateTokenAndSetCookie(admin._id, res);

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      username: admin.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutAdmin = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View and manage all user accounts
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Review reported posts
const getAllReportedPosts = async (req, res) => {
  try {
    const reports = await Report.find({
      reportedPost: { $exists: true },
    }).populate("reportedBy reportedPost");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Take down posts
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("postedBy");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Review reported users
const getAllReportedUsers = async (req, res) => {
  try {
    const reports = await Report.find({
      reportedUser: { $exists: true },
    }).populate("reportedBy reportedUser");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ban users
const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isBanned = true;
    await user.save();
    res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unban users
const unbanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isBanned = false;
    await user.save();
    res.status(200).json({ message: "User unbanned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View analytics dashboard
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const reportCount = await Report.countDocuments();
    const conversationCount = await Conversation.countDocuments();
    const messageCount = await Message.countDocuments();

    res.status(200).json({
      userCount,
      postCount,
      reportCount,
      conversationCount,
      messageCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  signupAdmin,
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  getAllReportedPosts,
  deletePost,
  getAllPosts,
  getAllReportedUsers,
  banUser,
  getDashboardStats,
  unbanUser,
};
