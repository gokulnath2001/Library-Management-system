//jshint esversion:6
const mongoose = require("mongoose");

const borrowschema = {
    title: String,
    author: String,
    username: String,
    date: Date,
    datereturn: Date
};

module.exports = mongoose.model("Borrow", borrowschema);