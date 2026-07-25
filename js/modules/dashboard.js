"use strict";

/*
================================================
DDH Studio Enterprise 11
Dashboard
================================================
*/

const Dashboard = {
    
    uhrTimer: null,

    anzeigen() {

        DOM.html(

            "inhalt",

            this.html()

        );

        this.aktualisieren();

        this.events();

        this.uhrStarten();

    },

html() {

    return `

<div class="dashboard">

    <div class="welcomeCard">

        <div class="welcomeLinks">

            <div
                id="dashboardBegruessung"
                class="welcomeBegruessung">

                👋 Willkommen

            </div>

            <h1>

                DDH Studio Enterprise

            </h1>

            <p>

                Personal • Schichtplanung • Speisepläne • Bestellungen • Dokumente

            </p>

        </div>

        <div class="welcomeRechts">

            <div
                id="dashboardUhr"
                class="welcomeUhr">

                00:00

            </div>

            <div
                id="dashboardDatum"
                class="welcomeDatum">

                --

            </div>

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

            🚀 Schnellzugriff

        </h2>

        <div class="schnellzugriff">

            <button
                class="schnellButton"
                id="btnDashboardMitarbeiter">

                <div class="schnellIcon">👥</div>

                <div class="schnellTitel">

                    Mitarbeiter

                </div>

                <div class="schnellText">

                    Personal verwalten

                </div>

            </button>

            <button
                class="schnellButton"
                id="btnDashboardKalender">

                <div class="schnellIcon">📅</div>

                <div class="schnellTitel">

                    Kalender

                </div>

                <div class="schnellText">

                    Termine verwalten

                </div>

            </button>

            <button
                class="schnellButton"
                id="btnDashboardSchichtplan">

                <div class="schnellIcon">👷</div>

                <div class="schnellTitel">

                    Schichtplan

                </div>

                <div class="schnellText">

                    Dienstpläne bearbeiten

                </div>

            </button>

            <button
                class="schnellButton"
                id="btnDashboardSpeiseplan">

                <div class="schnellIcon">🍽</div>

                <div class="schnellTitel">

                    Speisepläne

                </div>

                <div class="schnellText">

                    Menüs verwalten

                </div>

            </button>

            <button
                class="schnellButton"
                id="btnDashboardBestellung">

                <div class="schnellIcon">📦</div>

                <div class="schnellTitel">

                    Bestellungen

                </div>

                <div class="schnellText">

                    Artikel bestellen

                </div>

            </button>

            <button
                class="schnellButton"
                id="btnDashboardDokumente">

                <div class="schnellIcon">📄</div>

                <div class="schnellTitel">

                    Dokumente

                </div>

                <div class="schnellText">

                    Dateien verwalten

                </div>

            </button>

        </div>

    </div>

    <div class="dashboardGrid">

        <div class="karte">

            <h2>

                📌 Heute

            </h2>

            <div
                id="dashboardHeute"
                class="dashboardHeute">

            </div>

        </div>

        <div class="karte">

            <h2>

                📊 Übersicht

            </h2>

            <div class="dashboardGrid">

                <div class="statCard">

                    <div>

                        <div class="statTitel">

                            📦 Bestellungen

                        </div>

                        <div
                            class="statWert"
                            id="dashboardBestellungen">

                            0

                        </div>

                    </div>

                </div>

                <div class="statCard">

                    <div>

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

        const jetzt = new Date();

        const stunde = jetzt.getHours();

        let begruessung = "👋 Willkommen";

        if (stunde < 12) {

            begruessung = "☀️ Guten Morgen";

        } else if (stunde < 18) {

            begruessung = "🌤 Guten Tag";

        } else {

            begruessung = "🌙 Guten Abend";

        }

        DOM.text(

            "dashboardBegruessung",

            begruessung

        );

        const datum = jetzt.toLocaleDateString(

            "de-DE",

            {

                weekday:"long",

                day:"2-digit",

                month:"long",

                year:"numeric"

            }

        );

        DOM.text(

            "dashboardDatum",

            datum

        );

        DOM.html(

            "dashboardHeute",

            `

<div>👥 Mitarbeiter: ${mitarbeiter.length}</div>

<div>👷 Schichten: ${schichtplan.length}</div>

<div>📅 Termine: ${kalender.length}</div>

<div>📄 Dokumente: ${dokumente.length}</div>

<div>📦 Bestellungen: ${bestellungen.length}</div>

`

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
                "speiseplaene",

            btnDashboardBestellung:
                "bestellungen",

            btnDashboardDokumente:
                "dokumente"

        };

        Object.entries(

            navigation

        ).forEach(

            ([id, seite]) => {

                const button =

                    DOM.id(id);

                if (!button) {

                    return;

                }

                button.onclick = () => {

                    Navigation.oeffnen(

                        seite

                    );

                };

            }

        );

    },

    uhrStarten() {

        const aktualisieren = () => {

            const jetzt = new Date();

            const zeit =

                jetzt.toLocaleTimeString(

                    "de-DE",

                    {

                        hour:"2-digit",

                        minute:"2-digit"

                    }

                );

            DOM.text(

                "dashboardUhr",

                zeit

            );

        };

        aktualisieren();

        if (

            this.uhrTimer

        ) {

            clearInterval(

                this.uhrTimer

            );

        }

        this.uhrTimer =

            setInterval(

                aktualisieren,

                1000

            );

    },
        statistik() {

        const mitarbeiter = Speicher.laden(

            CONFIG.speicher.mitarbeiter,

            []

        );

        const schichten = Speicher.laden(

            CONFIG.speicher.schichtplan,

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

        return {

            mitarbeiter:

                mitarbeiter.length,

            schichten:

                schichten.length,

            termine:

                kalender.length,

            aufgaben:

                aufgaben.length

        };

    },

    heute() {

        const heute = new Date();

        return heute.toLocaleDateString(

            "de-DE",

            {

                weekday: "long",

                day: "2-digit",

                month: "long",

                year: "numeric"

            }

        );

    },

    begruessung() {

        const stunde =

            new Date().getHours();

        if (stunde < 12) {

            return "☀️ Guten Morgen";

        }

        if (stunde < 18) {

            return "🌤 Guten Tag";

        }

        return "🌙 Guten Abend";

    },
        zeit() {

        return new Date().toLocaleTimeString(

            "de-DE",

            {

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit"

            }

        );

    },

    datum() {

        return new Date().toLocaleDateString(

            "de-DE",

            {

                weekday: "long",

                day: "2-digit",

                month: "long",

                year: "numeric"

            }

        );

    },

    aktualisierenLive() {

        DOM.text(

            "dashboardUhr",

            this.zeit()

        );

        DOM.text(

            "dashboardDatum",

            this.datum()

        );

        DOM.text(

            "dashboardBegruessung",

            this.begruessung()

        );

    }

};

window.addEventListener(

    "load",

    () => {

        if (

            typeof Dashboard !== "undefined"

        ) {

            Dashboard.aktualisierenLive();

        }

    }

);