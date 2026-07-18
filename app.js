// ======================================
// DDH Studio Enterprise
// app.js
// ======================================

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

// HTML
const tage = document.getElementById("tage");
const monatTitel = document.getElementById("monatTitel");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");

const uhrzeit =
document.getElementById("uhrzeit");

const termin =
document.getElementById("termin");

const kategorie =
document.getElementById("kategorie");

// ACHTUNG:
// In deiner index.html heißt der Button
// "speichernTermin"

const speichern =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

// Datum

const heute = new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag =
heute.getDate();

// Termine laden

let termine =
JSON.parse(
localStorage.getItem("termine")
) || [];

// ======================================
// Kalender zeichnen
// ======================================

function kalenderZeichnen() {

    tage.innerHTML = "";

    const ersterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat + 1,
        0
    ).getDate();

    monatTitel.textContent =
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

    let start = ersterTag;

    if (start === 0) {
        start = 7;
    }

    for (let i = 1; i < start; i++) {

        const leer =
        document.createElement("div");

        leer.className = "leer";

        tage.appendChild(leer);

    }

    for (
        let tag = 1;
        tag <= tageImMonat;
        tag++
    ) {

        const feld =
        document.createElement("div");

        feld.className = "tag";

        feld.textContent = tag;

        if (
            tag === ausgewaehlterTag
        ) {
            feld.classList.add("aktiv");
        }

        feld.onclick = () => {

            ausgewaehlterTag = tag;

            kalenderZeichnen();

            termineAnzeigen();

        };

        tage.appendChild(feld);

    }

    datumTitel.textContent =
    ausgewaehlterTag +
    ". " +
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

}
// ======================================
// Termin speichern
// ======================================

speichern.onclick = function () {

    if (termin.value.trim() === "") {
        return;
    }

    const neuerTermin = {

        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: ausgewaehlterTag,

        uhrzeit: uhrzeit.value,

        text: termin.value,

        kategorie: kategorie.value

    };

    termine.push(neuerTermin);

    localStorage.setItem(
        "termine",
        JSON.stringify(termine)
    );

    termin.value = "";

    termineAnzeigen();

};

// ======================================
// Termine anzeigen
// ======================================

function termineAnzeigen() {

    terminListe.innerHTML = "";

    const liste = termine.filter(function (eintrag) {

        return (

            eintrag.jahr === aktuellesJahr &&
            eintrag.monat === aktuellerMonat &&
            eintrag.tag === ausgewaehlterTag

        );

    });

    liste.forEach(function (eintrag) {

        const box =
        document.createElement("div");

        box.className = "termin";

        // Farbe je Kategorie

        switch (eintrag.kategorie) {

            case "Privat":
                box.style.borderLeft =
                "6px solid #4dabf7";
                break;

            case "Arbeit":
                box.style.borderLeft =
                "6px solid #ff922b";
                break;

            case "Familie":
                box.style.borderLeft =
                "6px solid #845ef7";
                break;

            case "Schule":
                box.style.borderLeft =
                "6px solid #51cf66";
                break;

            case "Urlaub":
                box.style.borderLeft =
                "6px solid #15aabf";
                break;

            case "Geburtstag":
                box.style.borderLeft =
                "6px solid #f06595";
                break;

            default:
                box.style.borderLeft =
                "6px solid #868e96";

        }

        const info =
        document.createElement("div");

        info.textContent =
        "[" +
        eintrag.kategorie +
        "] " +
        eintrag.uhrzeit +
        " - " +
        eintrag.text;

        box.appendChild(info);

        const buttons =
        document.createElement("div");

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = function () {

            uhrzeit.value =
            eintrag.uhrzeit;

            termin.value =
            eintrag.text;

            kategorie.value =
            eintrag.kategorie;

            termine.splice(
                termine.indexOf(eintrag),
                1
            );

            localStorage.setItem(
                "termine",
                JSON.stringify(termine)
            );

            termineAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = function () {

            termine.splice(
                termine.indexOf(eintrag),
                1
            );

            localStorage.setItem(
                "termine",
                JSON.stringify(termine)
            );

            termineAnzeigen();

        };

        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        terminListe.appendChild(box);

    });

}
// ======================================
// Monatswechsel
// ======================================

btnZurueck.onclick = function () {

    aktuellerMonat--;

    if (aktuellerMonat < 0) {

        aktuellerMonat = 11;
        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();
    termineAnzeigen();

};

btnWeiter.onclick = function () {

    aktuellerMonat++;

    if (aktuellerMonat > 11) {

        aktuellerMonat = 0;
        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();
    termineAnzeigen();

};

// ======================================
// Aktuelle Uhrzeit einsetzen
// ======================================

const jetzt = new Date();

uhrzeit.value =
String(jetzt.getHours()).padStart(2, "0") +
":" +
String(jetzt.getMinutes()).padStart(2, "0");

// ======================================
// Start
// ======================================

kalenderZeichnen();
termineAnzeigen();