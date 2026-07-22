"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Start
================================================
*/

const START = {

    starten() {

        console.clear();

        console.log(

            CONFIG.app.name +
            " " +
            CONFIG.app.version

        );

        console.log(

            "Starte Anwendung..."

        );

        Navigation.initialisieren();

        Navigation.oeffnen(

            "dashboard"

        );

        console.log(

            "Anwendung gestartet."

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        START.starten();

    }

);