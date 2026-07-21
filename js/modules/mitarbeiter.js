"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Mitarbeiterverwaltung
// ==========================================

const mitarbeiterListe =
document.getElementById("mitarbeiterListe");

const dashboardMitarbeiter =
document.getElementById("dashboardMitarbeiter");

let mitarbeiter =
JSON.parse(
localStorage.getItem("ddhMitarbeiter")
) || [];

function mitarbeiterSpeichern(){

    localStorage.setItem(
        "ddhMitarbeiter",
        JSON.stringify(mitarbeiter)
    );

}

function mitarbeiterAnzeigen(){

    if(!mitarbeiterListe){
        return;
    }

    mitarbeiterListe.innerHTML = "";

    mitarbeiter.forEach((person,index)=>{

        const karte =
        document.createElement("div");

        karte.className = "mitarbeiterKarte";

        karte.innerHTML = `
            <div class="mitarbeiterName">
                ${person.name}
            </div>

            <div class="mitarbeiterButtons">

                <button
                onclick="mitarbeiterBearbeiten(${index})">
                ✏️
                </button>

                <button
                onclick="mitarbeiterLoeschen(${index})">
                🗑️
                </button>

            </div>
        `;

        mitarbeiterListe.appendChild(karte);

    });

    if(dashboardMitarbeiter){

        dashboardMitarbeiter.textContent =
        mitarbeiter.length;

    }

}