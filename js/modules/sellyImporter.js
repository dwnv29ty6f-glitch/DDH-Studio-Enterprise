"use strict";

/*
=========================================
DDH Studio Enterprise
Selly Importer
=========================================
*/

const SellyImporter = {

    datei: null,

    anzeigen() {

        let html = `

<div class="karte">

<h2>

📥 DDH Selly Importer

</h2>

<p>

Importiere einen Speiseplan aus Selly.

</p>

<div class="toolbar">

<input
id="sellyDatei"
type="file"
accept=".pdf">

<button
id="btnSellyImport"
class="hauptButton">

📥 Importieren

</button>

</div>

<div
id="sellyImportStatus"
class="infoBox">

Keine Datei ausgewählt.

</div>

</div>

`;

        return html;

    },

    initialisieren() {

        const datei = DOM.id(

            "sellyDatei"

        );

        const button = DOM.id(

            "btnSellyImport"

        );

        const status = DOM.id(

            "sellyImportStatus"

        );

        if (!button) {

            return;

        }

        button.onclick = () => {

            if (

                !datei.files.length

            ) {

                status.innerHTML =

                    "⚠️ Bitte zuerst eine PDF auswählen.";

                return;

            }

            this.datei =

                datei.files[0];

            status.innerHTML =

                "✅ " +

                this.datei.name +

                " wurde ausgewählt.";

        };

    }

};