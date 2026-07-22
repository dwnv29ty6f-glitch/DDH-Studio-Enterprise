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

            "Starte DDH Studio..."

        );

        Navigation.initialisieren();

        Navigation.oeffnen(

            "dashboard"

        );

        console.log(

            "DDH Studio gestartet."

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        START.starten();

    }

);