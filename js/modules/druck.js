"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Druckcenter
================================================
*/

const Druck = {

    anzeigen() {

        let html = `

<div
    id="seite-druckcenter"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Druckcenter

        </h1>

        <p>

            Dokumente drucken und exportieren

        </p>

    </div>

    <div class="dashboardGrid">

        <div class="kachel">

            <div class="kachelIcon">

                👥

            </div>

            <div class="kachelTitel">

                Mitarbeiterliste

            </div>

            <button
                class="hauptButton">

                Drucken

            </button>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                👷

            </div>

            <div class="kachelTitel">

                Schichtplan

            </div>

            <button
                class="hauptButton">

                Drucken

            </button>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                🍽

            </div>

            <div class="kachelTitel">

                Speiseplan

            </div>

            <button
                class="hauptButton">

                Drucken

            </button>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                📦

            </div>

            <div class="kachelTitel">

                Bestellungen

            </div>

            <button
                class="hauptButton">

                Drucken

            </button>

        </div>

    </div>

</div>

`;

        DOM.html(

            "inhalt",

            html

        );

    }

};