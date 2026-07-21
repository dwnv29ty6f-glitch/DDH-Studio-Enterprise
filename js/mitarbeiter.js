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
            Mitarbeiterverwaltung
            DDH Service GmbH
            </p>

        </div>

        <div class="karte">

            <button id="btnNeuerMitarbeiter"
            class="hauptButton">

                ➕ Mitarbeiter hinzufügen

            </button>

        </div>

        <div
        id="mitarbeiterListe"
        class="mitarbeiterListe">

        </div>

    </section>

    `;

    mitarbeiterAktualisieren();

}

// ==========================================
// Mitarbeiterliste
// ==========================================

function mitarbeiterAktualisieren(){

    const liste =
    document.getElementById(
        "mitarbeiterListe"
    );

    if(!liste){
        return;
    }

    liste.innerHTML = "";

    if(mitarbeiter.length===0){

        liste.innerHTML =

        "<div class='karte'>Noch keine Mitarbeiter vorhanden.</div>";

        return;

    }

    mitarbeiter.forEach(person=>{

        liste.innerHTML += `

        <div class="karte">

            <h3>${person.name}</h3>

            <p>

            Bereich:

            ${person.bereich}

            </p>

        </div>

        `;

    });

}