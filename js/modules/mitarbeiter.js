"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Mitarbeiterverwaltung
Teil 1
================================================
*/

const Mitarbeiter = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.mitarbeiter,

            []

        );

        DOM.html(

            "inhalt",

            this.html()

        );

        this.listeAktualisieren();

        this.events();

    },

    html() {

        return `

<div class="mitarbeiter">

    <div class="welcomeCard">

        <h1>

            👥 Mitarbeiter

        </h1>

        <p>

            Mitarbeiterverwaltung der DDH Service GmbH

        </p>

    </div>

    <div class="karte">

        <div class="toolbar">

            <input

                id="mitarbeiterSuche"

                type="text"

                placeholder="Mitarbeiter suchen...">

            <button

                id="btnMitarbeiterNeu"

                class="hauptButton">

                ➕ Mitarbeiter

            </button>

        </div>

    </div>

    <div

        id="mitarbeiterListe">

    </div>

</div>

`;

    },
        listeAktualisieren() {

        let html = "";

        if (this.daten.length === 0) {

            html = `

<div class="karte">

    <h2>

        Keine Mitarbeiter vorhanden

    </h2>

    <p>

        Klicke auf „➕ Mitarbeiter“, um den ersten Mitarbeiter anzulegen.

    </p>

</div>

`;

        } else {

            this.daten.forEach(mitarbeiter => {

                html += `

<div class="karte mitarbeiterKarte">

    <div class="mitarbeiterLinks">

        <div

            class="avatar"

            style="background:${mitarbeiter.farbe || "#0077C8"};">

            ${((mitarbeiter.vorname || "?").charAt(0)).toUpperCase()}

        </div>

        <div class="mitarbeiterInfos">

            <h2>

                ${(mitarbeiter.vorname || "")}

                ${(mitarbeiter.nachname || "")}

            </h2>

            <p>

                💼 ${mitarbeiter.position || "-"}

            </p>

            <p>

                🏢 ${mitarbeiter.bereich || "-"}

            </p>

            <p>

                🆔 ${mitarbeiter.personalnummer || "-"}

            </p>

            <p>

                ⏰ ${mitarbeiter.vertragsstunden || 0} Std.

            </p>

            <p>

                ✅ ${mitarbeiter.status || "Aktiv"}

            </p>

        </div>

    </div>

    <div class="mitarbeiterRechts">

        <button

            class="sekundenButton bearbeiten"

            data-id="${mitarbeiter.id}">

            ✏️

        </button>

        <button

            class="sekundenButton loeschen"

            data-id="${mitarbeiter.id}">

            🗑

        </button>

    </div>

</div>

`;

            });

        }

        DOM.html(

            "mitarbeiterListe",

            html

        );

    },
        events() {

        const neu = DOM.id(

            "btnMitarbeiterNeu"

        );

        if (neu) {

            neu.onclick = () => {

                this.dialogNeu();

            };

        }

        const suche = DOM.id(

            "mitarbeiterSuche"

        );

        if (suche) {

            suche.oninput = () => {

                this.suchen(

                    suche.value

                );

            };

        }

        document

            .querySelectorAll(

                ".bearbeiten"

            )

            .forEach(button => {

                button.onclick = () => {

                    this.dialogBearbeiten(

                        button.dataset.id

                    );

                };

            });

        document

            .querySelectorAll(

                ".loeschen"

            )

            .forEach(button => {

                button.onclick = () => {

                    this.loeschen(

                        button.dataset.id

                    );

                };

            });

    },

    suchen(text) {

        text = text.toLowerCase();

        document

            .querySelectorAll(

                ".mitarbeiterKarte"

            )

            .forEach(karte => {

                const sichtbar =

                    karte.innerText

                    .toLowerCase()

                    .includes(text);

                karte.style.display =

                    sichtbar

                    ? ""

                    : "none";

            });

    },
        dialogNeu() {

        Dialog.oeffnen(
    "Neuer Mitarbeiter",
    `<h1 style="color:red">TEST</h1>`
);

            `

<div class="dialogGrid">

<div class="dialogLabel">

<label>Vorname</label>

<input
id="dlgVorname"
type="text">

</div>

<div class="dialogLabel">

<label>Nachname</label>

<input
id="dlgNachname"
type="text">

</div>

<div class="dialogLabel">

<label>Bereich</label>

<input
id="dlgBereich"
type="text"
value="Küche">

</div>

<div class="dialogLabel">

<label>Position</label>

<input
id="dlgPosition"
type="text"
value="Mitarbeiter">

</div>

<div class="dialogLabel">

<label>Personalnummer</label>

<input
id="dlgPersonalnummer"
type="text">

</div>

<div class="dialogLabel">

<label>Vertragsstunden</label>

<input
id="dlgVertragsstunden"
type="number"
value="39">

</div>

</div>

`

        );

        Dialog.abbrechen();

        Dialog.speichern(

            () => {

                this.daten.push({

                    id: Date.now().toString(),

                    vorname:

                        DOM.id("dlgVorname").value,

                    nachname:

                        DOM.id("dlgNachname").value,

                    name:

                        DOM.id("dlgVorname").value +

                        " " +

                        DOM.id("dlgNachname").value,

                    bereich:

                        DOM.id("dlgBereich").value,

                    position:

                        DOM.id("dlgPosition").value,

                    personalnummer:

                        DOM.id("dlgPersonalnummer").value,

                    vertragsstunden:

                        Number(

                            DOM.id("dlgVertragsstunden").value

                        ),

                    status:

                        "Aktiv",

                    farbe:

                        "#0077C8"

                });

                Speicher.speichern(

                    CONFIG.speicher.mitarbeiter,

                    this.daten

                );

                Dialog.schliessen();

                this.anzeigen();

            }

        );

    },
    