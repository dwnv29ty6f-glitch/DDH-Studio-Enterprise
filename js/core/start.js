"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Start
===========================================
*/

const DDH = {

    version: APP.version,

    gestartet: false,

    starten() {

        console.clear();

        console.log(

            APP.name +
            " " +
            APP.version +
            " startet..."

        );

        this.initialisieren();

    },

    initialisieren() {

        this.datenLaden();

        Navigation.initialisieren();

Navigation.oeffnen("dashboard");
        this.gestartet = true;

        console.log(

            APP.name +
            " erfolgreich gestartet."

        );

    },

    datenLaden() {

        window.mitarbeiter = Speicher.laden(
            "ddh_mitarbeiter",
            []
        );

        window.termine = Speicher.laden(
            "ddh_termine",
            []
        );

        window.todos = Speicher.laden(
            "ddh_todos",
            []
        );

        window.schichten = Speicher.laden(
            "ddh_schichten",
            []
        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        DDH.starten();

    }

);