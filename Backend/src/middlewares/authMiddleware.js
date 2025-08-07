import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(new apiError(401, "Unauthorized: No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json(new apiError(401, "Unauthorized: Invalid token"));
  }
};

export default authMiddleware;
