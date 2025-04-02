const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    Recipe.create(req.body)
        .then((createdRecipe) => {
            console.log("good job", createdRecipe);
            res.status(201).json(createdRecipe);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: "Problem creating a recipe"});
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
   Recipe.find()
   .then((allRecipes) => {
    console.log("here are the recipes:", allRecipes);
    res.status(200).json(allRecipes);
   })
   .catch((err) => {
    console.log(err);
    res.status(500).json({ errorMessage: "trouble finding the recipe"})
   })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then((oneRecipe) => {
            console.log("here is one recipe", oneRecipe);
            res.status(200).json(oneRecipe);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: "trouble finding the one recipe"})
        });
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findOneAndReplace(
        { _id: req.params.id },
        req.body
      );
      console.log("here is the updated recipe:", updatedRecipe);
      res.status(200).json(updatedRecipe);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "trouble updating the recipe" });
    }
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then((deletedRecipe) => {
            console.log("here is the deleted recipe", deletedRecipe);
            res.status(204).json(deletedRecipe);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ errorMessage: "trouble deleting the recipe" });
        })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
