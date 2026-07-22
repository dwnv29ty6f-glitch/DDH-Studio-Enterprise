"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Schichtplan
================================================
*/

const Schichtplan = {

    aktuellesJahr:

        new Date().getFullYear(),

    aktuellerMonat:

        new Date().getMonth(),

    mitarbeiter: [],

    schichten: [],

    anzeigen() {

        this.mitarbeiter = Speicher.laden(

            CONFIG.speicher.mitarbeiter,

            []

        );

        this.schichten = Speicher.laden(

            CONFIG.speicher.schichtplan,

            []

        );

        DOM.html(

            "inhalt",

            this.html()

        );

        this.kopf();

        this.tabelle();

    },

    html() {

        return `

<div
    id="seite-schichtplan"
    class="seite aktiv">

    <div class="karte">

        <div class="flexZwischen">

            <div>

                <h1>

                    Schichtplan

                </h1>

                <p>

                    Microsoft Teams Ansicht

                </p>

            </div>

            <div class="toolbar">

                <button
                    id="monatZurueck"
                    class="hauptButton">

                    ◀

                </button>

                <button
                    id="monatVor"
                    class="hauptButton">

                    ▶

                </button>

            </div>

        </div>

    </div>

    <div
        id="schichtplanKopf"
        class="karte">

    </div>

    <div
        id="schichtplanTabelle"
        class="karte">

    </div>

</div>

`;

    },
        kopf() {

        const monate = [

            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"

        ];

        DOM.html(

            "schichtplanKopf",

            `

<div class="flexZwischen">

    <h2>

        ${monate[this.aktuellerMonat]}
        ${this.aktuellesJahr}

    </h2>

    <div>

        Mitarbeiter:

        ${this.mitarbeiter.length}

    </div>

</div>

`

        );

    },

    tabelle() {

        const tageImMonat = new Date(

            this.aktuellesJahr,

            this.aktuellerMonat + 1,

            0

        ).getDate();

        let html = `

<table class="schichtplanTabelle">

<thead>

<tr>

<th>

Mitarbeiter

</th>

`;

        for (

            let tag = 1;

            tag <= tageImMonat;

            tag++

        ) {

            html += `

<th>

${tag}

</th>

`;

        }

        html += `

</tr>

</thead>

<tbody>

`;
        if (this.mitarbeiter.length === 0) {

            html += `

<tr>

    <td colspan="${tageImMonat + 1}">

        Noch keine Mitarbeiter vorhanden.

    </td>

</tr>

`;

        }

        this.mitarbeiter.forEach(mitarbeiter => {

            html += `

<tr>

<td>

<strong>

${mitarbeiter.name || "-"}

</strong>

</td>

`;

            for (

                let tag = 1;

                tag <= tageImMonat;

                tag++

            ) {

                html += `

<td
class="schichtZelle">

-

</td>

`;

            }

            html += `

</tr>

`;

        });

        html += `

</tbody>

</table>

`;

        DOM.html(

            "schichtplanTabelle",

            html

        );

    },
        speichern() {

        Speicher.speichern(

            CONFIG.speicher.schichtplan,

            this.schichten

        );

    },

    vorherigerMonat() {

        this.aktuellerMonat--;

        if (this.aktuellerMonat < 0) {

            this.aktuellerMonat = 11;

            this.aktuellesJahr--;

        }

        this.anzeigen();

    },

    naechsterMonat() {

        this.aktuellerMonat++;

        if (this.aktuellerMonat > 11) {

            this.aktuellerMonat = 0;

            this.aktuellesJahr++;

        }

        this.anzeigen();

    },

    events() {

        const btnZurueck = document.getElementById(

            "monatZurueck"

        );

        const btnVor = document.getElementById(

            "monatVor"

        );

        if (btnZurueck) {

            btnZurueck.addEventListener(

                "click",

                () => this.vorherigerMonat()

            );

        }

        if (btnVor) {

            btnVor.addEventListener(

                "click",

                () => this.naechsterMonat()

            );

        }

    }

};