"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Navigation
========================================== */

let aktuelleSeite = "dashboard";

function seiteOeffnen(seite){

    aktuelleSeite = seite;

    DOM.navButtons.forEach(button=>{

        button.classList.remove("aktiv");

        if(button.dataset.seite===seite){

            button.classList.add("aktiv");

        }

    });

    switch(seite){

        case "dashboard":
            dashboardZeichnen();
            break;

        case "kalender":
            kalenderZeichnen();
            break;

        case "mitarbeiter":
            mitarbeiterZeichnen();
            break;

        case "schichtplan":
            schichtplanZeichnen();
            break;

        case "druck":
            druckcenterZeichnen();
            break;

        default:
            dashboardZeichnen();

    }

}

function navigationStarten(){

    DOM.navButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            seiteOeffnen(

                button.dataset.seite

            );

        });

    });

}