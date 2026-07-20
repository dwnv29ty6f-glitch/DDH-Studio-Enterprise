function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    if (!body) return;
    
    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="color: white; padding: 10px;">${ma.name}</td>
            <td style="color: #0078d4; font-weight: bold; padding: 10px;">${getSchichtFuerHeute(ma.id)}</td>
        `;
        body.appendChild(row);
    });
}

function getSchichtFuerHeute(maId) {
    // Heute ist der 20.07.2026
    const heute = "2026-07-20";
    const schichtEintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === heute);
    return schichtEintrag ? schichtEintrag.schicht : "Keine";
}

schichtplanLaden();