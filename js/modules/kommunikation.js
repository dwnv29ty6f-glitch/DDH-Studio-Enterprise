"use strict";

/*
=========================================
DDH Studio Enterprise
Kommunikation
=========================================
*/

const Kommunikation = {

    anzeigen() {

        const programme = [

            {
    icon: "📊",
    name: "Überblick",
    text: "Interne Kommunikation",
    url: "https://app.uberblick.io"
},

            {
                icon: "📧",
                name: "Outlook",
                text: "E-Mail",
                url: "https://outlook.office.com"
            },

            {
                icon: "💬",
                name: "Microsoft Teams",
                text: "Chats & Besprechungen",
                url: "https://teams.microsoft.com"
            }

        ];

        let html = `

<div class="bestellungen">

    <div class="welcomeCard">

        <h1>💬 Kommunikation</h1>

        <p>

            Kommunikationsprogramme der DDH Service GmbH

        </p>

    </div>

    <div class="lieferantenGrid">

`;

        programme.forEach(programm => {

            html += `

<div class="lieferantenKarte">

    <div class="lieferantenIcon">

        ${programm.icon}

    </div>

    <div class="lieferantenInfo">

        <div class="lieferantenName">

            ${programm.name}

        </div>

        <div class="lieferantenText">

            ${programm.text}

        </div>

        <div class="lieferantenStatus">

            🟢 Online

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

        DOM.html(

            "inhalt",

            html

        );

    }

};