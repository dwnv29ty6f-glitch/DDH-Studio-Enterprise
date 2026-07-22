"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Kalender
================================================
*/

const Kalender = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.kalender,

            []

        );

        let html = `

<div
    id="seite-kalender"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Kalender

        </h1>

        <p>

            Termine und Ereignisse

        </p>

        <div class="toolbar">

            <input
                id="kalenderSuche"
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

                    <th>

                        Datum

                    </th>

                    <th>

                        Uhrzeit

                    </th>

                    <th>

                        Termin

                    </th>

                    <th>

                        Ort

                    </th>

                    <th>

                        Aktionen

                    </th>

                </tr>

            </thead>

            <tbody>

`;

        if(this.daten.length===0){

            html += `

<tr>

    <td colspan="5">

        Keine Termine vorhanden.

    </td>

</tr>

`;

        }

        this.daten.forEach(termin=>{

            html += `

<tr>

    <td>

        ${termin.datum || "-"}

    </td>

    <td>

        ${termin.uhrzeit || "-"}

    </td>

    <td>

        ${termin.titel || "-"}

    </td>

    <td>

        ${termin.ort || "-"}

    </td>

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

    speichern(){

        Speicher.speichern(

            CONFIG.speicher.kalender,

            this.daten

        );

    }

};