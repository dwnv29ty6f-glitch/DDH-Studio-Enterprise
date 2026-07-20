// Daten laden
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
    
    // Wir erstellen 31 Tage für den Monat Juli 2026
    const tageImMonat = 31;

    mitarbeiter.forEach(ma => {
        const row = document.createElement("tr");
        
        // Name & Rolle
        let html = `<td style="padding: 10px; border: 1px solid #333; position: sticky; left:0; background:#222;">
                        <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color: #0078d4;">${ma.name}</strong>
                    </td>`;
        
        // Tage generieren
        for (let d = 1; d <= tageImMonat; d++) {
            const datumStr = `2026-07-${d.toString().padStart(2, '0')}`;
            const schicht = getSchichtFuerTag(ma.id, datumStr);
            html += `<td onclick="oeffneSchichtDialog(${ma.id}, '${datumStr}')" 
                         style="border: 1px solid #333; text-align:center; min-width: 40px; cursor:pointer; font-size: 0.7em;">
                        ${schicht || "-"}
                    </td>`;
        }
        
        row.innerHTML = html;
        body.appendChild(row);
    });
}

function getSchichtFuerTag(maId, datum) {
    const eintrag = schichten.find(s => s.mitarbeiterId === maId && s.datum === datum);
    // Abkürzungen wie in professionellen Tools: F, S, N, Fr
    const map = {"Frühschicht": "F", "Spätschicht": "S", "Nachtschicht": "N", "Frei": "Fr"};
    return eintrag ? (map[eintrag.schicht] || eintrag.schicht[0]) : "";
}

function oeffneSchichtDialog(maId, datum) {
    aktiveMitarbeiterId = maId;
    aktivesDatum = datum;
    document.getElementById("schichtDialog").classList.add("aktiv");
}

// Event-Listener
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