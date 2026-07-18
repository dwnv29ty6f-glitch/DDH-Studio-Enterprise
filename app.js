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
const monate = [
    "Januar","Februar","März","April","Mai","Juni",
    "Juli","August","September","Oktober","November","Dezember"
];

const tageContainer = document.getElementById("tage");
const monatTitel = document.getElementById("monatTitel");

let heute = new Date();
let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();

function kalenderZeichnen(){

    tageContainer.innerHTML = "";

    monatTitel.textContent =
        monate[aktuellerMonat] + " " + aktuellesJahr;

    const ersterTag =
        new Date(aktuellesJahr, aktuellerMonat, 1);

    const letzterTag =
        new Date(aktuellesJahr, aktuellerMonat + 1, 0);

    let start =
        ersterTag.getDay();

    if(start === 0){
        start = 7;
    }

    for(let i=1;i<start;i++){

        const leer = document.createElement("div");

        tageContainer.appendChild(leer);

    }

    for(let tag=1; tag<=letzterTag.getDate(); tag++){

        const feld = document.createElement("div");

feld.className = "tag";

feld.innerHTML =
"<div class='tagNummer'>" + tag + "</div>";

feld.addEventListener("click", () => {

    document.querySelectorAll(".tag").forEach(t => {
        t.classList.remove("aktiv");
    });

    feld.classList.add("aktiv");

    document.getElementById("ausgewaehltesDatum").textContent =
        tag + ". " + monate[aktuellerMonat] + " " + aktuellesJahr;

});

tageContainer.appendChild(feld);
    }

}

kalenderZeichnen();
const vorher = document.getElementById("vorherigerMonat");
const naechster = document.getElementById("naechsterMonat");

vorher.addEventListener("click", () => {

    aktuellerMonat--;

    if (aktuellerMonat < 0) {
        aktuellerMonat = 11;
        aktuellesJahr--;
    }

    kalenderZeichnen();

});

naechster.addEventListener("click", () => {

    aktuellerMonat++;

    if (aktuellerMonat > 11) {
        aktuellerMonat = 0;
        aktuellesJahr++;
    }

    kalenderZeichnen();

});