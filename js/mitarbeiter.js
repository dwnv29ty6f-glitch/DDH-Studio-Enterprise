"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Mitarbeiter
// ==========================================

function mitarbeiterZeichnen(){

    const inhalt =
    document.getElementById("inhalt");

    if(!inhalt){
        return;
    }

    inhalt.innerHTML = `

    <section class="seite">

        <div class="karte gross">

            <h2>👥 Mitarbeiter</h2>

            <p>

            Mitarbeiterverwaltung der DDH Service GmbH

            </p>

        </div>

        <div class="karte">

            <button class="hauptButton">

                ➕ Neuer Mitarbeiter

            </button>

        </div>

        <div class="karte">

            <h3>Mitarbeiterliste</h3>

            <p>

            Hier werden später alle Mitarbeiter angezeigt.

            </p>

        </div>

    </section>

    `;

}