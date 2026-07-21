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

        document
            .querySelectorAll(".hauptButton[data-seite]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    this.oeffnen(
                        button.dataset.seite
                    );

                });

            });

    },

    oeffnen(seite) {

        this.aktuelleSeite = seite;

        // --------------------------
        // Navigation markieren
        // --------------------------

        document
            .querySelectorAll(".navButton")
            .forEach(button => {

                button.classList.remove("aktiv");

            });

        const navButton =
            document.querySelector(
                '.navButton[data-seite="' +
                seite +
                '"]'
            );

        if(navButton){

            navButton.classList.add("aktiv");

        }

        // --------------------------
        // Alle Seiten ausblenden
        // --------------------------

        document
            .querySelectorAll(".seite")
            .forEach(element => {

                element.classList.remove("aktiv");

            });

        // --------------------------
        // Gewählte Seite anzeigen
        // --------------------------

        const seiteElement =
            document.getElementById(
                "seite-" + seite
            );

        if(seiteElement){

            seiteElement.classList.add("aktiv");

        }

        // --------------------------
        // Seitentitel
        // --------------------------

        const titel =
            document.getElementById("seitenTitel");

        if(titel){

            titel.textContent =
                seite.charAt(0).toUpperCase() +
                seite.slice(1);

        }

        // --------------------------
        // Module laden
        // --------------------------

        switch(seite){

            case "dashboard":

                if(typeof Dashboard !== "undefined"){

                    Dashboard.anzeigen();

                }

                break;

            case "mitarbeiter":

                if(typeof mitarbeiterZeichnen === "function"){

                    mitarbeiterZeichnen();

                }

                break;

            case "schichtplan":

                if(typeof schichtplanZeichnen === "function"){

                    schichtplanZeichnen();

                }

                break;

            case "kalender":

                if(typeof kalenderZeichnen === "function"){

                    kalenderZeichnen();

                }

                break;

            case "aufgaben":

                if(typeof todosZeichnen === "function"){

                    todosZeichnen();

                }

                break;

            case "druck":

                if(typeof druckZeichnen === "function"){

                    druckZeichnen();

                }

                break;

        }

    }

};