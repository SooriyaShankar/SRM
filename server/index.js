const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// GET route for operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST route to handle data processing
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Validate the input data
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid data input'
        });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

    // File validation (for Base64-encoded files)
    const fileValid = !!file_b64; // True if file_b64 is provided
    const fileMimeType = "image/png"; // For now, it's a placeholder
    const fileSizeKB = 400; // Placeholder size

    // Respond with the processed data
    res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999", // Example user ID
        email: "john@xyz.com",         // Example email
        roll_number: "ABCD123",        // Example roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});