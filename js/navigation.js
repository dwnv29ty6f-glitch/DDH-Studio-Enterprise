"use strict";

// ===============================
// Seite anzeigen
// ===============================

function seiteAnzeigen(name) {

    dom.seiten.forEach(seite => {

        seite.classList.remove("aktiv");

    });

    dom.navButtons.forEach(button => {

        button.classList.remove("aktiv");

    });

    const ziel = document.getElementById("seite-" + name);

    if (ziel) {

        ziel.classList.add("aktiv");

    }

    const button = document.querySelector(
        '.navButton[data-seite="' + name + '"]'
    );

    if (button) {

        button.classList.add("aktiv");

    }

    localStorage.setItem(
        "ddhSeite",
        name
    );

}

// ===============================
// Navigation starten
// ===============================

dom.navButtons.forEach(button => {

    button.addEventListener("click", () => {

        seiteAnzeigen(
            button.dataset.seite
        );

    });

});