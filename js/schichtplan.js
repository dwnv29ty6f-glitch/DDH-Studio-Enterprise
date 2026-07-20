// Beim Start Daten laden
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
if (gespeicherteMitarbeiter) {
    mitarbeiter.length = 0;
    JSON.parse(gespeicherteMitarbeiter).forEach(m => mitarbeiter.push(m));
}

const gespeicherteSchichten = localStorage.getItem("schichtenDaten");
if (gespeicherteSchichten) {
    schichten = JSON.parse(gespeicherteSchichten);
}

let aktuellBearbeiteteId = null;
let aktiveMitarbeiterId = null;
let aktivesDatum = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const heute = "2026-07-20";
        const schicht = getSchichtFuerHeute(ma.id, heute);
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td style="padding: 15px; border-bottom: 1px solid #444;">
                <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color: #0078d4;">${ma.name}</strong><br>
                <span style="font-size: 0.8em; color: #888;">${ma.rolle}</span>
            </td>
            <td onclick="oeffneSchichtDialog(${ma.id}, '${heute}')" style="text-align:center; color: #0078d4; font-weight: bold; border-bottom: 1px solid #444; cursor:pointer;">
                ${schicht || "+"}
            </td>
        `;
        body.appendChild(row);
    });
}

function getSchichtFuerHeute(maId, datum) {
    const eintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === datum);
    return eintrag ? eintrag.schicht : "";
}

function bearbeiteMitarbeiter(id) {
    const ma = mitarbeiter.find(m => m.id === id);
    if (!ma) return;
    aktuellBearbeiteteId = id;
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

function oeffneSchichtDialog(maId, datum) {
    aktiveMitarbeiterId = maId;
    aktivesDatum = datum;
    document.getElementById("schichtDialog").classList.add("aktiv");
}

// Button Events
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

document.getElementById("addMitarbeiterBtn")?.addEventListener("click", () => {
    const neueId = mitarbeiter.length > 0 ? Math.max(...mitarbeiter.map(m => m.id)) + 1 : 1;
    mitarbeiter.push({ id: neueId, name: "Neuer Mitarbeiter", rolle: "Rolle" });
    localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
    schichtplanLaden();
});

document.getElementById("deleteMitarbeiterBtn")?.addEventListener("click", () => {
    const idx = mitarbeiter.findIndex(m => m.id === aktuellBearbeiteteId);
    if (idx > -1) {
        mitarbeiter.splice(idx, 1);
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
        schichtplanLaden();
        document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
        document.getElementById("seite-schichtplan").classList.add('aktiv');
    }
});

document.getElementById("schichtAbbrechen")?.addEventListener("click", () => {
    document.getElementById("schichtDialog").classList.remove("aktiv");
});

document.querySelectorAll(".schichtAuswahl").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const schicht = e.target.getAttribute("data-schicht");
        let eintr = schichten.find(s => s.mitarbeiterId === aktiveMitarbeiterId && s.datum === aktivesDatum);
        if (eintr) eintr.schicht = schicht;
        else schichten.push({ mitarbeiterId: aktiveMitarbeiterId, datum: aktivesDatum, schicht: schicht });
        localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
        document.getElementById("schichtDialog").classList.remove("aktiv");
        schichtplanLaden();
    });
});

document.getElementById("schichtLoeschen")?.addEventListener("click", () => {
    const idx = schichten.findIndex(s => s.mitarbeiterId === aktiveMitarbeiterId && s.datum === aktivesDatum);
    if (idx > -1) schichten.splice(idx, 1);
    localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
    document.getElementById("schichtDialog").classList.remove("aktiv");
    schichtplanLaden();
});

schichtplanLaden();