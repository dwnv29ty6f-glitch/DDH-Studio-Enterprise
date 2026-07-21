"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Mitarbeiterverwaltung
Teil 1
===========================================
*/

const Mitarbeiter = {

    daten: [],

    laden() {

        this.daten = Speicher.laden(
            "ddh_mitarbeiter",
            []
        );

    },

    speichern() {

        Speicher.speichern(
            "ddh_mitarbeiter",
            this.daten
        );

    },

    neuePersonalnummer() {

        if (this.daten.length === 0) {

            return 1000;

        }

        return Math.max(

            ...this.daten.map(
                m => m.personalnummer
            )

        ) + 1;

    },

    anzeigen() {

        Navigation.aktuelleSeite = "mitarbeiter";

        const inhalt = DOM.id("inhalt");

        inhalt.innerHTML = `

<div class="mitarbeiterSeite">

    <div class="karte">

        <div class="toolbar">

            <input
                id="mitarbeiterSuche"
                type="text"
                placeholder="Mitarbeiter suchen...">

            <button
                id="btnNeuerMitarbeiter"
                class="hauptButton">

                ➕ Neuer Mitarbeiter

            </button>

        </div>

    </div>

    <div
        id="mitarbeiterListe"
        class="mitarbeiterListe">

    </div>

</div>

`;

        this.rendern();

        DOM.id(
            "mitarbeiterSuche"
        ).addEventListener(

            "input",

            e => {

                this.rendern(
                    e.target.value
                );

            }

        );

        DOM.id(
            "btnNeuerMitarbeiter"
        ).addEventListener(

            "click",

            () => {

                this.dialog();

            }

        );

    },

    rendern(filter = "") {

        const liste =
        DOM.id("mitarbeiterListe");

        liste.innerHTML = "";

        let daten = this.daten;

        if (filter !== "") {

            const text =
            filter.toLowerCase();

            daten = daten.filter(

                person =>

                person.vorname
                .toLowerCase()
                .includes(text)

                ||

                person.nachname
                .toLowerCase()
                .includes(text)

                ||

                person.abteilung
                .toLowerCase()
                .includes(text)

                ||

                person.position
                .toLowerCase()
                .includes(text)

            );

        }

        if (daten.length === 0) {

            liste.innerHTML =

            `<div class="karte">

                Keine Mitarbeiter vorhanden.

            </div>`;

            return;

        }
                daten.forEach(person => {

            const karte =
            DOM.erstellen("div");

            karte.className =
            "karte mitarbeiterKarte";

            karte.innerHTML = `

<h2>

${person.vorname}
${person.nachname}

</h2>

<p>

<b>Personalnummer:</b>

${person.personalnummer}

</p>

<p>

<b>Position:</b>

${person.position}

</p>

<p>

<b>Abteilung:</b>

${person.abteilung}

</p>

<p>

<b>Wochenstunden:</b>

${person.wochenstunden}

</p>

<div class="kartenButtons">

<button
class="hauptButton">

Bearbeiten

</button>

<button
class="sekundaerButton">

Löschen

</button>

</div>

`;

            karte
            .querySelector(".hauptButton")
            .addEventListener(

                "click",

                () => {

                    this.dialog(person.id);

                }

            );

            karte
            .querySelector(".sekundaerButton")
            .addEventListener(

                "click",

                () => {

                    this.loeschen(person.id);

                }

            );

            liste.appendChild(karte);

        });

    },

    dialog(id = null) {

        let person = null;

        if (id) {

            person =
            this.daten.find(

                m => m.id === id

            );

        }

        Dialog.anzeigen(

            id
            ? "Mitarbeiter bearbeiten"
            : "Neuer Mitarbeiter",

            `

<label>Vorname</label>

<input
id="vorname"
value="${person ? person.vorname : ""}">

<label>Nachname</label>

<input
id="nachname"
value="${person ? person.nachname : ""}">

<label>Position</label>

<input
id="position"
value="${person ? person.position : ""}">

<label>Abteilung</label>

<input
id="abteilung"
value="${person ? person.abteilung : ""}">

<label>Wochenstunden</label>

<input
id="wochenstunden"
type="number"
value="${person ? person.wochenstunden : 39}">

`
            `,

            `

<button
class="sekundaerButton"
onclick="Dialog.schliessen()">

Abbrechen

</button>

<button
class="hauptButton"
onclick="Mitarbeiter.speichernDialog('${id ?? ""}')">

Speichern

</button>

`

        );

    },

    speichernDialog(id = "") {

        const daten = {

            vorname:
            DOM.id("vorname").value.trim(),

            nachname:
            DOM.id("nachname").value.trim(),

            position:
            DOM.id("position").value.trim(),

            abteilung:
            DOM.id("abteilung").value.trim(),

            wochenstunden:
            Number(
                DOM.id("wochenstunden").value
            )

        };

        if (
            daten.vorname === "" ||
            daten.nachname === ""
        ) {

            alert(
                "Bitte Vor- und Nachnamen eingeben."
            );

            return;

        }

        if (id === "") {

            this.daten.push({

                id: Funktionen.uuid(),

                personalnummer:
                this.neuePersonalnummer(),

                vorname:
                daten.vorname,

                nachname:
                daten.nachname,

                position:
                daten.position,

                abteilung:
                daten.abteilung,

                wochenstunden:
                daten.wochenstunden

            });

        } else {

            const person =
            this.daten.find(

                m => m.id === id

            );

            if (person) {

                person.vorname =
                daten.vorname;

                person.nachname =
                daten.nachname;

                person.position =
                daten.position;

                person.abteilung =
                daten.abteilung;

                person.wochenstunden =
                daten.wochenstunden;

            }

        }

        this.speichern();

        Dialog.schliessen();

        this.rendern();

    },
        loeschen(id) {

        const person =
        this.daten.find(
            m => m.id === id
        );

        if (!person) {

            return;

        }

        if (
            !confirm(
                person.vorname +
                " " +
                person.nachname +
                " wirklich löschen?"
            )
        ) {

            return;

        }

        this.daten =
        this.daten.filter(
            m => m.id !== id
        );

        this.speichern();

        this.rendern();

    },

    statistik() {

        return {

            gesamt:
            this.daten.length,

            vollzeit:
            this.daten.filter(

                m =>

                m.wochenstunden >= 39

            ).length,

            teilzeit:
            this.daten.filter(

                m =>

                m.wochenstunden < 39

            ).length

        };

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Mitarbeiter.laden();

    }

);
/* ==========================================
   Weitere Hilfsfunktionen
========================================== */

    nachPersonalnummer(personalnummer){

        return this.daten.find(

            person =>

            person.personalnummer === personalnummer

        );

    },

    existiert(personalnummer){

        return this.nachPersonalnummer(

            personalnummer

        ) !== undefined;

    },

    anzahl(){

        return this.daten.length;

    }

};

/* ==========================================
   Initialisierung
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Mitarbeiter.laden();

    }

);