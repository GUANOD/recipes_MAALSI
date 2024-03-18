function createIngControllers(Ingredient) {
  const updateFn = async (req, res) => {
    await Ingredient.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  };

  const deleteFn = async (req, res) => {
    try {
      await Ingredient.findByIdAndRemove(req.params.id);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editFn = async (req, res) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id });
    res.render("editIngredient", { ingredient });
  };

  const showFn = async (req, res) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id });
    res.render("showIngredient", { ingredient });
  };

  const listFn = async (req, res) => {
    const ingredients = await Ingredient.find({});
    const acceptedFormats = req.get("Accept").split(",");
    if (acceptedFormats.includes("text/html")) {
      res.render("listIngredients", { ingredients });
    } else {
      res.set("Content-Type", "application/json");
      res.json(ingredients);
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
    const ingredient = new Ingredient(req.body);
    ingredient.save();
    res.redirect("/");
  };

  return { createFn, listFn, showFn, deleteFn, editFn, updateFn };
}

export { createIngControllers };
