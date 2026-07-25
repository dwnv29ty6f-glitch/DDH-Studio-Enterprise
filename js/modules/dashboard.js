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

                👋 Willkommen bei DDH Studio Enterprise

            </h1>

            <p>

                Personal, Schichtplanung, Speisepläne, Bestellungen und Dokumente –
                alles zentral an einem Ort.

            </p>

        </div>

    </div>

    <div class="dashboardGrid">

        <div class="statCard">

            <div class="statIcon">👥</div>

            <div>

                <div class="statTitel">

                    Mitarbeiter

                </div>

                <div
                    class="statWert"
                    id="dashboardMitarbeiter">

                    0

                </div>

            </div>

        </div>

        <div class="statCard">

            <div class="statIcon">📅</div>

            <div>

                <div class="statTitel">

                    Termine

                </div>

                <div
                    class="statWert"
                    id="dashboardTermine">

                    0

                </div>

            </div>

        </div>

        <div class="statCard">

            <div class="statIcon">👷</div>

            <div>

                <div class="statTitel">

                    Schichten

                </div>

                <div
                    class="statWert"
                    id="dashboardSchichten">

                    0

                </div>

            </div>

        </div>

        <div class="statCard">

            <div class="statIcon">✅</div>

            <div>

                <div class="statTitel">

                    Aufgaben

                </div>

                <div
                    class="statWert"
                    id="dashboardAufgaben">

                    0

                </div>

            </div>

        </div>

    </div>

    <div class="karte">

        <h2>

            Schnellzugriff

        </h2>

        <div class="schnellzugriff">

            <button
                class="schnellButton"
                id="btnDashboardMitarbeiter">

                👥 Mitarbeiter

            </button>

            <button
                class="schnellButton"
                id="btnDashboardKalender">

                📅 Kalender

            </button>

            <button
                class="schnellButton"
                id="btnDashboardSchichtplan">

                👷 Schichtplan

            </button>

            <button
                class="schnellButton"
                id="btnDashboardSpeiseplan">

                🍽 Speiseplan

            </button>

            <button
                class="schnellButton">

                📦 Bestellung

            </button>

            <button
                class="schnellButton">

                📄 Dokumente

            </button>

        </div>

    </div>

    <div class="dashboardGrid">

        <div class="karte">

            <h2>

                📌 Heute

            </h2>

            <p>

                Willkommen im DDH Studio Enterprise.

            </p>

            <p>

                Hier erscheinen später automatisch
                Geburtstage, Termine, Urlaub,
                Krankmeldungen und Erinnerungen.

            </p>

        </div>

        <div class="karte">

            <h2>

                📊 Übersicht

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