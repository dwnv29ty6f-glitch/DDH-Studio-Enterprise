"use strict";

/*
=========================================
DDH Studio Enterprise
Schichtplan V2
=========================================
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

    <div class="schichtHeader">

        <div>

            <h1>📅 Schichtplan</h1>

            <p>

                Microsoft Teams Schichten

            </p>

        </div>

        <div class="schichtHeaderRechts">

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

        </div>

    </div>

    <div id="schichtplanStatistik">

    </div>

    <div

        class="karte">

        <div class="toolbar">

            <input

                id="schichtSuche"

                type="text"

                placeholder="🔍 Mitarbeiter suchen">

            <div class="toolbarSpacer"></div>

            <button

                id="btnHeute"

                class="sekundenButton">

                Heute

            </button>

            <button

                id="btnVorlage"

                class="hauptButton">

                📋 Vorlage

            </button>

            <button

                id="btnExport"

                class="hauptButton">

                🖨 Export

            </button>

        </div>

        <div

            id="schichtplanRaster">

        </div>

    </div>

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

        const urlaub = this.schichten.filter(

            s => s.schicht === "U"

        ).length;

        const krank = this.schichten.filter(

            s => s.schicht === "K"

        ).length;

        DOM.html(

            "schichtplanStatistik",

            `

<div class="dashboardGrid">

    <div class="statCard">

        <div class="statIcon">👥</div>

        <div>

            <div class="statTitel">

                Mitarbeiter

            </div>

            <div class="statWert">

                ${this.mitarbeiter.length}

            </div>

        </div>

    </div>

    <div class="statCard">

        <div class="statIcon">📅</div>

        <div>

            <div class="statTitel">

                Schichten

            </div>

            <div class="statWert">

                ${this.schichten.length}

            </div>

        </div>

    </div>

    <div class="statCard">

        <div class="statIcon">🏖</div>

        <div>

            <div class="statTitel">

                Urlaub

            </div>

            <div class="statWert">

                ${urlaub}

            </div>

        </div>

    </div>

    <div class="statCard">

        <div class="statIcon">🤒</div>

        <div>

            <div class="statTitel">

                Krank

            </div>

            <div class="statWert">

                ${krank}

            </div>

        </div>

    </div>

</div>

`

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

`;

        for (

            let tag = 1;

            tag <= tage;

            tag++

        ) {

            html += `

<div class="tagKopf">

    ${tag}

</div>

`;

        }

        html += `

</div>

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

    <div class="teamsMitarbeiter">

        ${mitarbeiter.profilbild

            ? `<img
                src="${mitarbeiter.profilbild}"
                class="teamsAvatar">`

            : `<div
                class="teamsAvatarLeer">

                ${(
                    mitarbeiter.vorname || "?"
                )

                .charAt(0)

                .toUpperCase()}

              </div>`
        }

        <div>

            <strong>

                ${mitarbeiter.vorname || ""}

                ${mitarbeiter.nachname || ""}

            </strong>

            <br>

            <small>

                ${mitarbeiter.position || "-"}

            </small>

        </div>

    </div>

`;

                for (

                    let tag = 1;

                    tag <= tage;

                    tag++

                ) {

                    const datum =

                        jahr +

                        "-" +

                        String(

                            monat + 1

                        ).padStart(

                            2,

                            "0"

                        ) +

                        "-" +

                        String(

                            tag

                        ).padStart(

                            2,

                            "0"

                        );

                    const schicht =

                        this.schichten.find(

                            s =>

                                s.mitarbeiterId ==

                                mitarbeiter.id &&

                                s.datum ==

                                datum

                        );

                    html += `

<div

    class="schichtFeld"

    data-mitarbeiter="${mitarbeiter.id}"

    data-datum="${datum}">

    ${schicht

        ? schicht.schicht

        : ""}

</div>

`;

                }

                html += `

</div>

`;

            }

        );

        html += `

</div>

`;

        DOM.html(

            "schichtplanRaster",

            html

        );

    },
        events() {

        const btnZurueck =

            DOM.id("btnMonatZurueck");

        if (btnZurueck) {

            btnZurueck.onclick = () => {

                this.aktuellesDatum.setMonth(

                    this.aktuellesDatum.getMonth() - 1

                );

                this.anzeigen();

            };

        }

        const btnVor =

            DOM.id("btnMonatVor");

        if (btnVor) {

            btnVor.onclick = () => {

                this.aktuellesDatum.setMonth(

                    this.aktuellesDatum.getMonth() + 1

                );

                this.anzeigen();

            };

        }

        const btnHeute =

            DOM.id("btnHeute");

        if (btnHeute) {

            btnHeute.onclick = () => {

                this.aktuellesDatum =

                    new Date();

                this.anzeigen();

            };

        }

        const suche =

            DOM.id("schichtSuche");

        if (suche) {

            suche.oninput = () => {

                const text =

                    suche.value.toLowerCase();

                document

                    .querySelectorAll(".teamsZeile")

                    .forEach(zeile => {

                        zeile.style.display =

                            zeile.innerText

                                .toLowerCase()

                                .includes(text)

                                ? ""

                                : "none";

                    });

            };

        }

        document

            .querySelectorAll(".schichtFeld")

            .forEach(feld => {

                feld.onclick = () => {

                    this.schichtDialog(

    feld

);

                };

            });

    },
    
        schichtDialog(feld) {

        this.aktuelleZelle = feld;

        Dialog.oeffnen(

            "📅 Schicht auswählen",

            `

<div class="schichtDialog">

    <div class="schichtAuswahl">

        <button class="schichtOption" data-schicht="F1">🌅 F1</button>

        <button class="schichtOption" data-schicht="F2">🌅 F2</button>

        <button class="schichtOption" data-schicht="M1">☀️ M1</button>

        <button class="schichtOption" data-schicht="M2">☀️ M2</button>

        <button class="schichtOption" data-schicht="S1">🌙 S1</button>

        <button class="schichtOption" data-schicht="S2">🌙 S2</button>

        <button class="schichtOption" data-schicht="S3">🌙 S3</button>

        <button class="schichtOption" data-schicht="U">🏖 Urlaub</button>

        <button class="schichtOption" data-schicht="K">🤒 Krank</button>

        <button class="schichtOption" data-schicht="F">🟢 Frei</button>

        <button class="schichtOption loeschen" data-schicht="">
            🗑 Schicht löschen
        </button>

    </div>

</div>

`

        );

        this.ausgewaehlteSchicht = "";

        document

            .querySelectorAll(".schichtOption")

            .forEach(button => {

                button.onclick = () => {

                    document

                        .querySelectorAll(".schichtOption")

                        .forEach(b =>

                            b.classList.remove("aktiv")

                        );

                    button.classList.add("aktiv");

                    this.ausgewaehlteSchicht =

                        button.dataset.schicht;

                };

            });

    },

    schichtBearbeiten(feld) {

        const eingabe = prompt(

`Schicht eingeben:

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

        if (eingabe === null) {

            return;

        }

        const mitarbeiterId =

            feld.dataset.mitarbeiter;

        const datum =

            feld.dataset.datum;

        const index =

            this.schichten.findIndex(

                s =>

                    s.mitarbeiterId ==

                    mitarbeiterId &&

                    s.datum ==

                    datum

            );

        if (

            eingabe.trim() === ""

        ) {

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

                mitarbeiterId,

                datum,

                schicht:

                    eingabe.toUpperCase()

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

        this.raster();

        this.events();

    }

};