"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Bestellungen
================================================
*/

const Bestellungen = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            "ddh_bestellungen",

            []

        );

        let html = `

<div
    id="seite-bestellungen"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Bestellungen

        </h1>

        <p>

            Verwaltung aller Bestellungen

        </p>

        <div class="toolbar">

            <input
                id="bestellungSuche"
                type="text"
                placeholder="Bestellung suchen...">

            <button
                id="btnNeueBestellung"
                class="hauptButton">

                ➕ Neue Bestellung

            </button>

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>Datum</th>

                    <th>Lieferant</th>

                    <th>Status</th>

                    <th>Aktion</th>

                </tr>

            </thead>

            <tbody>

`;

        if (this.daten.length === 0) {

            html += `

<tr>

<td colspan="4">

Keine Bestellungen vorhanden.

</td>

</tr>

`;

        }

        this.daten.forEach(bestellung => {

            html += `

<tr>

<td>${bestellung.datum || "-"}</td>

<td>${bestellung.lieferant || "-"}</td>

<td>${bestellung.status || "Offen"}</td>

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

            "ddh_bestellungen",

            this.daten

        );

    }

};