"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
App
===========================================
*/

const APP = {

    name: "DDH Studio Enterprise",

    version: "10.0.0",

    starten() {

        console.clear();

        console.log(
            this.name +
            " " +
            this.version
        );

        console.log(
            "Projekt erfolgreich gestartet."
        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        APP.starten();

    }

);