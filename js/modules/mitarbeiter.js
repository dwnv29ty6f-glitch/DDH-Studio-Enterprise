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

            this.daten.forEach(

                mitarbeiter => {

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

                ${mitarbeiter.vorname || ""}

                ${mitarbeiter.nachname || ""}

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

                }

            );

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

        text =

            text.toLowerCase();

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

        const vorname =

            prompt("Vorname");

        if (!vorname) return;

        const nachname =

            prompt("Nachname");

        if (!nachname) return;

        const bereich =

            prompt(

                "Bereich",

                "Küche"

            ) || "Küche";

        const position =

            prompt(

                "Position",

                "Mitarbeiter"

            ) || "Mitarbeiter";

        const personalnummer =

            prompt(

                "Personalnummer",

                ""

            ) || "";

        const vertragsstunden =

            Number(

                prompt(

                    "Vertragsstunden",

                    "39"

                )

            ) || 39;

        this.daten.push({

            id:

                Date.now().toString(),

            vorname,

            nachname,

            name:

                vorname +

                " " +

                nachname,

            bereich,

            position,

            personalnummer,

            vertragsstunden,

            status:

                "Aktiv",

            farbe:

                "#0077C8"

        });

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        this.anzeigen();

    },
        bearbeiten(id) {

        const mitarbeiter = this.daten.find(

            m => m.id === id

        );

        if (!mitarbeiter) {

            return;

        }

        const vorname = prompt(

            "Vorname",

            mitarbeiter.vorname

        );

        if (!vorname) {

            return;

        }

        const nachname = prompt(

            "Nachname",

            mitarbeiter.nachname

        );

        if (!nachname) {

            return;

        }

        mitarbeiter.vorname = vorname;

        mitarbeiter.nachname = nachname;

        mitarbeiter.name =

            vorname +

            " " +

            nachname;

        mitarbeiter.bereich =

            prompt(

                "Bereich",

                mitarbeiter.bereich

            ) || mitarbeiter.bereich;

        mitarbeiter.position =

            prompt(

                "Position",

                mitarbeiter.position

            ) || mitarbeiter.position;

        mitarbeiter.personalnummer =

            prompt(

                "Personalnummer",

                mitarbeiter.personalnummer

            ) || mitarbeiter.personalnummer;

        mitarbeiter.vertragsstunden = Number(

            prompt(

                "Vertragsstunden",

                mitarbeiter.vertragsstunden

            )

        ) || mitarbeiter.vertragsstunden;

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