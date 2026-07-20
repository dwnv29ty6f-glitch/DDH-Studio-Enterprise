// Beim Laden prüfen, ob gespeicherte Daten existieren
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
if (gespeicherteMitarbeiter) {
    // Wir überschreiben das globale 'mitarbeiter'-Array mit den gespeicherten Daten
    const geladeneDaten = JSON.parse(gespeicherteMitarbeiter);
    mitarbeiter.length = 0; // Bestehendes Array leeren
    geladeneDaten.forEach(m => mitarbeiter.push(m));
}
// Globale Variable, um uns zu merken, welchen Mitarbeiter wir gerade bearbeiten
let aktuellBearbeiteteId = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const schicht = getSchichtFuerHeute(ma.id);
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td style="color: white; padding: 15px; border-bottom: 1px solid #444;">
                <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="cursor:pointer; color: #0078d4; text-decoration: underline;">${ma.name}</strong><br>
                <span style="font-size: 0.85em; color: #888;">${ma.rolle}</span><br>
                <span style="color: #aaa;">${schicht}</span>
            </td>
        `;
        body.appendChild(row);
    });
}

function bearbeiteMitarbeiter(id) {
    const ma = mitarbeiter.find(m => m.id === id);
    if (!ma) return;

    aktuellBearbeiteteId = id;

    // Formular füllen
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    
    // Automatisch zur "Bearbeiten"-Seite springen
    // Wir simulieren einen Klick auf die Navigation oder setzen die Klasse
    const alleSeiten = document.querySelectorAll('.seite');
    alleSeiten.forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
}

function getSchichtFuerHeute(maId) {
    const heute = "2026-07-20";
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === heute);
    return schichtEintrag ? schichtEintrag.schicht : "Keine Schicht";
}
// Speichern-Logik
document.getElementById("saveMitarbeiterBtn").addEventListener("click", () => {
    if (aktuellBearbeiteteId === null) return;

    const ma = mitarbeiter.find(m => m.id === aktuellBearbeiteteId);
    if (ma) {
        ma.name = document.getElementById("editName").value;
        ma.rolle = document.getElementById("editRolle").value;
        
        // HIER: Daten im Browser-Speicher sichern
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
    }

    schichtplanLaden();
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-schichtplan").classList.add('aktiv');
});

// Abbrechen-Logik
document.getElementById("cancelMitarbeiterBtn").addEventListener("click", () => {
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-schichtplan").classList.add('aktiv');
});

// NEU: Mitarbeiter hinzufügen
document.getElementById("addMitarbeiterBtn").addEventListener("click", () => {
    const neueId = mitarbeiter.length > 0 ? Math.max(...mitarbeiter.map(m => m.id)) + 1 : 1;
    const neuerMA = { id: neueId, name: "Neuer Mitarbeiter", rolle: "Rolle" };
    mitarbeiter.push(neuerMA);
    localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
    schichtplanLaden();
});

// ERWEITERT: Löschen-Funktion
document.getElementById("deleteMitarbeiterBtn").addEventListener("click", () => {
    const index = mitarbeiter.findIndex(m => m.id === aktuellBearbeiteteId);
    if (index > -1) {
        mitarbeiter.splice(index, 1);
        localStorage.setItem("mitarbeiterDaten", JSON.stringify(mitarbeiter));
        schichtplanLaden();
        
        // Zurück zur Liste
        document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
        document.getElementById("seite-schichtplan").classList.add('aktiv');
    }
});
schichtplanLaden();