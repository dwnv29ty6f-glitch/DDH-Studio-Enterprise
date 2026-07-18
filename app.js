// ===================================
// DDH Studio Enterprise
// app.js - Block 1
// ===================================

// Monate
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

// HTML-Elemente
const tage = document.getElementById("tage");
const monatTitel = document.getElementById("monatTitel");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");

const uhrzeitInput =
document.getElementById("uhrzeit");

const terminInput =
document.getElementById("termin");

const speichernButton =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

// Aktuelles Datum
const heute = new Date();

let monat =
heute.getMonth();

let jahr =
heute.getFullYear();

// Ausgewählter Tag
let ausgewaehlterTag = null;

// Alle Termine
let termine =
JSON.parse(
localStorage.getItem("ddhKalender")
) || {};
// ===================================
// Block 2
// Kalender zeichnen
// ===================================

function kalenderZeichnen() {

    tage.innerHTML = "";

    monatTitel.textContent =
        monate[monat] + " " + jahr;

    let ersterTag =
        new Date(jahr, monat, 1).getDay();

    if (ersterTag === 0) {
        ersterTag = 7;
    }

    let tageImMonat =
        new Date(jahr, monat + 1, 0).getDate();

    // Leere Felder vor dem 1.
    for (let i = 1; i < ersterTag; i++) {

        const leer =
            document.createElement("div");

        tage.appendChild(leer);

    }

    // Tage zeichnen
    for (let tag = 1; tag <= tageImMonat; tag++) {

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

        // Tage mit Termin markieren
        if (
            termine[schluessel] &&
            termine[schluessel].length > 0
        ) {
            feld.classList.add("tagHatTermin");
        }

        // Tag anklicken
        feld.onclick = () => {

            document
                .querySelectorAll(".tag")
                .forEach(t => t.classList.remove("aktiv"));

            feld.classList.add("aktiv");

            ausgewaehlterTag = schluessel;

            datumTitel.textContent =
                tag + ". " +
                monate[monat] +
                " " +
                jahr;

            termineAnzeigen();

        };

        tage.appendChild(feld);

    }

}
// ===================================
// Block 3
// Termine
// ===================================

function termineAnzeigen() {

    terminListe.innerHTML = "";

    if (!ausgewaehlterTag) {
        return;
    }

    if (!termine[ausgewaehlterTag]) {
        return;
    }

    termine[ausgewaehlterTag].forEach((eintrag, index) => {

        const box = document.createElement("div");
        box.className = "termin";

        const text = document.createElement("div");
        text.textContent =
            eintrag.uhrzeit + " - " + eintrag.text;

        const buttonLeiste =
            document.createElement("div");

        buttonLeiste.style.marginTop = "10px";

        // Bearbeiten
        const bearbeiten =
            document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = () => {

            uhrzeitInput.value =
                eintrag.uhrzeit;

            terminInput.value =
                eintrag.text;

            termine[ausgewaehlterTag]
                .splice(index, 1);

            localStorage.setItem(
                "ddhKalender",
                JSON.stringify(termine)
            );

            termineAnzeigen();
            kalenderZeichnen();

        };

        // Löschen
        const loeschen =
            document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.style.marginLeft = "10px";

        loeschen.onclick = () => {

            termine[ausgewaehlterTag]
                .splice(index, 1);

            if (
                termine[ausgewaehlterTag].length === 0
            ) {
                delete termine[ausgewaehlterTag];
            }

            localStorage.setItem(
                "ddhKalender",
                JSON.stringify(termine)
            );

            termineAnzeigen();
            kalenderZeichnen();

        };

        buttonLeiste.appendChild(bearbeiten);
        buttonLeiste.appendChild(loeschen);

        box.appendChild(text);
        box.appendChild(buttonLeiste);

        terminListe.appendChild(box);

    });

}

speichernButton.onclick = () => {

    if (!ausgewaehlterTag) {

        alert("Bitte zuerst einen Tag auswählen.");
        return;

    }

    if (terminInput.value.trim() === "") {

        alert("Bitte einen Termin eingeben.");
        return;

    }

    if (!termine[ausgewaehlterTag]) {

        termine[ausgewaehlterTag] = [];

    }

    termine[ausgewaehlterTag].push({

        uhrzeit: uhrzeitInput.value,
        text: terminInput.value

    });

    localStorage.setItem(
        "ddhKalender",
        JSON.stringify(termine)
    );

    uhrzeitInput.value = "";
    terminInput.value = "";

    termineAnzeigen();
    kalenderZeichnen();

};
// ===================================
// Block 4
// Navigation + Start
// ===================================

btnZurueck.onclick = () => {

    monat--;

    if (monat < 0) {

        monat = 11;
        jahr--;

    }

    ausgewaehlterTag = null;

    datumTitel.textContent =
        "Kein Tag ausgewählt";

    terminListe.innerHTML = "";

    kalenderZeichnen();

};

btnWeiter.onclick = () => {

    monat++;

    if (monat > 11) {

        monat = 0;
        jahr++;

    }

    ausgewaehlterTag = null;

    datumTitel.textContent =
        "Kein Tag ausgewählt";

    terminListe.innerHTML = "";

    kalenderZeichnen();

};

// Kalender beim Start zeichnen
kalenderZeichnen();