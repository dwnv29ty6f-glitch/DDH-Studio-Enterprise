/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 1/20
========================================================== */

const Speiseplaene = {

    version: "1.0",

    daten: [],

    tage: [],

    excelDatei: null,

    layout: "A4",

    init() {

        this.render();

        this.events();

    },

    render() {

        const inhalt = document.getElementById("inhalt");

        inhalt.innerHTML = `

<div class="ddhSpeiseplanModul">

    <div class="ddhHeader">

        <div>

            <h1>

                🍽️ Speisepläne

            </h1>

            <p>

                Selly-Speiseplan importieren
                und automatisch drucken.

            </p>

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
        id="speiseplanContainer">

        <div class="ddhLeer">

            <div class="icon">

                🍽️

            </div>

            <h2>

                Noch kein Speiseplan geladen

            </h2>

            <p>

                Wähle eine Selly-Excel-Datei aus.

            </p>

        </div>

    </div>

</div>

`;

    },

    events() {

        const btnExcel =
            document.getElementById("btnExcel");

        const btnDrucken =
            document.getElementById("btnDrucken");

        const excelDatei =
            document.getElementById("excelDatei");

        btnExcel.onclick = () => {

            excelDatei.click();

        };

        btnDrucken.onclick = () => {

            this.drucken();

        };

    },

    drucken() {

        window.print();

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
   Version: 1.0
   Block: 2/20
   Excel Import
========================================================== */

Speiseplaene.excelImportieren = function(datei){

    const reader = new FileReader();

    reader.onload = (event)=>{

        try{

            const daten = new Uint8Array(event.target.result);

            const arbeitsmappe = XLSX.read(daten,{
                type:"array"
            });

            const erstesBlatt = arbeitsmappe.SheetNames[0];

            const tabelle =
                arbeitsmappe.Sheets[erstesBlatt];

            this.daten = XLSX.utils.sheet_to_json(
                tabelle,
                {
                    header:1,
                    blankrows:false,
                    defval:""
                }
            );

            console.clear();

            console.log(
                "DDH Studio Enterprise"
            );

            console.log(
                "Selly-Datei erfolgreich importiert."
            );

            console.table(this.daten);

            this.analysieren();

        }

        catch(fehler){

            console.error(fehler);

            alert(
                "Die Excel-Datei konnte nicht gelesen werden."
            );

        }

    };

    reader.readAsArrayBuffer(datei);

};

/* ==========================================================
   Dateiauswahl
========================================================== */

Speiseplaene.dateiAuswaehlen = function(){

    const feld =
        document.getElementById("excelDatei");

    feld.onchange = ()=>{

        if(!feld.files.length){

            return;

        }

        this.excelDatei =
            feld.files[0];

        this.excelImportieren(
            this.excelDatei
        );

    };

};

/* ==========================================================
   Events erweitern
========================================================== */

const _eventsBlock1 =
    Speiseplaene.events;

Speiseplaene.events = function(){

    _eventsBlock1.call(this);

    this.dateiAuswaehlen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 3/20
   Selly Analyse
========================================================== */

Speiseplaene.analysieren = function(){

    this.tage = [];

    const WOCHENTAGE = [
        "MONTAG",
        "DIENSTAG",
        "MITTWOCH",
        "DONNERSTAG",
        "FREITAG",
        "SAMSTAG",
        "SONNTAG"
    ];

    let tag = null;

    for(const zeile of this.daten){

        if(!zeile) continue;

        const text = String(zeile[0] || "")
            .trim()
            .toUpperCase();

        /* ------------------------------------
           Wochentag gefunden
        ------------------------------------ */

        if(WOCHENTAGE.includes(text)){

            tag = {

                name:text,

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

            continue;

        }

        if(!tag) continue;

        /* ------------------------------------
           Menü I
        ------------------------------------ */

        if(text.startsWith("MENÜ I")){

            tag.menue1 = zeile[1] || "";

            tag.allergene1 = zeile[2] || "";

            continue;

        }

        /* ------------------------------------
           Menü II
        ------------------------------------ */

        if(text.startsWith("MENÜ II")){

            tag.menue2 = zeile[1] || "";

            tag.allergene2 = zeile[2] || "";

            continue;

        }

        /* ------------------------------------
           Suppe
        ------------------------------------ */

        if(text.startsWith("SUPPE")){

            tag.suppe = zeile[1] || "";

            tag.allergeneSuppe = zeile[2] || "";

            continue;

        }

        /* ------------------------------------
           Dessert
        ------------------------------------ */

        if(text.startsWith("DESSERT")){

            tag.dessert = zeile[1] || "";

            tag.allergeneDessert = zeile[2] || "";

            continue;

        }

    }

    console.log("Analyse abgeschlossen");

    console.table(this.tage);

    this.layoutErzeugen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 4/20
   Vorschau erzeugen
========================================================== */

Speiseplaene.layoutErzeugen = function(){

    const container =
        document.getElementById("speiseplanContainer");

    if(!container) return;

    if(this.tage.length === 0){

        container.innerHTML = `

        <div class="ddhLeer">

            <div class="icon">

                ⚠️

            </div>

            <h2>

                Kein Speiseplan gefunden

            </h2>

            <p>

                Die Selly-Datei konnte
                nicht ausgewertet werden.

            </p>

        </div>

        `;

        return;

    }

    let html = `

<div class="ddhSpeiseplan">

    <div class="ddhTitel">

        <div class="ddhLogo">

            DDH SERVICE GMBH

        </div>

        <h1>

            WOCHENSPEISEPLAN

        </h1>

        <div id="ddhZeitraum">

            Zeitraum wird ermittelt...

        </div>

    </div>

`;

    this.tage.forEach(tag=>{

        html += `

<section class="ddhTag">

    <h2>

        ${tag.name}

    </h2>

    <div class="ddhGericht">

        <div class="ddhGerichtTitel">

            🍽 Menü I

        </div>

        <div class="ddhGerichtText">

            ${tag.menue1}

        </div>

        <div class="ddhAllergene">

            ${tag.allergene1}

        </div>

    </div>

    <div class="ddhGericht">

        <div class="ddhGerichtTitel">

            🥗 Menü II

        </div>

        <div class="ddhGerichtText">

            ${tag.menue2}

        </div>

        <div class="ddhAllergene">

            ${tag.allergene2}

        </div>

    </div>

    <div class="ddhGericht">

        <div class="ddhGerichtTitel">

            🍲 Suppe

        </div>

        <div class="ddhGerichtText">

            ${tag.suppe}

        </div>

        <div class="ddhAllergene">

            ${tag.allergeneSuppe}

        </div>

    </div>

    <div class="ddhGericht">

        <div class="ddhGerichtTitel">

            🍮 Dessert

        </div>

        <div class="ddhGerichtText">

            ${tag.dessert}

        </div>

        <div class="ddhAllergene">

            ${tag.allergeneDessert}

        </div>

    </div>

</section>

`;

    });

    html += `

</div>

`;

    container.innerHTML = html;

    document
        .getElementById("btnDrucken")
        .disabled = false;

    this.allergeneErzeugen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 5/20
   DDH Design
========================================================== */

Speiseplaene.designLaden = function(){

    if(document.getElementById("ddhSpeiseplanStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhSpeiseplanStyle";

    style.innerHTML = `

.ddhSpeiseplan{

    width:100%;
    max-width:1500px;
    margin:30px auto;
    font-family:Arial,Helvetica,sans-serif;

}

.ddhTitel{

    background:white;
    border:3px solid #0F4C81;
    border-radius:14px;

    padding:30px;

    margin-bottom:30px;

    text-align:center;

}

.ddhLogo{

    font-size:28px;

    font-weight:bold;

    color:#0F4C81;

    letter-spacing:2px;

    margin-bottom:12px;

}

.ddhTitel h1{

    margin:0;

    font-size:40px;

    color:#0F4C81;

}

#ddhZeitraum{

    margin-top:12px;

    color:#666;

    font-size:18px;

}

.ddhTag{

    margin-bottom:30px;

    background:white;

    border-radius:14px;

    overflow:hidden;

    box-shadow:0 6px 20px rgba(0,0,0,.08);

}

.ddhTag h2{

    margin:0;

    background:#0F4C81;

    color:white;

    padding:16px 22px;

    font-size:28px;

}

.ddhGericht{

    padding:18px 24px;

    border-bottom:1px solid #ECECEC;

}

.ddhGericht:last-child{

    border-bottom:none;

}

.ddhGerichtTitel{

    font-size:22px;

    font-weight:bold;

    color:#0F4C81;

    margin-bottom:8px;

}

.ddhGerichtText{

    font-size:20px;

    line-height:1.5;

    color:#222;

}

.ddhAllergene{

    margin-top:8px;

    color:#888;

    font-size:15px;

}

.ddhLeer{

    text-align:center;

    padding:90px;

    color:#777;

}

.ddhLeer .icon{

    font-size:70px;

    margin-bottom:20px;

}

@media print{

    body{

        background:white;

    }

    #sidebar,
    #kopfbereich,
    .ddhToolbar{

        display:none !important;

    }

    #hauptbereich{

        margin:0 !important;

        padding:0 !important;

    }

    .ddhSpeiseplan{

        margin:0;

        width:100%;

    }

}

`;

    document.head.appendChild(style);
    
    this.allergeneDesign();

this.druckSeitenDesign();

};

/* ==========================================================
   Design automatisch laden
========================================================== */

const _initBlock1 = Speiseplaene.init;

Speiseplaene.init = function(){

    this.designLaden();

    _initBlock1.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 6/20
   Drucklayout
========================================================== */

Speiseplaene.zeitraum = {

    start: "",

    ende: "",

    kw: ""

};

Speiseplaene.zeitraumErmitteln = function(){

    if(this.daten.length < 2){

        return;

    }

    for(const zeile of this.daten){

        if(!zeile) continue;

        const text = zeile.join(" ");

        const treffer =
            text.match(
                /(\d{2}\.\d{2}\.\d{4}).*(\d{2}\.\d{2}\.\d{4})/
            );

        if(treffer){

            this.zeitraum.start = treffer[1];

            this.zeitraum.ende = treffer[2];

            break;

        }

    }

    const feld =
        document.getElementById("ddhZeitraum");

    if(feld){

        if(this.zeitraum.start){

            feld.innerHTML =

                this.zeitraum.start +

                " – " +

                this.zeitraum.ende;

        }

    }

};

/* ==========================================================
   Drucklayout vorbereiten
========================================================== */

Speiseplaene.druckVorbereiten = function(){

    document.body.classList.add(
        "ddhPrint"
    );

};

/* ==========================================================
   Drucken
========================================================== */

Speiseplaene.drucken = function(){

    this.zeitraumErmitteln();

    this.druckVorbereiten();

    setTimeout(()=>{

        window.print();

        document.body.classList.remove(
            "ddhPrint"
        );

    },300);

};

/* ==========================================================
   Druckbutton aktualisieren
========================================================== */

const _eventsBlock5 =
    Speiseplaene.events;

Speiseplaene.events = function(){

    _eventsBlock5.call(this);

    document
        .getElementById("btnDrucken")
        .onclick = ()=>{

            this.drucken();

        };

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 7/20
   Professionelles Layout
========================================================== */

Speiseplaene.karteErzeugen = function(tag){

    return `

<div class="ddhTagKarte">

    <div class="ddhTagHeader">

        ${tag.name}

    </div>

    <div class="ddhEintrag">

        <div class="ddhIcon">

            🍽

        </div>

        <div class="ddhInhalt">

            <div class="ddhUeberschrift">

                Menü I

            </div>

            <div class="ddhText">

                ${tag.menue1}

            </div>

            <div class="ddhAllergene">

                ${tag.allergene1}

            </div>

        </div>

    </div>

    <div class="ddhEintrag">

        <div class="ddhIcon">

            🥗

        </div>

        <div class="ddhInhalt">

            <div class="ddhUeberschrift">

                Menü II

            </div>

            <div class="ddhText">

                ${tag.menue2}

            </div>

            <div class="ddhAllergene">

                ${tag.allergene2}

            </div>

        </div>

    </div>

    <div class="ddhEintrag">

        <div class="ddhIcon">

            🍲

        </div>

        <div class="ddhInhalt">

            <div class="ddhUeberschrift">

                Suppe

            </div>

            <div class="ddhText">

                ${tag.suppe}

            </div>

            <div class="ddhAllergene">

                ${tag.allergeneSuppe}

            </div>

        </div>

    </div>

    <div class="ddhEintrag">

        <div class="ddhIcon">

            🍮

        </div>

        <div class="ddhInhalt">

            <div class="ddhUeberschrift">

                Dessert

            </div>

            <div class="ddhText">

                ${tag.dessert}

            </div>

            <div class="ddhAllergene">

                ${tag.allergeneDessert}

            </div>

        </div>

    </div>

</div>

`;

};

/* ==========================================================
   Layout ersetzen
========================================================== */

const _layoutBlock4 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    const container =
        document.getElementById("speiseplanContainer");

    if(!container){

        return;

    }

    let html = `

<div class="ddhSpeiseplan">

    <div class="ddhTitel">

        <div class="ddhLogo">

            DDH SERVICE GMBH

        </div>

        <h1>

            WOCHENSPEISEPLAN

        </h1>

        <div id="ddhZeitraum">

            Zeitraum wird geladen...

        </div>

    </div>

`;

    this.tage.forEach(tag=>{

        html += this.karteErzeugen(tag);

    });

    html += `

</div>

`;

    container.innerHTML = html;

    document
        .getElementById("btnDrucken")
        .disabled = false;

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 8/20
   A4 Querformat
========================================================== */

Speiseplaene.druckFormat = "A4-Landscape";

Speiseplaene.seitenFormat = function(){

    const style = document.createElement("style");

    style.id = "ddhPrintLayout";

    style.innerHTML = `

@page{

    size:A4 landscape;

    margin:12mm;

}

.ddhPrint .ddhSpeiseplan{

    width:100%;

    max-width:none;

    margin:0;

}

.ddhPrint .ddhTitel{

    border:2px solid #0F4C81;

    margin-bottom:18px;

}

.ddhPrint .ddhTagKarte{

    page-break-inside:avoid;

    margin-bottom:14px;

    border:1px solid #D8D8D8;

    border-radius:10px;

    overflow:hidden;

}

.ddhPrint .ddhTagHeader{

    background:#0F4C81;

    color:white;

    padding:8px 16px;

    font-size:20px;

    font-weight:bold;

}

.ddhPrint .ddhEintrag{

    display:flex;

    gap:16px;

    padding:12px 18px;

}

.ddhPrint .ddhIcon{

    font-size:24px;

    width:40px;

    text-align:center;

}

.ddhPrint .ddhUeberschrift{

    font-weight:bold;

    color:#0F4C81;

    margin-bottom:4px;

}

.ddhPrint .ddhText{

    font-size:17px;

    line-height:1.45;

}

.ddhPrint .ddhAllergene{

    margin-top:6px;

    font-size:13px;

    color:#777;

}

`;

    const alt =
        document.getElementById(
            "ddhPrintLayout"
        );

    if(alt){

        alt.remove();

    }

    document.head.appendChild(style);

};

/* ==========================================================
   Layout vorbereiten
========================================================== */

const _druckVorbereiten =
    Speiseplaene.druckVorbereiten;

Speiseplaene.druckVorbereiten = function(){

    this.seitenFormat();

    _druckVorbereiten.call(this);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 9/20
   Allergenseite
========================================================== */

Speiseplaene.allergeneErzeugen = function(){

    let html = `

<div id="ddhAllergeneSeite" class="ddhAllergeneSeite">

    <div class="ddhTitel">

        <div class="ddhLogo">

            DDH SERVICE GMBH

        </div>

        <h1>

            ALLERGENE

        </h1>

        <div>

            Übersicht aller Menüs

        </div>

    </div>

`;

    this.tage.forEach(tag=>{

        html += `

<div class="ddhAllergeneTag">

<h2>${tag.name}</h2>

<table class="ddhAllergeneTabelle">

<tr>
<th>Menü I</th>
<td>${tag.allergene1}</td>
</tr>

<tr>
<th>Menü II</th>
<td>${tag.allergene2}</td>
</tr>

<tr>
<th>Suppe</th>
<td>${tag.allergeneSuppe}</td>
</tr>

<tr>
<th>Dessert</th>
<td>${tag.allergeneDessert}</td>
</tr>

</table>

</div>

`;

    });

    html += `

</div>

`;

    document
        .getElementById("speiseplanContainer")
        .insertAdjacentHTML(
            "beforeend",
            html
        );

};
/* ==========================================================
   Block 9a
   Allergen CSS
========================================================== */

Speiseplaene.allergeneDesign = function(){

    if(document.getElementById("ddhAllergeneStyle")){

        return;

    }

    const style = document.createElement("style");

    style.id = "ddhAllergeneStyle";

    style.innerHTML = `

.ddhAllergeneSeite{

    page-break-before:always;

    margin-top:30px;

}

.ddhAllergeneTag{

    margin-bottom:28px;

}

.ddhAllergeneTag h2{

    color:#0F4C81;

    margin-bottom:10px;

}

.ddhAllergeneTabelle{

    width:100%;

    border-collapse:collapse;

}

.ddhAllergeneTabelle th{

    width:180px;

    text-align:left;

    padding:10px;

    background:#F4F6F8;

    border-bottom:1px solid #DDD;

}

.ddhAllergeneTabelle td{

    padding:10px;

    border-bottom:1px solid #DDD;

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 9b/20
   Vorschau abschließen
========================================================== */

const _layoutBlock7 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock7.call(this);

    /* Zeitraum einsetzen */

    this.zeitraumErmitteln();

    /* Allergenseite erzeugen */

    this.allergeneErzeugen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 10/20
   Kalenderwoche & Kopfbereich
========================================================== */

Speiseplaene.kalenderwocheBerechnen = function(datum){

    if(!datum) return "";

    const teile = datum.split(".");

    if(teile.length !== 3) return "";

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
        new Date(d.getFullYear(),0,1);

    return Math.ceil(

        (

            (

                (d - jahrStart)

                / 86400000

            ) + 1

        ) / 7

    );

};

/* ==========================================================
   Kopf aktualisieren
========================================================== */

Speiseplaene.kopfAktualisieren = function(){

    const feld =
        document.getElementById(
            "ddhZeitraum"
        );

    if(!feld) return;

    let text = "";

    if(this.zeitraum.start){

        const kw =
            this.kalenderwocheBerechnen(
                this.zeitraum.start
            );

        text =
            "KW " +

            kw +

            " • " +

            this.zeitraum.start +

            " - " +

            this.zeitraum.ende;

    }

    else{

        text =
            "Zeitraum unbekannt";

    }

    feld.innerHTML = text;

};

/* ==========================================================
   Zeitraum erweitern
========================================================== */

const _zeitraumErmitteln =
    Speiseplaene.zeitraumErmitteln;

Speiseplaene.zeitraumErmitteln = function(){

    _zeitraumErmitteln.call(this);

    this.kopfAktualisieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 11/20
   Druckseiten vorbereiten
========================================================== */

Speiseplaene.druckSeitenVorbereiten = function(){

    const speiseplan =
        document.querySelector(".ddhSpeiseplan");

    const allergene =
        document.getElementById(
            "ddhAllergeneSeite"
        );

    if(speiseplan){

        speiseplan.classList.add(
            "ddhSeiteSpeiseplan"
        );

    }

    if(allergene){

        allergene.classList.add(
            "ddhSeiteAllergene"
        );

    }

};

/* ==========================================================
   Drucklayout erweitern
========================================================== */

const _druckVorbereitenBlock8 =
    Speiseplaene.druckVorbereiten;

Speiseplaene.druckVorbereiten = function(){

    _druckVorbereitenBlock8.call(this);

    this.druckSeitenVorbereiten();

};
/* ==========================================================
   Block 11a
   Druckseiten CSS
========================================================== */

Speiseplaene.druckSeitenDesign = function(){

    if(document.getElementById(
        "ddhPrintPagesStyle"
    )){

        return;

    }

    const style =
        document.createElement("style");

    style.id =
        "ddhPrintPagesStyle";

    style.innerHTML = `

.ddhSeiteSpeiseplan{

    width:100%;

}

.ddhSeiteAllergene{

    page-break-before:always;

    width:100%;

}

@media print{

.ddhSeiteSpeiseplan{

    page-break-after:always;

}

.ddhSeiteAllergene{

    page-break-before:always;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 12/20
   Automatische Größenanpassung
========================================================== */

Speiseplaene.layoutOptimieren = function(){

    const texte = document.querySelectorAll(
        ".ddhText"
    );

    texte.forEach(text=>{

        const laenge =
            text.innerText.trim().length;

        if(laenge < 40){

            text.style.fontSize = "22px";
            text.style.lineHeight = "1.4";

        }

        else if(laenge < 80){

            text.style.fontSize = "19px";
            text.style.lineHeight = "1.45";

        }

        else if(laenge < 120){

            text.style.fontSize = "17px";
            text.style.lineHeight = "1.5";

        }

        else{

            text.style.fontSize = "15px";
            text.style.lineHeight = "1.55";

        }

    });

};
/* ==========================================================
   Block 12a
   Kartenhöhe angleichen
========================================================== */

Speiseplaene.kartenOptimieren = function(){

    const karten =
        document.querySelectorAll(
            ".ddhTagKarte"
        );

    karten.forEach(karte=>{

        karte.style.minHeight =
            "320px";

    });

};
/* ==========================================================
   Block 12b
   Layout abschließen
========================================================== */

const _layoutBlock9 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock9.call(this);

    this.layoutOptimieren();

    this.kartenOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 13/20
   Professioneller Kopfbereich
========================================================== */

Speiseplaene.kopfbereichErzeugen = function(){

    const kopf =
        document.querySelector(".ddhTitel");

    if(!kopf){

        return;

    }

    kopf.innerHTML = `

<div class="ddhKopf">

    <div class="ddhKopfLinks">

        <div class="ddhFirmenname">

            DDH SERVICE GMBH

        </div>

        <div class="ddhUntertitel">

            Wochenspeiseplan

        </div>

    </div>

    <div class="ddhKopfRechts">

        <div class="ddhKW">

            ${this.zeitraum.kw ? "KW " + this.zeitraum.kw : ""}

        </div>

        <div class="ddhDatum">

            ${this.zeitraum.start}

            ${this.zeitraum.start ? " - " : ""}

            ${this.zeitraum.ende}

        </div>

    </div>

</div>

`;

};
/* ==========================================================
   Block 13a
   Kopfbereich Design
========================================================== */

Speiseplaene.kopfbereichDesign = function(){

    if(document.getElementById("ddhHeaderStyle")){

        return;

    }

    const style =
        document.createElement("style");

    style.id = "ddhHeaderStyle";

    style.innerHTML = `

.ddhKopf{

    display:flex;

    justify-content:space-between;

    align-items:center;

    gap:20px;

}

.ddhKopfLinks{

    display:flex;

    flex-direction:column;

}

.ddhFirmenname{

    font-size:28px;

    font-weight:bold;

    color:#0F4C81;

    letter-spacing:2px;

}

.ddhUntertitel{

    font-size:18px;

    color:#666;

    margin-top:6px;

}

.ddhKopfRechts{

    text-align:right;

}

.ddhKW{

    font-size:24px;

    font-weight:bold;

    color:#0F4C81;

}

.ddhDatum{

    margin-top:6px;

    color:#555;

    font-size:17px;

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 13b
   Kopfbereich automatisch erzeugen
========================================================== */

const _layoutBlock12 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock12.call(this);

    this.kopfbereichDesign();

    this.kopfbereichErzeugen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 14/20
   Druckoptimierung
========================================================== */

Speiseplaene.druckOptimieren = function(){

    const karten =
        document.querySelectorAll(".ddhTagKarte");

    karten.forEach(karte=>{

        karte.style.pageBreakInside = "avoid";
        karte.style.breakInside = "avoid";

    });

    const eintraege =
        document.querySelectorAll(".ddhEintrag");

    eintraege.forEach(eintrag=>{

        eintrag.style.pageBreakInside = "avoid";
        eintrag.style.breakInside = "avoid";

    });

};
/* ==========================================================
   Block 14a
   Druck CSS
========================================================== */

Speiseplaene.druckCSS = function(){

    if(document.getElementById("ddhDruckOptimierung")){

        return;

    }

    const style =
        document.createElement("style");

    style.id = "ddhDruckOptimierung";

    style.innerHTML = `

@media print{

body{

    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;

}

.ddhTagKarte{

    break-inside:avoid;

    page-break-inside:avoid;

}

.ddhEintrag{

    break-inside:avoid;

    page-break-inside:avoid;

}

.ddhGerichtText{

    word-break:break-word;

}

.ddhAllergene{

    font-size:12px;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 14b
   Druckoptimierung aktivieren
========================================================== */

const _layoutBlock13 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock13.call(this);

    this.druckCSS();

    this.druckOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 15/20
   Fußzeile
========================================================== */

Speiseplaene.fusszeileErzeugen = function(){

    const speiseplan =
        document.querySelector(".ddhSpeiseplan");

    if(!speiseplan){

        return;

    }

    const heute = new Date();

    const datum =
        heute.toLocaleDateString("de-DE");

    const html = `

<div class="ddhFusszeile">

    <div>

        DDH Studio Enterprise
        · Speisepläne v1.0

    </div>

    <div>

        Erstellt am ${datum}

    </div>

</div>

`;

    speiseplan.insertAdjacentHTML(

        "beforeend",

        html

    );

};
/* ==========================================================
   Block 15a
   Fußzeile Design
========================================================== */

Speiseplaene.fusszeileDesign = function(){

    if(document.getElementById(
        "ddhFooterStyle"
    )){

        return;

    }

    const style =
        document.createElement("style");

    style.id = "ddhFooterStyle";

    style.innerHTML = `

.ddhFusszeile{

    margin-top:40px;

    padding-top:15px;

    border-top:2px solid #0F4C81;

    display:flex;

    justify-content:space-between;

    align-items:center;

    font-size:13px;

    color:#666;

}

@media print{

.ddhFusszeile{

    position:fixed;

    left:0;

    right:0;

    bottom:8mm;

    font-size:11px;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 15b
   Fußzeile automatisch erzeugen
========================================================== */

const _layoutBlock14 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock14.call(this);

    this.fusszeileDesign();

    this.fusszeileErzeugen();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 16/20
   Seitennummern & Druckkompatibilität
========================================================== */

Speiseplaene.seitenInformation = function(){

    const speiseplan =
        document.querySelector(".ddhSpeiseplan");

    if(!speiseplan){

        return;

    }

    const html = `

<div class="ddhSeitenInfo">

    <div>

        Seite 1 von 2

    </div>

</div>

`;

    speiseplan.insertAdjacentHTML(
        "beforeend",
        html
    );

    const allergene =
        document.getElementById(
            "ddhAllergeneSeite"
        );

    if(allergene){

        allergene.insertAdjacentHTML(

            "beforeend",

            `

<div class="ddhSeitenInfo">

    <div>

        Seite 2 von 2

    </div>

</div>

`

        );

    }

};
/* ==========================================================
   Block 16a
   Seiteninfo Design
========================================================== */

Speiseplaene.seitenInfoDesign = function(){

    if(document.getElementById(
        "ddhSeitenInfoStyle"
    )){

        return;

    }

    const style =
        document.createElement("style");

    style.id =
        "ddhSeitenInfoStyle";

    style.innerHTML = `

.ddhSeitenInfo{

    margin-top:20px;

    text-align:right;

    color:#777;

    font-size:12px;

}

@media print{

.ddhSeitenInfo{

    position:fixed;

    right:8mm;

    bottom:3mm;

    font-size:10px;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 16b
   Browser-Kompatibilität
========================================================== */

Speiseplaene.browserVorbereiten = function(){

    document.body.classList.add(
        "ddhBrowserPrint"
    );

};
/* ==========================================================
   Block 16c
   Automatisch ausführen
========================================================== */

const _layoutBlock15 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock15.call(this);

    this.seitenInfoDesign();

    this.seitenInformation();

    this.browserVorbereiten();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 17/20
   Druckvorschau optimieren
========================================================== */

Speiseplaene.vorschauOptimieren = function(){

    const karten =
        document.querySelectorAll(".ddhTagKarte");

    karten.forEach(karte=>{

        /* gleiche Innenabstände */

        karte.style.padding = "0";

        /* Kartenbreite */

        karte.style.width = "100%";

        /* runde Ecken */

        karte.style.borderRadius = "12px";

    });

    const texte =
        document.querySelectorAll(".ddhText");

    texte.forEach(text=>{

        /* überlange Wörter umbrechen */

        text.style.wordBreak = "break-word";

        text.style.hyphens = "auto";

    });

};
/* ==========================================================
   Block 17a
   Druckvorschau CSS
========================================================== */

Speiseplaene.vorschauDesign = function(){

    if(document.getElementById(
        "ddhPreviewStyle"
    )){

        return;

    }

    const style =
        document.createElement("style");

    style.id = "ddhPreviewStyle";

    style.innerHTML = `

.ddhTagKarte{

    transition:.25s;

}

.ddhTagKarte:hover{

    transform:translateY(-2px);

    box-shadow:0 10px 24px rgba(0,0,0,.10);

}

.ddhText{

    white-space:pre-line;

}

.ddhEintrag{

    align-items:flex-start;

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 17b
   Automatisch aktivieren
========================================================== */

const _layoutBlock16 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock16.call(this);

    this.vorschauDesign();

    this.vorschauOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 18/20
   Intelligente Menüdarstellung
========================================================== */

Speiseplaene.leereElementeEntfernen = function(){

    document
        .querySelectorAll(".ddhGericht, .ddhEintrag")
        .forEach(eintrag=>{

            const text =
                eintrag.querySelector(".ddhText");

            if(!text){

                return;

            }

            const inhalt =
                text.textContent.trim();

            if(inhalt === ""){

                eintrag.style.display = "none";

            }

        });

};
/* ==========================================================
   Block 18a
   Gerichte optisch ausgleichen
========================================================== */

Speiseplaene.gerichteOptimieren = function(){

    document
        .querySelectorAll(".ddhTagKarte")
        .forEach(karte=>{

            const sichtbar =
                karte.querySelectorAll(
                    ".ddhEintrag:not([style*='display: none'])"
                );

            if(sichtbar.length <= 2){

                karte.style.minHeight = "220px";

            }

            else if(sichtbar.length == 3){

                karte.style.minHeight = "280px";

            }

            else{

                karte.style.minHeight = "340px";

            }

        });

};
/* ==========================================================
   Block 18b
   Automatisch aktivieren
========================================================== */

const _layoutBlock17 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock17.call(this);

    this.leereElementeEntfernen();

    this.gerichteOptimieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 19/20
   Finale Druckvorbereitung
========================================================== */

Speiseplaene.finalisieren = function(){

    /* Versionsnummer */

    const version =
        document.createElement("div");

    version.className =
        "ddhVersion";

    version.innerHTML =

        "DDH Studio Enterprise · Speisepläne v1.0";

    const speiseplan =
        document.querySelector(".ddhSpeiseplan");

    if(speiseplan){

        speiseplan.appendChild(version);

    }

    /* Druckbutton aktivieren */

    const btn =
        document.getElementById(
            "btnDrucken"
        );

    if(btn){

        btn.disabled = false;

    }

};
/* ==========================================================
   Block 19a
   Versionsanzeige
========================================================== */

Speiseplaene.versionDesign = function(){

    if(document.getElementById(
        "ddhVersionStyle"
    )){

        return;

    }

    const style =
        document.createElement("style");

    style.id =
        "ddhVersionStyle";

    style.innerHTML = `

.ddhVersion{

    margin-top:30px;

    text-align:center;

    font-size:12px;

    color:#999;

}

@media print{

.ddhVersion{

    font-size:10px;

    color:#777;

}

}

`;

    document.head.appendChild(style);

};
/* ==========================================================
   Block 19b
   Abschluss
========================================================== */

const _layoutBlock18 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock18.call(this);

    this.versionDesign();

    this.finalisieren();

};
/* ==========================================================
   DDH Studio Enterprise
   Modul: Speisepläne
   Version: 1.0
   Block: 20/20
   Finalisierung
========================================================== */

Speiseplaene.aktualisieren = function(){

    try{

        this.zeitraumErmitteln();

    }catch(e){}

    try{

        this.kopfAktualisieren();

    }catch(e){}

    try{

        this.layoutOptimieren();

    }catch(e){}

    try{

        this.kartenOptimieren();

    }catch(e){}

    try{

        this.leereElementeEntfernen();

    }catch(e){}

    try{

        this.gerichteOptimieren();

    }catch(e){}

    try{

        this.druckOptimieren();

    }catch(e){}

    try{

        this.fusszeileErzeugen();

    }catch(e){}

    try{

        this.seitenInformation();

    }catch(e){}

    try{

        this.finalisieren();

    }catch(e){}

};

/* ==========================================================
   Layout endgültig abschließen
========================================================== */

const _layoutBlock19 =
    Speiseplaene.layoutErzeugen;

Speiseplaene.layoutErzeugen = function(){

    _layoutBlock19.call(this);

    this.aktualisieren();

};

console.log(
    "DDH Studio Enterprise - Speisepläne Version 1.0 geladen."
);