import User from "../Database/User.js";

export const registerUser = async (req, res) => {
    try {
        const { username, id, phonenumber, roomnumber } = req.body;

        if (!username || !id || !phonenumber || !roomnumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ username, id, phonenumber, roomnumber });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const checkStudentName=async(req,res)=>{
    try {
        const { username, id, phonenumber } = req.body;

        if (!username && !id && !phonenumber) {
            return res.status(400).json({ message: "At least one field (username, id, or phone number) is required" });
        }

        let query = {};
        if (username) {
            query.username = username;
        }
        if (id) {
            query.id = id;
        }
        if (phonenumber) {
            query.phonenumber = phonenumber;
        }

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({ message: "Student name not found" });
        }

        return res.status(200).json({ message: "Student is found:", user });
    } catch (error) {
        console.error("Error in checkStudentName:", error);  // Log error details
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const logoutUser = (req, res) => {
    try {
       
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};