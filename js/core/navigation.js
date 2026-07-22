"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Navigation
===========================================
*/

const Navigation = {

    aktuelleSeite: "dashboard",

    initialisieren() {
    
    console.log(
        "Navigation gestartet."
    );

    const buttons =
        document.querySelectorAll(
            ".navButton"
        );

    console.log(
        buttons.length +
        " Navigationsbuttons gefunden."
    );
buttons.forEach(button => {

    button.addEventListener("click", () => {

        Navigation.oeffnen(
            button.dataset.seite
        );

    });

});

},
oeffnen(seite) {

        console.log(
            "Seite:",
            seite
        );

        this.aktuelleSeite = seite;
const seiten =
    document.querySelectorAll(
        ".seite"
    );

seiten.forEach(element => {

    element.classList.remove(
        "aktiv"
    );

});
    }

};
