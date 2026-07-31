"use strict";

/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 3.0
========================================================== */

const Speiseplaene = {

    version: "3.0",

    dom: {

        root: null,
        container: null,
        excelInput: null,
        btnExcel: null,
        btnDrucken: null

    },

    daten: [],
    tage: [],

    arbeitsmappe: null,
    aktivesBlatt: null,
    excelDatei: null,

    zeitraum: {

        start: "",
        ende: "",
        kalenderwoche: ""

    },

    status: {

        gestartet: false,
        importiert: false,
        analysiert: false,
        layout: false

    },

    init(){

        this.dom.root =
            document.getElementById("inhalt");

        if(!this.dom.root){

            console.error(
                "Container #inhalt fehlt."
            );

            return;

        }

        this.render();

        this.cacheDOM();

        this.events();

        this.status.gestartet = true;

    },

    cacheDOM(){

        this.dom.container =
            document.getElementById("speiseplanContainer");

        this.dom.excelInput =
            document.getElementById("excelDatei");

        this.dom.btnExcel =
            document.getElementById("btnExcel");

        this.dom.btnDrucken =
            document.getElementById("btnDrucken");

    },

    render(){

        this.dom.root.innerHTML = `

<div class="ddhSpeiseplaene">

    <div class="ddhHeader">

        <h1>🍽️ Speisepläne</h1>

        <p>Selly Excel importieren</p>

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

        <h2>

            Noch kein Speiseplan geladen

        </h2>

    </div>

</div>

`;

    }

};

/* ==========================================================
   Navigation
========================================================== */

if(typeof Seiten !== "undefined"){

    Seiten.speiseplaene = () => {

        Speiseplaene.init();

    };

}
/* ==========================================================
   Teil 2
   Events & Excel Import
========================================================== */

Speiseplaene.events = function(){

    if(this.dom.btnExcel){

        this.dom.btnExcel.onclick = () => {

            this.dom.excelInput.click();

        };

    }

    if(this.dom.excelInput){

        this.dom.excelInput.onchange = (e) => {

            if(!e.target.files.length){

                return;

            }

            this.importiereExcel(

                e.target.files[0]

            );

        };

    }

    if(this.dom.btnDrucken){

        this.dom.btnDrucken.onclick = () => {

            window.print();

        };

    }

};

/* ==========================================================
   Excel laden
========================================================== */

Speiseplaene.importiereExcel = function(datei){

    this.excelDatei = datei;

    const reader = new FileReader();

    reader.onload = (e)=>{

        const daten = new Uint8Array(

            e.target.result

        );

        this.arbeitsmappe = XLSX.read(

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

                    defval:"",

                    blankrows:false

                }

            );

        console.log(this.daten);

        this.analysieren();

    };

    reader.readAsArrayBuffer(datei);

};
/* ==========================================================
   Teil 3
   Selly Parser
========================================================== */

Speiseplaene.analysieren = function () {

    this.tage = [];

    let tag = null;

    const wochentage = [
        "MONTAG",
        "DIENSTAG",
        "MITTWOCH",
        "DONNERSTAG",
        "FREITAG",
        "SAMSTAG",
        "SONNTAG"
    ];

    for (const zeile of this.daten) {
        console.log(zeile.join(" | "));

        if (!zeile || zeile.length === 0) {
            continue;
        }

        const typ = String(zeile[0] || "")
            .replace(/\s+/g, " ")
            .trim();

        const gross = typ.toUpperCase();

        const gericht = String(zeile[1] || "").trim();
        const allergene = String(zeile[2] || "").trim();

        /* Zeitraum */

        const datumsTreffer = zeile.join(" ").match(
    /(\d{2}\.\d{2}\.\d{4}).*(\d{2}\.\d{2}\.\d{4})/
);

if (datumsTreffer) {
    this.zeitraum.start = datumsTreffer[1];
    this.zeitraum.ende = datumsTreffer[2];
}

        /* Wochentag */

        if (wochentage.includes(gross)) {

            tag = {
                name: gross,
                menue1: "",
                menue2: "",
                suppe: "",
                dessert: "",
                allergene1: "",
                allergene2: "",
                allergeneSuppe: "",
                allergeneDessert: ""
            };

            this.tage.push(tag);
            continue;
        }

        if (!tag) {
            continue;
        }

        /* Menü I */

        if (
    gross.includes("MENÜ II") ||
    gross.includes("MENU II")
) {
    tag.menue2 = gericht;
    tag.allergene2 = allergene;
    continue;
}

if (
    gross.includes("MENÜ I (") ||
    gross.includes("MENU I (") ||
    gross === "MENÜ I" ||
    gross === "MENU I"
) {
    tag.menue1 = gericht;
    tag.allergene1 = allergene;
    continue;
}

        /* Suppe */

        if (
            gross.includes("SUPPE")
        ) {

            tag.suppe = gericht;
            tag.allergeneSuppe = allergene;
            continue;
        }

        /* Dessert */

        if (
            gross.includes("DESSERT")
        ) {

            tag.dessert = gericht;
            tag.allergeneDessert = allergene;
            continue;
        }

    }

    console.table(this.tage);

    this.layoutErzeugen();

};
/* ==========================================================
   Teil 4
   Layout
========================================================== */

