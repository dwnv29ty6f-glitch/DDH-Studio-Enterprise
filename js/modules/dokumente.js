"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Dokumente
================================================
*/

const Dokumente = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            "ddh_dokumente",

            []

        );

        let html = `

<div
    id="seite-dokumente"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Dokumente

        </h1>

        <p>

            Verwaltung aller Dokumente

        </p>

        <div class="toolbar">

            <input
                id="dokumentSuche"
                type="text"
                placeholder="Dokument suchen...">

            <button
                id="btnNeuesDokument"
                class="hauptButton">

                📄 Neues Dokument

            </button>

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Kategorie</th>

                    <th>Erstellt</th>

                    <th>Aktion</th>

                </tr>

            </thead>

            <tbody>

`;

        if (this.daten.length === 0) {

            html += `

<tr>

<td colspan="4">

Noch keine Dokumente vorhanden.

</td>

</tr>

`;

        }

        this.daten.forEach(dokument => {

            html += `

<tr>

<td>${dokument.name || "-"}</td>

<td>${dokument.kategorie || "-"}</td>

<td>${dokument.datum || "-"}</td>

<td>

<button
class="sekundenButton">

Öffnen

</button>

</td>

</tr>

`;

        });

        html += `

            </tbody>

        </table>

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

            "ddh_dokumente",

            this.daten

        );

    }

};