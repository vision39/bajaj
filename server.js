const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// GET /bfhl - Returns operation_code
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// POST /bfhl - Process data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        return res.json({
            is_success: true,
            user_id: "dipak_kumar_ray_10032003",
            email: "22bcs11111@cuchd.in",
            roll_number: "22BCS11111",
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// For local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;
