"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Speicherverwaltung
// ==========================================

const SPEICHER = {

    laden(){

        mitarbeiter =
        JSON.parse(
            localStorage.getItem("ddh_mitarbeiter")
        ) || [];

        termine =
        JSON.parse(
            localStorage.getItem("ddh_termine")
        ) || [];

        todos =
        JSON.parse(
            localStorage.getItem("ddh_todos")
        ) || [];

        schichten =
        JSON.parse(
            localStorage.getItem("ddh_schichten")
        ) || [];

        dokumente =
        JSON.parse(
            localStorage.getItem("ddh_dokumente")
        ) || [];

        kunden =
        JSON.parse(
            localStorage.getItem("ddh_kunden")
        ) || [];

        projekte =
        JSON.parse(
            localStorage.getItem("ddh_projekte")
        ) || [];

    },

    speichern(){

        localStorage.setItem(
            "ddh_mitarbeiter",
            JSON.stringify(mitarbeiter)
        );

        localStorage.setItem(
            "ddh_termine",
            JSON.stringify(termine)
        );

        localStorage.setItem(
            "ddh_todos",
            JSON.stringify(todos)
        );

        localStorage.setItem(
            "ddh_schichten",
            JSON.stringify(schichten)
        );

        localStorage.setItem(
            "ddh_dokumente",
            JSON.stringify(dokumente)
        );

        localStorage.setItem(
            "ddh_kunden",
            JSON.stringify(kunden)
        );

        localStorage.setItem(
            "ddh_projekte",
            JSON.stringify(projekte)
        );

    },

    loeschen(){

        if(!confirm(
            "Alle Daten wirklich löschen?"
        )){
            return;
        }

        localStorage.clear();

        location.reload();

    }

};