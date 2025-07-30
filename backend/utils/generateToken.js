import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token is valid for 7 days
  });

  res.cookie('jwt', token, {
    httpOnly: true, // Prevent access from JavaScript (XSS protection)
    secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
    sameSite: 'Lax', // Adjust to 'None' if you're doing cross-site cookies with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};

export default generateToken;
