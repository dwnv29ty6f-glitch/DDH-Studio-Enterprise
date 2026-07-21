"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Mitarbeiter
========================================== */

function mitarbeiterZeichnen(){

    DOM.inhalt.innerHTML = `

    <div class="dashboard">

        <div class="karte willkommen">

            <h1>Mitarbeiter</h1>

            <p>

                Mitarbeiterverwaltung der
                DDH Service GmbH

            </p>

        </div>

        <div class="karte">

            <button
            id="btnNeuerMitarbeiter"
            class="hauptButton">

                ➕ Mitarbeiter hinzufügen

            </button>

        </div>

        <div
        id="mitarbeiterListe">

        </div>

    </div>

    `;

    mitarbeiterListeAnzeigen();

    $("btnNeuerMitarbeiter")
    .addEventListener(
        "click",
        neuerMitarbeiter
    );

}

/* ==========================================
   Liste
========================================== */

function mitarbeiterListeAnzeigen(){

    const liste =
    $("mitarbeiterListe");

    liste.innerHTML = "";

    if(mitarbeiter.length===0){

        liste.innerHTML = `

        <div class="karte">

            Noch keine Mitarbeiter vorhanden.

        </div>

        `;

        return;

    }

    mitarbeiter.forEach(person=>{

        liste.innerHTML += `

        <div class="karte">

            <h3>

                ${person.vorname}
                ${person.name}

            </h3>

            <p>

                ${person.bereich}

            </p>

        </div>

        `;

    });

}

/* ==========================================
   Neuer Mitarbeiter
========================================== */

function neuerMitarbeiter(){

    const vorname =
    prompt("Vorname");

    if(!vorname){
        return;
    }

    const name =
    prompt("Nachname");

    if(!name){
        return;
    }

    mitarbeiter.push({

        id:
        neueID(),

        vorname:
        vorname,

        name:
        name,

        bereich:
        "Küche",

        position:
        "Mitarbeiter",

        wochenstunden:
        40,

        urlaub:
        30,

        aktiv:true

    });

    Speicher.speichern();

    mitarbeiterListeAnzeigen();

}