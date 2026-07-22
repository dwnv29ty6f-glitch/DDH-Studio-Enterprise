"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Einstellungen
================================================
*/

const Einstellungen = {

    anzeigen() {

        let html = `

<div
    id="seite-einstellungen"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Einstellungen

        </h1>

        <p>

            Programmeinstellungen

        </p>

    </div>

    <div class="karte">

        <table>

            <tbody>

                <tr>

                    <td>

                        Firmenname

                    </td>

                    <td>

                        DDH Service GmbH

                    </td>

                </tr>

                <tr>

                    <td>

                        Version

                    </td>

                    <td>

                        10.0.0

                    </td>

                </tr>

                <tr>

                    <td>

                        Sprache

                    </td>

                    <td>

                        Deutsch

                    </td>

                </tr>

                <tr>

                    <td>

                        Datenspeicherung

                    </td>

                    <td>

                        LocalStorage

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    <div class="karte">

        <button
            class="hauptButton">

            Daten exportieren

        </button>

        <button
            class="sekundenButton">

            Daten importieren

        </button>

        <button
            class="sekundenButton">

            Alle Daten löschen

        </button>

    </div>

</div>

`;

        DOM.html(

            "inhalt",

            html

        );

    }

};