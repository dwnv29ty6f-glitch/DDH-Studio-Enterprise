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
    
    einstellungen: {

    allergene: true,
    zusatzstoffe: true,
    dessert: true,
    suppe: true,
    menue2: true

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
            
            this.dom.btnEinstellungen =
    document.getElementById("btnEinstellungen");

this.dom.dialog =
    document.getElementById("ddhEinstellungen");

this.dom.btnDialogSchliessen =
    document.getElementById("btnDialogSchliessen");

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
        
        <button
    id="btnEinstellungen"
    class="sekundenButton">

    ⚙️ Einstellungen

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
    
    <div id="ddhEinstellungen" class="ddhDialog">

    <h2>Einstellungen</h2>

    <label>
        <input type="checkbox" id="chkAllergene" checked>
        Allergene anzeigen
    </label>

    <label>
        <input type="checkbox" id="chkZusatzstoffe" checked>
        Zusatzstoffe anzeigen
    </label>

    <label>
        <input type="checkbox" id="chkDessert" checked>
        Dessert anzeigen
    </label>
    
    <label>

    <input
        type="checkbox"
        id="chkMenue2"
        checked>

    Menü II anzeigen

</label>

    <label>
        <input type="checkbox" id="chkSuppe" checked>
        Suppe anzeigen
    </label>

    <button id="btnDialogSchliessen">

        Schließen

    </button>

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

    this.druckDesign();

    this.drucken();

};

    }
    
    if(this.dom.btnEinstellungen){

    this.dom.btnEinstellungen.onclick = () => {

        this.dom.dialog.style.display = "block";

    };

}

if(this.dom.btnDialogSchliessen){

    this.dom.btnDialogSchliessen.onclick = () => {

        this.dom.dialog.style.display = "none";

    };

}

const cbAllergene = document.getElementById("chkAllergene");
const cbZusatzstoffe = document.getElementById("chkZusatzstoffe");
const cbDessert = document.getElementById("chkDessert");
const cbSuppe = document.getElementById("chkSuppe");
const cbMenue2 =
    document.getElementById("chkMenue2");

if (cbAllergene) {

    cbAllergene.onchange = () => {

        this.einstellungen.allergene = cbAllergene.checked;

        this.layoutErzeugen();

    };

}

if (cbZusatzstoffe) {

    cbZusatzstoffe.onchange = () => {

        this.einstellungen.zusatzstoffe = cbZusatzstoffe.checked;

        this.layoutErzeugen();

    };

}

if (cbDessert) {

    cbDessert.onchange = () => {

        this.einstellungen.dessert = cbDessert.checked;

        this.layoutErzeugen();

    };

}

if (cbSuppe) {

    cbSuppe.onchange = () => {

        this.einstellungen.suppe = cbSuppe.checked;

        this.layoutErzeugen();

    };

}

