"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Speisepläne
================================================
*/

const Speiseplaene = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            "ddh_speiseplaene",

            []

        );

        let html = `

<div
    id="seite-speiseplaene"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Speisepläne

        </h1>

        <p>

            Verwaltung aller Speisepläne

        </p>

        <div class="toolbar">

            <input
                id="speiseplanSuche"
                type="text"
                placeholder="Speiseplan suchen...">

            <button
                id="btnNeuerSpeiseplan"
                class="hauptButton">

                ➕ Neuer Speiseplan

            </button>

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>

                        Zeitraum

                    </th>

                    <th>

                        Bezeichnung

                    </th>

                    <th>

                        Erstellt am

                    </th>

                    <th>

                        Aktionen

                    </th>

                </tr>

            </thead>

            <tbody>

`;

        if (this.daten.length === 0) {

            html += `

<tr>

    <td colspan="4">

        Noch keine Speisepläne vorhanden.

    </td>

</tr>

`;

        }

        this.daten.forEach(plan => {

            html += `

<tr>

    <td>

        ${plan.zeitraum || "-"}

    </td>

    <td>

        ${plan.name || "-"}

    </td>

    <td>

        ${plan.datum || "-"}

    </td>

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

            "ddh_speiseplaene",

            this.daten

        );

    }

};