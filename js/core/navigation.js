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

        document
            .querySelectorAll(".navButton")
            .forEach(button => {

                button.addEventListener("click", () => {

                    this.oeffnen(
                        button.dataset.seite
                    );

                });

            });

        this.oeffnen("dashboard");

    },

    oeffnen(seite) {

        this.aktuelleSeite = seite;

        // Navigation markieren
        document
            .querySelectorAll(".navButton")
            .forEach(button =>
                button.classList.remove("aktiv")
            );

        const aktiv =
            document.querySelector(
                '.navButton[data-seite="' +
                seite +
                '"]'
            );

        if (aktiv) {

            aktiv.classList.add("aktiv");

        }

        // Alle Seiten ausblenden
        document
            .querySelectorAll(".seite")
            .forEach(seiteElement => {

                seiteElement.style.display = "none";

            });

        // Gewählte Seite anzeigen
const aktuelleSeite =
    document.getElementById(
        "seite-" + seite
    );

if (aktuelleSeite) {

    aktuelleSeite.style.display = "block";

}

// Modul starten
switch (seite) {

    case "dashboard":
        Dashboard.anzeigen();
        break;

    case "mitarbeiter":
        if (typeof mitarbeiterZeichnen === "function") {
            mitarbeiterZeichnen();
        }
        break;

    case "schichtplan":
        if (typeof schichtplanZeichnen === "function") {
            schichtplanZeichnen();
        }
        break;

    case "kalender":
        if (typeof kalenderZeichnen === "function") {
            kalenderZeichnen();
        }
        break;

    case "aufgaben":
        if (typeof todosZeichnen === "function") {
            todosZeichnen();
        }
        break;

    case "druck":
        if (typeof druckZeichnen === "function") {
            druckZeichnen();
        }
        break;

        }

    }

};