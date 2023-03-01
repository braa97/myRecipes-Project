class Renderer {
    render(element, source, data) {
        $(`${element}`).empty()
        const genericSource = $(`${source}`).html()
        const template = Handlebars.compile(genericSource);
        let newHTML = template(data);
        $(`${element}`).append(newHTML);
    }
}