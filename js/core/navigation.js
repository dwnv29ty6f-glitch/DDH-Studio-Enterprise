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

        const buttons =
            document.querySelectorAll(".navButton");

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    this.oeffnen(

                        button.dataset.seite

                    );

                }

            );

        });

    },

    oeffnen(seite) {

        this.aktuelleSeite = seite;

        document
            .querySelectorAll(".navButton")
            .forEach(button => {

                button.classList.remove("aktiv");

            });

        const aktiv =
            document.querySelector(

                '.navButton[data-seite="' +

                seite +

                '"]'

            );

        if (aktiv) {

            aktiv.classList.add("aktiv");

        }

        switch (seite) {

            case "dashboard":

                Dashboard.anzeigen();

                break;

            case "mitarbeiter":

                mitarbeiterZeichnen();

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

            case "todos":

                if (typeof todosZeichnen === "function") {

                    todosZeichnen();

                }

                break;

            case "druck":

                if (typeof druckZeichnen === "function") {

                    druckZeichnen();

                }

                break;

            default:

                Dashboard.anzeigen();

        }

    }

};