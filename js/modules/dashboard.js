"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Dashboard
========================================== */

function dashboardZeichnen(){

    DOM.seitenTitel.textContent = "Dashboard";

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

            <div class="kachelWert">
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

            <div class="kachelWert">
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

            <div class="kachelWert">
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

            <div class="kachelWert">
                ${todos.length}
            </div>

        </div>

        <div class="karte">

            <h2>

                Heute

            </h2>

            <p>

                Willkommen im neuen DDH Studio Enterprise 10.0.

            </p>

            <p>

                In den nächsten Schritten entstehen hier Live-Kennzahlen,
                Krankmeldungen, Geburtstage, Termine und Schnellzugriffe.

            </p>

        </div>

    </div>

    `;

}