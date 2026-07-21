"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Core
   Konfiguration
========================================== */

const APP = {

    name: "DDH Studio Enterprise",

    version: "10.0",

    firma: "DDH Service GmbH",

    farben: {

        primaer: "#00bcd4",

        sekundär: "#0097a7",

        erfolg: "#4caf50",

        warnung: "#ff9800",

        fehler: "#f44336"

    }

};

const MONATE = [

    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"

];

const SCHICHTEN = {

    frueh: {

        kurz: "F",

        name: "Früh"

    },

    spaet: {

        kurz: "S",

        name: "Spät"

    },

    nacht: {

        kurz: "N",

        name: "Nacht"

    },

    frei: {

        kurz: "-",

        name: "Frei"

    },

    urlaub: {

        kurz: "U",

        name: "Urlaub"

    },

    krank: {

        kurz: "K",

        name: "Krank"

    }

};

const SOLLSTUNDEN = 160;