const mongoose = require('mongoose');

// Estimate: 1000 docs * ~256 bytes = 256,000 bytes (~250 KB)
const logSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        by: { type: String, required: true },
        role: { type: String, enum: ['admin', 'manager', 'staff'] },
    },
    {
        timestamps: true,
        capped: { size: 256000, max: 1000 }, // ~250KB
    }
);

module.exports = logSchema;
