"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Mitarbeiter
================================================
*/

const Mitarbeiter = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.mitarbeiter,

            []

        );

        let html = `

<div
    id="seite-mitarbeiter"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Mitarbeiter

        </h1>

        <p>

            Mitarbeiterverwaltung

        </p>

        <div class="toolbar">

            <input
                id="mitarbeiterSuche"
                type="text"
                placeholder="Mitarbeiter suchen...">

            <button
                id="btnNeuerMitarbeiter"
                class="hauptButton">

                ➕ Mitarbeiter

            </button>

        </div>

    </div>

    <div
        id="mitarbeiterListe"
        class="mitarbeiterListe">

`;

        if (this.daten.length === 0) {

            html += `

<div class="karte">

    Noch keine Mitarbeiter vorhanden.

</div>

`;

        }

        this.daten.forEach(

            mitarbeiter => {

                html += `

<div class="mitarbeiterKarte">

    <div class="mitarbeiterName">

        ${mitarbeiter.name || "-"}

    </div>

    <div class="mitarbeiterInfo">

        Personalnummer:
        ${mitarbeiter.personalnummer || "-"}

    </div>

    <div class="mitarbeiterInfo">

        Abteilung:
        ${mitarbeiter.abteilung || "-"}

    </div>

    <div class="mitarbeiterInfo">

        Vertragsstunden:
        ${mitarbeiter.stunden || "-"}

    </div>

    <div class="mitarbeiterButtons">

        <button
            class="sekundenButton">

            Bearbeiten

        </button>

        <button
            class="sekundenButton">

            Löschen

        </button>

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

            "inhalt",

            html

        );

    },

    speichern() {

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

    }

};