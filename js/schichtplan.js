function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const row = document.createElement("tr");
        
        // Wir fügen hier manuell 2 Spalten (td) ein
        row.innerHTML = `
            <td style="color: white;">${ma.name}</td>
            <td style="color: #0078d4; font-weight: bold;">${getSchichtFuerHeute(ma.id)}</td>
        `;
        
        body.appendChild(row);
    });
}

function getSchichtFuerHeute(maId) {
    const heute = "2026-07-20";
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === heute);
    
    // Wenn Schicht gefunden, zeige Text, sonst "Keine"
    return schichtEintrag ? schichtEintrag.schicht : "Keine";
}

schichtplanLaden();