// Daten laden
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
let mitarbeiter = gespeicherteMitarbeiter ? JSON.parse(gespeicherteMitarbeiter) : [];

const gespeicherteSchichten = localStorage.getItem("schichtenDaten");
let schichten = gespeicherteSchichten ? JSON.parse(gespeicherteSchichten) : [];

let aktuellBearbeiteteId = null;
let aktiveMitarbeiterId = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const eintrag = schichten.find(s => s.mitarbeiterId === ma.id);
        const schichtText = eintrag ? eintrag.schicht : "Schicht wählen...";
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="padding: 15px; border-bottom: 1px solid #444;">
                <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color: #0078d4;">${ma.name}</strong><br>
                <span style="font-size: 0.8em; color: #888;">${ma.rolle}</span>
            </td>
            <td onclick="oeffneSchichtDialog(${ma.id})" style="padding: 15px; border-bottom: 1px solid #444; color: #fff; text-align: right; cursor:pointer;">
                ${schichtText}
            </td>
        `;
        body.appendChild(row);
    });
}

function oeffneSchichtDialog(maId) {
    aktiveMitarbeiterId = maId;
    document.getElementById("schichtDialog").classList.add("aktiv");
}

function bearbeiteMitarbeiter(id) {
    aktuellBearbeiteteId = id;
    const ma = mitarbeiter.find(m => m.id === id);
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

// Dialog Logik
document.querySelectorAll(".schichtAuswahl").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const schicht = e.target.getAttribute("data-schicht");
        let eintr = schichten.find(s => s.mitarbeiterId === aktiveMitarbeiterId);
        if (eintr) eintr.schicht = schicht;
        else schichten.push({ mitarbeiterId: aktiveMitarbeiterId, schicht: schicht });
        
        localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
        document.getElementById("schichtDialog").classList.remove("aktiv");
        schichtplanLaden();
    });
});

document.getElementById("schichtLoeschen")?.addEventListener("click", () => {
    schichten = schichten.filter(s => s.mitarbeiterId !== aktiveMitarbeiterId);
    localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
    document.getElementById("schichtDialog").classList.remove("aktiv");
    schichtplanLaden();
});

document.getElementById("schichtAbbrechen")?.addEventListener("click", () => {
    document.getElementById("schichtDialog").classList.remove("aktiv");
});

// Basis-Funktionen
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

schichtplanLaden();