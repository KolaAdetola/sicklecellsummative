import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token is valid for 7 days
  });

  console.log("Token generated for user :", userId);
  console.log("JWT Token:", token);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false, // allow false in local dev
    sameSite: "None", // ✅ required for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
