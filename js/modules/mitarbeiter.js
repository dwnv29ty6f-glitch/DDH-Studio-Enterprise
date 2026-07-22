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