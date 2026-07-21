"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Mitarbeiterverwaltung
========================================== */

let mitarbeiter = [];

/* ==========================================
   Mitarbeiter laden
========================================== */

function mitarbeiterLaden() {

    const daten = localStorage.getItem("ddh_mitarbeiter");

    if (daten) {

        mitarbeiter = JSON.parse(daten);

    } else {

        mitarbeiter = [];

    }

}

/* ==========================================
   Mitarbeiter speichern
========================================== */

function mitarbeiterSpeichern() {

    localStorage.setItem(
        "ddh_mitarbeiter",
        JSON.stringify(mitarbeiter)
    );

}

/* ==========================================
   Neue Personalnummer
========================================== */

function neuePersonalnummer() {

    if (mitarbeiter.length === 0) {

        return 1000;

    }

    return Math.max(
        ...mitarbeiter.map(m => m.personalnummer)
    ) + 1;

}