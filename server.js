const express = require("express");
const cors = require("cors");
require("dotenv").config();  // Load environment variables

const app = express();
app.use(express.json());  // Middleware to parse JSON requests
app.use(cors());  // Enable CORS for frontend access

const PORT = process.env.PORT || 5000;

// POST /bfhl - Process data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        return res.json({
            is_success: true,
            user_id: "dipak_kumar_ray_10032003",  // Replace with your actual name & DOB
            email: "22bcs11111@cuchd.in",  // Replace with your college email
            roll_number: "22bcs11111",  // Replace with your roll number
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// GET /bfhl - Returns operation_code
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;