import mongoose from "mongoose"

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

export default mongoose.model("members", Member);