// ==========================
// DDH Studio Enterprise
// ==========================

// Projekte

const button = document.getElementById("neu");
const projekte = document.getElementById("projekte");

button.addEventListener("click", () => {

    const name = prompt("Projektname:");

    if (!name) return;

    const projekt = document.createElement("div");

    projekt.style.background = "#3b3d42";
    projekt.style.padding = "12px";
    projekt.style.marginTop = "10px";
    projekt.style.borderRadius = "8px";
    projekt.style.cursor = "pointer";

    projekt.textContent = name;

    projekte.appendChild(projekt);

});

// ==========================
// Kalender
// ==========================

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

const tageContainer =
document.getElementById("tage");

const monatTitel =
document.getElementById("monatTitel");

const vorher =
document.getElementById("vorherigerMonat");

const naechster =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");
const uhrzeitInput =
document.getElementById("uhrzeit");
const terminInput =
document.getElementById("termin");

const speichernTermin =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

let heute = new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag = null;

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || {};
// ==========================
// Funktionen
// ==========================

function schluessel(tag){

    return aktuellesJahr + "-" +
           aktuellerMonat + "-" +
           tag;

}

function termineAnzeigen(){

    terminListe.innerHTML = "";

    if(ausgewaehlterTag === null){
        return;
    }

    const key = schluessel(ausgewaehlterTag);

    if(!termine[key]){
        return;
    }

    termine[key].forEach((text) => {

        const eintrag =
        document.createElement("div");

        eintrag.className =
        "terminEintrag";

        eintrag.textContent =
        text;

        terminListe.appendChild(
            eintrag
        );

    });

}

function kalenderZeichnen(){

    tageContainer.innerHTML = "";

    monatTitel.textContent =
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

    let ersterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    if(ersterTag === 0){
        ersterTag = 7;
    }

    const letzterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat + 1,
        0
    ).getDate();

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        tageContainer.appendChild(leer);

    }
        for(let tag = 1; tag <= letzterTag; tag++){

        const feld =
        document.createElement("div");

        feld.className = "tag";

        const key = schluessel(tag);

        if(termine[key]){
            feld.classList.add("tagHatTermin");
        }

        feld.innerHTML =
        "<div class='tagNummer'>" +
        tag +
        "</div>";

        feld.addEventListener("click", () => {

            document
            .querySelectorAll(".tag")
            .forEach((t) => {

                t.classList.remove("aktiv");

            });

            feld.classList.add("aktiv");

            ausgewaehlterTag = tag;

            datumTitel.textContent =
            tag +
            ". " +
            monate[aktuellerMonat] +
            " " +
            aktuellesJahr;

            termineAnzeigen();

        });

        tageContainer.appendChild(feld);

    }

}

kalenderZeichnen();
// ==========================
// Navigation
// ==========================

vorher.addEventListener("click", () => {

    aktuellerMonat--;

    if (aktuellerMonat < 0) {

        aktuellerMonat = 11;
        aktuellesJahr--;

    }

    ausgewaehlterTag = null;
    datumTitel.textContent = "Tag auswählen";

    kalenderZeichnen();
    termineAnzeigen();

});

naechster.addEventListener("click", () => {

    aktuellerMonat++;

    if (aktuellerMonat > 11) {

        aktuellerMonat = 0;
        aktuellesJahr++;

    }

    ausgewaehlterTag = null;
    datumTitel.textContent = "Tag auswählen";

    kalenderZeichnen();
    termineAnzeigen();

});

// ==========================
// Termin speichern
// ==========================

speichernTermin.addEventListener("click", () => {

    if (ausgewaehlterTag === null) {

        alert("Bitte zuerst einen Tag auswählen.");
        return;

    }

    const zeit = uhrzeitInput.value;

const text = terminInput.value.trim();

    if (text === "") {

        alert("Bitte einen Termin eingeben.");
        return;

    }

    const key = schluessel(ausgewaehlterTag);

    if (!termine[key]) {

        termine[key] = [];

    }

    termine[key].push({
    zeit: zeit,
    text: text
});

    localStorage.setItem(
        "ddhTermine",
        JSON.stringify(termine)
    );

    terminInput.value = "";

    kalenderZeichnen();
    termineAnzeigen();

});