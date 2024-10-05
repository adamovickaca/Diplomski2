import jwt from "jsonwebtoken";
import Korisnik from "../models/Korisnik.js";
import Majstor from "../models/Majstor.js";

export const authentificate = async (req, res, next) => {
  //get token from header
  const authToken = req.headers.authorization;

  //check if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }
  try {
    const token = authToken.split(" ")[1];

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.korisnikId = decoded.id;
    req.role = decoded.role;
    // Debugging line

    next(); //must be call the next function
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token is expired",
      });
    }
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const korisnikId = req.korisnikId;
  let user;
  const korisnik = await Korisnik.findById(korisnikId);
  const majstor = await Majstor.findById(korisnikId);

  if (korisnik) {
    user = korisnik;
  }
  if (majstor) {
    user = majstor;
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Korisnik nije pronadjen",
    });
  }
  // U restrict middleware-u

  if (!roles.includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized",
    });
  }
  next();
};
