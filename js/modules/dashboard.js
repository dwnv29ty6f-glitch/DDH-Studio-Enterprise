"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Dashboard
================================================
*/

const Dashboard = {

    anzeigen() {

        const inhalt =
`
<div
    id="seite-dashboard"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Willkommen bei DDH Studio Enterprise

        </h1>

        <p>

            Betriebsmanagement für
            DDH Service GmbH

        </p>

    </div>

    <div class="dashboardGrid">

        <div class="kachel">

            <div class="kachelIcon">

                👥

            </div>

            <div class="kachelTitel">

                Mitarbeiter

            </div>

            <div
                id="dashboardMitarbeiter"
                class="kachelWert">

                0

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                📅

            </div>

            <div class="kachelTitel">

                Termine

            </div>

            <div
                id="dashboardTermine"
                class="kachelWert">

                0

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                👷

            </div>

            <div class="kachelTitel">

                Schichten

            </div>

            <div
                id="dashboardSchichten"
                class="kachelWert">

                0

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                ✅

            </div>

            <div class="kachelTitel">

                Aufgaben

            </div>

            <div
                id="dashboardAufgaben"
                class="kachelWert">

                0

            </div>

        </div>

    </div>

    <div class="karte">

        <h2>

            Schnellzugriff

        </h2>

        <div class="toolbar">

            <button
                class="hauptButton">

                👥 Mitarbeiter

            </button>

            <button
                class="hauptButton">

                👷 Schichtplan

            </button>

            <button
                class="hauptButton">

                📅 Kalender

            </button>

            <button
                class="hauptButton">

                🍽 Speisepläne

            </button>

        </div>

    </div>

    <div class="karte">

        <h2>

            Letzte Aktivitäten

        </h2>

        <table>

            <thead>

                <tr>

                    <th>

                        Datum

                    </th>

                    <th>

                        Beschreibung

                    </th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>

                        -

                    </td>

                    <td>

                        Noch keine Aktivitäten vorhanden.

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
`;

        DOM.html(

            "inhalt",

            inhalt

        );

        this.aktualisieren();

    },

    aktualisieren() {

        DOM.text(

            "dashboardMitarbeiter",

            Speicher.laden(
                CONFIG.speicher.mitarbeiter
            ).length

        );

        DOM.text(

            "dashboardTermine",

            Speicher.laden(
                CONFIG.speicher.kalender
            ).length

        );

        DOM.text(

            "dashboardSchichten",

            Speicher.laden(
                CONFIG.speicher.schichtplan
            ).length

        );

        DOM.text(

            "dashboardAufgaben",

            Speicher.laden(
                CONFIG.speicher.aufgaben
            ).length

        );

    }

};