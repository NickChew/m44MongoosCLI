// mongoose TV Show database
const yargs = require ('yargs');
const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);
const {createTvShow} = require ('./movies/function');
const TvCollection = require('./movies/Tvmodel')
require('./db/connection');

async function app (yargsInput){
  if (yargsInput.create) {
    // code to add a tvshow goes here#
    const tvShowObject = {tvshow: yargsInput.tvshow, tvactor: yargsInput.tvactor, tvdirector: yargsInput.tvdirector, tvrating: yargsInput.tvrating};
    await createTvShow(tvShowObject);
    // console.log(createTvShow);

  } else if (yargsInput.read) {
    //code to list all TV Shows
    console.log("Entering read");   // this is the more common method using for loop, could use .map method see below
      const results = await TvCollection.find({}); 
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        console.log(`The TV Show "${element.tvshow}" With "${element.tvactor}" Directed by "${element.tvdirector}" Rating ${element.tvrating}`);
      } 
//as above but using .map method (more suited to react)
      // let modifiedArr = results.map((element) =>  
      //   console.log(`${element.tvshow} With ${element.tvactor} Directed by ${element.tvdirector} Rating ${element.tvrating}`);
      //   );

  } else if (yargsInput.updateActor) {
    // code to update TvShow Actor goes here
    console.log("Entering TvShow Actor Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: { tvactor: yargsInput.tvactor}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Actor Successful");
      } else {
        console.log ("update Failed!");
      }

  } else if (yargsInput.updateDirector) {
    // code to update the TvShow Director only in a movie use updateOne
    console.log("Entering TvShow Director Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: { tvdirector: yargsInput.tvdirector}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Director Successful");
    } else {
        console.log ("update Failed!");
    }  
    
  } else if (yargsInput.updateRating) {
    // code to update the Rating only in a movie use updateOne
    console.log("Entering Rating Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: { tvrating: yargsInput.tvrating}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Rating Successful");
    } else {
        console.log ("update Failed!");
    }   

  // } else if (yargsInput.search) {
  //   // code to search for tvshow 
  //   console.log("Entering Search");
  //   const results = await TvCollection.find({}); 
  //     for (let index = 0; index < results.length; index++) {
  //       const element = results[index];
  //       console.log(`The TV Show "${element.tvshow}" With "${element.tvactor}" Directed by "${element.tvdirector}" Rating ${element.tvrating}`);
  //     }  

  } else if (yargsInput.delete) {
    // code to delete a movie will go here using deleteOne
    console.log("Entering Delete");
    const myQuery = {tvshow: yargsInput.tvshow};
    const result = await TvCollection.deleteOne(myQuery);
    console.log(result);
    if (result.deletedCount === 1 ) {
        console.log ("Movie Successfully Deleted");
    } else {
        console.log ("Movie NOT Deleted");
    }
  } else {
    console.log("Command not recognised");
  };
  await mongoose.disconnect();
};

app(yargs.argv);