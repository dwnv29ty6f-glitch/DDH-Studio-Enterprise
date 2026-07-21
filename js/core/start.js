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
        " wird gestartet..."
    );

    // DOM laden
    DOM.initialisieren();

    // Dialogsystem
    Dialog.initialisieren();

    // Daten laden
    Speicher.laden();

    // Navigation
    Navigation.initialisieren();

    // Startseite
    Navigation.oeffnen("dashboard");

    console.log(
        APP.name +
        " erfolgreich gestartet."
    );

}