Speiseplaene.layoutErzeugen = function(){

    if(!this.dom.container){

        return;

    }

    let html = `

<div class="ddhTitel">

    <div class="ddhKopf">

        <div class="ddhLinks">

            <div class="ddhLogo">

                DDH SERVICE GMBH

            </div>

            <div class="ddhUntertitel">

                WOCHENSPEISEPLAN

            </div>

        </div>

        <div class="ddhRechts">

            <div class="ddhKW">

                KW ${this.kalenderwoche(this.zeitraum.start)}

            </div>

            <div class="ddhDatum">

                ${this.zeitraum.start}
                ${this.zeitraum.start ? " – " : ""}
                ${this.zeitraum.ende}

            </div>

        </div>

    </div>

</div>

<div class="ddhWochenplan">

`;

    this.tage.forEach(tag=>{

        html += this.renderTag(tag);

    });

    html += `

</div>

`;

    this.dom.container.innerHTML = html;

    if(this.dom.btnDrucken){

        this.dom.btnDrucken.disabled = false;

    }

};

/* ==========================================================
   Tag
========================================================== */

Speiseplaene.renderTag = function(tag){

    return `

<div class="ddhTag">

    <h2>${tag.name}</h2>

    ${this.renderGericht(
        "🍽 Menü I",
        tag.menue1,
        tag.allergene1
    )}

    ${this.renderGericht(
        "🥗 Menü II",
        tag.menue2,
        tag.allergene2
    )}

    ${this.renderGericht(
        "🍲 Suppe",
        tag.suppe,
        tag.allergeneSuppe
    )}

    ${this.renderGericht(
        "🍮 Dessert",
        tag.dessert,
        tag.allergeneDessert
    )}

</div>

`;

};

/* ==========================================================
   Gericht
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
   Teil 5
   Design
========================================================== */

