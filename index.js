const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Grilled Portobello Mushroom Pizzas",
      level: "Easy Peasy",
      ingredients: ["Pepperoni","Chopped Red Onion", "Diced bell Pepper","Capers","Sliced prosciutto"],
      cuisine: "Italian",
      dishType: "snack",
      image: "https://www.simplyrecipes.com/thmb/5LTh4yncb14F_E8aTkkIT_v8rjE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Grilled-Mushroom-Pizza-LEAD-12-952eead397b74cef85db0564b49ff202.jpg",
      duration: 25,
      creator: "Simply Recipes",
      created: Date.now()
    });
  })

  .then(recipe => {
    console.log(`${recipe.title} ready!`);
  })
  
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Added recipe: ${recipe.title}`);
    });
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    console.log("Time Succesfully Updated!");
  })

  .then(() => {
    return Recipe.deleteOne ({
      title: "Carrot Cake"
    })
  })

  .then(() => {
    console.log("Succesfully Deleted Carrot Cake!");
  })

  .then(() => {
    console.log("Connection Closed");
    mongoose.connection.close();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });