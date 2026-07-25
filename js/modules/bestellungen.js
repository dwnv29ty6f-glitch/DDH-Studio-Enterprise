"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Bestellungen
================================================
*/

const Bestellungen = {

    daten: [],

    anzeigen() {

    const lieferanten = [

        {
            id: "selly",
            icon: "🍽",
            name: "Selly",
            beschreibung: "Digitales Bestellsystem",
            url: "https://app.selly.biz"
        },

        {
            id: "chefsculinar",
            icon: "🥩",
            name: "CHEFS CULINAR",
            beschreibung: "Lebensmittelgroßhandel",
            url: "https://www.chefsculinar.de"
        },

        {
            id: "transgourmet",
            icon: "🥬",
            name: "Transgourmet",
            beschreibung: "Lebensmittelgroßhandel",
            url: "https://shop.transgourmet.de"
        },

        {
            id: "edeka",
            icon: "🛒",
            name: "EDEKA Foodservice",
            beschreibung: "Lebensmittelgroßhandel",
            url: "https://www.edeka-foodservice.de"
        }

    ];

    let html = `

<div class="bestellungen">

    <div class="welcomeCard">

        <div>

            <h1>🛒 Bestellungen</h1>

            <p>

                Bestellsysteme der DDH Service GmbH

            </p>

        </div>

    </div>

    <div class="karte">

        <div class="toolbar">

            <input

                id="lieferantSuche"

                type="text"

                placeholder="🔍 Lieferant suchen...">

            <button

                id="btnLieferantNeu"

                class="hauptButton">

                ➕ Lieferant

            </button>

        </div>

    </div>

    <div

        id="lieferantenListe"

        class="lieferantenGrid">

`;

    lieferanten.forEach(lieferant => {

        html += `

<div

    class="lieferantenKarte"

    data-name="${lieferant.name.toLowerCase()}">

    <div class="lieferantenIcon">

        ${lieferant.icon}

    </div>

    <div class="lieferantenInfo">

        <div class="lieferantenName">

            ${lieferant.name}

        </div>

        <div class="lieferantenText">

            ${lieferant.beschreibung}

        </div>

        <div class="lieferantenStatus">

            🟢 Online

        </div>

    </div>

    <button

        class="hauptButton btnLieferant"

        data-url="${lieferant.url}">

        ➜ Öffnen

    </button>

</div>

`;

    });

    html += `

    </div>

</div>

`;

    DOM.html(

        "inhalt",

        html

    );

    document

        .querySelectorAll(".btnLieferant")

        .forEach(button => {

            button.onclick = () => {

                window.open(

                    button.dataset.url,

                    "_blank"

                );

            };

        });

    const suche = DOM.id("lieferantSuche");

    if (suche) {

        suche.oninput = () => {

            const text =

                suche.value.toLowerCase();

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

},

    speichern() {

        Speicher.speichern(

            "ddh_bestellungen",

            this.daten

        );

    }

};