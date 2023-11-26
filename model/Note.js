const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  
  //user is a foreign key it show the id of those user that create this note
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag:{
    type:String,
    default:"general"
  },
  date: {
    type: Date,
    default: Date.now,
  }

  
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
