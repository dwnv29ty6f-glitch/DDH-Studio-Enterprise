// js/schichtplan.js
function schichtplanLaden() {
    // Hier finden wir den Tabellen-Bereich aus deiner HTML
    const body = document.getElementById("schichtplanBody");
    body.innerHTML = ""; // Wir machen den Bereich erst einmal leer

    // Wir gehen jeden Mitarbeiter aus unserer Liste durch
    mitarbeiter.forEach(ma => {
        // Wir erstellen eine neue Zeile (tr)
        const row = document.createElement("tr");
        
        // Wir füllen die Zeile mit dem Namen und der Schicht
        row.innerHTML = `
            <td>${ma.name}</td>
            <td>${getSchichtFuerHeute(ma.id)}</td>
        `;
        
        // Wir kleben die Zeile in die Tabelle
        body.appendChild(row);
    });
}

// Hilfs-Funktion: Findet die Schicht für heute
function getSchichtFuerHeute(maId) {
    const heute = "2026-07-20"; // Heute ist der 20.07.2026
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === heute);
    return schichtEintrag ? schichtEintrag.schicht : "Keine Schicht";
}

// Starten!
schichtplanLaden();