"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Termine
================================================
*/

const Termine = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            "ddh_termine",

            []

        );

        let html = `

<div
    id="seite-termine"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Termine

        </h1>

        <p>

            Terminverwaltung

        </p>

        <div class="toolbar">

            <input
                id="terminSuche"
                type="text"
                placeholder="Termin suchen...">

            <button
                id="btnNeuerTermin"
                class="hauptButton">

                ➕ Neuer Termin

            </button>

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>Datum</th>

                    <th>Uhrzeit</th>

                    <th>Titel</th>

                    <th>Ort</th>

                    <th>Aktion</th>

                </tr>

            </thead>

            <tbody>

`;

        if (this.daten.length === 0) {

            html += `

<tr>

<td colspan="5">

Noch keine Termine vorhanden.

</td>

</tr>

`;

        }

        this.daten.forEach(termin => {

            html += `

<tr>

<td>${termin.datum || "-"}</td>

<td>${termin.uhrzeit || "-"}</td>

<td>${termin.titel || "-"}</td>

<td>${termin.ort || "-"}</td>

<td>

<button
class="sekundenButton">

Bearbeiten

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

            "ddh_termine",

            this.daten

        );

    }

};