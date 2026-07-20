"use strict";

// ==========================================
// App starten
// ==========================================

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

mitarbeiterAnzeigen();

schichtplanZeichnen();

dashboardAktualisieren();
// ==========================================
// Letzte geöffnete Seite
// ==========================================

const letzteSeite =
localStorage.getItem("ddhSeite");

if(letzteSeite){

    seiteAnzeigen(letzteSeite);

}else{

    seiteAnzeigen("dashboard");

}
// ==========================================
// App gestartet
// ==========================================

console.log(
    "DDH Studio Enterprise 9.0 gestartet."
);