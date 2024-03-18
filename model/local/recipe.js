
import { randomUUID } from "node:crypto"

const recipes = []

const Recipe = function (recipe) { this.recipe = recipe }
Recipe.prototype.save = async function () {
    this.recipe._id = randomUUID()
    recipes.push(this.recipe)
    return Promise.resolve("OK")
}
Recipe.find = async function () {
    return Promise.resolve([...recipes])
}
Recipe.findOne = async function (obj) {
    return (await this.find())[0]
    
}
Recipe.findByIdAndUpdate = async function (_id,obj) {
    const idx = recipes.findIndex((r) => r._id === _id)
    recipes.splice(idx, 1,obj)
    return Promise.resolve("OK")
}
Recipe.remove = function (obj) {
    const idx = recipes.findIndex((r) => r._id === obj._id)
    recipes.splice(idx, 1)
    return Promise.resolve("OK")
}
Recipe.findByIdAndRemove = async function (_id,obj) {
    const idx = recipes.findIndex((r) => r._id === _id)
    recipes.splice(idx, 1)
    return Promise.resolve("OK")
}

export { Recipe }