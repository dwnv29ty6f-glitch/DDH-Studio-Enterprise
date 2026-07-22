"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Aufgaben
================================================
*/

const Todos = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.aufgaben,

            []

        );

        let html = `

<div
    id="seite-aufgaben"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Aufgaben

        </h1>

        <p>

            Aufgabenverwaltung

        </p>

        <div class="toolbar">

            <input
                id="todoSuche"
                type="text"
                placeholder="Aufgabe suchen...">

            <button
                id="btnNeueAufgabe"
                class="hauptButton">

                ➕ Aufgabe

            </button>

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>

                        Aufgabe

                    </th>

                    <th>

                        Priorität

                    </th>

                    <th>

                        Fällig

                    </th>

                    <th>

                        Status

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

    <td colspan="5">

        Keine Aufgaben vorhanden.

    </td>

</tr>

`;

        }

        this.daten.forEach(aufgabe => {

            html += `

<tr>

    <td>

        ${aufgabe.titel || "-"}

    </td>

    <td>

        ${aufgabe.prioritaet || "-"}

    </td>

    <td>

        ${aufgabe.datum || "-"}

    </td>

    <td>

        ${aufgabe.status || "Offen"}

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

    speichern() {

        Speicher.speichern(

            CONFIG.speicher.aufgaben,

            this.daten

        );

    }

};