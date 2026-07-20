// Variablen global definieren
window.mitarbeiter = window.mitarbeiter || [];
window.schichten = window.schichten || [];

// Daten aus dem Speicher laden
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
if (gespeicherteMitarbeiter) {
    window.mitarbeiter = JSON.parse(gespeicherteMitarbeiter);
}

const gespeicherteSchichten = localStorage.getItem("schichtenDaten");
if (gespeicherteSchichten) {
    window.schichten = JSON.parse(gespeicherteSchichten);
}

let aktuellBearbeiteteId = null;
let aktiveMitarbeiterId = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    window.mitarbeiter.forEach(ma => {
        const eintrag = window.schichten.find(s => s.mitarbeiterId === ma.id);
        const schichtText = eintrag ? eintrag.schicht : "Schicht wählen...";
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="padding: 15px; border-bottom: 1px solid #444;">
                <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color: #0078d4; cursor:pointer;">${ma.name}</strong><br>
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
    const ma = window.mitarbeiter.find(m => m.id === id);
    if (!ma) return;
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

// Dialog Logik
document.querySelectorAll(".schichtAuswahl").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const schicht = e.target.getAttribute("data-schicht");
        let eintr = window.schichten.find(s => s.mitarbeiterId === aktiveMitarbeiterId);
        if (eintr) eintr.schicht = schicht;
        else window.schichten.push({ mitarbeiterId: aktiveMitarbeiterId, schicht: schicht });
        
        localStorage.setItem("schichtenDaten", JSON.stringify(window.schichten));
        document.getElementById("schichtDialog").classList.remove("aktiv");
        schichtplanLaden();
    });
});

document.getElementById("schichtLoeschen")?.addEventListener("click", () => {
    window.schichten = window.schichten.filter(s => s.mitarbeiterId !== aktiveMitarbeiterId);
    localStorage.setItem("schichtenDaten", JSON.stringify(window.schichten));
    document.getElementById("schichtDialog").classList.remove("aktiv");
    schichtplanLaden();
});

document.getElementById("schichtAbbrechen")?.addEventListener("click", () => {
    document.getElementById("schichtDialog").classList.remove("aktiv");
});

// Basis-Funktionen
document.getElementById("saveMitarbeiterBtn")?.addEventListener("click", () => {
    const ma = window.mitarbeiter.find(m => m.id === aktuellBearbeiteteId);
    if (ma) {
        ma.name = document.getElementById("editName").value;
        ma.rolle = document.getElementById("editRolle").value;
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(window.mitarbeiter));
    }
    schichtplanLaden();
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-schichtplan").classList.add('aktiv');
});

document.getElementById("addMitarbeiterBtn")?.addEventListener("click", () => {
    const neueId = window.mitarbeiter.length > 0 ? Math.max(...window.mitarbeiter.map(m => m.id)) + 1 : 1;
    window.mitarbeiter.push({ id: neueId, name: "Neuer Mitarbeiter", rolle: "Rolle" });
    localStorage.setItem("mitarbeiterDaten", JSON.stringify(window.mitarbeiter));
    schichtplanLaden();
});

// Initialer Aufruf
schichtplanLaden();