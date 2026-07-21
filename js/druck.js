"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Druckcenter
// ==========================================

function druckcenterZeichnen(){

    const inhalt =
    document.getElementById("inhalt");

    if(!inhalt){
        return;
    }

    inhalt.innerHTML = `

    <section class="seite">

        <div class="karte gross">

            <h2>🖨️ Druckcenter</h2>

            <p>

            Ausdrucke, PDF und Excel

            </p>

        </div>

        <div class="dashboard">

            <div class="kachel">

                <h3>📋 Dienstplan</h3>

                <p>Dienstplan drucken</p>

            </div>

            <div class="kachel">

                <h3>⏰ Arbeitszeitnachweis</h3>

                <p>Monatsnachweis erstellen</p>

            </div>

            <div class="kachel">

                <h3>📅 Urlaubsplan</h3>

                <p>Urlaubsübersicht drucken</p>

            </div>

            <div class="kachel">

                <h3>📈 Monatsbericht</h3>

                <p>Auswertung erstellen</p>

            </div>

            <div class="kachel">

                <h3>📄 PDF Export</h3>

                <p>Alle Dokumente exportieren</p>

            </div>

            <div class="kachel">

                <h3>📊 Excel Export</h3>

                <p>Nach Excel exportieren</p>

            </div>

        </div>

    </section>

    `;

}