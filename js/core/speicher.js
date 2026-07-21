"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Speicherverwaltung
===========================================
*/

const Speicher = {

    laden(schluessel, standardwert) {

        try {

            const daten = localStorage.getItem(schluessel);

            if (daten === null) {

                return standardwert;

            }

            return JSON.parse(daten);

        } catch (fehler) {

            console.error(
                "Fehler beim Laden:",
                schluessel,
                fehler
            );

            return standardwert;

        }

    },

    speichern(schluessel, daten) {

        localStorage.setItem(

            schluessel,

            JSON.stringify(daten)

        );

    },

    loeschen(schluessel) {

        localStorage.removeItem(schluessel);

    },

    allesLoeschen() {

        localStorage.clear();

    }

};