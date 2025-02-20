const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true }, // Unique code for the group
        label: { type: String, required: true }, // Human-readable label
        features: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feature" }], // Linking features inside the group
    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
