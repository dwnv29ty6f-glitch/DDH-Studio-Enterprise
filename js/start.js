document.addEventListener("DOMContentLoaded", () => {
    console.log("DDH Studio Enterprise wird initialisiert...");
    
    // Module initialisieren
    if (typeof dashboardAktualisieren === "function") dashboardAktualisieren();
    
    // Hier kannst du später weitere Initialisierungen hinzufügen, 
    // z.B. kalenderZeichnen();
});