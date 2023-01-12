
const MovieCollection = require ('./Moviemodel');

async function createMovie(movieObject) {
  try {
    const newMovie = await MovieCollection.create(movieObject);
    console.log(newMovie);
  } catch (error) {
    console.log(error);
  };
};
module.exports = {createMovie};

const TvShowCollection = require ('./Tvmodel');

async function createTvShow(tvShowObject) {
  try {
    const newTvShow = await TvShowCollection.create(tvShowObject);
    console.log(newTvShow);
  } catch (error) {
    console.log(error);
  };
};
module.exports = {createTvShow};