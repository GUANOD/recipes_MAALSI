import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { auth } from "./middleware/auth.js";
import { difficultyEnum, priceEnum } from "./model/recipeEnums.js";
import { Recipe, Ingredient, User } from "./model/db/models.js";
import { createControllers } from "./controllers/recipes.js";
import { createIngControllers } from "./controllers/ingredients.js";
import session from "express-session";
const recipesControllers = createControllers(Recipe, difficultyEnum, priceEnum);
const ingredientsControllers = createIngControllers(Ingredient);
const userControllers = createAuthControllers(User);
import { createRouter } from "./routes/recipes.js";
import { createAuthRouter } from "./routes/auth.js";
import { createIngredientsRouter } from "./routes/ingredients.js";
import { createAuthControllers } from "./controllers/auth.js";
const recipesRouter = createRouter(recipesControllers);
const ingredientsRouter = createIngredientsRouter(ingredientsControllers);
const authRouter = createAuthRouter(userControllers);

// import errorHandler from 'errorhandler'
// import cors from 'cors'
// const recipes = [{id:1,name:"brocolis","difficulty":"facile"},{id:2,name:"gratin","difficulty":"facile"}]

const app = express();
// app.use(cors())

app.set("views", "./views");
app.set("view engine", "pug");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use("/login", authRouter);

// app.use(auth);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);

app.get("/", (req, res) => {
  res.redirect("/recipes?page=1");
});

if (process.env.NODE_ENV === "development") {
  console.log("debug");
  // app.use(errorHandler())

  // app.get('/*', (req, res) => {
  //     res.send('erreur')
  // })
}

// mongoose.connect(process.env.DB).then(()=>{
//     console.log("connected to DB...");
app.listen(process.env.PORT, () => {
  console.log(`server has started on port ${process.env.PORT}...`);
});
// })
