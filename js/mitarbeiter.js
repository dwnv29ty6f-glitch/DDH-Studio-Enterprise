"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Mitarbeiter
========================================== */

// ==========================================
// Seite öffnen
// ==========================================

function mitarbeiterZeichnen(){

    DOM.inhalt.innerHTML = `

    <section class="mitarbeiterSeite">

        <div class="karte willkommen">

            <h1>Mitarbeiter</h1>

            <p>

                Mitarbeiterverwaltung
                DDH Service GmbH

            </p>

        </div>

        <div class="karte toolbar">

            <input
                id="sucheMitarbeiter"
                type="text"
                placeholder="🔍 Mitarbeiter suchen">

            <button
                id="btnNeuerMitarbeiter"
                class="hauptButton">

                ➕ Mitarbeiter

            </button>

        </div>

        <div
            id="mitarbeiterListe"
            class="mitarbeiterListe">

        </div>

    </section>

    `;

    $("btnNeuerMitarbeiter")
    .addEventListener(
        "click",
        mitarbeiterDialogNeu
    );

    $("sucheMitarbeiter")
    .addEventListener(
        "input",
        mitarbeiterListeZeichnen
    );

    mitarbeiterListeZeichnen();

}