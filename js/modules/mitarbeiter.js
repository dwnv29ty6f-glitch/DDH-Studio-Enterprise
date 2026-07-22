"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Mitarbeiterverwaltung
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

    <h2>Keine Mitarbeiter vorhanden</h2>

    <p>

        Tippe oben auf „➕ Mitarbeiter“, um den ersten Mitarbeiter anzulegen.

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
            style="background:${mitarbeiter.farbe || '#0077C8'};">

            ${((mitarbeiter.vorname || "?").charAt(0)).toUpperCase()}

        </div>

        <div>

            <h2>

                ${(mitarbeiter.vorname || "")}
                ${(mitarbeiter.nachname || "")}

            </h2>

            <p><strong>Position:</strong> ${mitarbeiter.position || "-"}</p>

            <p><strong>Bereich:</strong> ${mitarbeiter.bereich || "-"}</p>

            <p><strong>Personalnummer:</strong> ${mitarbeiter.personalnummer || "-"}</p>

            <p><strong>Vertragsstunden:</strong> ${mitarbeiter.vertragsstunden || 0} Std.</p>

            <p><strong>Status:</strong> ${mitarbeiter.status || "Aktiv"}</p>

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

                this.neu();

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

                    this.bearbeiten(

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

    neu() {

    Dialog.oeffnen(

    "Neuer Mitarbeiter",

    `
        `

<div class="dialogGrid">

<div class="dialogLabel">
<label>Vorname</label>
<input id="dlgVorname" type="text">
</div>

<div class="dialogLabel">
<label>Nachname</label>
<input id="dlgNachname" type="text">
</div>

<div class="dialogLabel">
<label>Personalnummer</label>
<input id="dlgPersonalnummer" type="text">
</div>

<div class="dialogLabel">
<label>Bereich</label>
<input id="dlgBereich" type="text" value="Küche">
</div>

<div class="dialogLabel">
<label>Position</label>
<input id="dlgPosition" type="text" value="Mitarbeiter">
</div>

<div class="dialogLabel">
<label>Status</label>
<select id="dlgStatus">
<option>Aktiv</option>
<option>Urlaub</option>
<option>Krank</option>
<option>Elternzeit</option>
<option>Inaktiv</option>
</select>
</div>

<div class="dialogLabel">
<label>Wochenstunden</label>
<input id="dlgWochenstunden" type="number" value="39">
</div>

<div class="dialogLabel">
<label>Telefon</label>
<input id="dlgTelefon" type="text">
</div>

<div class="dialogLabel dialogGridVoll">
<label>E-Mail</label>
<input id="dlgEmail" type="email">
</div>

<div class="dialogLabel dialogGridVoll">
<label>Straße</label>
<input id="dlgStrasse" type="text">
</div>

<div class="dialogLabel">
<label>PLZ</label>
<input id="dlgPlz" type="text">
</div>

<div class="dialogLabel">
<label>Ort</label>
<input id="dlgOrt" type="text">
</div>

<div class="dialogLabel">
<label>Geburtsdatum</label>
<input id="dlgGeburtsdatum" type="date">
</div>

<div class="dialogLabel">
<label>Eintrittsdatum</label>
<input id="dlgEintrittsdatum" type="date">
</div>

<div class="dialogLabel dialogGridVoll">
<label>Notiz</label>
<textarea id="dlgNotiz" rows="4"></textarea>
</div>

</div>

    DOM.id(

        "dialogAbbrechen"

    ).onclick = () => {

        DOM.ausblenden(

            "dialogOverlay"

        );

    };

    DOM.id(

        "dialogSchliessen"

    ).onclick = () => {

        DOM.ausblenden(

            "dialogOverlay"

        );

    };

    DOM.id(

        "dialogSpeichern"

    ).onclick = () => {

        this.daten.push({

            id: Date.now().toString(),

            vorname: DOM.id("dlgVorname").value,

            nachname: DOM.id("dlgNachname").value,

            name:

                DOM.id("dlgVorname").value +

                " " +

                DOM.id("dlgNachname").value,

            bereich: DOM.id("dlgBereich").value,

            position: DOM.id("dlgPosition").value,

            personalnummer:

                DOM.id("dlgPersonalnummer").value,

            wochenstunden:

                Number(

                    DOM.id("dlgWochenstunden").value

                ),

            vertragsstunden:

                Number(

                    DOM.id("dlgWochenstunden").value

                ),

            status: "Aktiv",

            telefon: "",

            email: "",

            strasse: "",

            plz: "",

            ort: "",

            geburtsdatum: "",

            eintrittsdatum: "",

            notiz: "",

            farbe: "#0077C8",

            foto: ""

        });

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        DOM.ausblenden(

            "dialogOverlay"

        );

        this.anzeigen();

    };

},

        bearbeiten(id) {

        const mitarbeiter = this.daten.find(

            m => m.id === id

        );

        if (!mitarbeiter) {

            return;

        }

        const name = prompt(

            "Name",

            mitarbeiter.name

        );

        if (!name) {

            return;

        }

        mitarbeiter.name = name;

        mitarbeiter.bereich =

            prompt(

                "Bereich",

                mitarbeiter.bereich

            ) || mitarbeiter.bereich;

        mitarbeiter.personalnummer =

            prompt(

                "Personalnummer",

                mitarbeiter.personalnummer

            ) || mitarbeiter.personalnummer;

        mitarbeiter.wochenstunden = Number(

            prompt(

                "Wochenstunden",

                mitarbeiter.wochenstunden

            )

        ) || mitarbeiter.wochenstunden;

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        this.anzeigen();

    },

    loeschen(id) {

        if (

            !confirm(

                "Mitarbeiter wirklich löschen?"

            )

        ) {

            return;

        }

        this.daten = this.daten.filter(

            m => m.id !== id

        );

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        this.anzeigen();

    }

};
