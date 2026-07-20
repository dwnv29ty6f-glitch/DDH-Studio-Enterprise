// Daten laden
const gespeicherteMitarbeiter = localStorage.getItem("mitarbeiterDaten");
let mitarbeiter = gespeicherteMitarbeiter ? JSON.parse(gespeicherteMitarbeiter) : [];

const gespeicherteSchichten = localStorage.getItem("schichtenDaten");
let schichten = gespeicherteSchichten ? JSON.parse(gespeicherteSchichten) : [];

let aktuellBearbeiteteId = null;
let aktiveMitarbeiterId = null;
let aktivesDatum = null;

function schichtplanLaden() {
    const body = document.getElementById("schichtplanBody");
    const header = document.getElementById("schichtplanHeader");
    if (!body || !header) return;
    
    // Header mit Tagen 1-31 füllen
    header.innerHTML = '<th style="padding: 10px; color: #888; background:#222; position:sticky; left:0;">Mitarbeiter</th>';
    for(let d=1; d<=31; d++) {
        header.innerHTML += `<th style="padding: 5px; font-size: 0.7em; color: #555;">${d}</th>`;
    }

    body.innerHTML = ""; 

    mitarbeiter.forEach(ma => {
        const row = document.createElement("tr");
        let html = `<td style="padding: 10px; border: 1px solid #333; position: sticky; left:0; background:#222;">
                        <strong onclick="bearbeiteMitarbeiter(${ma.id})" style="color: #0078d4;">${ma.name}</strong>
                    </td>`;
        
        for (let d = 1; d <= 31; d++) {
            const datumStr = `2026-07-${d.toString().padStart(2, '0')}`;
            const eintrag = schichten.find(s => s.mitarbeiterId === ma.id && s.datum === datumStr);
            const symbol = eintrag ? ({"Frühschicht":"F","Spätschicht":"S","Nachtschicht":"N","Frei":"Fr"}[eintrag.schicht] || "?") : "";
            
            html += `<td onclick="oeffneSchichtDialog(${ma.id}, '${datumStr}')" 
                         style="border: 1px solid #333; text-align:center; min-width: 30px; cursor:pointer; font-size: 0.8em; color:white;">
                        ${symbol}
                    </td>`;
        }
        row.innerHTML = html;
        body.appendChild(row);
    });
}

function bearbeiteMitarbeiter(id) {
    const ma = mitarbeiter.find(m => m.id === id);
    if (!ma) return;
    aktuellBearbeiteteId = id;
    document.getElementById("editName").value = ma.name;
    document.getElementById("editRolle").value = ma.rolle;
    document.querySelectorAll('.seite').forEach(s => s.classList.remove('aktiv'));
    document.getElementById("seite-bearbeiten").classList.add('aktiv');
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