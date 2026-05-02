document.addEventListener("DOMContentLoaded", function() {
    var image = document.getElementsByClassName("ione");
    new simpleParallax(image, {
        scale: 1.6
    });

    var image = document.getElementsByClassName("itwo");
    new simpleParallax(image, {
        scale: 1.6,
        orientation: "left"
    });

    var image = document.getElementsByClassName("ithree");
    new simpleParallax(image, {
        scale: 1.6,
        orientation: "right"
    });

    var image = document.getElementsByClassName("ifour");
    new simpleParallax(image, {
        scale: 1.6
    });

    var image = document.getElementsByClassName("ifive");
    new simpleParallax(image, {
        scale: 1.6,
        orientation: "right"
    });

    var image = document.getElementsByClassName("isix");
    new simpleParallax(image, {
        scale: 1.6,
        orientation: "left"
    });

    var image = document.getElementsByClassName("iseven");
    new simpleParallax(image, {
        scale: 2.4
    });

    var image = document.getElementsByClassName("ieight");
    new simpleParallax(image, {
        scale: 1.6,
        orientation: "right"
    });
});