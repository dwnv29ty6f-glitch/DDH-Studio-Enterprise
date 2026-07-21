"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Speicherverwaltung
========================================== */

const Speicher = {

    laden(){

        mitarbeiter =
        JSON.parse(
            localStorage.getItem("ddh_mitarbeiter")
        ) || [];

        schichten =
        JSON.parse(
            localStorage.getItem("ddh_schichten")
        ) || [];

        termine =
        JSON.parse(
            localStorage.getItem("ddh_termine")
        ) || [];

        aufgaben =
        JSON.parse(
            localStorage.getItem("ddh_aufgaben")
        ) || [];

        dokumente =
        JSON.parse(
            localStorage.getItem("ddh_dokumente")
        ) || [];

        einrichtungen =
        JSON.parse(
            localStorage.getItem("ddh_einrichtungen")
        ) || [];

        const daten =
        JSON.parse(
            localStorage.getItem("ddh_einstellungen")
        );

        if(daten){

            einstellungen = daten;

        }

    },

    speichern(){

        localStorage.setItem(
            "ddh_mitarbeiter",
            JSON.stringify(mitarbeiter)
        );

        localStorage.setItem(
            "ddh_schichten",
            JSON.stringify(schichten)
        );

        localStorage.setItem(
            "ddh_termine",
            JSON.stringify(termine)
        );

        localStorage.setItem(
            "ddh_aufgaben",
            JSON.stringify(aufgaben)
        );

        localStorage.setItem(
            "ddh_dokumente",
            JSON.stringify(dokumente)
        );

        localStorage.setItem(
            "ddh_einrichtungen",
            JSON.stringify(einrichtungen)
        );

        localStorage.setItem(
            "ddh_einstellungen",
            JSON.stringify(einstellungen)
        );

    },

    allesLoeschen(){

        if(!confirm(
            "Alle Daten wirklich löschen?"
        )){
            return;
        }

        localStorage.clear();

        location.reload();

    }

};