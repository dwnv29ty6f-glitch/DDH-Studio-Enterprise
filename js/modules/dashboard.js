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

    <button class="schnellButton" id="btnDashboardMitarbeiter">

        <div class="schnellIcon">👥</div>

        <div class="schnellTitel">Mitarbeiter</div>

        <div class="schnellText">Personal verwalten</div>

    </button>

    <button class="schnellButton" id="btnDashboardKalender">

        <div class="schnellIcon">📅</div>

        <div class="schnellTitel">Kalender</div>

        <div class="schnellText">Termine anzeigen</div>

    </button>

    <button class="schnellButton" id="btnDashboardSchichtplan">

        <div class="schnellIcon">👷</div>

        <div class="schnellTitel">Schichtplan</div>

        <div class="schnellText">Dienstplan bearbeiten</div>

    </button>

    <button class="schnellButton" id="btnDashboardSpeiseplan">

        <div class="schnellIcon">🍽</div>

        <div class="schnellTitel">Speiseplan</div>

        <div class="schnellText">Menüplanung</div>

    </button>

    <button class="schnellButton">

        <div class="schnellIcon">📦</div>

        <div class="schnellTitel">Bestellung</div>

        <div class="schnellText">Artikel bestellen</div>

    </button>

    <button class="schnellButton">

        <div class="schnellIcon">📄</div>

        <div class="schnellTitel">Dokumente</div>

        <div class="schnellText">Dateien verwalten</div>

    </button>

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