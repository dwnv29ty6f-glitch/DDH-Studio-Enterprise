// Globale Daten
let mitarbeiter = JSON.parse(localStorage.getItem("mitarbeiterDaten")) || [{id:1, name:"Doreen"}, {id:2, name:"Nivin"}];
let schichten = JSON.parse(localStorage.getItem("schichtenDaten")) || [];

// Variablen für Popup
let aktuellerMaId = null;
let aktuellerTag = null;
let aktuellBearbeiteteId = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    body.innerHTML = "";

    mitarbeiter.forEach(ma => {
        const row = document.createElement("tr");
        // Mitarbeiter-Name klickbar für Bearbeitung
        let rowHtml = `<td style="padding:10px; border:1px solid #444; color:white;">
                        <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color:#0078d4; cursor:pointer;">${ma.name}</strong>
                       </td>`;
        
        // 7 Tage der Woche
        for(let i=0; i<7; i++) {
            const schicht = schichten.find(s => s.maId === ma.id && s.tag === i)?.dienst || "+";
            rowHtml += `<td onclick="oeffneDialog(${ma.id}, ${i})" style="border:1px solid #444; text-align:center; cursor:pointer; color:#0078d4;">${schicht}</td>`;
        }
        row.innerHTML = rowHtml;
        body.appendChild(row);
    });
}

// Dialog-Funktionen für Schicht
function oeffneDialog(maId, tag) {
    aktuellerMaId = maId;
    aktuellerTag = tag;
    document.getElementById("schichtDialog").style.display = "flex";
}

function schliesseDialog() {
    document.getElementById("schichtDialog").style.display = "none";
}

function setzeSchicht(dienst) {
    schichten = schichten.filter(s => !(s.maId === aktuellerMaId && s.tag === aktuellerTag));
    schichten.push({maId: aktuellerMaId, tag: aktuellerTag, dienst: dienst});
    localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
    schichtplanLaden();
    schliesseDialog();
}

// Mitarbeiter-Funktionen (Bearbeiten/Hinzufügen)
function bearbeiteMitarbeiter(id) {
    aktuellBearbeiteteId = id;
    const ma = mitarbeiter.find(m => m.id === id);
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

document.getElementById("addMitarbeiterBtn")?.addEventListener("click", () => {
    const neueId = mitarbeiter.length > 0 ? Math.max(...mitarbeiter.map(m => m.id)) + 1 : 1;
    mitarbeiter.push({ id: neueId, name: "Neuer Mitarbeiter", rolle: "Rolle" });
    localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
    schichtplanLaden();
});

document.getElementById("saveMitarbeiterBtn")?.addEventListener("click", () => {
    const ma = mitarbeiter.find(m => m.id === aktuellBearbeiteteId);
    if (ma) {
        ma.name = document.getElementById("editName").value;
        ma.rolle = document.getElementById("editRolle").value;
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
    }
    schichtplanLaden();
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-schichtplan").classList.add('aktiv');
});

// Initialer Start
schichtplanLaden();