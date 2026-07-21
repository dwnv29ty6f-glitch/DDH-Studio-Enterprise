"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Konfiguration
===========================================
*/

const APP = {

    name: "DDH Studio Enterprise",

    version: "10.0",

    firma: "DDH Service GmbH",

    farben: {

        primaer: "#0B5FA5",

        sekundär: "#00B8B8",

        hintergrund: "#F5F7FA"

    },

    monate: [

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

    ],

    schichten: {

        frueh: {
            kurz: "F",
            name: "Früh",
            stunden: 8
        },

        spaet: {
            kurz: "S",
            name: "Spät",
            stunden: 8
        },

        nacht: {
            kurz: "N",
            name: "Nacht",
            stunden: 10
        },

        frei: {
            kurz: "-",
            name: "Frei",
            stunden: 0
        },

        urlaub: {
            kurz: "U",
            name: "Urlaub",
            stunden: 0
        },

        krank: {
            kurz: "K",
            name: "Krank",
            stunden: 0
        }

    },

    sollstunden: 160

};