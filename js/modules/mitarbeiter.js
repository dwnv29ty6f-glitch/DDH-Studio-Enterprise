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
/* ==========================================
   Mitarbeiter hinzufügen
========================================== */

function mitarbeiterHinzufuegen(daten) {

    const neuerMitarbeiter = {

        id: crypto.randomUUID(),

        personalnummer: neuePersonalnummer(),

        vorname: daten.vorname || "",

        nachname: daten.nachname || "",

        position: daten.position || "",

        abteilung: daten.abteilung || "",

        telefon: daten.telefon || "",

        email: daten.email || "",

        wochenstunden: daten.wochenstunden || 39,

        urlaub: daten.urlaub || 30,

        kranktage: 0,

        eintritt: daten.eintritt || "",

        notizen: daten.notizen || ""

    };

    mitarbeiter.push(neuerMitarbeiter);

    mitarbeiterSpeichern();

    return neuerMitarbeiter;

}

/* ==========================================
   Mitarbeiter finden
========================================== */

function mitarbeiterNachId(id) {

    return mitarbeiter.find(m => m.id === id);

}

/* ==========================================
   Mitarbeiter löschen
========================================== */

function mitarbeiterLoeschen(id) {

    mitarbeiter = mitarbeiter.filter(

        m => m.id !== id

    );

    mitarbeiterSpeichern();

}