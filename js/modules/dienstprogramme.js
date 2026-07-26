"use strict";

/*
=========================================
DDH Studio Enterprise
Dienstprogramme
=========================================
*/

const Dienstprogramme = {

    anzeigen() {

        const programme = [

            {
                icon: "📁",
                name: "OneDrive",
                beschreibung: "Dateiverwaltung",
                url: "https://onedrive.live.com"
            },

            {
                icon: "📄",
                name: "Word Online",
                beschreibung: "Dokumente erstellen",
                url: "https://www.office.com/launch/word"
            },

            {
                icon: "📊",
                name: "Excel Online",
                beschreibung: "Tabellen bearbeiten",
                url: "https://www.office.com/launch/excel"
            },

            {
                icon: "📽",
                name: "PowerPoint Online",
                beschreibung: "Präsentationen erstellen",
                url: "https://www.office.com/launch/powerpoint"
            },

            {
                icon: "📝",
                name: "OneNote",
                beschreibung: "Notizen verwalten",
                url: "https://www.onenote.com"
            }

        ];

        let html = `

<div class="bestellungen">

<div class="welcomeCard">

<h1>🛠 Dienstprogramme</h1>

<p>

Programme für den Arbeitsalltag

</p>

</div>

<div class="karte">

<div class="toolbar">

<input

id="dienstprogrammeSuche"

type="text"

placeholder="🔍 Programm suchen...">

</div>

</div>

<div

id="dienstprogrammeListe"

class="lieferantenGrid">

`;

        programme.forEach(programm => {

            html += `

<div

class="lieferantenKarte"

data-name="${programm.name.toLowerCase()}">

<div class="lieferantenIcon">

${programm.icon}

</div>

<div class="lieferantenInfo">

<div class="lieferantenName">

${programm.name}

</div>

<div class="lieferantenText">

${programm.beschreibung}

</div>

<div class="lieferantenStatus">

🟢 Bereit

</div>

</div>

<button

class="hauptButton"

onclick="window.open('${programm.url}','_blank')">

➜ Öffnen

</button>

</div>

`;

        });

        html += `

</div>

</div>

`;

        DOM.html("inhalt", html);

        const suche = DOM.id("dienstprogrammeSuche");

        if (suche) {

            suche.oninput = () => {

                const text = suche.value.toLowerCase();

                document
                    .querySelectorAll(".lieferantenKarte")
                    .forEach(karte => {

                        karte.style.display =
                            karte.dataset.name.includes(text)
                            ? ""
                            : "none";

                    });

            };

        }

    }

};