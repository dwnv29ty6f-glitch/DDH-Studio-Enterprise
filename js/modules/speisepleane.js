/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Datei: core.js
   Teil: 1/4
   Version: 2.0
========================================================== */

"use strict";

const Speiseplaene = {

    /* ======================================================
       Informationen
    ====================================================== */

    version: "2.0",

    appName: "DDH Studio Enterprise",

    modulName: "Speisepläne",

    /* ======================================================
       DOM
    ====================================================== */

    dom: {

        root: null,

        container: null,

        excelInput: null,

        btnExcel: null,

        btnDrucken: null

    },

    /* ======================================================
       Daten
    ====================================================== */

    daten: [],

    tage: [],

    excelDatei: null,

    arbeitsmappe: null,

    aktivesBlatt: null,

    /* ======================================================
       Zeitraum
    ====================================================== */

    zeitraum: {

        start: "",

        ende: "",

        kalenderwoche: ""

    },

    /* ======================================================
       Einstellungen
    ====================================================== */

    settings: {

        papier: "A4",

        orientierung: "landscape",

        schriftart: "Arial",

        hauptfarbe: "#0F4C81"

    },

    /* ======================================================
       Status
    ====================================================== */

    status: {

        gestartet: false,

        importiert: false,

        analysiert: false,

        layoutErstellt: false,

        druckBereit: false

    },

    /* ======================================================
       Initialisierung
    ====================================================== */

    init() {

        this.log("Initialisierung...");

        this.dom.root = document.getElementById("inhalt");

        if (!this.dom.root) {

            this.error(

                "Container #inhalt wurde nicht gefunden."

            );

            return;

        }

        this.render();

        this.cacheDOM();

        this.events();

        this.status.gestartet = true;

        this.log("Modul gestartet.");

    },

    /* ======================================================
       DOM Elemente merken
    ====================================================== */

    cacheDOM() {

        this.dom.container =

            document.getElementById(

                "speiseplanContainer"

            );

        this.dom.excelInput =

            document.getElementById(

                "excelDatei"

            );

        this.dom.btnExcel =

            document.getElementById(

                "btnExcel"

            );

        this.dom.btnDrucken =

            document.getElementById(

                "btnDrucken"

            );

    },

    /* ======================================================
       Hilfsfunktion
    ====================================================== */

    element(id) {

        return document.getElementById(id);

    },

    /* ======================================================
       Logging
    ====================================================== */

    log(text) {

        console.log(

            "[DDH Speisepläne]",

            text

        );

    },

    /* ======================================================
       Fehler
    ====================================================== */

    error(text) {

        console.error(

            "[DDH Speisepläne]",

            text

        );

        alert(text);

    }

};

/* ==========================================================
   Navigation registrieren
========================================================== */

if (typeof Seiten !== "undefined") {

    Seiten.speiseplaene = () => {

        Speiseplaene.init();

    };

}
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 2
   Oberfläche
========================================================== */

Speiseplaene.render = function () {

    this.dom.root.innerHTML = `

<div class="ddhSpeiseplaene">

    <div class="ddhHeader">

        <div>

            <h1>🍽️ Speisepläne</h1>

            <p>Selly-Excel importieren und professionell drucken</p>

        </div>

    </div>

    <div class="ddhToolbar">

        <button
            id="btnExcel"
            class="hauptButton">

            📂 Excel auswählen

        </button>

        <button
            id="btnDrucken"
            class="sekundenButton"
            disabled>

            🖨️ Drucken

        </button>

    </div>

    <input
        id="excelDatei"
        type="file"
        accept=".xlsx,.xls"
        hidden>

    <div
        id="speiseplanContainer"
        class="ddhLeer">

        <div class="ddhLeerIcon">

            🍽️

        </div>

        <h2>

            Noch kein Speiseplan geladen

        </h2>

        <p>

            Bitte eine Selly-Excel-Datei auswählen.

        </p>

    </div>

</div>

`;

};
/* ==========================================================
   Druckbutton
========================================================== */

