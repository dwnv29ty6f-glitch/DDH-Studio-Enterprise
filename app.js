// ===================================
// DDH Studio Enterprise
// Block 1
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
const tage =
document.getElementById("tage");

const monatTitel =
document.getElementById("monatTitel");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");

const uhrzeit =
document.getElementById("uhrzeit");

const kategorie =
document.getElementById("kategorie");

const termin =
document.getElementById("termin");

const speichern =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

// Aktuelles Datum
const heute = new Date();

let monat =
heute.getMonth();

let jahr =
heute.getFullYear();

// Gewählter Tag
let ausgewaehlterTag =
null;

// Alle Termine laden
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

    const tageImMonat =
        new Date(jahr, monat + 1, 0).getDate();

    // Leere Felder
    for (let i = 1; i < ersterTag; i++) {

        const leer =
            document.createElement("div");

        tage.appendChild(leer);

    }

    // Tage erzeugen
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

        // Tag mit Termin markieren
        if (
            termine[schluessel] &&
            termine[schluessel].length > 0
        ) {

            feld.classList.add(
                "tagHatTermin"
            );

        }

        feld.onclick = () => {

            document
                .querySelectorAll(".tag")
                .forEach(t =>
                    t.classList.remove("aktiv")
                );

            feld.classList.add("aktiv");

            ausgewaehlterTag =
                schluessel;

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
// Termine anzeigen + speichern
// ===================================

function termineAnzeigen() {

    terminListe.innerHTML = "";

    if (!ausgewaehlterTag) return;

    if (!termine[ausgewaehlterTag]) return;

    termine[ausgewaehlterTag].forEach((eintrag, index) => {

        const box =
            document.createElement("div");

        box.className = "termin";

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

        const buttonLeiste =
            document.createElement("div");

        buttonLeiste.style.display = "flex";
        buttonLeiste.style.gap = "10px";
        buttonLeiste.style.marginTop = "12px";

        // Bearbeiten
        const bearbeiten =
            document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = () => {

            uhrzeit.value =
                eintrag.uhrzeit;

            kategorie.value =
                eintrag.kategorie;

            termin.value =
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

        loeschen.onclick = () => {

            termine[ausgewaehlterTag]
                .splice(index, 1);

            if (
                termine[ausgewaehlterTag]
                .length === 0
            ) {

                delete termine[
                    ausgewaehlterTag
                ];

            }

            localStorage.setItem(
                "ddhKalender",
                JSON.stringify(termine)
            );

            termineAnzeigen();
            kalenderZeichnen();

        };

        buttonLeiste.appendChild(
            bearbeiten
        );

        buttonLeiste.appendChild(
            loeschen
        );

        box.appendChild(buttonLeiste);

        terminListe.appendChild(box);

    });

}

// Termin speichern
speichern.onclick = () => {

    if (!ausgewaehlterTag) {

        alert(
            "Bitte zuerst einen Tag auswählen."
        );

        return;

    }

    if (termin.value.trim() === "") {

        alert(
            "Bitte einen Termin eingeben."
        );

        return;

    }

    if (!termine[ausgewaehlterTag]) {

        termine[ausgewaehlterTag] = [];

    }

    termine[ausgewaehlterTag].push({

        uhrzeit:
            uhrzeit.value,

        kategorie:
            kategorie.value,

        text:
            termin.value

    });

    localStorage.setItem(
        "ddhKalender",
        JSON.stringify(termine)
    );

    uhrzeit.value = "";
    kategorie.value = "Privat";
    termin.value = "";

    termineAnzeigen();
    kalenderZeichnen();

};
// ===================================
// Block 4
// Navigation + Start
// ===================================

// Monat zurück
btnZurueck.onclick = () => {

    monat--;

    if (monat < 0) {

        monat = 11;
        jahr--;

    }

    ausgewaehlterTag = null;

    datumTitel.textContent =
        "Tag auswählen";

    terminListe.innerHTML = "";

    kalenderZeichnen();

};

// Monat vor
btnWeiter.onclick = () => {

    monat++;

    if (monat > 11) {

        monat = 0;
        jahr++;

    }

    ausgewaehlterTag = null;

    datumTitel.textContent =
        "Tag auswählen";

    terminListe.innerHTML = "";

    kalenderZeichnen();

};

// Kalender starten
kalenderZeichnen();