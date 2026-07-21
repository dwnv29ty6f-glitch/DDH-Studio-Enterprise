"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Navigation
// ==========================================

function seiteOeffnen(seite){

    document
    .querySelectorAll(".navButton")
    .forEach(button=>{

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

        case "einstellungen":

            einstellungenZeichnen();

            break;

        default:

            dashboardZeichnen();

    }

}

document.addEventListener("click",event=>{

    const button =
    event.target.closest(".navButton");

    if(!button){
        return;
    }

    seiteOeffnen(
        button.dataset.seite
    );

});