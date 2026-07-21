"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Navigation
========================================== */

let aktuelleSeite = "dashboard";

function navigationStarten(){

    const buttons =
    document.querySelectorAll(".navButton");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            seiteOeffnen(
                button.dataset.seite
            );

        });

    });

}

function seiteOeffnen(seite){

    aktuelleSeite = seite;

    document
    .querySelectorAll(".navButton")
    .forEach(button=>{

        button.classList.remove("aktiv");

        if(button.dataset.seite===seite){

            button.classList.add("aktiv");

        }

    });

    const titel =
    document.getElementById("seitenTitel");

    if(titel){

        titel.textContent =
        seite.charAt(0).toUpperCase() +
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
            druckcenterZeichnen();
            break;

        case "einstellungen":

            DOM.inhalt.innerHTML = `

                <div class="karte">

                    <h2>Einstellungen</h2>

                    <p>

                        Dieses Modul wird später entwickelt.

                    </p>

                </div>

            `;

            break;

        default:

            dashboardZeichnen();

    }

}