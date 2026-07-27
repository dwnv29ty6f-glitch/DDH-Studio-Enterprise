"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Speisepläne
================================================
*/

const Speiseplaene = {

    daten: [],

anzeigen() {

    this.daten = Speicher.laden(

        "ddh_speiseplaene",

        []

    );

    let html = `

<div
    id="seite-speiseplaene"
    class="seite aktiv">

    <div class="karte">

        <h1>

            Speisepläne

        </h1>

        <p>

            Verwaltung aller Speisepläne

        </p>

        <div class="toolbar">

            <input
                id="speiseplanSuche"
                type="text"
                placeholder="Speiseplan suchen...">

            <button
                id="btnNeuerSpeiseplan"
                class="hauptButton">

                ➕ Neuer Speiseplan

            </button>

        </div>

    </div>

    <div class="karte">

        <h2>

            📥 Selly-Speiseplan importieren

        </h2>

        <p>

            Importiere einen mit Selly erstellten Speiseplan als PDF.

        </p>

        <div class="toolbar">

          <input
    id="sellyHtml"
    type="file"
    accept=".html,.htm">

            <button
                id="btnImportSelly"
                class="hauptButton">

                📥 Importieren

            </button>

        </div>

        <div
            id="sellyStatus"
            class="infoBox">

            Keine PDF ausgewählt.

        </div>

    </div>

    <div class="karte">

        <table>

            <thead>

                <tr>

                    <th>Zeitraum</th>

                    <th>Bezeichnung</th>

                    <th>Erstellt am</th>

                    <th>Aktionen</th>

                </tr>

            </thead>

            <tbody>

`;

    if (this.daten.length === 0) {

        html += `

<tr>

    <td colspan="4">

        Noch keine Speisepläne vorhanden.

    </td>

</tr>

`;

    }

    this.daten.forEach(plan => {

        html += `

<tr>

    <td>${plan.zeitraum || "-"}</td>

    <td>${plan.name || "-"}</td>

    <td>${plan.datum || "-"}</td>

    <td>

       <button
    class="sekundenButton"
    onclick="Speiseplaene.oeffnen(${this.daten.indexOf(plan)})">

    Öffnen

</button>

    </td>

</tr>

`;

    });

    html += `

            </tbody>

        </table>

    </div>

</div>

`;

    DOM.html(

        "inhalt",

        html

    );

    const htmlDatei = DOM.id("sellyHtml");
    const status = DOM.id("sellyStatus");
    const button = DOM.id("btnImportSelly");

    if (button) {

    button.onclick = async () => {
        
        try {

        if (!htmlDatei.files.length) {

    status.innerHTML =

        "⚠️ Bitte zuerst eine HTML-Datei auswählen.";

    return;

}

        status.innerHTML =

    "⏳ HTML wird geladen...";

const datei =

    htmlDatei.files[0];

const inhalt =

    await datei.text();
    
    const parser = new DOMParser();

const dokument = parser.parseFromString(

    inhalt,

    "text/html"

);

const titel =

    dokument.querySelector("h1");

let name =

    "Importierter Speiseplan";

if (titel) {

    name =

        titel.textContent.trim();

}

let zeitraum =

    "KW ?";

const treffer =

    name.match(/KW\s*\d+/i);

if (treffer) {

    zeitraum =

        treffer[0];

}

const tabellen =

    dokument.querySelectorAll("table");

if (tabellen.length === 0) {

    throw "Keine Tabelle gefunden.";

}

const zeilen =

    tabellen[0].querySelectorAll("tr");

const speiseplan = [];

for (

    let i = 1;

    i < zeilen.length;

    i++

) {

    const spalten =

        zeilen[i].querySelectorAll("td");

    if (spalten.length < 4) {

        continue;

    }

    speiseplan.push({

        tag:

            spalten[0].textContent.trim(),

        menue1:

            spalten[1].textContent.trim(),

        menue2:

            spalten[2].textContent.trim(),

        dessert:

            spalten[3].textContent.trim()

    });

}

status.innerHTML = "";

speiseplan.forEach(tag => {

    status.innerHTML +=

        "<b>" + tag.tag + "</b><br>" +

        tag.menue1 + "<br>" +

        tag.menue2 + "<br>" +

        tag.dessert + "<hr>";

});

this.daten.push({

    zeitraum: zeitraum,

    name: name,

    datum: new Date().toLocaleDateString("de-DE"),

    tage: speiseplan

});

this.speichern();

this.anzeigen();

}

        catch (fehler) {

            status.innerHTML =

                "❌ Fehler:<br><br>" +

                fehler;

        }

    };

}

},
    oeffnen(index) {

    const plan =

        this.daten[index];

    let html = `

<div class="karte">

<h1>${plan.name}</h1>

<p><strong>${plan.zeitraum}</strong></p>

<div class="toolbar">

<button
class="hauptButton"
onclick="Speiseplaene.anzeigen()">

⬅ Zurück

</button>

<button
class="hauptButton"
onclick="window.print()">

🖨 Drucken

</button>

<button
class="hauptButton"
onclick="Speiseplaene.bearbeiten(${index})">

✏ Bearbeiten

</button>

<button
class="hauptButton">

🗑 Löschen

</button>

</div>

<br>

<table>

<thead>

<tr>

<th>Tag</th>

<th>Menü 1</th>

<th>Menü 2</th>

<th>Dessert</th>

</tr>

</thead>

<tbody>

`;

    plan.tage.forEach(tag => {

        html += `

<tr>

<td>${tag.tag}</td>

<td>${tag.menue1}</td>

<td>${tag.menue2}</td>

<td>${tag.dessert}</td>

</tr>

`;

    });

    html += `

</tbody>

</table>

</div>

`;

    DOM.html(

        "inhalt",

        html

    );

},

bearbeiten(index) {

    const plan =

    this.daten[index];

let html = `

<div class="karte">

<h1>Speiseplan bearbeiten</h1>

<p><strong>${plan.name}</strong></p>

`;

}

};