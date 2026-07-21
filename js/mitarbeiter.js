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
/* ==========================================
   Mitarbeiterliste
========================================== */

function mitarbeiterListeZeichnen(){

    const liste =
    $("mitarbeiterListe");

    if(!liste){
        return;
    }

    const suche =
    $("sucheMitarbeiter")
    .value
    .trim()
    .toLowerCase();

    liste.innerHTML = "";

    const daten =
    mitarbeiter.filter(person=>{

        const name = (

            person.vorname +

            " " +

            person.name

        ).toLowerCase();

        return name.includes(suche);

    });

    if(daten.length===0){

        liste.innerHTML = `

        <div class="karte">

            Keine Mitarbeiter gefunden.

        </div>

        `;

        return;

    }

    daten.forEach(person=>{

        liste.innerHTML += `

        <div
            class="karte mitarbeiterKarte"
            data-id="${person.id}">

            <h3>

                ${person.vorname}
                ${person.name}

            </h3>

            <p>

                ${person.bereich}

            </p>

            <p>

                ${person.position}

            </p>

        </div>

        `;

    });

}
/* ==========================================
   Neuer Mitarbeiter
========================================== */

function mitarbeiterDialogNeu(){

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

        personalnummer:
        "",

        vorname:
        vorname.trim(),

        name:
        name.trim(),

        bereich:
        "Küche",

        position:
        "Mitarbeiter",

        einrichtung:
        "",

        wochenstunden:
        40,

        urlaub:
        30,

        telefon:
        "",

        email:
        "",

        farbe:
        APP.farben.sekundär,

        aktiv:
        true,

        notizen:
        ""

    });

    Speicher.speichern();

    mitarbeiterListeZeichnen();

}
/* ==========================================
   Mitarbeiter bearbeiten
========================================== */

function mitarbeiterBearbeiten(id){

    const person =
    mitarbeiter.find(m=>m.id===id);

    if(!person){
        return;
    }

    const vorname =
    prompt(
        "Vorname",
        person.vorname
    );

    if(vorname===null){
        return;
    }

    const name =
    prompt(
        "Nachname",
        person.name
    );

    if(name===null){
        return;
    }

    person.vorname =
    vorname.trim();

    person.name =
    name.trim();

    Speicher.speichern();

    mitarbeiterListeZeichnen();

}
/* ==========================================
   Mitarbeiter löschen
========================================== */

function mitarbeiterLoeschen(id){

    const person =
    mitarbeiter.find(
        m=>m.id===id
    );

    if(!person){
        return;
    }

    if(!bestaetigen(

        "Mitarbeiter\n\n" +

        person.vorname +

        " " +

        person.name +

        "\n\nwirklich löschen?"

    )){
        return;
    }

    mitarbeiter =
    mitarbeiter.filter(
        m=>m.id!==id
    );

    Speicher.speichern();

    mitarbeiterListeZeichnen();

}
/* ==========================================
   Ereignisse
========================================== */

document.addEventListener("click",(event)=>{

    const karte =
    event.target.closest(".mitarbeiterKarte");

    if(!karte){
        return;
    }

    const id =
    karte.dataset.id;

    const auswahl =
    prompt(

`Aktion wählen

1 = Bearbeiten
2 = Löschen`

    );

    if(auswahl==="1"){

        mitarbeiterBearbeiten(id);

    }

    if(auswahl==="2"){

        mitarbeiterLoeschen(id);

    }

});
/* ==========================================
   Mitarbeiter suchen
========================================== */

function mitarbeiterSuchen(text){

    text =
    text
    .trim()
    .toLowerCase();

    return mitarbeiter.filter(person=>{

        const name = (

            person.vorname +

            " " +

            person.name

        ).toLowerCase();

        const bereich =
        person.bereich
        .toLowerCase();

        const position =
        person.position
        .toLowerCase();

        return (

            name.includes(text) ||

            bereich.includes(text) ||

            position.includes(text)

        );

    });

}