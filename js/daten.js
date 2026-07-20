"use strict";

// ===============================
// Datum
// ===============================

const heute = new Date();

let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();
let ausgewaehlterTag = heute.getDate();

// ===============================
// Auswahl
// ===============================

let markierteTage = [];
let markierterMitarbeiter = "";

// ===============================
// Daten
// ===============================

let termine =
JSON.parse(localStorage.getItem("ddhTermine")) || [];

let todos =
JSON.parse(localStorage.getItem("ddhTodos")) || [];

let mitarbeiter =
JSON.parse(localStorage.getItem("ddhMitarbeiter")) || [];

let schichten =
JSON.parse(localStorage.getItem("ddhSchichten")) || [];

let dokumente =
JSON.parse(localStorage.getItem("ddhDokumente")) || [];

let kunden =
JSON.parse(localStorage.getItem("ddhKunden")) || [];

let projekte =
JSON.parse(localStorage.getItem("ddhProjekte")) || [];