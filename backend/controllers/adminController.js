import Admin from "../models/adminModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";

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

export { signupAdmin, loginAdmin, logoutAdmin };
