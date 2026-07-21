"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Dashboard
===========================================
*/

const Dashboard = {

    anzeigen() {

        document
            .querySelectorAll(".seite")
            .forEach(seite => {

                seite.classList.remove("aktiv");

            });

        document
            .getElementById("seite-dashboard")
            .classList.add("aktiv");

        document.getElementById(
            "seitenTitel"
        ).textContent = "Dashboard";

        document.getElementById(
            "seitenPfad"
        ).textContent = "DDH Studio Enterprise";

        document.getElementById(
            "dashboardMitarbeiter"
        ).textContent = mitarbeiter.length;

        document.getElementById(
            "dashboardTermine"
        ).textContent = termine.length;

        document.getElementById(
            "dashboardSchichten"
        ).textContent = schichten.length;

        document.getElementById(
            "dashboardAufgaben"
        ).textContent = todos.length;

    }

};