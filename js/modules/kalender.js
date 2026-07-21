"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Kalender
// ==========================================

function kalenderZeichnen(){

    const inhalt =
    document.getElementById("inhalt");

    if(!inhalt){
        return;
    }

    inhalt.innerHTML = `

    <section class="seite">

        <div class="karte gross">

            <h2>📅 Kalender</h2>

            <p>

            Termine, Besprechungen und Erinnerungen

            </p>

        </div>

        <div class="karte">

            <h3>Monatskalender</h3>

            <p>

            Der Kalender wird im nächsten Schritt entwickelt.

            </p>

        </div>

    </section>

    `;

}