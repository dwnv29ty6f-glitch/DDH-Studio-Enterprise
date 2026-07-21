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

    // Startseite öffnen
    seiteOeffnen("dashboard");

}