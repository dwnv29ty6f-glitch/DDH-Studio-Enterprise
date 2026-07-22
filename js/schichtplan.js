"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Schichtplan
Microsoft Teams Edition
================================================
*/

const Schichtplan = {

    aktuellesDatum:

        new Date(),

    mitarbeiter: [],

    schichten: [],

    anzeigen() {

        this.mitarbeiter =

            Speicher.laden(

                CONFIG.speicher.mitarbeiter,

                []

            );

        this.schichten =

            Speicher.laden(

                CONFIG.speicher.schichtplan,

                []

            );

        DOM.html(

            "inhalt",

            this.html()

        );

        this.toolbar();

        this.statistik();

        this.raster();

        this.events();

    },

    html() {

        return `

<div class="schichtplan">

<div class="welcomeCard">

<h1>

👷 Schichtplan

</h1>

<p>

Microsoft Teams Shifts für die DDH Service GmbH

</p>

</div>

<div class="karte">

<div class="toolbar">

<button
id="monatZurueck"
class="hauptButton">

◀

</button>

<div
id="monatTitel"
class="monatTitel">

Juli 2026

</div>

<button
id="monatVor"
class="hauptButton">

▶

</button>

<div class="toolbarSpacer">

</div>

<button
id="heuteButton"
class="sekundenButton">

Heute

</button>

<button
id="druckButton"
class="sekundenButton">

🖨 Drucken

</button>

<button
id="pdfButton"
class="sekundenButton">

📄 PDF

</button>

<button
id="excelButton"
class="sekundenButton">

📊 Excel

</button>

</div>

</div>

<div
id="schichtplanStatistik">

</div>

<div
id="schichtplanRaster">

</div>

</div>

`;

    },
        toolbar() {

        const monate = [

            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"

        ];

        const titel = DOM.id(

            "monatTitel"

        );

        if (titel) {

            titel.textContent =

                monate[
                    this.aktuellesDatum.getMonth()
                ] +

                " " +

                this.aktuellesDatum.getFullYear();

        }

    },

    statistik() {

        const html = `

<div class="dashboardGrid">

<div class="statCard">

<div class="statIcon">

👥

</div>

<div class="statTitel">

Mitarbeiter

</div>

<div class="statWert">

${this.mitarbeiter.length}

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

Schichten

</div>

<div class="statWert">

${this.schichten.length}

</div>

<div class="statText">

Geplante Schichten

</div>

</div>

<div class="statCard">

<div class="statIcon">

⏱

</div>

<div class="statTitel">

Sollstunden

</div>

<div class="statWert">

0

</div>

<div class="statText">

Wird automatisch berechnet

</div>

</div>

<div class="statCard">

<div class="statIcon">

✅

</div>

<div class="statTitel">

Iststunden

</div>

<div class="statWert">

0

</div>

<div class="statText">

Wird automatisch berechnet

</div>

</div>

</div>

`;

        DOM.html(

            "schichtplanStatistik",

            html

        );

    },
        raster() {

        const jahr =

            this.aktuellesDatum.getFullYear();

        const monat =

            this.aktuellesDatum.getMonth();

        const tage =

            new Date(

                jahr,

                monat + 1,

                0

            ).getDate();

        let html = `

<div class="teamsPlan">

<div class="teamsHeader">

<div class="mitarbeiterSpalte">

Mitarbeiter

</div>

<div class="tageBereich">

`;

        for (

            let tag = 1;

            tag <= tage;

            tag++

        ) {

            html += `

<div class="tag">

${tag}

</div>

`;

        }

        html += `

</div>

</div>

<div class="teamsBody">

`;

        if (

            this.mitarbeiter.length === 0

        ) {

            html += `

<div class="teamsLeer">

Noch keine Mitarbeiter vorhanden.

</div>

`;

        }

        this.mitarbeiter.forEach(

            mitarbeiter => {

                html += `

<div class="teamsZeile">

<div class="mitarbeiterSpalte">

<div class="avatar">

${(mitarbeiter.name || "?")
.charAt(0)
.toUpperCase()}

</div>

<div>

<div class="mitarbeiterName">

${mitarbeiter.name || "-"}

</div>

<div class="mitarbeiterBereich">

${mitarbeiter.bereich || "Küche"}

</div>

</div>

</div>

<div class="tageBereich">

`;

                for (

                    let tag = 1;

                    tag <= tage;

                    tag++

                ) {

                    html += `

<div
class="schichtZelle"
data-mitarbeiter="${mitarbeiter.id || ""}"
data-tag="${tag}">

</div>

`;

                }

                html += `

</div>

</div>

`;

            }

        );

        html += `

</div>

</div>

`;

        DOM.html(

            "schichtplanRaster",

            html

        );

    },
        events() {

        const btnZurueck =

            DOM.id(

                "monatZurueck"

            );

        if (btnZurueck) {

            btnZurueck.addEventListener(

                "click",

                () => {

                    this.aktuellesDatum.setMonth(

                        this.aktuellesDatum.getMonth() - 1

                    );

                    this.anzeigen();

                }

            );

        }

        const btnVor =

            DOM.id(

                "monatVor"

            );

        if (btnVor) {

            btnVor.addEventListener(

                "click",

                () => {

                    this.aktuellesDatum.setMonth(

                        this.aktuellesDatum.getMonth() + 1

                    );

                    this.anzeigen();

                }

            );

        }

        document

            .querySelectorAll(

                ".schichtZelle"

            )

            .forEach(zelle => {

                zelle.addEventListener(

                    "click",

                    () => {

                        this.schichtWaehlen(

                            zelle

                        );

                    }

                );

            });

    },

    schichtWaehlen(zelle) {

        const schicht = prompt(

`Schicht auswählen:

F1
F2
M1
M2
S1
S2
S3
U
K
F`

        );

        if (!schicht) {

            return;

        }

        zelle.textContent =

            schicht.toUpperCase();

        zelle.className =

            "schichtZelle schicht-" +

            schicht.toUpperCase();

    }

};
