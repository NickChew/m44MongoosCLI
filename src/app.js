// mongoose movie database
const yargs = require ('yargs');
const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);
const {createMovie} = require ('./movies/function');
const MovieCollection = require('./movies/Moviemodel');
require('./db/connection');

async function app (yargsInput){
  if (yargsInput.create) {
    // code to add a movie goes here#
    const movieObject = {title: yargsInput.title, actor: yargsInput.actor, director: yargsInput.director, rating: yargsInput.rating};
    await createMovie(movieObject);
    // console.log(createMovie);

  } else if (yargsInput.read) {
    //code to list all movies
    console.log("Entering read");   // this is the more common method using for loop, could use .map method see below
      const results = await MovieCollection.find({}); 
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        console.log(`${element.title} With ${element.actor} Directed by ${element.director} Rating ${element.rating}`);
      } 
//as above but using .map method (more suited to react)
      // let modifiedArr = results.map((element) =>  
      //   console.log(`${element.title} With ${element.actor} Directed by ${element.director}`)
      //   );

  } else if (yargsInput.updateActor) {
    // code to update Actor goes here
    console.log("Entering Actor Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { actor: yargsInput.actor}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Actor Successful");
      } else {
        console.log ("update Failed!");
      }

  } else if (yargsInput.updateDirector) {
    // code to update the Director only in a movie use updateOne
    console.log("Entering Director Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { director: yargsInput.director}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Director Successful");
    } else {
        console.log ("update Failed!");
    }  
    
  } else if (yargsInput.updateRating) {
    // code to update the Rating only in a movie use updateOne
    console.log("Entering Rating Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { rating: yargsInput.rating}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("updated Rating Successful");
    } else {
        console.log ("update Failed!");
    }   

  } else if (yargsInput.delete) {
    // code to delete a movie will go here using deleteOne
    console.log("Entering Delete");
    const myQuery = {title: yargsInput.title};
    const result = await MovieCollection.deleteOne(myQuery);
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