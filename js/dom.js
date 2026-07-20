"use strict";

// ===============================
// DOM-Elemente
// ===============================

const dom = {

    // Navigation
    navButtons: document.querySelectorAll(".navButton"),
    seiten: document.querySelectorAll(".seite"),

    // Kalender
    tage: document.getElementById("tage"),
    monatTitel: document.getElementById("monatTitel"),
    datumTitel: document.getElementById("ausgewaehltesDatum"),
    btnVorher: document.getElementById("vorherigerMonat"),
    btnWeiter: document.getElementById("naechsterMonat"),

    // Termine
    uhrzeit: document.getElementById("uhrzeit"),
    kategorie: document.getElementById("kategorie"),
    termin: document.getElementById("termin"),
    speichernTermin: document.getElementById("speichernTermin"),
    terminListe: document.getElementById("terminListe"),

    // Aufgaben
    todoProjekt: document.getElementById("todoProjekt"),
    todoText: document.getElementById("todoText"),
    todoPrioritaet: document.getElementById("todoPrioritaet"),
    todoSpeichern: document.getElementById("todoSpeichern"),
    todoListe: document.getElementById("todoListe"),

    // Dashboard
    heuteTermine: document.getElementById("heuteTermine"),
    offeneTodos: document.getElementById("offeneTodos"),
    hohePrioritaet: document.getElementById("hohePrioritaet"),
    erledigteTodos: document.getElementById("erledigteTodos"),
    dashboardTodos: document.getElementById("dashboardTodos"),
    dashboardSchichten: document.getElementById("dashboardSchichten"),

    // Mitarbeiter
    mitarbeiterName: document.getElementById("mitarbeiterName"),
    mitarbeiterSpeichern: document.getElementById("mitarbeiterSpeichern"),
    mitarbeiterListe: document.getElementById("mitarbeiterListe"),

    // Schichtplan
    schichtHeader: document.getElementById("schichtHeader"),
    schichtBody: document.getElementById("schichtplanBody"),
    schichtMonat: document.getElementById("schichtMonat"),
    schichtVorher: document.getElementById("schichtVorherigerMonat"),
    schichtWeiter: document.getElementById("schichtNaechsterMonat")

};