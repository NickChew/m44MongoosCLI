// mongoose TV Show database
const yargs = require ('yargs');
const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);
const {createTvShow} = require ('./movies/TvShowfunction');
const TvCollection = require('./movies/Tvmodel')
require('./db/connection');

async function app (yargsInput){
  if (yargsInput.create) {
    console.log("Entering create"); 
    // code to add a tvshow goes here#
    const tvShowObject = {tvshow: yargsInput.tvshow, tvactor: yargsInput.tvactor, tvdirector: yargsInput.tvdirector, tvrating: yargsInput.tvrating};
    await createTvShow(tvShowObject);
    console.log("Created TvShow");

  } else if (yargsInput.read) {
    //code to list all TV Shows in Database
    console.log("Entering read");   // this is the more common method using for loop, could use .map method see below
    const results = await TvCollection.find({}); 
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      console.log(`The TV Show "${element.tvshow}" Staring "${element.tvactor}" Directed by "${element.tvdirector}" TV Rating ${element.tvrating}`);
    } 
  //as above but using .map method (more suited to react)
  // let modifiedArr = results.map((element) =>  
  //   console.log(`${element.tvshow} With ${element.tvactor} Directed by ${element.tvdirector} Rating ${element.tvrating}`);
  // );

  } else if (yargsInput.updateTvshow) {
    // code to update TvShow Title goes here
    console.log("Entering TvShow Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: {tvshow: yargsInput.newtvshow}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated TvShow Title Successfully");
      } else {
        console.log ("Update Failed!");
      }

  } else if (yargsInput.updateActor) {
    // code to update TvShow Actor goes here
    console.log("Entering TvShow Actor Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: { tvactor: yargsInput.tvactor}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
      console.log ("Updated TvShow Actor Successfully");
    } else {
      console.log ("Update Failed!");
    }

  } else if (yargsInput.updateDirector) {
    // code to update the TvShow Director only in a movie use updateOne
    console.log("Entering TvShow Director Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate ={$set: { tvdirector: yargsInput.tvdirector}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
      console.log ("Updated TvShow Director Successfully");
    } else {
        console.log ("Update Failed!");
    }  
    
  } else if (yargsInput.updateRating) {
    // code to update the TvShow Rating only in a movie use updateOne
    console.log("Entering TV Rating Update");
    const myQuery = {tvshow: yargsInput.tvshow};
    const myUpdate = {$set: { tvrating: yargsInput.tvrating}};
    const result = await TvCollection.updateOne(myQuery,myUpdate); // finds the title and updates the details using the objects myquery & myupdate
    if (result.modifiedCount === 1) {
        console.log ("Updated TV Rating Successfully");
    } else {
        console.log ("Update Failed!");
    }   

  } else if (yargsInput.search) {
    // code to search for tvshow details
    console.log("Entering Search");
    const results = await TvCollection.find({[yargsInput.key]:{$regex: yargsInput.filter}})
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
    // if ((element.yargsInput.key === yargsInput.key) && (element.yargsInput.filter === yargsInput.filter)) {
      console.log(`Found The TV Show "${element.tvshow}" With "${element.tvactor}" Directed by "${element.tvdirector}" Rating ${element.tvrating}`);
    // } else {
    //   console.log("Search Details not found in Database");
    // };          
    }  

  } else if (yargsInput.delete) {
    // code to delete a movie will go here using deleteOne
    console.log("Entering Delete");
    const myQuery = {tvshow: yargsInput.tvshow};
    const result = await TvCollection.deleteOne(myQuery);
    if (result.deletedCount === 1 ) {
        console.log ("TvShow Successfully Deleted");
    } else {
        console.log ("TvShow NOT Deleted");
    }
  } else {
    console.log("Command not recognised");
  };
  await mongoose.disconnect();
};

app(yargs.argv);