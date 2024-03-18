import mongoose from "mongoose";
import { ingredientsSchemae, recipeSchemae, userSchemae } from "./dbSchema.js";

const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:9000/recipes");
};

await connect();
const Recipe = mongoose.model("Recipe", recipeSchemae);
const User = mongoose.model("User", userSchemae);
const Ingredient = mongoose.model("Ingredient", ingredientsSchemae);
export { Recipe, Ingredient, User };
