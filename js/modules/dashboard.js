"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Dashboard
================================================
*/

const Dashboard = {

    anzeigen() {

        DOM.html(

            "inhalt",

            this.html()

        );

        this.events();

        this.aktualisieren();

    },

    html() {

        return `

<div class="dashboard">

<div class="welcomeCard">

<div>

<h1>

Willkommen zurück 👋

</h1>

<p>

DDH Studio Enterprise unterstützt dich bei der Verwaltung von Mitarbeitern, Schichtplänen, Speiseplänen, Bestellungen und Dokumenten.

</p>

</div>

</div>

<div class="dashboardGrid">

<div class="statCard">

<div class="statIcon">

👥

</div>

<div class="statTitel">

Mitarbeiter

</div>

<div
class="statWert"
id="dashboardMitarbeiter">

0

</div>

<div class="statText">

Aktive Mitarbeiter

</div>

</div>

<div class="statCard">

<div class="statIcon">

📅

</div>

<div class="statTitel">

Termine

</div>

<div
class="statWert"
id="dashboardTermine">

0

</div>

<div class="statText">

Geplante Termine

</div>

</div>

<div class="statCard">

<div class="statIcon">

✅

</div>

<div class="statTitel">

Aufgaben

</div>

<div
class="statWert"
id="dashboardAufgaben">

0

</div>

<div class="statText">

Offene Aufgaben

</div>

</div>

<div class="statCard">

<div class="statIcon">

👷

</div>

<div class="statTitel">

Schichten

</div>

<div
class="statWert"
id="dashboardSchichten">

0

</div>

<div class="statText">

Geplante Schichten

</div>

</div>

</div>

<div class="karte">

<h2>

Schnellzugriff

</h2>

<div class="schnellzugriff">
<div class="schnellButton"
id="btnDashboardMitarbeiter">

<div class="schnellLinks">

<div class="schnellIcon">

👥

</div>

<div>

<div class="schnellTitel">

Mitarbeiter

</div>

<div class="statText">

Mitarbeiter verwalten

</div>

</div>

</div>

<div class="schnellPfeil">

→

</div>

</div>

<div class="schnellButton"
id="btnDashboardKalender">

<div class="schnellLinks">

<div class="schnellIcon">

🗓

</div>

<div>

<div class="schnellTitel">

Kalender

</div>

<div class="statText">

Termine anzeigen

</div>

</div>

</div>

<div class="schnellPfeil">

→

</div>

</div>

<div class="schnellButton"
id="btnDashboardSchichtplan">

<div class="schnellLinks">

<div class="schnellIcon">

👷

</div>

<div>

<div class="schnellTitel">

Schichtplan

</div>

<div class="statText">

Teams Schichten

</div>

</div>

</div>

<div class="schnellPfeil">

→

</div>

</div>

<div class="schnellButton"
id="btnDashboardSpeiseplan">

<div class="schnellLinks">

<div class="schnellIcon">

🍽

</div>

<div>

<div class="schnellTitel">

Speisepläne

</div>

<div class="statText">

Speisepläne bearbeiten

</div>

</div>

</div>

<div class="schnellPfeil">

→

</div>

</div>

</div>

</div>

<div class="karte">

<h2>

Heute im Überblick

</h2>

<div class="dashboardGrid">

<div class="statCard">

<div class="statTitel">

📦 Bestellungen

</div>

<div
class="statWert"
id="dashboardBestellungen">

0

</div>

</div>

<div class="statCard">

<div class="statTitel">

📄 Dokumente

</div>

<div
class="statWert"
id="dashboardDokumente">

0

</div>

</div>

</div>

</div>

`;

},
    aktualisieren() {

        const mitarbeiter = Speicher.laden(
            CONFIG.speicher.mitarbeiter,
            []
        );

        const kalender = Speicher.laden(
            CONFIG.speicher.kalender,
            []
        );

        const aufgaben = Speicher.laden(
            CONFIG.speicher.aufgaben,
            []
        );

        const schichtplan = Speicher.laden(
            CONFIG.speicher.schichtplan,
            []
        );

        const bestellungen = Speicher.laden(
            CONFIG.speicher.bestellungen,
            []
        );

        const dokumente = Speicher.laden(
            CONFIG.speicher.dokumente,
            []
        );

        DOM.text(
            "dashboardMitarbeiter",
            mitarbeiter.length
        );

        DOM.text(
            "dashboardTermine",
            kalender.length
        );

        DOM.text(
            "dashboardAufgaben",
            aufgaben.length
        );

        DOM.text(
            "dashboardSchichten",
            schichtplan.length
        );

        DOM.text(
            "dashboardBestellungen",
            bestellungen.length
        );

        DOM.text(
            "dashboardDokumente",
            dokumente.length
        );

    },

    events() {

        const navigation = {

            btnDashboardMitarbeiter:
                "mitarbeiter",

            btnDashboardKalender:
                "kalender",

            btnDashboardSchichtplan:
                "schichtplan",

            btnDashboardSpeiseplan:
                "speiseplaene"

        };

        Object.entries(navigation).forEach(

            ([id, seite]) => {

                const button = DOM.id(id);

                if (button) {

                    button.addEventListener(

                        "click",

                        () => {

                            Navigation.oeffnen(

                                seite

                            );

                        }

                    );

                }

            }

        );

    }

};