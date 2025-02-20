import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.userId).select("-password");

    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    req.admin = admin;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in protectAdminRoute: ", err.message);
  }
};

export default protectAdminRoute;
