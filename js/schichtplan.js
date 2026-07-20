// Beim Start prüfen, ob gespeicherte Mitarbeiter existieren
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
if (gespeicherteMitarbeiter) {
    const geladeneDaten = JSON.parse(gespeicherteMitarbeiter);
    mitarbeiter.length = 0; 
    geladeneDaten.forEach(m => mitarbeiter.push(m));
}

// Beim Start prüfen, ob gespeicherte Schichten existieren
const gespeicherteSchichten = localStorage.getItem("schichtenDaten");
if (gespeicherteSchichten) {
    schichten = JSON.parse(gespeicherteSchichten);
}

// Globale Variable, um uns zu merken, welchen Mitarbeiter wir gerade bearbeiten
let aktuellBearbeiteteId = null;
let aktiveMitarbeiterId = null;
let aktivesDatum = null;

// Hauptfunktion zum Laden des Schichtplans
function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const heute = "2026-07-20"; // Beispiel-Datum
        const schicht = getSchichtFuerHeute(ma.id, heute);
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td style="color: white; padding: 15px; border-bottom: 1px solid #444;">
                <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="cursor:pointer; color: #0078d4; text-decoration: underline;">${ma.name}</strong><br>
                <span style="font-size: 0.85em; color: #888;">${ma.rolle}</span>
            </td>
            <td onclick="oeffneSchichtDialog(${ma.id}, '${heute}')" style="cursor:pointer; text-align:center; color: #aaa;">
                ${schicht}
            </td>
        `;
        body.appendChild(row);
    });
}

function getSchichtFuerHeute(maId, datum) {
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === datum);
    return schichtEintrag ? schichtEintrag.schicht : "Keine Schicht";
}

// Mitarbeiter bearbeiten (Öffnet das Formular)
function bearbeiteMitarbeiter(id) {
    const ma = mitarbeiter.find(m => m.id === id);
    if (!ma) return;

    aktuellBearbeiteteId = id;

    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    
    const alleSeiten = document.querySelectorAll('.seite');
    alleSeiten.forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

// Schicht-Dialog öffnen
function oeffneSchichtDialog(maId, datum) {
    aktiveMitarbeiterId = maId;
    aktivesDatum = datum;
    const dialog = document.getElementById("schichtDialog");
    if (dialog) dialog.classList.add("aktiv");
}

// --- EVENT LISTENER & BUTTONS ---

// Speichern-Logik (Mitarbeiter)
const saveBtn = document.getElementById("saveMitarbeiterBtn");
if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        if (aktuellBearbeiteteId === null) return;

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
}

// Abbrechen-Logik (Mitarbeiter)
const cancelBtn = document.getElementById("cancelMitarbeiterBtn");
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
        document.getElementById("seite-schichtplan").classList.add('aktiv');
    });
}

// Mitarbeiter hinzufügen
const addBtn = document.getElementById("addMitarbeiterBtn");
if (addBtn) {
    addBtn.addEventListener("click", () => {
        const neueId = mitarbeiter.length > 0 ? Math.max(...mitarbeiter.map(m => m.id)) + 1 : 1;
        const neuerMA = { id: neueId, name: "Neuer Mitarbeiter", rolle: "Rolle" };
        mitarbeiter.push(neuerMA);
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
        schichtplanLaden();
    });
}

// Mitarbeiter löschen
const deleteBtn = document.getElementById("deleteMitarbeiterBtn");
if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        const index = mitarbeiter.findIndex(m => m.id === aktuellBearbeiteteId);
        if (index > -1) {
            mitarbeiter.splice(index, 1);
            localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
            schichtplanLaden();
            
            document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
            document.getElementById("seite-schichtplan").classList.add('aktiv');
        }
    });
}

// Schicht-Dialog abbrechen
const schichtAbbrechen = document.getElementById("schichtAbbrechen");
if (schichtAbbrechen) {
    schichtAbbrechen.addEventListener("click", () => {
        document.getElementById("schichtDialog").classList.remove("aktiv");
    });
}

// Schicht auswählen und speichern
document.querySelectorAll(".schichtAuswahl").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const neueSchicht = e.target.getAttribute("data-schicht");
        
        let eintrag = schichten.find(s => s.mitarbeiterId === aktiveMitarbeiterId && s.datum === aktivesDatum);
        
        if (eintrag) {
            eintrag.schicht = neueSchicht;
        } else {
            schichten.push({ mitarbeiterId: aktiveMitarbeiterId, datum: aktivesDatum, schicht: neueSchicht });
        }

        localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
        document.getElementById("schichtDialog").classList.remove("aktiv");
        schichtplanLaden();
    });
});

// Schicht löschen
const schichtLoeschen = document.getElementById("schichtLoeschen");
if (schichtLoeschen) {
    schichtLoeschen.addEventListener("click", () => {
        const index = schichten.findIndex(s => s.mitarbeiterId === aktiveMitarbeiterId && s.datum === aktivesDatum);
        if (index > -1) {
            schichten.splice(index, 1);
            localStorage.setItem("schichtenDaten", JSON.stringify(schichten));
        }

        document.getElementById("schichtDialog").classList.remove("aktiv");
        schichtplanLaden();
    });
}

// Beim Start einmal ausführen
schichtplanLaden();