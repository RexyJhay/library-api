const jwt = require('jsonwebtoken')

const authorize = (allowedRoles) => (req, res, next) => {

    // const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    const token = req.cookies.token; // Assuming token is stored in cookies

    if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

    try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;

    // Check if user's role is allowed

    if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }


    next(); // Move to the next middleware or controller catch (err) ( console. log("Token verification error:" if (err -name
    } catch(err){
        console.log("Token verifiicatin error:", err.message);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired"})
        }
    }
};

module.exports = authorize; 