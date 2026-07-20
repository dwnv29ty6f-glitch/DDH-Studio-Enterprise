function dashboardAktualisieren() {
    const terminZaehler = document.getElementById("heuteTermine");
    if (terminZaehler) {
        // Beispiel: Wir zählen wie viele Termine heute sind
        const heute = new Date().toISOString().split('T')[0];
        const heuteTermine = termine.filter(t => t.datum === heute).length;
        terminZaehler.innerHTML = `<h3>Heute anstehende Termine: ${heuteTermine}</h3>`;
    }
}

// Beim Start des Dashboards aufrufen
dashboardAktualisieren();