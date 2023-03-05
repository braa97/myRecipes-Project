const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios')
const { data, map } = require('jquery')
const INGREDIENT_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient'

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]
let allRecipes = []
let filteredRecipes = []

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const filterIngredients = function(ingredients, sensitivity) {
    let flag = 0
    ingredients.forEach((i) => {
        sensitivity.forEach((s) => {
            if(i == s) {
                flag = 1
            }
        })
    })
    if (flag == 0) {
        return true
    }
    else {
        return false
    }
}

app.get('/recipe/:ingredient', function(req, res) {
    let ingredient = req.params.ingredient
    let glutenCheck = req.query.gluten
    let dairyCheck = req.query.dairy
    let page = req.query.page
    let limit = req.query.limit
    if (!page) {
        page = 1
    }
    if (!limit) {
        limit = 3
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    allRecipes = []
    filteredRecipes = []

    axios.get(`${INGREDIENT_URL}/${ingredient}`)
    .then((recipes) => {     
        const results = {}

        if (endIndex < recipes.data.results) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = recipes.data.results.slice(startIndex, endIndex)
        results.results.map((e) => {    
                let recipe = {
                    idMeal: e.idMeal,
                    title: e.title,
                    thumbnail: e.thumbnail,
                    href: e.href,
                    ingredients: e.ingredients
                }
                allRecipes.push(recipe)
            })
            results.results = []
            results.results = allRecipes
                if (glutenCheck == 1 && dairyCheck == 0) {
                    allRecipes.forEach((element) => {
                        if (filterIngredients(element.ingredients, glutenIngredients)) {
                            results.results.push(element)
                        }
                    })
                    res.send(results)
                    return
                }
                if (dairyCheck == 1 && glutenCheck == 0) {
                    allRecipes.forEach((element) => {
                        if (filterIngredients(element.ingredients, dairyIngredients)) {
                            results.results.push(element)
                        }
                    })
                    res.send(results)
                    return
                }
                if (dairyCheck == 1 && glutenCheck == 1) {
                    allRecipes.forEach((element) => {
                        if (filterIngredients(element.ingredients, dairyIngredients) && filterIngredients(element.ingredients, glutenIngredients)) {
                            results.results.push(element)
                        }
                    })
                    res.send(results)
                    return
                }
                else {
                    res.send(results)
                    return
                }
    })
    .catch((error) => {
        console.log(error)
    })
})

const port = 3000
app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`)
})