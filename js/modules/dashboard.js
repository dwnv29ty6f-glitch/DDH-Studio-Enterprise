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

        this.aktualisieren();

        this.events();

    },

    html() {

        return `

<div
id="seite-dashboard"
class="seite aktiv">

<div
class="karte">

<h1>

Willkommen bei DDH Studio Enterprise

</h1>

<p>

Betriebsmanagement für die DDH Service GmbH

</p>

</div>

<div
class="dashboardGrid">

<div
class="kachel">

<div
class="kachelIcon">

👥

</div>

<div
class="kachelTitel">

Mitarbeiter

</div>

<div
id="dashboardMitarbeiter"
class="kachelWert">

0

</div>

</div>

<div
class="kachel">

<div
class="kachelIcon">

📅

</div>

<div
class="kachelTitel">

Termine

</div>

<div
id="dashboardTermine"
class="kachelWert">

0

</div>

</div>

<div
class="kachel">

<div
class="kachelIcon">

👷

</div>

<div
class="kachelTitel">

Schichten

</div>

<div
id="dashboardSchichten"
class="kachelWert">

0

</div>

</div>

<div
class="kachel">

<div
class="kachelIcon">

✅

</div>

<div
class="kachelTitel">

Aufgaben

</div>

<div
id="dashboardAufgaben"
class="kachelWert">

0

</div>

</div>

</div>

<div
class="karte">

<h2>

Schnellzugriff

</h2>

<div
class="toolbar">

<button
id="dashboardMitarbeiterButton"
class="hauptButton">

👥 Mitarbeiter

</button>

<button
id="dashboardSchichtplanButton"
class="hauptButton">

👷 Schichtplan

</button>

<button
id="dashboardKalenderButton"
class="hauptButton">

📅 Kalender

</button>

<button
id="dashboardSpeiseplanButton"
class="hauptButton">

🍽 Speisepläne

</button>

</div>

</div>

<div
class="karte">

<h2>

Aktuelle Übersicht

</h2>

<table>

<thead>

<tr>

<th>

Bereich

</th>

<th>

Status

</th>

</tr>

</thead>

<tbody>

<tr>

<td>

Mitarbeiter

</td>

<td
id="statusMitarbeiter">

0

</td>

</tr>

<tr>

<td>

Termine

</td>

<td
id="statusTermine">

0

</td>

</tr>

<tr>

<td>

Aufgaben

</td>

<td
id="statusAufgaben">

0

</td>

</tr>

<tr>

<td>

Schichten

</td>

<td
id="statusSchichten">

0

</td>

</tr>

</tbody>

</table>

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

            "statusMitarbeiter",

            mitarbeiter.length

        );

        DOM.text(

            "statusTermine",

            kalender.length

        );

        DOM.text(

            "statusAufgaben",

            aufgaben.length

        );

        DOM.text(

            "statusSchichten",

            schichtplan.length

        );

    },

    events() {

        const btnMitarbeiter =

            DOM.id(

                "dashboardMitarbeiterButton"

            );

        if(btnMitarbeiter){

            btnMitarbeiter.addEventListener(

                "click",

                () => {

                    Navigation.oeffnen(

                        "mitarbeiter"

                    );

                }

            );

        }

        const btnSchichtplan =

            DOM.id(

                "dashboardSchichtplanButton"

            );

        if(btnSchichtplan){

            btnSchichtplan.addEventListener(

                "click",

                () => {

                    Navigation.oeffnen(

                        "schichtplan"

                    );

                }

            );

        }

        const btnKalender =

            DOM.id(

                "dashboardKalenderButton"

            );

        if(btnKalender){

            btnKalender.addEventListener(

                "click",

                () => {

                    Navigation.oeffnen(

                        "kalender"

                    );

                }

            );

        }

        const btnSpeiseplan =

            DOM.id(

                "dashboardSpeiseplanButton"

            );

        if(btnSpeiseplan){

            btnSpeiseplan.addEventListener(

                "click",

                () => {

                    Navigation.oeffnen(

                        "speiseplaene"

                    );

                }

            );

        }

    },
        statistik() {

        return {

            mitarbeiter: Speicher.laden(

                CONFIG.speicher.mitarbeiter,

                []

            ).length,

            termine: Speicher.laden(

                CONFIG.speicher.kalender,

                []

            ).length,

            aufgaben: Speicher.laden(

                CONFIG.speicher.aufgaben,

                []

            ).length,

            schichten: Speicher.laden(

                CONFIG.speicher.schichtplan,

                []

            ).length

        };

    },

    aktualisierenNachSpeichern() {

        this.aktualisieren();

    }

};