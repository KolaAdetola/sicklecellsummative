import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (fullName.length < 6 || fullName.length > 20) {
      return res
        .status(400)
        .json({ message: "Full name must be between 6 and 20 characters." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone number must be 10 to 15 digits long." });
    }

    // Optional: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Function to split full name into first and last name
    function splitFullName(fullName) {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      return {
        firstName,
        lastName,
      };
    }
    const { firstName, lastName } = splitFullName(fullName);
    const color = ["1F6FCC", "175599", "103D73", "277ACC", "1B5A99", "5DB2FF", "85C6FF", "ADD9FF", "75BCFF", "A5D6FF"];
    const randomColor= color[Math.floor(Math.random() * color.length)];
    const fontColor=["A855FF", "C080FF", "D9AAFF", "B277FF", "D1B1FF","F0E4FA", "F8F1FD"]
    const randomfontColor= fontColor[Math.floor(Math.random() * fontColor.length)];

    const profilePicture = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}&background=${randomColor}&color=${randomfontColor}`;


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      profilePicture
    });

    await newUser.save();

    generateToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      profilePicture: newUser.profilePicture,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error in signup" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    let token = generateToken(res, user._id);
    console.log("Token generated for user :", user._id);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error in login" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error in logout" });
  }
};

export { signup, login, logout };
