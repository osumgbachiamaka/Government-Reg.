var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String,
    body: String,
    name: String,
    email : String,
    likes_count: Number,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Post", postSchema);