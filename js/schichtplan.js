"use strict";

/*
=========================================
DDH Studio Enterprise
Schichtplan V2
=========================================
*/

const Schichtplan = {
    
        schichtTypen: {

        F1: {

            name: "Frühdienst 1",

            von: "07:00",

            bis: "14:00",

            stunden: 7,

            farbe: "#2563EB"

        },

        F2: {

            name: "Frühdienst 2",

            von: "08:00",

            bis: "14:00",

            stunden: 6,

            farbe: "#60A5FA"

        },

        M1: {

            name: "Mitteldienst 1",

            von: "10:00",

            bis: "15:00",

            stunden: 5,

            farbe: "#16A34A"

        },

        M2: {

            name: "Mitteldienst 2",

            von: "09:00",

            bis: "15:00",

            stunden: 6,

            farbe: "#22C55E"

        },

        S1: {

            name: "Spätdienst 1",

            von: "15:00",

            bis: "20:00",

            stunden: 5,

            farbe: "#F59E0B"

        },

        S2: {

            name: "Spätdienst 2",

            von: "14:00",

            bis: "20:00",

            stunden: 6,

            farbe: "#EA580C"

        },

        S3: {

            name: "Spätdienst 3",

            von: "16:00",

            bis: "20:00",

            stunden: 4,

            farbe: "#9333EA"

        },

        U: {

            name: "Urlaub",

            stunden: 0,

            farbe: "#06B6D4"

        },

        K: {

            name: "Krank",

            stunden: 0,

            farbe: "#DC2626"

        },

        F: {

            name: "Frei",

            stunden: 0,

            farbe: "#9CA3AF"

        }

    },

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

    class="schichtFeld ${
    schicht
        ? "schicht-" + schicht.schicht
        : ""
}"

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

    <div class="schichtOption schicht-F1" data-schicht="F1">🌅 F1</div>

    <div class="schichtOption schicht-F2" data-schicht="F2">🌅 F2</div>

    <div class="schichtOption schicht-M1" data-schicht="M1">☀️ M1</div>

    <div class="schichtOption schicht-M2" data-schicht="M2">☀️ M2</div>

    <div class="schichtOption schicht-S1" data-schicht="S1">🌙 S1</div>

    <div class="schichtOption schicht-S2" data-schicht="S2">🌙 S2</div>

    <div class="schichtOption schicht-S3" data-schicht="S3">🌙 S3</div>

    <div class="schichtOption schicht-U" data-schicht="U">🏖 Urlaub</div>

    <div class="schichtOption schicht-K" data-schicht="K">🤒 Krank</div>

    <div class="schichtOption schicht-F" data-schicht="F">🟢 Frei</div>

    <div class="schichtOption loeschen" data-schicht="">
        🗑 Schicht löschen
    </div>

</div>

`

        );

        this.ausgewaehlteSchicht = "";
        
        Dialog.abbrechen();

Dialog.speichern(() => {

    this.schichtBearbeiten(

        this.aktuelleZelle,

        this.ausgewaehlteSchicht

    );

});

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

    schichtBearbeiten(feld, schicht) {

        

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

            schicht.trim() === ""

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

        Dialog.schliessen();

this.raster();

this.events();

this.statistik();

    }

};