"use strict";

// ===============================
// Monate
// ===============================

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

// ===============================
// Schichten
// ===============================

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

// ===============================
// Sollstunden
// ===============================

const SOLLSTUNDEN = 160;