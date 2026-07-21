"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Schichtplan
// ==========================================

function schichtplanZeichnen(){

    const inhalt =
    document.getElementById("inhalt");

    if(!inhalt){
        return;
    }

    inhalt.innerHTML = `

    <section class="seite">

        <div class="karte gross">

            <h2>👷 Schichtplan</h2>

            <p>

            Moderner Dienstplan im Stil von Microsoft Teams Shifts

            </p>

        </div>

        <div class="karte">

            <div style="display:flex;justify-content:space-between;align-items:center;">

                <button class="hauptButton">

                    ◀ August 2026

                </button>

                <button class="hauptButton">

                    September 2026 ▶

                </button>

            </div>

        </div>

        <div class="karte">

            <h3>Schichtplan</h3>

            <p>

            Der moderne Teams-Shifts-Dienstplan wird in den nächsten Schritten aufgebaut.

            </p>

        </div>

    </section>

    `;

}