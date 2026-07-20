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

schichtplanLaden();