"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Dashboard
// ==========================================

function dashboardZeichnen(){

    const inhalt =
    document.getElementById("inhalt");

    if(!inhalt){
        return;
    }

    inhalt.innerHTML = `

    <section class="dashboard">

        <div class="karte gross">

            <h2>
            Willkommen bei
            DDH Studio Enterprise 10
            </h2>

            <p>

            Betriebsmanagement für
            DDH Service GmbH

            </p>

        </div>

        <div class="kachel">

            <h3>📅 Termine</h3>

            <div id="dashboardTermine">

                0

            </div>

        </div>

        <div class="kachel">

            <h3>✅ Aufgaben</h3>

            <div id="dashboardAufgaben">

                0

            </div>

        </div>

        <div class="kachel">

            <h3>👥 Mitarbeiter</h3>

            <div id="dashboardMitarbeiter">

                0

            </div>

        </div>

        <div class="kachel">

            <h3>🕒 Heute im Dienst</h3>

            <div id="dashboardDienst">

                0

            </div>

        </div>

    </section>

    `;

}