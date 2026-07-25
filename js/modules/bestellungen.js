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

    const karte =

        button.closest(".lieferantenKarte");

    const name =

        karte.querySelector(".lieferantenName").textContent;

    this.lieferantOeffnen(

        name,

        button.dataset.url

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

lieferantOeffnen(name, url) {

    DOM.html(

        "inhalt",

        `

<div class="bestellungStart">

    <div class="bestellungStartLogo">

        🛒

    </div>

    <h1>

        ${name}

    </h1>

    <p>

        Verbindung wird hergestellt...

    </p>

    <div class="ladebalken">

        <div class="ladebalkenFuellung"></div>

    </div>

    <div class="ladeText">

        DDH Studio Enterprise startet den Lieferanten.

    </div>

</div>

`

    );

    setTimeout(() => {

        window.open(

            url,

            "_blank"

        );

        this.anzeigen();

    }, 1200);

},

    speichern() {

        Speicher.speichern(

            "ddh_bestellungen",

            this.daten

        );

    }

};