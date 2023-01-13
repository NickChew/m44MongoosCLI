const TvShowCollection = require ('./Tvmodel');

async function createTvShow(tvShowObject) {
  try {
    const newTvShow = await TvShowCollection.create(tvShowObject);
    // console.log(newTvShow);
  } catch (error) {
    console.log(error);
  };
};
module.exports = {createTvShow};