"use strict";

// ===============================
// Daten speichern
// ===============================

function speichern() {

    localStorage.setItem(
        "ddhTermine",
        JSON.stringify(termine)
    );

    localStorage.setItem(
        "ddhTodos",
        JSON.stringify(todos)
    );

    localStorage.setItem(
        "ddhMitarbeiter",
        JSON.stringify(mitarbeiter)
    );

    localStorage.setItem(
        "ddhSchichten",
        JSON.stringify(schichten)
    );

    localStorage.setItem(
        "ddhDokumente",
        JSON.stringify(dokumente)
    );

    localStorage.setItem(
        "ddhKunden",
        JSON.stringify(kunden)
    );

    localStorage.setItem(
        "ddhProjekte",
        JSON.stringify(projekte)
    );

}