// ==============================
// DDH Studio Enterprise
// Version 3.0
// ==============================

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

const btnZurueck = document.getElementById("vorherigerMonat");
const btnWeiter = document.getElementById("naechsterMonat");

const datumTitel = document.getElementById("ausgewaehltesDatum");

const uhrzeit = document.getElementById("uhrzeit");
const termin = document.getElementById("termin");
const kategorie = document.getElementById("kategorie");
const speichern = document.getElementById("speichern");

const terminListe = document.getElementById("terminListe");

// Datum
let heute = new Date();

let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();

let ausgewaehlterTag = heute.getDate();

// Termine laden
let termine =
JSON.parse(localStorage.getItem("termine")) || [];
// ==============================
// Kalender zeichnen
// ==============================

function kalenderZeichnen() {

    tage.innerHTML = "";

    const ersterTag =
        new Date(aktuellesJahr, aktuellerMonat, 1).getDay();

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

    if (start === 0) start = 7;

    for (let i = 1; i < start; i++) {

        const leer =
            document.createElement("div");

        leer.className = "leer";

        tage.appendChild(leer);

    }

    for (let tag = 1; tag <= tageImMonat; tag++) {

        const feld =
            document.createElement("div");

        feld.className = "tag";

        feld.textContent = tag;

        if (tag === ausgewaehlterTag) {

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
// ==============================
// Termin speichern
// ==============================

speichern.onclick = () => {

    if (termin.value.trim() === "") return;

    const eintrag = {

        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: ausgewaehlterTag,

        uhrzeit: uhrzeit.value,

        text: termin.value,

        kategorie: kategorie.value

    };

    termine.push(eintrag);

    localStorage.setItem(
        "termine",
        JSON.stringify(termine)
    );

    termin.value = "";
    uhrzeit.value = "";

    termineAnzeigen();

};

// ==============================
// Termine anzeigen
// ==============================

function termineAnzeigen() {

    terminListe.innerHTML = "";

    const liste = termine.filter(e =>

        e.jahr === aktuellesJahr &&
        e.monat === aktuellerMonat &&
        e.tag === ausgewaehlterTag

    );

    liste.forEach((eintrag, index) => {

        const box =
            document.createElement("div");

        box.className = "termin";

        switch (eintrag.kategorie) {

            case "Privat":
                box.style.borderLeft =
                    "6px solid #4dabf7";
                break;

            case "Schule":
                box.style.borderLeft =
                    "6px solid #51cf66";
                break;

            case "Arbeit":
                box.style.borderLeft =
                    "6px solid #ff922b";
                break;

            case "Sport":
                box.style.borderLeft =
                    "6px solid #e64980";
                break;

            default:
                box.style.borderLeft =
                    "6px solid #999";
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

        buttons.className =
            "terminButtons";

        // Bearbeiten
        const bearbeiten =
            document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = () => {

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
            kalenderZeichnen();

        };

        // Löschen
        const loeschen =
            document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = () => {

            termine.splice(
                termine.indexOf(eintrag),
                1
            );

            localStorage.setItem(
                "termine",
                JSON.stringify(termine)
            );

            termineAnzeigen();
            kalenderZeichnen();

        };

        buttons.appendChild(
            bearbeiten
        );

        buttons.appendChild(
            loeschen
        );

        box.appendChild(buttons);

        terminListe.appendChild(box);

    });

}
// ==============================
// Monatswechsel
// ==============================

btnZurueck.onclick = () => {

    aktuellerMonat--;

    if (aktuellerMonat < 0) {

        aktuellerMonat = 11;
        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();
    termineAnzeigen();

};

btnWeiter.onclick = () => {

    aktuellerMonat++;

    if (aktuellerMonat > 11) {

        aktuellerMonat = 0;
        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();
    termineAnzeigen();

};

// Heute auswählen

function heuteAuswaehlen() {

    const jetzt = new Date();

    aktuellesJahr = jetzt.getFullYear();
    aktuellerMonat = jetzt.getMonth();
    ausgewaehlterTag = jetzt.getDate();

}

heuteAuswaehlen();
// ==============================
// DDH Studio Enterprise
// Start
// ==============================

// Kalender und Termine laden
kalenderZeichnen();
termineAnzeigen();

// Enter-Taste speichert Termin
termin.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        speichern.click();

    }

});

// Kategorie nach dem Speichern zurücksetzen
kategorie.value = "Privat";

// Uhrzeit auf aktuelle Zeit setzen
const jetzt = new Date();

uhrzeit.value =
    String(jetzt.getHours()).padStart(2, "0") +
    ":" +
    String(jetzt.getMinutes()).padStart(2, "0");