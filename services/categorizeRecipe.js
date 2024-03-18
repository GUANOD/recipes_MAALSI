function categorizeRecipe(recipe) {
    if (recipe.needsOven && recipe.needsSpecializedTool && recipe.needsExoticFood) {
        return "difficult"
    }
    return "easy"
}

export { categorizeRecipe }