Speiseplaene.designLaden = function(){

    if(document.getElementById("ddhSpeiseplanStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhSpeiseplanStyle";

    style.textContent = `

body{

    background:#f4f6f8;

}

.ddhSpeiseplaene{

    max-width:1500px;
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

.ddhToolbar{

    display:flex;
    gap:12px;
    margin:20px 0;

}

.ddhTitel{

    background:white;
    border:3px solid #0F4C81;
    border-radius:12px;
    padding:25px;
    text-align:center;
    margin-bottom:25px;

}

.ddhTitel h1{

    margin:0;
    color:#0F4C81;

}

.ddhTitel p{

    margin-top:8px;
    color:#666;
    font-size:18px;

}

.ddhWochenplan{

    display:grid;

    grid-template-columns:
        repeat(auto-fit,minmax(420px,1fr));

    gap:20px;

}

.ddhTag{

    background:white;

    border-radius:12px;

    overflow:hidden;

    border:1px solid #d7d7d7;

    box-shadow:0 4px 14px rgba(0,0,0,.08);

}

.ddhTag h2{

    margin:0;

    padding:16px;

    background:#0F4C81;

    color:white;

    font-size:22px;

}

.ddhGericht{

    padding:16px;

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

    line-height:1.4;

}

.ddhAllergene{

    margin-top:8px;

    color:#777;

    font-size:13px;

}

.ddhLeer{

    text-align:center;

    padding:80px;

    color:#888;

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Design automatisch laden
========================================================== */

const _initTeil5 = Speiseplaene.init;

Speiseplaene.init = function(){

    this.designLaden();

    _initTeil5.call(this);

};
/* ==========================================================
   Teil 6
   Drucken
========================================================== */

Speiseplaene.drucken = function(){

    window.print();

};

/* ==========================================================
   Druckdesign
========================================================== */

Speiseplaene.druckDesign = function(){

    if(document.getElementById("ddhPrintStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhPrintStyle";

    style.textContent = `

@page{

    size:A4 landscape;

    margin:10mm;

}

@media print{

body{

    background:white !important;

}

.ddhHeader,
.ddhToolbar{

    display:none !important;

}

.ddhWochenplan{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:10mm;

}

.ddhTag{

    page-break-inside:avoid;

    break-inside:avoid;

    box-shadow:none;

    border:1px solid #999;

}

.ddhGericht{

    padding:10px;

}

.ddhGerichtTitel{

    font-size:14px;

}

.ddhGerichtText{

    font-size:14px;

    line-height:1.3;

}

.ddhAllergene{

    font-size:11px;

    color:#555;

}

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Druckdesign automatisch laden
========================================================== */

const _initTeil6 = Speiseplaene.init;

Speiseplaene.init = function(){

    this.druckDesign();

    _initTeil6.call(this);

};
/* ==========================================================
   Teil 7
   Allergenseite
========================================================== */

Speiseplaene.allergenseite = function(){

    let html = `

<div class="ddhAllergenSeite">

    <div class="ddhTitel">

        <h1>ALLERGENE</h1>

        <p>

            ${this.zeitraum.start}
            ${this.zeitraum.start ? " – " : ""}
            ${this.zeitraum.ende}

        </p>

    </div>

`;

    this.tage.forEach(tag=>{

        html += `

<div class="ddhAllergenTag">

    <h2>${tag.name}</h2>

    <table class="ddhAllergenTabelle">

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
   Allergenseite anhängen
========================================================== */

const _layoutTeil7 = Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil7.call(this);

    this.dom.container.insertAdjacentHTML(

        "beforeend",

        this.allergenseite()

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

    style.textContent = `

.ddhAllergenSeite{

    margin-top:40px;

    page-break-before:always;

}

.ddhAllergenTag{

    margin-bottom:25px;

}

.ddhAllergenTag h2{

    color:#0F4C81;

    margin-bottom:10px;

}

.ddhAllergenTabelle{

    width:100%;

    border-collapse:collapse;

}

.ddhAllergenTabelle th{

    width:180px;

    text-align:left;

    background:#f2f4f7;

    border:1px solid #d9d9d9;

    padding:10px;

}

.ddhAllergenTabelle td{

    border:1px solid #d9d9d9;

    padding:10px;

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Allergen CSS laden
========================================================== */

const _initTeil7 = Speiseplaene.init;

Speiseplaene.init = function(){

    this.allergenDesign();

    _initTeil7.call(this);

};
/* ==========================================================
   Teil 8
   DDH Kopfbereich
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
        Number(teile[1])-1,
        Number(teile[0])

    );

    d.setHours(0,0,0,0);

    d.setDate(

        d.getDate() + 4 - (d.getDay() || 7)

    );

    const jahrStart =

        new Date(

            d.getFullYear(),

            0,

            1

        );

    return Math.ceil(

        (((d-jahrStart)/86400000)+1)/7

    );

};

/* ==========================================================
   Kopf aktualisieren
========================================================== */

Speiseplaene.kopfAktualisieren = function(){

    const kopf =

        document.querySelector(".ddhTitel");

    if(!kopf){

        return;

    }

    const kw =

        this.kalenderwoche(

            this.zeitraum.start

        );

    kopf.innerHTML = `

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
   Layout erweitern
========================================================== */

const _layoutTeil8 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil8.call(this);

    this.kopfAktualisieren();

};

/* ==========================================================
   Kopf CSS
========================================================== */

Speiseplaene.kopfDesign = function(){

    if(document.getElementById("ddhKopfStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhKopfStyle";

    style.textContent = `

.ddhKopf{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.ddhLinks{

    display:flex;

    flex-direction:column;

}

.ddhLogo{

    font-size:32px;
    font-weight:700;
    color:#0F4C81;
    letter-spacing:2px;

}

.ddhUntertitel{

    margin-top:8px;
    font-size:22px;
    font-weight:600;
    color:#444;

}
.ddhRechts{

    text-align:right;

}

.ddhKW{

    font-size:34px;
    font-weight:bold;
    color:#0F4C81;

}

.ddhDatum{

    margin-top:8px;

    color:#666;

    font-size:16px;

}

`;

    document.head.appendChild(style);

};

/* ==========================================================
   Kopfdesign laden
========================================================== */

const _initTeil8 =

    Speiseplaene.init;

Speiseplaene.init = function(){

    this.kopfDesign();

    _initTeil8.call(this);

};
/* ==========================================================
   Teil 9
   Layout Optimierung
========================================================== */

Speiseplaene.layoutOptimieren = function(){

    document.querySelectorAll(

        ".ddhGerichtText"

    ).forEach(text=>{

        const laenge =

            text.textContent.trim().length;

        if(laenge <= 40){

            text.style.fontSize = "22px";
            text.style.lineHeight = "1.35";

        }

        else if(laenge <= 80){

            text.style.fontSize = "19px";
            text.style.lineHeight = "1.40";

        }

        else if(laenge <= 120){

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
   Karten gleich hoch
========================================================== */

Speiseplaene.kartenOptimieren = function(){

    document.querySelectorAll(

        ".ddhTag"

    ).forEach(tag=>{

        tag.style.minHeight = "380px";

    });

};

/* ==========================================================
   Leere Felder ausblenden
========================================================== */

Speiseplaene.leereGerichteEntfernen = function(){

    document.querySelectorAll(

        ".ddhGericht"

    ).forEach(gericht=>{

        const text = gericht.querySelector(

            ".ddhGerichtText"

        );

        if(

            !text ||

            text.textContent.trim() === ""

        ){

            gericht.remove();

        }

    });

};

/* ==========================================================
   Druck optimieren
========================================================== */

Speiseplaene.druckOptimieren = function(){

    document.querySelectorAll(

        ".ddhTag"

    ).forEach(tag=>{

        tag.style.breakInside = "avoid";

        tag.style.pageBreakInside = "avoid";

    });

};

/* ==========================================================
   Layout erweitern
========================================================== */

const _layoutTeil9 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil9.call(this);

    this.leereGerichteEntfernen();

    this.layoutOptimieren();

    this.kartenOptimieren();

    this.druckOptimieren();

};
/* ==========================================================
   Teil 10
   Abschluss
========================================================== */

Speiseplaene.fusszeileErzeugen = function(){

    document.querySelectorAll(

        ".ddhFusszeile"

    ).forEach(e=>e.remove());

    const plan = document.querySelector(

        ".ddhWochenplan"

    );

    if(!plan){

        return;

    }

    const heute =

        new Date().toLocaleDateString(

            "de-DE"

        );

    plan.insertAdjacentHTML(

        "afterend",

        `

<div class="ddhFusszeile">

    <div>

        DDH Studio Enterprise · Speisepläne

    </div>

    <div>

        Erstellt am ${heute}

    </div>

</div>

`

    );

};

Speiseplaene.statusAnzeigen = function(){

    const titel = document.querySelector(

        ".ddhTitel"

    );

    if(!titel){

        return;

    }

    if(document.querySelector(".ddhStatus")){

        return;

    }

    titel.insertAdjacentHTML(

        "beforeend",

        `

<div class="ddhStatus">

    ✅ Bereit

</div>

`

    );

};

Speiseplaene.footerDesign = function(){

    if(document.getElementById(

        "ddhFooterStyle"

    )){

        return;

    }

    const style = document.createElement(

        "style"

    );

    style.id = "ddhFooterStyle";

    style.textContent = `

.ddhFusszeile{

    margin-top:30px;

    padding-top:15px;

    border-top:2px solid #0F4C81;

    display:flex;

    justify-content:space-between;

    color:#666;

    font-size:13px;

}

.ddhStatus{

    margin-top:15px;

    color:#0F4C81;

    font-weight:bold;

}

`;

    document.head.appendChild(style);

};

const _layoutTeil10 =

    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutTeil10.call(this);

    this.footerDesign();

    this.fusszeileErzeugen();

    this.statusAnzeigen();

};

const _initTeil10 =

    Speiseplaene.init;

Speiseplaene.init = function(){

    _initTeil10.call(this);

};

console.clear();

console.log("================================");

console.log("DDH Studio Enterprise");

console.log("Speisepläne 3.0");

console.log("Modul geladen");

console.log("================================");