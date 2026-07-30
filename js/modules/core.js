/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Datei: core.js
   Teil: 1/4
   Version: 2.0
========================================================== */

"use strict";

const Speiseplaene = {

    /* ======================================================
       Informationen
    ====================================================== */

    version: "2.0",

    appName: "DDH Studio Enterprise",

    modulName: "Speisepläne",

    /* ======================================================
       DOM
    ====================================================== */

    dom: {

        root: null,

        container: null,

        excelInput: null,

        btnExcel: null,

        btnDrucken: null

    },

    /* ======================================================
       Daten
    ====================================================== */

    daten: [],

    tage: [],

    excelDatei: null,

    arbeitsmappe: null,

    aktivesBlatt: null,

    /* ======================================================
       Zeitraum
    ====================================================== */

    zeitraum: {

        start: "",

        ende: "",

        kalenderwoche: ""

    },

    /* ======================================================
       Einstellungen
    ====================================================== */

    settings: {

        papier: "A4",

        orientierung: "landscape",

        schriftart: "Arial",

        hauptfarbe: "#0F4C81"

    },

    /* ======================================================
       Status
    ====================================================== */

    status: {

        gestartet: false,

        importiert: false,

        analysiert: false,

        layoutErstellt: false,

        druckBereit: false

    },

    /* ======================================================
       Initialisierung
    ====================================================== */

    init() {

        this.log("Initialisierung...");

        this.dom.root = document.getElementById("inhalt");

        if (!this.dom.root) {

            this.error(

                "Container #inhalt wurde nicht gefunden."

            );

            return;

        }

        this.render();

        this.cacheDOM();

        this.events();

        this.status.gestartet = true;

        this.log("Modul gestartet.");

    },

    /* ======================================================
       DOM Elemente merken
    ====================================================== */

    cacheDOM() {

        this.dom.container =

            document.getElementById(

                "speiseplanContainer"

            );

        this.dom.excelInput =

            document.getElementById(

                "excelDatei"

            );

        this.dom.btnExcel =

            document.getElementById(

                "btnExcel"

            );

        this.dom.btnDrucken =

            document.getElementById(

                "btnDrucken"

            );

    },

    /* ======================================================
       Hilfsfunktion
    ====================================================== */

    element(id) {

        return document.getElementById(id);

    },

    /* ======================================================
       Logging
    ====================================================== */

    log(text) {

        console.log(

            "[DDH Speisepläne]",

            text

        );

    },

    /* ======================================================
       Fehler
    ====================================================== */

    error(text) {

        console.error(

            "[DDH Speisepläne]",

            text

        );

        alert(text);

    }

};

/* ==========================================================
   Navigation registrieren
========================================================== */

if (typeof Seiten !== "undefined") {

    Seiten.speiseplaene = () => {

        Speiseplaene.init();

    };

}
