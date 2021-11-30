//jshint esversion:6
const mongoose = require("mongoose");

const studentSchema = {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        
    },
    books: [{ type: String}],
    date: [{ type: Date}],
    author: [{type: String}],
    fine: {
        type: Number,
        default: 0
    }
  };

module.exports = mongoose.model("Student", studentSchema);