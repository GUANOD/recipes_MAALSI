function createControllers(Recipe, difficultyEnum, priceEnum) {
  const resultsPerPage = 3;
  const updateFn = async (req, res) => {
    console.log(req.body);
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  };

  const deleteFn = async (req, res) => {
    try {
      await Recipe.findByIdAndRemove(req.params.id);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editFn = async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    res.render("editRecipe", { recipe, difficultyEnum, priceEnum });
  };

  const showFn = async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    res.render("showRecipe", { recipe });
  };

  const listFn = async (req, res) => {
    if (!req.query.page) return res.send("bad request");
    const recipes = await Recipe.find({ difficulty: req.query.diff })
      .skip((req.query.page - 1) * resultsPerPage)
      .limit(resultsPerPage);
    const acceptedFormats = req.get("Accept").split(",");
    if (acceptedFormats.includes("text/html")) {
      console.log(recipes);
      res.render("listRecipes", {
        recipes,
        difficultyEnum,
        priceEnum,
        nextPage: Number(req.query.page) + 1,
        diff: req.query.diff,
      });
    } else {
      res.set("Content-Type", "application/json");
      res.json(recipes);
    }
  };

  /**
   *
   * @param {*} req
   */
  const createFn = (req, res) => {
    // console.log("body?",!!req.body);
    // if (req.body) {
    //     console.log(req.body.name);
    //     console.log(req.body.difficulty);
    // }
    const recipe = new Recipe(req.body);
    recipe.save();
    res.redirect("/");
  };

  return { createFn, listFn, showFn, deleteFn, editFn, updateFn };
}

export { createControllers };
