"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Kalender
================================================
*/

const Kalender = {

    daten: [],
    
    aktuellerMonat:

    new Date().getMonth(),

aktuellesJahr:

    new Date().getFullYear(),

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

        monate[this.aktuellerMonat] +

        " " +

        this.aktuellesJahr;

}

const btnZurueck = DOM.id(

    "monatZurueck"

);

const btnWeiter = DOM.id(

    "monatWeiter"

);

if (btnZurueck) {

    btnZurueck.onclick = () => {

        this.aktuellerMonat--;

        if (

            this.aktuellerMonat < 0

        ) {

            this.aktuellerMonat = 11;

            this.aktuellesJahr--;

        }

        alert("Zurück");
kalenderZeichnen();

            
    };

}

if (btnWeiter) {

    btnWeiter.onclick = () => {

        this.aktuellerMonat++;

        if (

            this.aktuellerMonat > 11

        ) {

            this.aktuellerMonat = 0;

            this.aktuellesJahr++;

        }

        kalenderZeichnen();

    };

}
        
        const raster = DOM.id(

    "kalenderRaster"

);

alert(raster);

if (raster) {

    function kalenderZeichnen(){

    raster.innerHTML = "";
    
    monatTitel.textContent =

    monate[this.aktuellerMonat] +

    " " +

    this.aktuellesJahr;

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

alert("Weiter");
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