Speiseplaene.druckButton = function(status){

    if(this.dom.btnDrucken){

        this.dom.btnDrucken.disabled = !status;

    }

};
/* ==========================================================
   Meldung anzeigen
========================================================== */

Speiseplaene.meldung = function(text){

    if(!this.dom.container){

        return;

    }

    this.dom.container.innerHTML = `

<div class="ddhInfo">

    <h2>${text}</h2>

</div>

`;

};
/* ==========================================================
   Container leeren
========================================================== */

Speiseplaene.leeren = function(){

    if(this.dom.container){

        this.dom.container.innerHTML = "";

    }

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 3
   Events & Excel-Import
========================================================== */

Speiseplaene.events = function(){

    if(this.dom.btnExcel){

        this.dom.btnExcel.addEventListener(

            "click",

            ()=>{

                this.dom.excelInput.click();

            }

        );

    }

    if(this.dom.excelInput){

        this.dom.excelInput.addEventListener(

            "change",

            (event)=>{

                this.dateiAusgewaehlt(event);

            }

        );

    }

    if(this.dom.btnDrucken){

    this.dom.btnDrucken.addEventListener(

        "click",

        ()=>{

            this.drucken();

        }

    );

}
};
/* ==========================================================
   Datei auswählen
========================================================== */

Speiseplaene.dateiAusgewaehlt = function(event){

    const datei = event.target.files[0];

    if(!datei){

        return;

    }

    this.excelDatei = datei;

    this.importiereExcel(datei);

};
/* ==========================================================
   Excel importieren
========================================================== */

Speiseplaene.importiereExcel = function(datei){

    this.log(

        "Importiere: " +

        datei.name

    );

    const reader = new FileReader();

    reader.onload = (e)=>{

        try{

            const daten =

                new Uint8Array(

                    e.target.result

                );

            this.arbeitsmappe =

                XLSX.read(

                    daten,

                    {

                        type:"array"

                    }

                );

            this.aktivesBlatt =

                this.arbeitsmappe.SheetNames[0];

            this.daten =

                XLSX.utils.sheet_to_json(

                    this.arbeitsmappe.Sheets[

                        this.aktivesBlatt

                    ],

                    {

                        header:1,

                        blankrows:false,

                        defval:""

                    }

                );

            this.status.importiert = true;

this.importFertig();

this.analysieren();

        }

        catch(fehler){

            this.error(

                "Excel konnte nicht gelesen werden."

            );

            console.error(fehler);

        }

    };

    reader.readAsArrayBuffer(datei);

};
/* ==========================================================
   Daten anzeigen
========================================================== */

Speiseplaene.debug = function(){

    console.clear();

    console.table(

        this.daten

    );

};
/* ==========================================================
   Import abgeschlossen
========================================================== */

Speiseplaene.importFertig = function(){

    this.debug();

    this.log(

        "Import abgeschlossen."

    );

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 4
   Selly Parser
========================================================== */

Speiseplaene.analysieren = function(){

    this.tage = [];

    this.zeitraum.start = "";
this.zeitraum.ende = "";
this.zeitraum.kalenderwoche = "";

    

    let aktuellerTag = null;

    for(const zeile of this.daten){

        aktuellerTag =

            this.analysiereZeile(

                zeile,

                aktuellerTag

            );

    }

    this.status.analysiert = true;

    this.layoutErzeugen();

};
/* ==========================================================
   Einzelne Zeile auswerten
========================================================== */

Speiseplaene.analysiereZeile = function(

    zeile,

    aktuellerTag

){

    if(!zeile){

        return aktuellerTag;

    }

    const text =

        zeile

        .join(" ")

        .replace(/\s+/g," ")

        .trim()

        .toUpperCase();

    if(text===""){

        return aktuellerTag;

    }

    this.pruefeZeitraum(text);

    if(this.istWochentag(text)){

        aktuellerTag =

            this.neuerTag(text);

        return aktuellerTag;

    }

    if(aktuellerTag){

        this.pruefeGericht(

            aktuellerTag,

            text,

            zeile

        );

    }

    return aktuellerTag;

};
/* ==========================================================
   Neuen Tag anlegen
========================================================== */

Speiseplaene.neuerTag = function(name){

    const tag = {

        name,

        datum:"",

        menue1:"",

        menue2:"",

        suppe:"",

        dessert:"",

        allergene1:"",

        allergene2:"",

        allergeneSuppe:"",

        allergeneDessert:""

    };

    this.tage.push(tag);

    return tag;

};
/* ==========================================================
   Wochentag erkennen
========================================================== */

Speiseplaene.istWochentag = function(text){

    return [

        "MONTAG",

        "DIENSTAG",

        "MITTWOCH",

        "DONNERSTAG",

        "FREITAG",

        "SAMSTAG",

        "SONNTAG"

    ].includes(text);

};
/* ==========================================================
   Zeitraum erkennen
========================================================== */

Speiseplaene.pruefeZeitraum = function(text){

    const treffer =

        text.match(

            /(\d{2}\.\d{2}\.\d{4}).*(\d{2}\.\d{2}\.\d{4})/

        );

    if(!treffer){

        return;

    }

    this.zeitraum.start =

        treffer[1];

    this.zeitraum.ende =

        treffer[2];

};
/* ==========================================================
   Gericht erkennen
========================================================== */

Speiseplaene.pruefeGericht = function(

    tag,

    text,

    zeile

){

    const gericht =

        String(

            zeile[1] || ""

        ).trim();

    const allergene =

        String(

            zeile[2] || ""

        ).trim();

    if(

        text.includes("MENÜ I")

        ||

        text.includes("MENU I")

    ){

        tag.menue1 = gericht;

        tag.allergene1 = allergene;

        return;

    }

    if(

        text.includes("MENÜ II")

        ||

        text.includes("MENU II")

    ){

        tag.menue2 = gericht;

        tag.allergene2 = allergene;

        return;

    }

    if(

        text.includes("SUPPE")

    ){

        tag.suppe = gericht;

        tag.allergeneSuppe = allergene;

        return;

    }

    if(

        text.includes("DESSERT")

    ){

        tag.dessert = gericht;

        tag.allergeneDessert = allergene;

    }

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 5
   Layout erzeugen
========================================================== */

Speiseplaene.layoutErzeugen = function(){

    if(!this.dom.container){

        return;

    }

    this.leeren();

    let html = "";

    html += this.renderKopf();

    html += '<div class="ddhWochenplan">';

    for(const tag of this.tage){

        html += this.renderTag(tag);

    }

    html += "</div>";

    this.dom.container.innerHTML = html;

    this.status.layoutErstellt = true;

    this.druckButton(true);

};
/* ==========================================================
   Kopfbereich
========================================================== */

Speiseplaene.renderKopf = function(){

    return `

<div class="ddhTitel">

    <div class="ddhLogo">

        DDH SERVICE GMBH

    </div>

    <h1>

        WOCHENSPEISEPLAN

    </h1>

    <div class="ddhZeitraum">

        ${this.zeitraum.start}

        ${this.zeitraum.start ? " – " : ""}

        ${this.zeitraum.ende}

    </div>

</div>

`;

};
/* ==========================================================
   Wochentag darstellen
========================================================== */

Speiseplaene.renderTag = function(tag){

    return `

<section class="ddhTag">

<h2>${tag.name}</h2>

${this.renderGericht("🍽 Menü I",tag.menue1,tag.allergene1)}

${this.renderGericht("🥗 Menü II",tag.menue2,tag.allergene2)}

${this.renderGericht("🍲 Suppe",tag.suppe,tag.allergeneSuppe)}

${this.renderGericht("🍮 Dessert",tag.dessert,tag.allergeneDessert)}

</section>

`;

};
/* ==========================================================
   Gericht darstellen
========================================================== */

Speiseplaene.renderGericht = function(

titel,

gericht,

allergene

){

    if(!gericht){

        return "";

    }

    return `

<div class="ddhGericht">

    <div class="ddhGerichtTitel">

        ${titel}

    </div>

    <div class="ddhGerichtText">

        ${gericht}

    </div>

    <div class="ddhAllergene">

        ${allergene}

    </div>

</div>

`;

};
/* ==========================================================
   Kalenderwoche berechnen
========================================================== */

Speiseplaene.kalenderwoche = function(){

    if(!this.zeitraum.start){

        return "";

    }

    const teile = this.zeitraum.start.split(".");

    const datum = new Date(

        Number(teile[2]),

        Number(teile[1])-1,

        Number(teile[0])

    );

    datum.setDate(

        datum.getDate()

        +4

        -(datum.getDay()||7)

    );

    const jahrStart =

        new Date(

            datum.getFullYear(),

            0,

            1

        );

    return Math.ceil(

        (((datum-jahrStart)/86400000)+1)/7

    );

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 6
   Design laden
========================================================== */

Speiseplaene.designLaden = function(){

    if(document.getElementById("ddhSpeiseplanStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhSpeiseplanStyle";

    style.innerHTML = `

body{

    background:#f5f7fa;

}

.ddhSpeiseplaene{

    max-width:1400px;

    margin:30px auto;

    font-family:Arial,Helvetica,sans-serif;

}

.ddhHeader{

    margin-bottom:25px;

}

.ddhHeader h1{

    margin:0;

    color:#0F4C81;

}

.ddhHeader p{

    margin-top:8px;

    color:#666;

}

.ddhToolbar{

    display:flex;

    gap:12px;

    margin-bottom:25px;

}

.ddhTitel{

    background:#fff;

    border:3px solid #0F4C81;

    border-radius:12px;

    padding:25px;

    text-align:center;

    margin-bottom:25px;

}

.ddhLogo{

    font-size:26px;

    font-weight:bold;

    color:#0F4C81;

    letter-spacing:2px;

}

.ddhTitel h1{

    margin:12px 0;

    color:#0F4C81;

}

.ddhZeitraum{

    color:#666;

    font-size:18px;

}

.ddhWochenplan{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(420px,1fr));

    gap:20px;

}

.ddhTag{

    background:white;

    border-radius:12px;

    overflow:hidden;

    box-shadow:0 5px 18px rgba(0,0,0,.08);

}

.ddhTag h2{

    margin:0;

    padding:16px;

    background:#0F4C81;

    color:white;

}

.ddhGericht{

    padding:18px;

    border-bottom:1px solid #ececec;

}

.ddhGericht:last-child{

    border-bottom:none;

}

.ddhGerichtTitel{

    font-weight:bold;

    color:#0F4C81;

    margin-bottom:6px;

}

.ddhGerichtText{

    font-size:18px;

    line-height:1.45;

}

.ddhAllergene{

    margin-top:8px;

    color:#888;

    font-size:13px;

}

.ddhLeer{

    text-align:center;

    padding:80px;

    color:#777;

}

.ddhLeerIcon{

    font-size:60px;

    margin-bottom:20px;

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Design automatisch laden
========================================================== */

const _initOriginal = Speiseplaene.init;

Speiseplaene.init = function(){

    this.designLaden();

    _initOriginal.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 7
   Drucklayout
========================================================== */

Speiseplaene.druckVorbereiten = function(){

    document.body.classList.add("ddhPrint");

};

Speiseplaene.drucken = function(){

    this.druckVorbereiten();

    setTimeout(()=>{

        window.print();

        document.body.classList.remove("ddhPrint");

    },200);

};
/* ==========================================================
   Druck CSS
========================================================== */

Speiseplaene.druckDesign = function(){

    if(document.getElementById("ddhPrintStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhPrintStyle";

    style.innerHTML = `

@page{

    size:A4 landscape;

    margin:10mm;

}

@media print{

body{

    background:white !important;

}

.ddhToolbar{

    display:none !important;

}

.ddhHeader{

    display:none !important;

}

.ddhWochenplan{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:12mm;

}

.ddhTag{

    break-inside:avoid;

    page-break-inside:avoid;

    box-shadow:none;

    border:1px solid #cfcfcf;

}

.ddhTitel{

    margin-bottom:10mm;

}

.ddhGericht{

    padding:10px;

}

.ddhGerichtText{

    font-size:14px;

}

.ddhAllergene{

    font-size:11px;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Druckdesign automatisch laden
========================================================== */

const _initTeil7 = Speiseplaene.init;

Speiseplaene.init = function(){

    this.druckDesign();

    _initTeil7.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 8
   Allergenseite
========================================================== */

Speiseplaene.allergenseiteErzeugen = function(){

    if(!this.tage.length){

        return "";

    }

    let html = `

<div class="ddhAllergenSeite">

    <div class="ddhTitel">

        <div class="ddhLogo">

            DDH SERVICE GMBH

        </div>

        <h1>

            ALLERGENE

        </h1>

        <div class="ddhZeitraum">

            ${this.zeitraum.start} - ${this.zeitraum.ende}

        </div>

    </div>

`;

    this.tage.forEach(tag=>{

        html += `

<div class="ddhAllergenTag">

    <h2>${tag.name}</h2>

    <table>

        <tr>

            <th>Menü I</th>

            <td>${tag.allergene1 || "-"}</td>

        </tr>

        <tr>

            <th>Menü II</th>

            <td>${tag.allergene2 || "-"}</td>

        </tr>

        <tr>

            <th>Suppe</th>

            <td>${tag.allergeneSuppe || "-"}</td>

        </tr>

        <tr>

            <th>Dessert</th>

            <td>${tag.allergeneDessert || "-"}</td>

        </tr>

    </table>

</div>

`;

    });

    html += `

</div>

`;

    return html;

};
/* ==========================================================
   Allergenseite anfügen
========================================================== */

const _layoutTeil8 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil8.call(this);

    this.dom.container.insertAdjacentHTML(

        "beforeend",

        this.allergenseiteErzeugen()

    );

};
/* ==========================================================
   CSS Allergenseite
========================================================== */

Speiseplaene.allergenDesign = function(){

    if(document.getElementById("ddhAllergenStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhAllergenStyle";

    style.innerHTML = `

.ddhAllergenSeite{

    page-break-before:always;

    margin-top:40px;

}

.ddhAllergenTag{

    margin-bottom:25px;

}

.ddhAllergenTag h2{

    color:#0F4C81;

    margin-bottom:8px;

}

.ddhAllergenTag table{

    width:100%;

    border-collapse:collapse;

}

.ddhAllergenTag th{

    width:180px;

    background:#F3F5F7;

    text-align:left;

    padding:10px;

    border:1px solid #DDD;

}

.ddhAllergenTag td{

    padding:10px;

    border:1px solid #DDD;

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Allergen CSS automatisch laden
========================================================== */

const _initTeil8 =
    Speiseplaene.init;

Speiseplaene.init = function(){

    this.allergenDesign();

    _initTeil8.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 9
   Professioneller Kopfbereich
========================================================== */

Speiseplaene.kalenderwoche = function(datum){

    if(!datum){

        return "";

    }

    const teile = datum.split(".");

    if(teile.length !== 3){

        return "";

    }

    const d = new Date(

        Number(teile[2]),

        Number(teile[1]) - 1,

        Number(teile[0])

    );

    d.setHours(0,0,0,0);

    d.setDate(

        d.getDate() + 4 - (d.getDay() || 7)

    );

    const jahrStart =

        new Date(d.getFullYear(),0,1);

    return Math.ceil(

        (((d - jahrStart) / 86400000) + 1) / 7

    );

};

/* ==========================================================
   Kopfbereich aktualisieren
========================================================== */

Speiseplaene.kopfAktualisieren = function(){

    const titel =

        document.querySelector(".ddhTitel");

    if(!titel){

        return;

    }

    const kw =

        this.kalenderwoche(

            this.zeitraum.start

        );

    this.zeitraum.kalenderwoche = kw;

    titel.innerHTML = `

<div class="ddhKopf">

    <div class="ddhLinks">

        <div class="ddhLogo">

            DDH SERVICE GMBH

        </div>

        <div class="ddhUntertitel">

            Wochenspeiseplan

        </div>

    </div>

    <div class="ddhRechts">

        <div class="ddhKW">

            KW ${kw}

        </div>

        <div class="ddhDatum">

            ${this.zeitraum.start}

            -

            ${this.zeitraum.ende}

        </div>

    </div>

</div>

`;

};
/* ==========================================================
   Kopfbereich nach Layout erzeugen
========================================================== */

const _layoutTeil9 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil9.call(this);

    this.kopfAktualisieren();

};
/* ==========================================================
   Kopfbereich Design
========================================================== */

Speiseplaene.kopfDesign = function(){

    if(document.getElementById("ddhHeaderStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhHeaderStyle";

    style.innerHTML = `

.ddhKopf{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.ddhLinks{

    display:flex;

    flex-direction:column;

}

.ddhRechts{

    text-align:right;

}

.ddhKW{

    font-size:26px;

    font-weight:bold;

    color:#0F4C81;

}

.ddhDatum{

    margin-top:6px;

    color:#666;

}

`;

    document.head.appendChild(style);

};

const _initTeil9 =

    Speiseplaene.init;

Speiseplaene.init = function(){

    this.kopfDesign();

    _initTeil9.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 10
   Automatische Größenanpassung
========================================================== */

Speiseplaene.layoutOptimieren = function(){

    const texte = document.querySelectorAll(

        ".ddhGerichtText"

    );

    texte.forEach(text=>{

        const laenge =

            text.textContent.trim().length;

        if(laenge < 45){

            text.style.fontSize = "22px";
            text.style.lineHeight = "1.35";

        }

        else if(laenge < 80){

            text.style.fontSize = "19px";
            text.style.lineHeight = "1.40";

        }

        else if(laenge < 120){

            text.style.fontSize = "17px";
            text.style.lineHeight = "1.45";

        }

        else{

            text.style.fontSize = "15px";
            text.style.lineHeight = "1.50";

        }

    });

};

/* ==========================================================
   Kartenhöhe angleichen
========================================================== */

Speiseplaene.kartenOptimieren = function(){

    const karten = document.querySelectorAll(

        ".ddhTag"

    );

    karten.forEach(karte=>{

        karte.style.minHeight = "360px";

    });

};

/* ==========================================================
   Leere Gerichte ausblenden
========================================================== */

Speiseplaene.leereGerichteEntfernen = function(){

    document

        .querySelectorAll(".ddhGericht")

        .forEach(gericht=>{

            const text =

                gericht.querySelector(

                    ".ddhGerichtText"

                );

            if(!text){

                return;

            }

            if(text.textContent.trim()===""){

                gericht.style.display="none";

            }

        });

};

/* ==========================================================
   Layout automatisch optimieren
========================================================== */

const _layoutTeil10 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil10.call(this);

    this.leereGerichteEntfernen();

    this.layoutOptimieren();

    this.kartenOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 11
   Fußzeile & Seitennummern
========================================================== */

Speiseplaene.fusszeileErzeugen = function(){

    /* Alte Fußzeile entfernen */

    document
        .querySelectorAll(".ddhFusszeile")
        .forEach(e => e.remove());

    const plan =
        document.querySelector(".ddhWochenplan");

    if(!plan){

        return;

    }

    const heute =
        new Date().toLocaleDateString("de-DE");

    const html = `

<div class="ddhFusszeile">

    <div>

        DDH Studio Enterprise · Speisepläne ${this.version}

    </div>

    <div>

        Erstellt am ${heute}

    </div>

</div>

`;

    plan.insertAdjacentHTML(
        "afterend",
        html
    );

};

/* ==========================================================
   Seitennummern
========================================================== */

Speiseplaene.seitenNummern = function(){

    document
        .querySelectorAll(".ddhSeitenInfo")
        .forEach(e => e.remove());

    const plan =
        document.querySelector(".ddhWochenplan");

    if(plan){

        plan.insertAdjacentHTML(

            "beforeend",

            `

<div class="ddhSeitenInfo">

    Seite 1 von 2

</div>

`

        );

    }

    const allergene =
        document.querySelector(".ddhAllergenSeite");

    if(allergene){

        allergene.insertAdjacentHTML(

            "beforeend",

            `

<div class="ddhSeitenInfo">

    Seite 2 von 2

</div>

`

        );

    }

};

/* ==========================================================
   CSS
========================================================== */

Speiseplaene.footerDesign = function(){

    if(document.getElementById("ddhFooterStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhFooterStyle";

    style.innerHTML = `

.ddhFusszeile{

    margin-top:30px;

    padding-top:15px;

    border-top:2px solid #0F4C81;

    display:flex;

    justify-content:space-between;

    color:#666;

    font-size:13px;

}

.ddhSeitenInfo{

    margin-top:25px;

    text-align:right;

    font-size:12px;

    color:#888;

}

@media print{

.ddhFusszeile{

    position:fixed;

    left:10mm;

    right:10mm;

    bottom:8mm;

    font-size:11px;

}

.ddhSeitenInfo{

    position:fixed;

    right:10mm;

    bottom:3mm;

    font-size:10px;

}

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Automatisch ausführen
========================================================== */

const _layoutTeil11 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil11.call(this);

    this.footerDesign();

    this.fusszeileErzeugen();

    this.seitenNummern();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 12
   Intelligente Druckoptimierung
========================================================== */

Speiseplaene.druckOptimieren = function(){

    /* Karten niemals trennen */

    document.querySelectorAll(".ddhTag").forEach(tag=>{

        tag.style.breakInside = "avoid";
        tag.style.pageBreakInside = "avoid";

    });

    /* Gerichte niemals trennen */

    document.querySelectorAll(".ddhGericht").forEach(gericht=>{

        gericht.style.breakInside = "avoid";
        gericht.style.pageBreakInside = "avoid";

    });

    /* Allergenseite immer neue Seite */

    const allergene =

        document.querySelector(".ddhAllergenSeite");

    if(allergene){

        allergene.style.pageBreakBefore = "always";
        allergene.style.breakBefore = "page";

    }

};

/* ==========================================================
   Druck CSS erweitern
========================================================== */

Speiseplaene.druckCSSOptimierung = function(){

    if(document.getElementById("ddhPrintOptimierung")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhPrintOptimierung";

    style.innerHTML = `

@media print{

*{

    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;

    box-sizing:border-box;

}

html,
body{

    width:297mm;

    height:210mm;

    overflow:hidden;

}

.ddhWochenplan{

    gap:8mm;

}

.ddhTag{

    margin:0;

}

.ddhGericht{

    padding:8px 10px;

}

.ddhGerichtTitel{

    font-size:14px;

}

.ddhGerichtText{

    font-size:13px;

    line-height:1.30;

}

.ddhAllergene{

    font-size:10px;

}

.ddhAllergenSeite{

    page-break-before:always;

    break-before:page;

}

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Automatisch aktivieren
========================================================== */

const _layoutTeil12 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil12.call(this);

    this.druckCSSOptimierung();

    this.druckOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 13
   Versions- & Statusanzeige
========================================================== */

Speiseplaene.versionAnzeigen = function(){

    /* Bereits vorhanden? */

    document
        .querySelectorAll(".ddhVersion")
        .forEach(e => e.remove());

    const footer =

        document.querySelector(".ddhFusszeile");

    if(!footer){

        return;

    }

    footer.insertAdjacentHTML(

        "beforeend",

        `

<div class="ddhVersion">

    Version ${this.version}

</div>

`

    );

};

/* ==========================================================
   Status anzeigen
========================================================== */

Speiseplaene.statusAnzeigen = function(){

    document
        .querySelectorAll(".ddhStatus")
        .forEach(e => e.remove());

    const titel =

        document.querySelector(".ddhTitel");

    if(!titel){

        return;

    }

    const status =

        this.status.importiert

        &&

        this.status.analysiert

            ? "Bereit"

            : "Nicht bereit";

    titel.insertAdjacentHTML(

        "beforeend",

        `

<div class="ddhStatus">

    Status: ${status}

</div>

`

    );

};

/* ==========================================================
   Design
========================================================== */

Speiseplaene.statusDesign = function(){

    if(document.getElementById("ddhStatusStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhStatusStyle";

    style.innerHTML = `

.ddhStatus{

    margin-top:12px;

    font-size:13px;

    color:#0F4C81;

    font-weight:bold;

}

.ddhVersion{

    margin-left:auto;

    font-size:11px;

    color:#888;

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Automatisch ausführen
========================================================== */

const _layoutTeil13 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil13.call(this);

    this.statusDesign();

    this.statusAnzeigen();

    this.versionAnzeigen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 14
   Stabilität & Bereinigung
========================================================== */

Speiseplaene.bereinigen = function(){

    [

        ".ddhAllergenSeite",

        ".ddhFusszeile",

        ".ddhSeitenInfo",

        ".ddhVersion",

        ".ddhStatus"

    ].forEach(selector=>{

        document
            .querySelectorAll(selector)
            .forEach(element=>element.remove());

    });

};

/* ==========================================================
   Sichere Ausführung
========================================================== */

Speiseplaene.sicher = function(funktion){

    try{

        if(typeof funktion==="function"){

            funktion();

        }

    }

    catch(fehler){

        console.error(

            "[DDH Speisepläne]",

            fehler

        );

    }

};

/* ==========================================================
   Modul zurücksetzen
========================================================== */

Speiseplaene.reset = function(){

    this.tage = [];

    this.daten = [];

    this.excelDatei = null;

    this.arbeitsmappe = null;

    this.aktivesBlatt = null;

    this.zeitraum = {

        start:"",

        ende:"",

        kalenderwoche:""

    };

    this.status.importiert = false;

    this.status.analysiert = false;

    this.status.layoutErstellt = false;

    this.status.druckBereit = false;

};

/* ==========================================================
   Layout sicher erzeugen
========================================================== */

const _layoutTeil14 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    this.bereinigen();

    this.sicher(()=>{

        _layoutTeil14.call(this);

    });

    this.status.layoutErstellt = true;

    this.status.druckBereit = true;

    this.druckButton(true);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 2.0
   Teil 15
   Finalisierung
========================================================== */

Speiseplaene.aktualisieren = function(){

    this.sicher(()=>{

        this.layoutOptimieren();

    });

    this.sicher(()=>{

        this.kartenOptimieren();

    });

    this.sicher(()=>{

        this.leereGerichteEntfernen();

    });

    this.sicher(()=>{

        this.druckOptimieren();

    });

    this.sicher(()=>{

        this.kopfAktualisieren();

    });

    this.sicher(()=>{

        this.fusszeileErzeugen();

    });

    this.sicher(()=>{

        this.seitenNummern();

    });

    this.sicher(()=>{

        this.versionAnzeigen();

    });

    this.sicher(()=>{

        this.statusAnzeigen();

    });

    this.status.layoutErstellt = true;

    this.status.druckBereit = true;

    this.druckButton(true);

    this.log("Speiseplan vollständig aufgebaut.");

};

/* ==========================================================
   Layout final erweitern
========================================================== */

const _layoutTeil15 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil15.call(this);

    this.aktualisieren();

};

/* ==========================================================
   Version ausgeben
========================================================== */

console.clear();

console.log("==========================================");

console.log("DDH Studio Enterprise");

console.log("Modul: Speisepläne");

console.log("Version: 2.0");

console.log("Status: Bereit");

console.log("==========================================");