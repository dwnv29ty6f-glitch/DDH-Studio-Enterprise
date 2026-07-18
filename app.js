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
const datum = document.getElementById("datum");
const termin = document.getElementById("termin");
const speichernTermin = document.getElementById("speichernTermin");
const terminListe = document.getElementById("terminListe");

speichernTermin.addEventListener("click", () => {
    if (datum.value === "" || termin.value === "") {
        alert("Bitte Datum und Termin eingeben!");
        return;
    }

    const eintrag = document.createElement("li");
    eintrag.textContent = datum.value + " – " + termin.value;

    terminListe.appendChild(eintrag);

    datum.value = "";
    termin.value = "";
});