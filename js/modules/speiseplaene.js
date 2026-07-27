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
            class="sekundenButton">

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

const tabellen = dokument.querySelectorAll("table");

const zeilen =

    tabellen[0].querySelectorAll("tr");
    
    const ersteZeile =

    zeilen[1].querySelectorAll("td");
    
status.innerHTML =

    "Tag: " +

    ersteZeile[0].textContent +

    "<br>Menü 1: " +

    ersteZeile[1].textContent +

    "<br>Menü 2: " +

    ersteZeile[2].textContent +

    "<br>Dessert: " +

    ersteZeile[3].textContent;
    
     }

        catch (fehler) {

            status.innerHTML =

                "❌ Fehler:<br><br>" +

                fehler;

        }

    };

}

},
    speichern() {

        Speicher.speichern(

            "ddh_speiseplaene",

            this.daten

        );

    }

};