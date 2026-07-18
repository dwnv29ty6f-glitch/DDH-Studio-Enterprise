// =======================================
// DDH Studio Enterprise
// app.js - Block 1
// =======================================

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
document.getElementById("kategorie")

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

let ausgewaehlterTag = null;

// Termine

let termine =
JSON.parse(
localStorage.getItem("ddhKalender")
) || {};
// =======================================
// Block 2
// Kalender zeichnen
// =======================================

function kalenderZeichnen(){

    tage.innerHTML = "";

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

    const tageImMonat =
        new Date(
            aktuellesJahr,
            aktuellerMonat + 1,
            0
        ).getDate();

    // Leere Felder
    for(let i = 1; i < ersterTag; i++){

        const leer =
            document.createElement("div");

        tage.appendChild(leer);

    }

    // Tage
    for(let tag = 1; tag <= tageImMonat; tag++){

        const feld =
            document.createElement("div");

        feld.className = "tag";

        const schluessel =
            aktuellesJahr +
            "-" +
            (aktuellerMonat + 1) +
            "-" +
            tag;

        if(
            termine[schluessel] &&
            termine[schluessel].length > 0
        ){
            feld.classList.add("tagHatTermin");
        }

        feld.innerHTML =
            "<div class='tagNummer'>" +
            tag +
            "</div>";

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
                tag +
                ". " +
                monate[aktuellerMonat] +
                " " +
                aktuellesJahr;

            termineAnzeigen();

        };

        tage.appendChild(feld);

    }

}
// =======================================
// Block 3
// Termine anzeigen
// =======================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    if(!ausgewaehlterTag){
        return;
    }

    const liste = termine[ausgewaehlterTag] || [];

    liste.forEach((eintrag,index)=>{

        const box = document.createElement("div");
        box.className = "termin";

        const info = document.createElement("div");
        info.textContent =
            eintrag.uhrzeit +
            " - " +
            eintrag.text;

        const buttonLeiste =
            document.createElement("div");
        buttonLeiste.className =
            "terminButtons";

        // Bearbeiten

        const bearbeiten =
            document.createElement("button");

        bearbeiten.type = "button";
        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            uhrzeit.value =
                eintrag.uhrzeit;

            termin.value =
                eintrag.text;

            liste.splice(index,1);

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

        loeschen.type = "button";
        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            liste.splice(index,1);

            if(liste.length===0){

                delete termine[ausgewaehlterTag];

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

        box.appendChild(info);
        box.appendChild(buttonLeiste);

        terminListe.appendChild(box);

    });

}
// =======================================
// Block 4
// Speichern + Navigation + Start
// =======================================

speichern.onclick = () => {

    if(!ausgewaehlterTag){

        alert("Bitte zuerst einen Tag auswählen.");

        return;

    }

    if(termin.value.trim()===""){

        alert("Bitte einen Termin eingeben.");

        return;

    }

    if(!termine[ausgewaehlterTag]){

        termine[ausgewaehlterTag]=[];

    }

    termine[ausgewaehlterTag].push({

        uhrzeit:uhrzeit.value,
        text:termin.value

    });

    localStorage.setItem(
        "ddhKalender",
        JSON.stringify(termine)
    );

    uhrzeit.value="";
    termin.value="";

    termineAnzeigen();
    kalenderZeichnen();

};

btnZurueck.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;
        aktuellesJahr--;

    }

    ausgewaehlterTag=null;

    datumTitel.textContent="Tag auswählen";

    terminListe.innerHTML="";

    kalenderZeichnen();

};

btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;
        aktuellesJahr++;

    }

    ausgewaehlterTag=null;

    datumTitel.textContent="Tag auswählen";

    terminListe.innerHTML="";

    kalenderZeichnen();

};

// Start

kalenderZeichnen();