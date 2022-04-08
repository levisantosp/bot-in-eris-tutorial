import mongoose from "mongoose"

const User = mongoose.Schema({
    _id: String,
    coins: {type: Number, default: 0},
    lastDaily: Number
})

export default mongoose.model("users", User)