
const mongoose = require ('mongoose');

const tvModel = new mongoose.Schema ({
  tvshow: {
    type: String,
    unique: true,
    required: true
  },
  tvactor: {
    type: String,
    default: "Actor Not Specified"
  },
  tvdirector: {
    type: String,
    default: "Director not Specified"
  },
  tvrating: {
    type: Number,
    default: "00"
  }
});
const TvCollection = mongoose.model("Mongoose TV Shows", tvModel);
module.exports = TvCollection;