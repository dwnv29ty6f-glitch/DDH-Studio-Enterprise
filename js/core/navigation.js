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

    }

};