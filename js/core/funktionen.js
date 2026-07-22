"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Hilfsfunktionen
================================================
*/

const Funktionen = {

    zufallsID() {

        return Date.now().toString(36) +

            Math.random()
            .toString(36)
            .substring(2,8);

    },

    datumHeute() {

        return new Date()
            .toISOString()
            .split("T")[0];

    },

    uhrzeitJetzt() {

        return new Date()
            .toLocaleTimeString(
                "de-DE",
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            );

    },

    zahl(text) {

        return Number(text);

    },

    text(text) {

        return String(text);

    },

    runden(zahl,stellen=2) {

        return Number(
            zahl.toFixed(stellen)
        );

    },

    leer(wert) {

        return (

            wert === null ||

            wert === undefined ||

            wert === ""

        );

    },

    kopie(objekt) {

        return JSON.parse(

            JSON.stringify(objekt)

        );

    },

    warten(ms) {

        return new Promise(

            resolve =>

                setTimeout(

                    resolve,

                    ms

                )

        );

    }

};