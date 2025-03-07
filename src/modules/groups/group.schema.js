const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true }, // Unique code for the group
        label: { type: String, required: true }, // Human-readable label
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
