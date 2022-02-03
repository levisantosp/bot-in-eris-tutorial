const mongoose = require("mongoose");

const Member = new mongoose.Schema({
    _id: String,
    xp: {
        type: Number,
        default: 0
    },
    xpRequired: {
        type: Number,
        default: 150
    },
    level: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("members", Member);