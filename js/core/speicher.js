"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Speicherverwaltung
========================================== */

const Speicher = {

    laden() {

        window.termine =
            JSON.parse(
                localStorage.getItem("ddhTermine")
            ) || [];

        window.todos =
            JSON.parse(
                localStorage.getItem("ddhTodos")
            ) || [];

        window.mitarbeiter =
            JSON.parse(
                localStorage.getItem("ddhMitarbeiter")
            ) || [];

        window.schichten =
            JSON.parse(
                localStorage.getItem("ddhSchichten")
            ) || [];

    },

    speichern() {

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

    },

    allesLoeschen() {

        if(!confirm(
            "Alle Daten wirklich löschen?"
        )){
            return;
        }

        localStorage.removeItem("ddhTermine");
        localStorage.removeItem("ddhTodos");
        localStorage.removeItem("ddhMitarbeiter");
        localStorage.removeItem("ddhSchichten");

        this.laden();

    }

};