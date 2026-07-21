"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Datenmodell
========================================== */

// ==========================================
// Mitarbeiter
// ==========================================

let mitarbeiter = [];

// Datensatz:
//
// {
//     id: "",
//     personalnummer: "",
//     name: "",
//     vorname: "",
//     bereich: "",
//     position: "",
//     einrichtung: "",
//     wochenstunden: 40,
//     urlaub: 30,
//     farbe: "",
//     aktiv: true
// }


// ==========================================
// Schichten
// ==========================================

let schichten = [];

// Datensatz:
//
// {
//     id: "",
//     mitarbeiterId: "",
//     datum: "",
//     schicht: "",
//     stunden: 8
// }


// ==========================================
// Termine
// ==========================================

let termine = [];


// ==========================================
// Aufgaben
// ==========================================

let aufgaben = [];


// ==========================================
// Dokumente
// ==========================================

let dokumente = [];


// ==========================================
// Einrichtungen
// ==========================================

let einrichtungen = [];


// ==========================================
// Einstellungen
// ==========================================

let einstellungen = {

    firma: APP.firma,

    standardSollstunden:
    APP.standardSollstunden

};