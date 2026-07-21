"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Dashboard
===========================================
*/

const Dashboard = {

    anzeigen() {

        // Überschrift

        const titel =
        document.getElementById(
            "seitenTitel"
        );

        if(titel){

            titel.textContent =
            "Dashboard";

        }

        const pfad =
        document.getElementById(
            "seitenPfad"
        );

        if(pfad){

            pfad.textContent =
            "DDH Studio Enterprise";

        }

        // Mitarbeiter

        const mitarbeiterKachel =
        document.getElementById(
            "dashboardMitarbeiter"
        );

        if(mitarbeiterKachel){

            mitarbeiterKachel.textContent =
            mitarbeiter.length;

        }

        // Termine

        const termineKachel =
        document.getElementById(
            "dashboardTermine"
        );

        if(termineKachel){

            termineKachel.textContent =
            termine.length;

        }

        // Schichten

        const schichtenKachel =
        document.getElementById(
            "dashboardSchichten"
        );

        if(schichtenKachel){

            schichtenKachel.textContent =
            schichten.length;

        }

        // Aufgaben

        const aufgabenKachel =
        document.getElementById(
            "dashboardAufgaben"
        );

        if(aufgabenKachel){

            aufgabenKachel.textContent =
            todos.length;

        }

    }

};