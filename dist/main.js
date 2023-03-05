const Source = $("#ingredientContainerTemplate").html()
const template = Handlebars.compile(Source);
const recipeElement = $(".recipe-album-container")

const render = function(data) {
    recipeElement.empty()
    let newHTML = template(data);
    recipeElement.append(newHTML)
}
let page = 1
let limit = 3

$("#ingredient-search-button").on("click", function() {
    let ingredient = $(this).siblings("#ingredientInputField").val()
    let glutenCheck = $("#gluten:checked").length // 1 - checked 0 unchecked
    let dairyCheck = $("#dairy:checked").length

    $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=${page}&limit=${limit}`)
    .then((data) => {
        render(data.results)
    })
})


$(".recipe-album-container").on("click", "img", function() {
    let firstIngredient = $(this).closest(".recipe-container").find("li:first").text()
    alert(firstIngredient)
})

$("#prev-button").on("click", function() {
    if (page > 1) {
        $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=${page}&limit=${limit}`)
        .then((data) => {
            render(data.results)
        })
        page = page - 1
    }
})

$("#next-button").on("click", function() {
    if (page < 1) {
        $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}&page=${page}&limit=${limit}`)
        .then((data) => {
            render(data.results)
        })
        page = page + 1
    }
})