if(cbMenue2){

    cbMenue2.onchange = () => {

        this.einstellungen.menue2 = cbMenue2.checked;

        this.layoutErzeugen();

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

                <span class="ddhLogoIcon">🏥</span>

                <span class="ddhLogoText">
                    DDH SERVICE GMBH
                </span>

            </div>

            <div class="ddhUntertitel">

                Wochenspeiseplan

            </div>

            <div class="ddhBeschreibung">

                Frisch gekocht • Ausgewogen • Täglich für Sie

            </div>

        </div>

        <div class="ddhRechts">

            <div class="ddhKW">

                <span>KW</span>

                <strong>
                    ${this.kalenderwoche(this.zeitraum.start)}
                </strong>

            </div>

            <div class="ddhDatum">

                ${this.zeitraum.start}

                <span class="ddhBis">–</span>

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

    <div class="ddhTagKopf">

        <h2>${tag.name}</h2>

    </div>

    <div class="ddhTagTabelle">

        ${tag.menue1 ? `

        <div class="ddhZeile">

            <div class="ddhLabel">

                Menü I

            </div>

            <div class="ddhWert">

                ${tag.menue1}

                ${
                    this.einstellungen.allergene && tag.allergene1

                    ?

                    `<div class="ddhInfo">

                        ${tag.allergene1}

                    </div>`

                    :

                    ""

                }

            </div>

        </div>

        ` : ""}

        ${
            this.einstellungen.menue2 && tag.menue2

            ?

            `

        <div class="ddhZeile">

            <div class="ddhLabel">

                Menü II

            </div>

            <div class="ddhWert">

                ${tag.menue2}

                ${
                    this.einstellungen.allergene && tag.allergene2

                    ?

                    `<div class="ddhInfo">

                        ${tag.allergene2}

                    </div>`

                    :

                    ""

                }

            </div>

        </div>

`

            :

            ""

        }

        ${
            this.einstellungen.dessert && tag.dessert

            ?

            `

        <div class="ddhZeile">

            <div class="ddhLabel">

                Dessert

            </div>

            <div class="ddhWert">

                ${tag.dessert}

                ${
                    this.einstellungen.allergene && tag.allergeneDessert

                    ?

                    `<div class="ddhInfo">

                        ${tag.allergeneDessert}

                    </div>`

                    :

                    ""

                }

            </div>

        </div>

`

            :

            ""

        }

    </div>

</div>

`;

};

/* ==========================================================
   Gericht
========================================================== */

Speiseplaene.renderGericht = function(

    titel,
    gericht,
    allergene,
    zusatzstoffe

){

    if(!gericht){

        return "";

    }

    if(
        titel.includes("Suppe") &&
        !this.einstellungen.suppe
    ){
        return "";
    }

    if(
        titel.includes("Dessert") &&
        !this.einstellungen.dessert
    ){
        return "";
    }

    if(
        titel.includes("Menü II") &&
        !this.einstellungen.menue2
    ){
        return "";
    }

    let klasse = "";
    let icon = "";

    if(titel.includes("Menü I")){

        klasse = "ddhMenue1";
        icon = "🍽️";

    }else if(titel.includes("Menü II")){

        klasse = "ddhMenue2";
        icon = "🥗";

    }else if(titel.includes("Suppe")){

        klasse = "ddhSuppe";
        icon = "🍲";

    }else{

        klasse = "ddhDessert";
        icon = "🍮";

    }

    return `

<div class="ddhGericht ${klasse}">

    <div class="ddhGerichtKopf">

        <div class="ddhGerichtIcon">

            ${icon}

        </div>

        <div class="ddhGerichtTitel">

            ${titel}

        </div>

    </div>

    <div class="ddhGerichtText">

        ${gericht}

    </div>

    ${
        (this.einstellungen.allergene && allergene)
        ||
        (this.einstellungen.zusatzstoffe && zusatzstoffe)

        ?

        `

<div class="ddhInfos">

    ${
        this.einstellungen.allergene && allergene

        ?

        `
<span class="ddhAllergene">

🧾 ${allergene}

</span>
`

        :

        ""

    }

    ${
        this.einstellungen.zusatzstoffe && zusatzstoffe

        ?

        `
<span class="ddhZusatzstoffe">

➕ ${zusatzstoffe}

</span>
`

        :

        ""

    }

</div>

`

        :

        ""

    }

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

:root{

    --ddh-tuerkis:#00BCD4;
    --ddh-blau:#1565C0;
    --ddh-grau:#f5f7fa;

}

body{

    margin:0;
    padding:30px;
    background:#eef6f8;
    font-family:"Segoe UI",Arial,sans-serif;

}

.ddhSpeiseplaene{

    max-width:1500px;
    margin:0 auto;

}

.ddhHeader{

    margin-bottom:20px;

}

.ddhToolbar{

    display:flex;
    gap:12px;
    margin-bottom:25px;

}

.ddhTitel{

    background:linear-gradient(135deg,var(--ddh-tuerkis),var(--ddh-blau));
    color:#fff;
    border-radius:26px;
    padding:28px;
    margin-bottom:25px;
    box-shadow:0 12px 35px rgba(0,0,0,.18);

}

.ddhKopf{

    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:30px;

}

.ddhLinks{

    flex:1;

}

.ddhLogo{

    display:flex;
    align-items:center;
    gap:14px;
    font-size:32px;
    font-weight:700;

}

.ddhUntertitel{

    margin-top:10px;
    font-size:22px;

}

.ddhBeschreibung{

    margin-top:8px;
    opacity:.9;

}

.ddhRechts{

    text-align:right;

}

.ddhKW{

    font-size:30px;
    font-weight:bold;

}

.ddhDatum{

    margin-top:10px;

}

.ddhWochenplan{

    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:10px;

}

.ddhTag{

    background:#fff;
    border-radius:22px;
    overflow:hidden;
    box-shadow:0 8px 20px rgba(0,0,0,.12);
    display:flex;
    flex-direction:column;

}

.ddhTagKopf{

    background:linear-gradient(90deg,var(--ddh-tuerkis),var(--ddh-blau));
    color:#fff;
    text-align:center;
    padding:18px;

}

.ddhTagKopf h2{

    margin:0;
    font-size:28px;

}

.ddhTagInhalt{

    padding:8px;
    display:flex;
    flex-direction:column;
    gap:6px;

}

.ddhGericht{

    background:#fff;
    border-radius:10px;
    border-left:4px solid var(--ddh-tuerkis);
    padding:10px;
    box-shadow:0 1px 4px rgba(0,0,0,.05);

}

.ddhGerichtTitel{

    font-weight:bold;
    color:#1565C0;
    margin-bottom:8px;

}

.ddhGerichtText{

    font-size:18px;
    line-height:1.45;

}

.ddhInfos{

    margin-top:10px;
    font-size:13px;
    color:#666;

}

.ddhDialog{

    display:none;

}

@media print{

    body{

        background:#fff;
        padding:0;

    }

    .ddhHeader,
    .ddhToolbar,
    .ddhDialog,
    .ddhStatus{

        display:none !important;

    }

    .ddhWochenplan{

        gap:10mm;

    }

    .ddhTag{

        break-inside:avoid;
        page-break-inside:avoid;

    }

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

    const plan = document.querySelector(".ddhSpeiseplaene");

    if(!plan){

        return;

    }

    const druckFenster = window.open("", "_blank");

    if(!druckFenster){

        alert("Popup wurde blockiert.");

        return;

    }

    const styles = Array.from(

        document.querySelectorAll("style,link[rel='stylesheet']")

    ).map(e=>e.outerHTML).join("");

    druckFenster.document.open();

    druckFenster.document.write(`

<!DOCTYPE html>

<html lang="de">

<head>

<meta charset="utf-8">

<title>Speiseplan</title>

${styles}

<style>

@page{

    size:A4 landscape;

    margin:10mm;

}

html,
body{

    margin:0;

    padding:0;

    background:#ffffff !important;

}

.ddhHeader,
.ddhToolbar,
.ddhDialog,
.ddhStatus{

    display:none !important;

}

.ddhSpeiseplaene{

    width:100% !important;

    max-width:none !important;

    margin:0 !important;

    padding:0 !important;

}

</style>

</head>

<body>

${plan.outerHTML}

</body>

</html>

`);

    druckFenster.document.close();

    druckFenster.focus();

    setTimeout(()=>{

        druckFenster.print();

        druckFenster.close();

    },500);

};

/* ==========================================================
   Druckdesign
========================================================== */

Speiseplaene.druckDesign = function(){

    let style = document.getElementById("ddhPrintStyle");

    if(style){

        style.remove();

    }

    style = document.createElement("style");

    style.id = "ddhPrintStyle";

    style.textContent = `

@media print{

    @page{

        size:A4 landscape;
        margin:5mm;

    }

    html,
    body{

        margin:0 !important;
        padding:0 !important;
        background:#fff !important;

    }

    .ddhHeader,
    .ddhToolbar,
    .ddhDialog,
    .ddhStatus,
    .ddhFusszeile{

        display:none !important;

    }

    .ddhSpeiseplaene{

        width:100% !important;
        max-width:none !important;
        margin:0 !important;
        padding:0 !important;

    }

    .ddhTitel{

        margin:0 0 5mm 0 !important;
        padding:8mm !important;
        border-radius:5mm !important;

    }

    .ddhLogoText{

        font-size:20px !important;

    }

    .ddhUntertitel{

        font-size:13px !important;
        margin-top:2px !important;

    }

    .ddhBeschreibung{

        display:none !important;

    }

    .ddhKW{

        padding:4px 10px !important;
        font-size:15px !important;

    }

    .ddhDatum{

        font-size:11px !important;
        margin-top:4px !important;

    }

    .ddhWochenplan{

        display:grid !important;
        grid-template-columns:repeat(2,1fr) !important;
        gap:4mm !important;

    }

    .ddhTag{

        min-height:auto !important;
        margin:0 !important;
        border-radius:4mm !important;
        box-shadow:none !important;
        break-inside:avoid;
        page-break-inside:avoid;

    }

    .ddhTagKopf{

        padding:6px !important;

    }

    .ddhTagKopf h2{

        font-size:18px !important;

    }

    .ddhTagInhalt{

        padding:6px !important;
        gap:4px !important;

    }

    .ddhGericht{

        margin:0 !important;
        padding:6px 8px !important;
        border-radius:2mm !important;
        box-shadow:none !important;

    }

    .ddhGerichtTitel{

        font-size:12px !important;
        margin-bottom:2px !important;

    }

    .ddhGerichtText{

        font-size:13px !important;
        line-height:1.15 !important;

    }

    .ddhInfos{

        margin-top:2px !important;
        font-size:9px !important;

    }

    .ddhAllergene,
    .ddhZusatzstoffe{

        padding:1px 4px !important;
        font-size:8px !important;

    }

}

`;

    document.head.appendChild(style);

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

    const kopf = document.querySelector(".ddhTitel");

    if(!kopf){

        return;

    }

    kopf.innerHTML = `

<div class="ddhKopf">

    <div class="ddhLinks">

        <div class="ddhLogo">

            <span class="ddhLogoIcon">🏥</span>

            <span class="ddhLogoText">

                DDH SERVICE GMBH

            </span>

        </div>

        <div class="ddhUntertitel">

            Wochenspeiseplan

        </div>

        <div class="ddhBeschreibung">

            Frisch gekocht • Ausgewogen • Täglich für Sie

        </div>

    </div>

    <div class="ddhRechts">

        <div class="ddhKW">

            <span>KW</span>

            <strong>

                ${this.kalenderwoche(this.zeitraum.start)}

            </strong>

        </div>

        <div class="ddhDatum">

            ${this.zeitraum.start}

            <span class="ddhBis">–</span>

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

    font-size:34px;

    font-weight:800;

    letter-spacing:2px;

    color:white;

    text-shadow:0 2px 8px rgba(0,0,0,.25);

}

.ddhUntertitel{

    margin-top:8px;

    font-size:20px;

    color:rgba(255,255,255,.92);

    letter-spacing:1px;

}

.ddhRechts{

    text-align:right;

}

.ddhKW{

    display:inline-block;

    padding:12px 22px;

    border-radius:50px;

    background:rgba(255,255,255,.22);

    backdrop-filter:blur(8px);

    font-size:28px;

    font-weight:bold;

    color:white;

}

.ddhDatum{

    margin-top:14px;

    font-size:18px;

    color:white;

    opacity:.95;

}
.ddhKopf{

    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:40px;

}

.ddhLinks{

    display:flex;
    flex-direction:column;
    flex:1;

}

.ddhLogo{

    display:flex;
    align-items:center;
    gap:18px;

}

.ddhLogoIcon{

    width:68px;
    height:68px;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:18px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.30),
            rgba(255,255,255,.12)
        );

    backdrop-filter:blur(10px);

    font-size:34px;

    box-shadow:
        0 10px 25px rgba(0,0,0,.18);

}

.ddhLogoText{

    font-size:34px;
    font-weight:800;
    letter-spacing:2px;

    color:#ffffff;

    text-shadow:
        0 3px 10px rgba(0,0,0,.20);

}

.ddhUntertitel{

    margin-top:12px;

    font-size:20px;

    color:rgba(255,255,255,.96);

    text-transform:uppercase;

    letter-spacing:2px;

}

.ddhBeschreibung{

    margin-top:8px;

    font-size:15px;

    color:rgba(255,255,255,.82);

}

.ddhRechts{

    display:flex;
    flex-direction:column;
    align-items:flex-end;
    gap:14px;

}

.ddhKW{

    display:flex;
    align-items:center;
    gap:10px;

    padding:12px 22px;

    border-radius:50px;

    background:
        rgba(255,255,255,.20);

    backdrop-filter:blur(10px);

    box-shadow:
        0 10px 25px rgba(0,0,0,.18);

    color:#ffffff;

}

.ddhKW span{

    font-size:14px;

    text-transform:uppercase;

    opacity:.85;

}

.ddhKW strong{

    font-size:34px;

    font-weight:800;

}

.ddhDatum{

    font-size:18px;

    color:#ffffff;

    font-weight:600;

    letter-spacing:1px;

}

.ddhBis{

    margin:0 10px;

    opacity:.75;

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

    document.querySelectorAll(".ddhTag").forEach(tag=>{

        const gerichte = tag.querySelectorAll(".ddhGericht");

        const anzahl = gerichte.length;

        if(anzahl === 1){

            gerichte[0].style.flex = "1";
            gerichte[0].style.justifyContent = "center";

        }

        if(anzahl === 2){

            gerichte.forEach(g=>{

                g.style.flex = "1";

            });

        }

        if(anzahl === 3){

            gerichte.forEach(g=>{

                g.style.flex = "1";

            });

        }

        if(anzahl >= 4){

            gerichte.forEach(g=>{

                g.style.flex = "1";

            });

        }

    });

};
/* ==========================================================
   Karten gleich hoch
========================================================== */

Speiseplaene.kartenOptimieren = function(){

    document.querySelectorAll(".ddhTag").forEach(tag=>{

        tag.style.height = "auto";
tag.style.minHeight = "unset";

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

    document.querySelectorAll(".ddhTag").forEach(tag=>{

        tag.style.breakInside = "avoid";
        tag.style.pageBreakInside = "avoid";

        tag.style.display = "flex";
        tag.style.flexDirection = "column";

        tag.style.height = "100%";

    });

    document.querySelectorAll(".ddhGericht").forEach(gericht=>{

        gericht.style.breakInside = "avoid";

        gericht.style.pageBreakInside = "avoid";

    });

    const plan = document.querySelector(".ddhWochenplan");

    if(plan){

        plan.style.display = "grid";

        plan.style.gridTemplateColumns = "1fr 1fr";

        plan.style.alignItems = "stretch";

        plan.style.gap = "12mm";

    }

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