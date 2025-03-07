const mongoose = require("mongoose");

const Group_feature_Schema = new mongoose.Schema(
    {
        group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // Group ID
        feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" }, // Feature ID
        status: { type: Boolean,  }, // Status of the feature
        read: { type: Boolean, }, // Read permission
        create: { type: Boolean, }, // Write permission
        delete: { type: Boolean, }, // Delete
        update: { type: Boolean,  }, // Update
        list : { type: Boolean, }, // List
        defaultFeature: { type: Boolean, }, // Default feature


    },
    { timestamps: true }
);
module.exports = mongoose.model("GroupFeature", Group_feature_Schema);