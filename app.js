// ===================================
// DDH Studio Enterprise
// Kalender Version 2.0
// ===================================

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

const tageContainer = document.getElementById("tage");
const monatTitel = document.getElementById("monatTitel");

const vorherigerMonat =
document.getElementById("vorherigerMonat");

const naechsterMonat =
document.getElementById("naechsterMonat");

const ausgewaehltesDatum =
document.getElementById("ausgewaehltesDatum");

const uhrzeit =
document.getElementById("uhrzeit");

const termin =
document.getElementById("termin");

const speichernTermin =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

let heute = new Date();

let monat =
heute.getMonth();

let jahr =
heute.getFullYear();

let aktiverTag = null;

let termine =
JSON.parse(
localStorage.getItem("ddh-kalender")
) || {};
// ===================================
// Kalender zeichnen
// ===================================

function kalenderZeichnen(){

    tageContainer.innerHTML = "";

    monatTitel.textContent =
        monate[monat] + " " + jahr;

    let ersterTag =
        new Date(jahr, monat, 1).getDay();

    if(ersterTag === 0){
        ersterTag = 7;
    }

    let letzterTag =
        new Date(jahr, monat + 1, 0).getDate();

    for(let i = 1; i < ersterTag; i++){

        const leer =
            document.createElement("div");

        tageContainer.appendChild(leer);

    }

    for(let tag = 1; tag <= letzterTag; tag++){

        const feld =
            document.createElement("div");

        feld.className = "tag";

        feld.innerHTML =
            "<div class='tagNummer'>" +
            tag +
            "</div>";

        const schluessel =
            jahr + "-" +
            (monat + 1) + "-" +
            tag;

        if(termine[schluessel]){

            feld.classList.add(
                "tagHatTermin"
            );

        }

        feld.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".tag")
                    .forEach(t => {

                        t.classList.remove("aktiv");

                    });

                feld.classList.add("aktiv");

                aktiverTag = schluessel;

                ausgewaehltesDatum.textContent =
                    tag + ". " +
                    monate[monat] +
                    " " +
                    jahr;

                termineAnzeigen();

            }
        );

        tageContainer.appendChild(feld);

    }

}
// ===================================
// Termine anzeigen
// ===================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    if(!aktiverTag){
        return;
    }

    if(!termine[aktiverTag]){
        return;
    }

    termine[aktiverTag].forEach((eintrag,index)=>{

        const terminBox =
            document.createElement("div");

        terminBox.className = "termin";

        const text =
            document.createElement("div");

        text.textContent =
            eintrag.uhrzeit +
            " - " +
            eintrag.text;

        const buttons =
            document.createElement("div");

        buttons.style.marginTop = "10px";

        const bearbeiten =
            document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            uhrzeit.value =
                eintrag.uhrzeit;

            termin.value =
                eintrag.text;

            termine[aktiverTag].splice(index,1);

            localStorage.setItem(
                "ddh-kalender",
                JSON.stringify(termine)
            );

            termineAnzeigen();

        };

        const loeschen =
            document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.style.marginLeft = "10px";

        loeschen.onclick = ()=>{

            termine[aktiverTag].splice(index,1);

            localStorage.setItem(
                "ddh-kalender",
                JSON.stringify(termine)
            );

            kalenderZeichnen();

            termineAnzeigen();

        };

        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        terminBox.appendChild(text);
        terminBox.appendChild(buttons);

        terminListe.appendChild(terminBox);

    });

}
// ===================================
// Termin speichern
// ===================================

speichernTermin.addEventListener("click", () => {

    if (!aktiverTag) {

        alert("Bitte zuerst einen Tag auswählen.");

        return;

    }

    if (termin.value.trim() === "") {

        alert("Bitte einen Termin eingeben.");

        return;

    }

    if (!termine[aktiverTag]) {

        termine[aktiverTag] = [];

    }

    termine[aktiverTag].push({

        uhrzeit: uhrzeit.value,

        text: termin.value

    });

    localStorage.setItem(
        "ddh-kalender",
        JSON.stringify(termine)
    );

    uhrzeit.value = "";
    termin.value = "";

    kalenderZeichnen();

    termineAnzeigen();

});

// ===================================
// Monat wechseln
// ===================================

vorherigerMonat.addEventListener("click", () => {

    monat--;

    if (monat < 0) {

        monat = 11;
        jahr--;

    }

    aktiverTag = null;

    ausgewaehltesDatum.textContent =
        "Kein Tag ausgewählt";

    terminListe.innerHTML = "";

    kalenderZeichnen();

});

naechsterMonat.addEventListener("click", () => {

    monat++;

    if (monat > 11) {

        monat = 0;
        jahr++;

    }

    aktiverTag = null;

    ausgewaehltesDatum.textContent =
        "Kein Tag ausgewählt";

    terminListe.innerHTML = "";

    kalenderZeichnen();

});

// ===================================
// Start
// ===================================

kalenderZeichnen();