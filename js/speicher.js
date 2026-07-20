// js/speicher.js
function datenInitialisieren() {
    // Wenn noch keine Daten existieren, erstelle Testdaten
    if (localStorage.getItem("ddhTermine") === null) {
        const testTermine = [
            { datum: new Date().toISOString().split('T')[0], titel: "Erster Test-Termin" },
            { datum: "2026-12-25", titel: "Weihnachten" }
        ];
        localStorage.setItem("ddhTermine", JSON.stringify(testTermine));
        console.log("Testdaten wurden geladen!");
        window.location.reload(); // Seite neu laden, um Daten anzuzeigen
    }
}

// Beim Laden ausführen
datenInitialisieren();