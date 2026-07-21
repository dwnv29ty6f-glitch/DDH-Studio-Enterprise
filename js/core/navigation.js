"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Navigation
========================================== */

let aktuelleSeite = "dashboard";

const Navigation = {

    initialisieren(){

        document
        .querySelectorAll(".navButton")
        .forEach(button=>{

            button.addEventListener(
                "click",
                ()=>{

                    this.oeffnen(
                        button.dataset.seite
                    );

                }
            );

        });

    },

    oeffnen(seite){

        aktuelleSeite = seite;

        document
        .querySelectorAll(".navButton")
        .forEach(button=>{

            button.classList.remove(
                "aktiv"
            );

            if(button.dataset.seite===seite){

                button.classList.add(
                    "aktiv"
                );

            }

        });

        const titel =
        document.getElementById(
            "seitenTitel"
        );

        if(titel){

            titel.textContent =
            seite.charAt(0)
            .toUpperCase() +
            seite.slice(1);

        }

        switch(seite){

            case "dashboard":

                dashboardZeichnen();

                break;

            case "mitarbeiter":

                mitarbeiterZeichnen();

                break;

            case "schichtplan":

                schichtplanZeichnen();

                break;

            case "kalender":

                kalenderZeichnen();

                break;

            case "aufgaben":

                todosZeichnen();

                break;

            case "druck":

                druckZeichnen();

                break;

            default:

                dashboardZeichnen();

        }

    }

};