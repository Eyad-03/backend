import jwt from "jsonwebtoken";
//authincate middlware 
export const protect = (req, res, next) => {
    let token;
    /*
Bearer
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTUwZDJjZjViYjQyYjM2YWIwYzRkNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NzY4OTI1NywiZXhwIjoxNzY3NjkwMTU3fQ.8aFERECEI0zGNdP2s8GGmYFBQ-yhlrQ-ByhTfyyN3VQ
    */
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded User:", decoded); //debugging line
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
//protect comes (after) login and register 

