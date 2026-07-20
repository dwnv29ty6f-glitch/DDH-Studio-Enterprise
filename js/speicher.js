// js/speicher.js
function datenInitialisieren() {
    // Erzwinge neue Daten, wenn bisher keine Termine da sind
    const gespeicherteTermine = localStorage.getItem("ddhTermine");
    
    if (gespeicherteTermine === null || gespeicherteTermine === "[]") {
        const testTermine = [
            { datum: new Date().toISOString().split('T')[0], titel: "Erster Test-Termin" },
            { datum: "2026-12-25", titel: "Weihnachten" }
        ];
        localStorage.setItem("ddhTermine", JSON.stringify(testTermine));
        console.log("Testdaten geschrieben!");
        window.location.reload(); 
    }
}

datenInitialisieren();