const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios')
const api = require('./server/routes/api')
const { data } = require('jquery')
const INGREDIENT_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use('/', api)

app.use('/recipe/:ingredient', function(req, res) {
    let ingredient = req.params.ingredient
    axios.get(`${INGREDIENT_URL}/${ingredient}`)
    .then((recipes) => {
        res.send(
            recipes.data.results.map((e) => {
                return {
                    id: e.idMeal,
                    title: e.title,
                    image: e.thumbnail,
                    link: e.href,
                    ingredients: e.ingredients
                }
            })
        )
    })
    .catch((error) => {
        console.log(error)
    })
})



const port = 3000
app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`)
})

module.exports.INGREDIENT_URL = INGREDIENT_URL