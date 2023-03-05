const Source = $("#ingredientContainerTemplate").html()
const template = Handlebars.compile(Source);
const recipeElement = $(".recipe-album-container")

const render = function(data) {
    recipeElement.empty()
    let newHTML = template(data);
    recipeElement.append(newHTML)
}

$("#ingredient-search-button").on("click", function() {
    let ingredient = $(this).siblings("#ingredientInputField").val()
    let glutenCheck = $("#gluten:checked").length // 1 - checked 0 unchecked
    let dairyCheck = $("#dairy:checked").length

    $.get(`/recipe/${ingredient}?gluten=${glutenCheck}&dairy=${dairyCheck}`)
    .then((data) => {
        render(data.results)
        console.log(data);
    })
})

$(".recipe-album-container").on("click", "img", function() {
    let firstIngredient = $(this).closest(".recipe-container").find("li:first").text()
    alert(firstIngredient)
})