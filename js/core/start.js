"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Start
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    starten
);

function starten(){

    console.clear();

    console.log(
        APP.name +
        " " +
        APP.version +
        " gestartet"
    );

    // Daten laden
    Speicher.laden();

    // Navigation starten
    navigationStarten();

    // Dashboard anzeigen
    seiteOeffnen("dashboard");

    // Event-Handler registrieren
    globaleEvents();

}

/* ==========================================
   Globale Events
========================================== */

function globaleEvents(){

    const suche =
    document.getElementById(
        "btnSuche"
    );

    if(suche){

        suche.addEventListener(
            "click",
            ()=>{

                dialogHinweis(
                    "Suche folgt in einer späteren Version."
                );

            }
        );

    }

    const benutzer =
    document.getElementById(
        "btnBenutzer"
    );

    if(benutzer){

        benutzer.addEventListener(
            "click",
            ()=>{

                dialogHinweis(
                    "Benutzerverwaltung folgt später."
                );

            }
        );

    }

    const einstellungen =
    document.getElementById(
        "btnEinstellungen"
    );

    if(einstellungen){

        einstellungen.addEventListener(
            "click",
            ()=>{

                seiteOeffnen(
                    "einstellungen"
                );

            }
        );

    }

}