let renderer = new Renderer()
$("#Ingredient-search-button").on("click", function() {
    let ingredient = $(this).siblings("#ingredientInputField").val()

    $.get(`/recipe/${ingredient}`).then((data) => {
        renderer.render(".recipe-album-container", "#ingredientContainerTemplate", data)
    })
})

$(".recipe-album-container").on("click", "img", function() {
    let firstIngredient = $(this).closest(".recipe-container").find("ul").find("li:first").text()
    alert(firstIngredient)
})