document.addEventListener("DOMContentLoaded", function() {
    var nav = document.querySelector("nav.header");
    var cardsSection = document.querySelector("#cards");
    var sectionsBeforeCards = document.querySelectorAll(".section-before-cards");

    function handleScroll() {
        if (isScrolledIntoView(cardsSection)) {
            nav.classList.add("scrolled"); // Agregamos la clase "scrolled" cuando se llega a la sección .cards
        } else {
            nav.classList.remove("scrolled"); // Eliminamos la clase "scrolled" cuando se vuelve a las secciones antes de .cards
        }
    }

    function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom >= 0;
    }

    sectionsBeforeCards.forEach(function(section) {
        section.classList.add("section-before-cards");
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Llama a la función para manejar la posición inicial
});
