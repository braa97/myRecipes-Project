const Source = $("#ingredientContainerTemplate").html()
const template = Handlebars.compile(Source);
const recipeElement = $(".recipe-album-container")

const render = function(data) {
    recipeElement.empty()
    let newHTML = template(data);
    recipeElement.append(newHTML)
}
let currentPage
let limit = 3
let size
let ingredient
let glutenCheck
let dairyCheck

$("#ingredient-search-button").on("click", function() {
    ingredient = $(this).siblings("#ingredientInputField").val()
    glutenCheck = $("#gluten:checked").length // 1 - checked 0 unchecked
    dairyCheck = $("#dairy:checked").length

    $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=1&limit=${limit}`)
    .then((data) => {
        render(data.results)
        currentPage = 1
        size = data.size
    })

})


$(".recipe-album-container").on("click", "img", function() {
    let firstIngredient = $(this).closest(".recipe-container").find("li:first").text()
    alert(firstIngredient)
})

$("#prev-button").on("click", function() {
    if (currentPage > 1 && currentPage <= size) {
        currentPage--
        $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=${currentPage}&limit=${limit}`)
        .then((data) => {
            render(data.results)
        })
    }
})

$("#next-button").on("click", function() {
    if (currentPage < size) {
        currentPage++
        $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=${currentPage}&limit=${limit}`)
        .then((data) => {
            render(data.results)
        })
    }
})


