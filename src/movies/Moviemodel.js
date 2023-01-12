
const mongoose = require ('mongoose');

const movieModel = new mongoose.Schema ({
  title: {
    type: String,
    unique: true,
    required: true
  },
  actor: {
    type: String,
    default: "Actor Not Specified"
  },
  director: {
    type: String,
    default: "Director not Specified"
  },
  rating: {
    type: Number,
    default: "00"
  }
});
const MovieCollection = mongoose.model("Mongoose Movie", movieModel);
module.exports = MovieCollection;
