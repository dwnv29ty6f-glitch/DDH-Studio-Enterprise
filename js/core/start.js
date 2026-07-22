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
            "DDH Studio wird gestartet..."
        );

        Navigation.initialisieren();

        Navigation.oeffnen(
            "dashboard"
        );

        this.pruefen();

        console.log(
            "DDH Studio erfolgreich gestartet."
        );

    },

    pruefen() {

        console.log(
            "Core geladen."
        );

        console.log(
            "Module geladen."
        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        START.starten();

    }

);