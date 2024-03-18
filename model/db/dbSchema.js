import mongoose from "mongoose";
const { Schema } = mongoose;

export const recipeSchemae = new Schema({
  name: String, // String is shorthand for {type: String}
  difficulty: String,
  description: String,
  Author: String,
  Ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
});

export const ingredientsSchemae = new Schema({
  name: String,
});

export const userSchemae = new Schema({
  login: String,
  password: String,
});
