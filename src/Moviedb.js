// mongoose movie database
const yargs = require ('yargs');
const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);
const {createMovie} = require ('./movies/Moviefunction');
const MovieCollection = require('./movies/Moviemodel');
require('./db/connection');

async function app (yargsInput){
  if (yargsInput.create) {
    console.log("Entering create"); 
    // code to add a movie goes here#
    const movieObject = {title: yargsInput.title, actor: yargsInput.actor, director: yargsInput.director, rating: yargsInput.rating};
    await createMovie(movieObject);
    console.log("Created Movie");

  } else if (yargsInput.read) {
    //code to list all Movies in Database
    console.log("Entering read");   // this is the more common method using for loop, could use .map method see below
    const results = await MovieCollection.find({}); 
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      console.log(`${element.title} Staring ${element.actor} Directed by ${element.director} Movie Rating ${element.rating}`);
    } 
//as above but using .map method (more suited to react)
      // let modifiedArr = results.map((element) =>  
      //   console.log(`${element.title} With ${element.actor} Directed by ${element.director}`)
      //   );

} else if (yargsInput.updateTitle) {
    // code to update Movie Title goes here
    console.log("Entering Title Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: {title: yargsInput.newtitle}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated Movie Title Successfully");
      } else {
        console.log ("Update Failed!");
      }

  } else if (yargsInput.updateActor) {
    // code to update Movie Actor goes here
    console.log("Entering Actor Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { actor: yargsInput.actor}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated Movie Actor Successfully");
      } else {
        console.log ("Update Failed!");
      }

  } else if (yargsInput.updateDirector) {
    // code to update the Movie Director only in a movie use updateOne
    console.log("Entering Director Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { director: yargsInput.director}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated Movie Director Successfully");
    } else {
        console.log ("Update Failed!");
    }  
    
  } else if (yargsInput.updateRating) {
    // code to update the Movie Rating only in a movie use updateOne
    console.log("Entering Movie Rating Update");
    const myQuery = {title: yargsInput.title};
    const myUpdate ={$set: { rating: yargsInput.rating}};
    const result = await MovieCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated Movie Rating Successfully");
    } else {
        console.log ("Update Failed!");
    }   

  } else if (yargsInput.search) {
    // code to search for Movie details
    console.log("Entering Search");
    const results = await MovieCollection.find({[yargsInput.key]:{$regex: yargsInput.filter}})
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
    // if (element.title === yargsInput.filter) {
      console.log(`Found The Movie "${element.title}" With "${element.actor}" Directed by "${element.director}" Rating ${element.rating}`);
    // } else {
    //   console.log("Something Wrong!");
    // };          
    } 

  } else if (yargsInput.delete) {
    // code to delete a movie will go here using deleteOne
    console.log("Entering Delete");
    const myQuery = {title: yargsInput.title};
    const result = await MovieCollection.deleteOne(myQuery);
    if (result.deletedCount === 1 ) {
        console.log ("Movie Successfully Deleted");
    } else {
        console.log ("Movie NOT Deleted!");
    }
  } else {
    console.log("Command not recognised!");
  };
  await mongoose.disconnect();
};

app(yargs.argv);