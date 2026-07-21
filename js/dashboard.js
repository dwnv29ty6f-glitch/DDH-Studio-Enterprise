"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Dashboard
========================================== */

function dashboardZeichnen(){

    DOM.inhalt.innerHTML = `

    <div class="dashboard">

        <div class="karte willkommen">

            <h1>Willkommen bei DDH Studio Enterprise</h1>

            <p>

                Betriebsmanagement für
                DDH Service GmbH

            </p>

        </div>

        <div class="kachel">

            <div class="kachelTitel">
                👥 Mitarbeiter
            </div>

            <div
            id="dashboardMitarbeiter"
            class="kachelZahl">

                ${mitarbeiter.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelTitel">
                📅 Termine
            </div>

            <div
            id="dashboardTermine"
            class="kachelZahl">

                ${termine.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelTitel">
                🕒 Schichten
            </div>

            <div
            id="dashboardSchichten"
            class="kachelZahl">

                ${schichten.length}

            </div>

        </div>

        <div class="kachel">

            <div class="kachelTitel">
                ✅ Aufgaben
            </div>

            <div
            id="dashboardAufgaben"
            class="kachelZahl">

                ${aufgaben.length}

            </div>

        </div>

    </div>

    `;

}