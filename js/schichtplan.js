function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    // Geht jeden Mitarbeiter aus der daten.js dynamisch durch
    mitarbeiter.forEach(ma => {
        const schicht = getSchichtFuerHeute(ma.id);
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td style="color: white; padding: 15px; border-bottom: 1px solid #444;">
                <strong>${ma.name}</strong><br>
                <span style="font-size: 0.85em; color: #888;">${ma.rolle}</span><br>
                <span style="color: #0078d4;">${schicht}</span>
            </td>
        `;
        body.appendChild(row);
    });
}

function getSchichtFuerHeute(maId) {
    const heute = "2026-07-20";
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === heute);
    return schichtEintrag ? schichtEintrag.schicht : "Keine Schicht";
}

schichtplanLaden();