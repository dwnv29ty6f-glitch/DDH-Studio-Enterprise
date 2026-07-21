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
function mitarbeiterHinzufuegen(){

    const name = prompt("Name des Mitarbeiters:");

    if(!name){
        return;
    }

    const neuerName = name.trim();

    if(neuerName===""){
        return;
    }

    if(
        mitarbeiter.some(m =>
            m.name.toLowerCase() === neuerName.toLowerCase()
        )
    ){
        alert("Mitarbeiter existiert bereits.");
        return;
    }

    mitarbeiter.push({
        name: neuerName
    });

    mitarbeiterSpeichern();

    mitarbeiterAnzeigen();

}

function mitarbeiterBearbeiten(index){

    const neu = prompt(
        "Neuer Name:",
        mitarbeiter[index].name
    );

    if(!neu){
        return;
    }

    mitarbeiter[index].name = neu.trim();

    mitarbeiterSpeichern();

    mitarbeiterAnzeigen();

}

function mitarbeiterLoeschen(index){

    if(
        !confirm(
            mitarbeiter[index].name +
            " wirklich löschen?"
        )
    ){
        return;
    }

    mitarbeiter.splice(index,1);

    mitarbeiterSpeichern();

    mitarbeiterAnzeigen();

}

window.mitarbeiterBearbeiten =
mitarbeiterBearbeiten;

window.mitarbeiterLoeschen =
mitarbeiterLoeschen;
// ==========================================
// Start
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    mitarbeiterAnzeigen();

    const btn =
    document.getElementById("mitarbeiterSpeichern");

    const eingabe =
    document.getElementById("mitarbeiterName");

    if(btn){

        btn.onclick = mitarbeiterHinzufuegen;

    }

    if(eingabe){

        eingabe.addEventListener("keydown", e=>{

            if(e.key==="Enter"){

                mitarbeiterHinzufuegen();

            }

        });

    }

});