$("#Ingredient-search-button").on("click", function() {
    let ingredient = $(this).siblings("#ingredientInputField").val()
    $.get('/ingredients', function(response) {
        
    })
})