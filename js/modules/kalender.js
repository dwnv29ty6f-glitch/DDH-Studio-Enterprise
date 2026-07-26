"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Kalender
================================================
*/

const Kalender = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.kalender,

            []

        );

        let html = `

<div
    id="seite-kalender"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Kalender

        </h1>

        <p>

            Termine und Ereignisse

        </p>

        <div class="toolbar">

            <input
                id="kalenderSuche"
                type="text"
                placeholder="Termin suchen...">

            <button
                id="btnNeuerTermin"
                class="hauptButton">

                ➕ Neuer Termin

            </button>

        </div>

    </div>
    
    `;

   html += `

<div class="karte">

    <div class="kalenderKopf">

        <button
            id="monatZurueck"
            class="sekundenButton">

            ◀

        </button>

        <h2
            id="kalenderMonat">

            Juli 2026

        </h2>

        <button
            id="monatWeiter"
            class="sekundenButton">

            ▶

        </button>

    </div>

    <div
        id="kalenderRaster"
        class="kalenderRaster">

    </div>

</div>

<div class="karte">

    <h2>

        Termine

    </h2>

    <div
        id="terminListe">

        Kein Tag ausgewählt.

    </div>

</div>

`;

        DOM.html(

            "inhalt",

            html

        );
        
        const heute = new Date();
        
        let aktuellerMonat =

    heute.getMonth();

let aktuellesJahr =

    heute.getFullYear();

const monatTitel = DOM.id(

    "kalenderMonat"

);

const monate = [

    "Januar",

    "Februar",

    "März",

    "April",

    "Mai",

    "Juni",

    "Juli",

    "August",

    "September",

    "Oktober",

    "November",

    "Dezember"

];

if (monatTitel) {

    monatTitel.textContent =

        monate[aktuellerMonat] +

        " " +

        aktuellesJahr;

}

const btnZurueck = DOM.id(

    "monatZurueck"

);

const btnWeiter = DOM.id(

    "monatWeiter"

);

if (btnZurueck) {

    btnZurueck.onclick = () => {

        aktuellerMonat--;

        if (

            aktuellerMonat < 0

        ) {

            aktuellerMonat = 11;

            aktuellesJahr--;

        }

        kalenderZeichnen();

            
    };

}

if (btnWeiter) {

    btnWeiter.onclick = () => {

        aktuellerMonat++;

        if (

            aktuellerMonat > 11

        ) {

            aktuellerMonat = 0;

            aktuellesJahr++;

        }

        kalenderZeichnen();

    };

}
        
        const raster = DOM.id(

    "kalenderRaster"

);

if (raster) {

    function kalenderZeichnen(){

    raster.innerHTML = "";
    
    monatTitel.textContent =

    monate[aktuellerMonat] +

    " " +

    aktuellesJahr;

    const wochentage = [

        "Mo",

        "Di",

        "Mi",

        "Do",

        "Fr",

        "Sa",

        "So"

    ];

    wochentage.forEach(tag=>{

        const kopf=document.createElement("div");

        kopf.className="kalenderTag kalHeader";

        kopf.textContent=tag;

        raster.appendChild(kopf);

    });

    const tageImMonat =

        new Date(

            aktuellesJahr,

            aktuellerMonat+1,

            0

        ).getDate();

    for(

        let tag=1;

        tag<=tageImMonat;

        tag++

    ){

        const feld=

            document.createElement("div");

        feld.className="kalenderTag";

        feld.innerHTML=

            "<span>"+tag+"</span>";

        raster.appendChild(feld);

    }

}

kalenderZeichnen();

}

    },

    speichern(){

        Speicher.speichern(

            CONFIG.speicher.kalender,

            this.daten

        );

    }

};