"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Schichtplan
Phase 3
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

        this.monatAktualisieren();

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

Dienstplanung der DDH Service GmbH

</p>

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

<button
id="btnDrucken"
class="sekundenButton">

🖨 Drucken

</button>

<button
id="btnPdf"
class="sekundenButton">

📄 PDF

</button>

<button
id="btnExcel"
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

    monatAktualisieren() {

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
            ]

            +

            " "

            +

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

<div class="statTitel">

Mitarbeiter

</div>

<div class="statWert">

${this.mitarbeiter.length}

</div>

</div>

<div class="statCard">

<div class="statIcon">📅</div>

<div class="statTitel">

Schichten

</div>

<div class="statWert">

${this.schichten.length}

</div>

</div>

<div class="statCard">

<div class="statIcon">⏱</div>

<div class="statTitel">

Sollstunden

</div>

<div class="statWert">

0

</div>

</div>

<div class="statCard">

<div class="statIcon">✅</div>

<div class="statTitel">

Iststunden

</div>

<div class="statWert">

0

</div>

</div>

</div>

`

        );

    },
        raster() {

        const jahr = this.aktuellesDatum.getFullYear();

        const monat = this.aktuellesDatum.getMonth();

        const tageImMonat = new Date(

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

        for (let tag = 1; tag <= tageImMonat; tag++) {

            html += `

<div class="tagKopf">

${tag}

</div>

`;

        }

        html += `

</div>

</div>

<div class="teamsBody">

`;

        if (this.mitarbeiter.length === 0) {

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

                for (let tag = 1; tag <= tageImMonat; tag++) {

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

class="schichtZelle ${schicht ? "schicht-" + schicht.schicht : ""}"

data-mitarbeiter="${mitarbeiter.id}"

data-datum="${datum}"

>

${schicht ? schicht.schicht : ""}

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

        const btnZurueck = DOM.id(

            "btnMonatZurueck"

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

        const btnVor = DOM.id(

            "btnMonatVor"

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

        const btnHeute = DOM.id(

            "btnHeute"

        );

        if (btnHeute) {

            btnHeute.addEventListener(

                "click",

                () => {

                    this.aktuellesDatum = new Date();

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

                        this.schichtBearbeiten(

                            zelle

                        );

                    }

                );

            });

    },

    schichtBearbeiten(zelle) {

        const wert = prompt(

`Schicht eingeben

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

        const mitarbeiterId =

            zelle.dataset.mitarbeiter;

        const datum =

            zelle.dataset.datum;

        const index =

            this.schichten.findIndex(

                s =>

                    s.mitarbeiterId ==

                    mitarbeiterId &&

                    s.datum == datum

            );

        if (

            wert === null

        ) {

            return;

        }

        if (

            wert.trim() === ""

        ) {

            if (

                index > -1

            ) {

                this.schichten.splice(

                    index,

                    1

                );

            }

        } else {

            const eintrag = {

                mitarbeiterId:

                    mitarbeiterId,

                datum:

                    datum,

                schicht:

                    wert.toUpperCase()

            };

            if (

                index > -1

            ) {

                this.schichten[index] =

                    eintrag;

            } else {

                this.schichten.push(

                    eintrag

                );

            }

        }

        Speicher.speichern(

            CONFIG.speicher.schichtplan,

            this.schichten

        );

        this.raster();

        this.events();

    }

};
    dialogOeffnen(mitarbeiterId, datum) {

        this.aktuelleZelle = {

            mitarbeiterId,

            datum

        };

        DOM.html(

            "dialogTitel",

            "Schicht bearbeiten"

        );

        DOM.html(

            "dialogInhalt",

            `

<div class="schichtDialog">

<button class="schichtAuswahl" data-schicht="F1">🌅 F1 Frühdienst</button>

<button class="schichtAuswahl" data-schicht="F2">🌤 F2 Frühdienst</button>

<button class="schichtAuswahl" data-schicht="M1">☀️ M1 Mitteldienst</button>

<button class="schichtAuswahl" data-schicht="M2">🌇 M2 Mitteldienst</button>

<button class="schichtAuswahl" data-schicht="S1">🌙 S1 Spätdienst</button>

<button class="schichtAuswahl" data-schicht="S2">🌃 S2 Spätdienst</button>

<button class="schichtAuswahl" data-schicht="S3">🌌 S3 Spätdienst</button>

<button class="schichtAuswahl" data-schicht="U">🏖 Urlaub</button>

<button class="schichtAuswahl" data-schicht="K">🤒 Krank</button>

<button class="schichtAuswahl" data-schicht="F">💤 Frei</button>

<button
id="schichtLoeschen"
class="sekundenButton">

🗑 Schicht löschen

</button>

</div>

`

        );

        DOM.anzeigen(

            "dialogOverlay"

        );

        this.dialogEvents();

    },

    dialogEvents() {

        document

            .querySelectorAll(

                ".schichtAuswahl"

            )

            .forEach(button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.schichtSpeichern(

                            button.dataset.schicht

                        );

                    }

                );

            });

        const loeschen = DOM.id(

            "schichtLoeschen"

        );

        if (loeschen) {

            loeschen.addEventListener(

                "click",

                () => {

                    this.schichtLoeschen();

                }

            );

        }

        const schliessen = DOM.id(

            "dialogSchliessen"

        );

        if (schliessen) {

            schliessen.onclick = () => {

                DOM.ausblenden(

                    "dialogOverlay"

                );

            };

        }

    },
        schichtSpeichern(schicht) {

        const index = this.schichten.findIndex(

            eintrag =>

                eintrag.mitarbeiterId === this.aktuelleZelle.mitarbeiterId &&

                eintrag.datum === this.aktuelleZelle.datum

        );

        const daten = {

            id: Date.now().toString(),

            mitarbeiterId: this.aktuelleZelle.mitarbeiterId,

            datum: this.aktuelleZelle.datum,

            schicht: schicht,

            beginn: "",

            ende: "",

            pause: 0,

            notiz: ""

        };

        if (index >= 0) {

            this.schichten[index] = daten;

        } else {

            this.schichten.push(daten);

        }

        Speicher.speichern(

            CONFIG.speicher.schichtplan,

            this.schichten

        );

        DOM.ausblenden(

            "dialogOverlay"

        );

        this.anzeigen();

    },

    schichtLoeschen() {

        this.schichten = this.schichten.filter(

            eintrag =>

                !(

                    eintrag.mitarbeiterId === this.aktuelleZelle.mitarbeiterId &&

                    eintrag.datum === this.aktuelleZelle.datum

                )

        );

        Speicher.speichern(

            CONFIG.speicher.schichtplan,

            this.schichten

        );

        DOM.ausblenden(

            "dialogOverlay"

        );

        this.anzeigen();

    }
    schichtBearbeiten(zelle) {

        this.dialogOeffnen(

            zelle.dataset.mitarbeiter,

            zelle.dataset.datum

        );

    }

};
};