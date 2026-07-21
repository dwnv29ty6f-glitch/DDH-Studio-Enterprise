"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Dashboard
===========================================
*/

const Dashboard = {

    anzeigen() {

        const inhalt = DOM.id("inhalt");

        if (!inhalt) {

            return;

        }

        inhalt.innerHTML = `

        <div class="dashboard">

            <div class="karte">

                <h1>DDH Studio Enterprise</h1>

                <p>Willkommen zurück.</p>

            </div>

            <div class="dashboardKacheln">

                <div class="kachel">

                    <div class="titel">

                        Mitarbeiter

                    </div>

                    <div class="wert">

                        ${mitarbeiter.length}

                    </div>

                </div>

                <div class="kachel">

                    <div class="titel">

                        Termine

                    </div>

                    <div class="wert">

                        ${termine.length}

                    </div>

                </div>

                <div class="kachel">

                    <div class="titel">

                        Aufgaben

                    </div>

                    <div class="wert">

                        ${todos.length}

                    </div>

                </div>

                <div class="kachel">

                    <div class="titel">

                        Schichten

                    </div>

                    <div class="wert">

                        ${schichten.length}

                    </div>

                </div>

            </div>

            <div class="karte">

                <h2>Schnellzugriff</h2>

                <button
                    class="hauptButton"
                    onclick="Navigation.oeffnen('mitarbeiter')">

                    Mitarbeiter öffnen

                </button>

            </div>

        </div>

        `;

    }

};