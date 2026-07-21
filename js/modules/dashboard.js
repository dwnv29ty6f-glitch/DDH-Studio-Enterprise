"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Dashboard
========================================== */

function dashboardZeichnen(){

    DOM.inhalt.innerHTML = `

    <div class="dashboard">

        <div class="karte willkommen">

            <h1>

                Willkommen bei DDH Studio Enterprise

            </h1>

            <p>

                DDH Service GmbH

            </p>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                👥

            </div>

            <div class="kachelTitel">

                Mitarbeiter

            </div>

            <div
                class="kachelWert">

                ${mitarbeiter.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                📅

            </div>

            <div class="kachelTitel">

                Termine

            </div>

            <div
                class="kachelWert">

                ${termine.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                👷

            </div>

            <div class="kachelTitel">

                Schichten

            </div>

            <div
                class="kachelWert">

                ${schichten.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelIcon">

                ✅

            </div>

            <div class="kachelTitel">

                Aufgaben

            </div>

            <div
                class="kachelWert">

                ${aufgaben.length}

            </div>

        </div>

        <div class="karte">

            <h2>

                Heute

            </h2>

            <p>

                Willkommen bei DDH Studio Enterprise 10.0.

            </p>

            <p>

                Dieses Dashboard wird später automatisch alle wichtigen Informationen anzeigen.

            </p>

        </div>

        <div class="karte">

            <h2>

                Schnellzugriff

            </h2>

            <button
                class="hauptButton"
                onclick="seiteOeffnen('mitarbeiter')">

                👥 Mitarbeiter

            </button>

            <br><br>

            <button
                class="hauptButton"
                onclick="seiteOeffnen('schichtplan')">

                📅 Schichtplan

            </button>

        </div>

    </div>

    `;

}