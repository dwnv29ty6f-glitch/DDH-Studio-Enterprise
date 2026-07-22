"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Schichtplan
================================================
*/

const Schichtplan = {

    aktuellesDatum: new Date(),

    mitarbeiter: [],

    schichten: [],

    anzeigen() {

        this.mitarbeiter = Speicher.laden(
            CONFIG.speicher.mitarbeiter,
            []
        );

        this.schichten = Speicher.laden(
            CONFIG.speicher.schichtplan,
            []
        );

        DOM.html(
            "inhalt",
            this.html()
        );

        this.monatTitel();

        this.statistik();

        this.raster();

        this.events();

    },

    html() {

        return `

<div class="schichtplan">

    <div class="welcomeCard">

        <h1>👷 Schichtplan</h1>

        <p>Dienstplanung der DDH Service GmbH</p>

    </div>

    <div class="karte">

        <div class="toolbar">

            <button
                id="btnMonatZurueck"
                class="hauptButton">

                ◀

            </button>

            <div
                id="monatTitel"
                class="monatTitel">

            </div>

            <button
                id="btnMonatVor"
                class="hauptButton">

                ▶

            </button>

            <div class="toolbarSpacer"></div>

            <button
                id="btnHeute"
                class="sekundenButton">

                Heute

            </button>

        </div>

    </div>

    <div id="schichtplanStatistik"></div>

    <div id="schichtplanRaster"></div>

</div>

`;

    },

    monatTitel() {

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

        DOM.text(

            "monatTitel",

            monate[
                this.aktuellesDatum.getMonth()
            ] +

            " " +

            this.aktuellesDatum.getFullYear()

        );

    },

    statistik() {

        DOM.html(

            "schichtplanStatistik",

            `

<div class="dashboardGrid">

    <div class="statCard">

        <div class="statIcon">👥</div>

        <div class="statTitel">Mitarbeiter</div>

        <div class="statWert">

            ${this.mitarbeiter.length}

        </div>

    </div>

    <div class="statCard">

        <div class="statIcon">📅</div>

        <div class="statTitel">Schichten</div>

        <div class="statWert">

            ${this.schichten.length}

        </div>

    </div>

</div>

`

        );

    },
        raster() {

        const jahr = this.aktuellesDatum.getFullYear();

        const monat = this.aktuellesDatum.getMonth();

        const tage = new Date(

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

`;

        for (let tag = 1; tag <= tage; tag++) {

            html += `

<div class="tagKopf">

    ${tag}

</div>

`;

        }

        html += `

    </div>

`;

        if (this.mitarbeiter.length === 0) {

            html += `

<div class="teamsLeer">

    Noch keine Mitarbeiter vorhanden.

</div>

`;

        }

        this.mitarbeiter.forEach(mitarbeiter => {

            html += `

<div class="teamsZeile">

    <div class="mitarbeiterSpalte">

        <div class="avatar">

            ${(mitarbeiter.name || "?").charAt(0).toUpperCase()}

        </div>

        <div>

            <div class="mitarbeiterName">

                ${mitarbeiter.name || ""}

            </div>

            <div class="mitarbeiterBereich">

                ${mitarbeiter.bereich || ""}

            </div>

        </div>

    </div>

`;

            for (let tag = 1; tag <= tage; tag++) {

                const datum =

                    jahr +

                    "-" +

                    String(monat + 1).padStart(2, "0") +

                    "-" +

                    String(tag).padStart(2, "0");

                const schicht = this.schichten.find(

                    s =>

                        s.mitarbeiterId == mitarbeiter.id &&

                        s.datum == datum

                );

                html += `

<div

class="schichtZelle"

data-mitarbeiter="${mitarbeiter.id}"

data-datum="${datum}"

>

${schicht ? schicht.schicht : ""}

</div>

`;

            }

            html += `

</div>

`;

        });

        html += `

</div>

`;

        DOM.html(

            "schichtplanRaster",

            html

        );

    },
        events() {

        const btnZurueck = DOM.id(
            "btnMonatZurueck"
        );

        if (btnZurueck) {

            btnZurueck.onclick = () => {

                this.aktuellesDatum.setMonth(

                    this.aktuellesDatum.getMonth() - 1

                );

                this.anzeigen();

            };

        }

        const btnVor = DOM.id(
            "btnMonatVor"
        );

        if (btnVor) {

            btnVor.onclick = () => {

                this.aktuellesDatum.setMonth(

                    this.aktuellesDatum.getMonth() + 1

                );

                this.anzeigen();

            };

        }

        const btnHeute = DOM.id(
            "btnHeute"
        );

        if (btnHeute) {

            btnHeute.onclick = () => {

                this.aktuellesDatum = new Date();

                this.anzeigen();

            };

        }

        document
            .querySelectorAll(".schichtZelle")
            .forEach(zelle => {

                zelle.onclick = () => {

                    this.schichtBearbeiten(

                        zelle

                    );

                };

            });

    },

    schichtBearbeiten(zelle) {

        const schicht = prompt(

`Schicht auswählen

F1
F2
M1
M2
S1
S2
S3
U
K
F

Leer = löschen`

        );

        if (schicht === null) {

            return;

        }

        const mitarbeiterId =

            zelle.dataset.mitarbeiter;

        const datum =

            zelle.dataset.datum;

        const index =

            this.schichten.findIndex(

                eintrag =>

                    eintrag.mitarbeiterId ==

                    mitarbeiterId &&

                    eintrag.datum ==

                    datum

            );

        if (schicht.trim() === "") {

            if (index >= 0) {

                this.schichten.splice(

                    index,

                    1

                );

            }

        } else {

            const daten = {

                id:

                    Date.now().toString(),

                mitarbeiterId:

                    mitarbeiterId,

                datum:

                    datum,

                schicht:

                    schicht.toUpperCase()

            };

            if (index >= 0) {

                this.schichten[index] =

                    daten;

            } else {

                this.schichten.push(

                    daten

                );

            }

        }

        Speicher.speichern(

            CONFIG.speicher.schichtplan,

            this.schichten

        );

        this.anzeigen();

    }

};