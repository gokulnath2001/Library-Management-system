//jshint esversion:6
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    booksID: Number,
    title: String,
    authors: String,
});
module.exports = mongoose.model('textbook', dataSchema);
