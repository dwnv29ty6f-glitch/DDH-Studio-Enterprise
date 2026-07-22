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

    <h2>

        Keine Mitarbeiter vorhanden

    </h2>

    <p>

        Tippe oben auf "➕ Mitarbeiter", um den ersten Mitarbeiter anzulegen.

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

        ${((mitarbeiter.vorname || mitarbeiter.name || "?").charAt(0)).toUpperCase()}

    </div>

    <div>

        <h2>

            ${(mitarbeiter.vorname || "")}

            ${(mitarbeiter.nachname || "")}

        </h2>

        <p>

            Position:
            ${mitarbeiter.position || "-"}

        </p>

        <p>

            Bereich:
            ${mitarbeiter.bereich || "-"}

        </p>

        <p>

            Personalnummer:
            ${mitarbeiter.personalnummer || "-"}

        </p>

        <p>

            Vertragsstunden:
            ${mitarbeiter.vertragsstunden || 0} Std.

        </p>

        <p>

            Status:
            ${mitarbeiter.status || "Aktiv"}

        </p>

    </div>

<p>

    Bereich:
    ${mitarbeiter.bereich || "-"}

</p>

<p>

    Personalnummer:
    ${mitarbeiter.personalnummer || "-"}

</p>

<p>

    Vertragsstunden:
    ${mitarbeiter.vertragsstunden || 0} Std.

</p>

<p>

    Status:
    ${mitarbeiter.status || "Aktiv"}

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

    const vorname = prompt("Vorname");

    if (!vorname) return;

    const nachname = prompt("Nachname");

    if (!nachname) return;

    const bereich = prompt("Bereich", "Küche") || "Küche";

    const position = prompt("Position", "Mitarbeiter") || "Mitarbeiter";

    const personalnummer = prompt("Personalnummer", "") || "";

    const wochenstunden = Number(
        prompt("Wochenstunden", "39")
    ) || 39;

    this.daten.push({

        id: Date.now().toString(),

        vorname,

        nachname,

        name: vorname + " " + nachname,

        personalnummer,

        bereich,

        position,

        wochenstunden,

        vertragsstunden: wochenstunden,

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

    this.anzeigen();

},
        this.anzeigen();

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
