"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Konfiguration
// ==========================================

const APP = {

    name: "DDH Studio Enterprise",

    version: "10.0",

    firma: "DDH Service GmbH",

    farben: {

        blau: "#0F4C81",

        tuerkis: "#00B8B0",

        hintergrund: "#F4F7FB",

        karte: "#FFFFFF",

        text: "#1F2937",

        rand: "#D8E2EC"

    },

    sollstunden: 160,

    schichten: [

        {
            id:"F",
            name:"Frühdienst",
            stunden:8,
            farbe:"#4CAF50"
        },

        {
            id:"S",
            name:"Spätdienst",
            stunden:8,
            farbe:"#2196F3"
        },

        {
            id:"N",
            name:"Nachtdienst",
            stunden:10,
            farbe:"#673AB7"
        },

        {
            id:"U",
            name:"Urlaub",
            stunden:0,
            farbe:"#FFC107"
        },

        {
            id:"K",
            name:"Krank",
            stunden:0,
            farbe:"#F44336"
        },

        {
            id:"Frei",
            name:"Frei",
            stunden:0,
            farbe:"#BDBDBD"
        }

    ]

};