const MovieCollection = require ('./Moviemodel');

async function createMovie(movieObject) {
  try {
    const newMovie = await MovieCollection.create(movieObject);
    // console.log(newMovie);
  } catch (error) {
    console.log(error);
  };
};
module.exports = {createMovie};